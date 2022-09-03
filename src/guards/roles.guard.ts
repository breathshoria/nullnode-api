import {CanActivate, ExecutionContext, Injectable} from '@nestjs/common';
import {Reflector} from '@nestjs/core';
import {PrismaService} from "../prisma.service";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(
        private readonly reflector: Reflector,
        private prisma: PrismaService
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const roles = this.reflector.get<string[]>('roles', context.getHandler());
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest();
        ;
        const {userId} = request.user;
        const user = await this.prisma.user.findUnique({
            where: {
                id: userId,
            }
        })

        const hasRole = () =>
            roles.every(role => user.roles.includes(role));

        return user && user.roles && hasRole();
    }
}
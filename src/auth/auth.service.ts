import {forwardRef, Injectable, Inject, UnauthorizedException, ForbiddenException} from '@nestjs/common';
import {UsersService} from "../users/users.service";
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import {ConfigService} from "@nestjs/config";

@Injectable()
export class AuthService {
    constructor(
        @Inject(forwardRef(() => UsersService))
        private userService: UsersService,
        private jwtService: JwtService,
        private config: ConfigService
    ) {}

    async validateUser(username: string, password: string): Promise<any> {
        const user = await this.userService.getUser(username);
        if (!user) return;
        const isValidPassword = await bcrypt.compare(password, user.password)
        if (user && isValidPassword) {
            const {password, ...result} = user;
            return result;
        }

    }

    async login(user: any) {
        const payload = {username: user.username, sub: user.id}
        const accessToken = this.jwtService.sign(payload)
        if (!user.accessToken) {
            await this.userService.addAccessToken(user.username, accessToken)
        }
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.config.get<string>('refreshJwtExpire'),
            secret: this.config.get<string>('refreshJwtSecret')
        })
        return {
            username: user.username,
            accessToken: accessToken,
            refreshToken: refreshToken,
            roles: user.roles,
        }
    }

    async refreshToken(accessToken: string, refreshToken: string): Promise<any> {
        const user = await this.userService.getUserByToken(accessToken);
        if (!user) throw new UnauthorizedException();
        try {
            await this.jwtService.verify(refreshToken, {
                secret: this.config.get<string>('refreshJwtSecret')
            })
            const payload = {username: user.username, sub: user.id}
            const accessToken = this.jwtService.sign(payload);
            await this.userService.addAccessToken(user.username, accessToken)
            return {
                accessToken: accessToken
            }
        } catch {
            throw new UnauthorizedException();
        }
    }
}

import {forwardRef, Injectable, Inject, UnauthorizedException} from '@nestjs/common';
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

        const accessToken = this.jwtService.sign(payload);
        const tokenExpiration = Date.now() + +this.config.get<string>('accessJwtExpire');
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: this.config.get<number>('refreshJwtExpire'),
            secret: this.config.get<string>('refreshJwtSecret')
        })
        await this.userService.addRefreshToken(user.username, refreshToken)

        return {
            username: user.username,
            accessToken: accessToken,
            refreshToken: refreshToken,
            roles: user.roles,
            expiresIn: tokenExpiration,
        }
    }

    async refreshToken(refreshToken: string): Promise<any> {
        const user = await this.userService.getUserByToken(refreshToken);
        if (!user) throw new UnauthorizedException();
        const payload = {username: user.username, sub: user.id}
        try {
            await this.jwtService.verify(refreshToken, {
                secret: this.config.get<string>('refreshJwtSecret')
            })

            const newAccessToken = this.jwtService.sign(payload);
            const tokenExpiration = Date.now() + +this.config.get<string>('accessJwtExpire');

            const newRefreshToken = this.jwtService.sign(payload, {
                expiresIn: this.config.get<string>('refreshJwtExpire'),
                secret: this.config.get<string>('refreshJwtSecret')
            })
            await this.userService.addRefreshToken(user.username, newRefreshToken)

            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
                expiresIn: tokenExpiration
            }
        } catch (err) {
            throw new UnauthorizedException();
        }
    }
}

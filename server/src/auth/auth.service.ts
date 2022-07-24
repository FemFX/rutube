import {
	BadRequestException,
	Injectable,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import { compare, genSalt, hash } from 'bcryptjs'
import { User } from 'src/user/user.entity'
import { Repository } from 'typeorm'
import { AuthDto } from './auth.dto'

@Injectable()
export class AuthService {
	constructor(
		@InjectRepository(User) private readonly userRepository: Repository<User>,
		private readonly jwtService: JwtService
	) {}

	async register(dto: AuthDto) {
		const candidate = await this.userRepository.findOneBy({ email: dto.email })
		if (candidate)
			throw new BadRequestException('Такой пользователь уже существует')

		const salt = await genSalt(10)
		const newUser = await this.userRepository.create({
			email: dto.email,
			password: await hash(dto.password, salt)
		})
		const user = await this.userRepository.save(newUser)
		return {
			user: this.returnUserFields(user),
			accessToken: await this.issueAccessToken(user.id)
		}
	}

	async login(dto: AuthDto) {
		const user = await this.validateUser(dto)
		return {
			user: this.returnUserFields(user),
			accessToken: await this.issueAccessToken(user.id)
		}
	}

	async validateUser(dto: AuthDto) {
		const user = await this.userRepository.findOne({
			where: {
				email: dto.email
			},
			select: ['id', 'email', 'password']
		})
		if (!user) throw new NotFoundException('Пользователь не найден')
		const isValidPassword = await compare(dto.password, user.password)
		if (!isValidPassword) throw new UnauthorizedException('Пароли не совпадают')
		return user
	}
	async issueAccessToken(userId: number) {
		const data = {
			id: userId
		}
		return await this.jwtService.signAsync(data, {
			expiresIn: '31d'
		})
	}

	returnUserFields(user: User) {
		return {
			id: user.id,
			email: user.email
		}
	}
}

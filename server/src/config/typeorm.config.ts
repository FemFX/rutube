import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'
import { Comment } from 'src/comment/comment.entity'
import { Subscription } from 'src/user/subscription.entity'
import { User } from 'src/user/user.entity'
import { Video } from 'src/video/video.entity'

export const getTypeOrmConfig = async (
	configService: ConfigService
): Promise<TypeOrmModuleOptions> => ({
	type: 'postgres',
	host: 'localhost',
	port: +configService.get<number>('DB_PORT'),
	database: configService.get<string>('DATABASE'),
	username: configService.get<string>('DB_USERNAME'),
	password: configService.get<string>('DB_PASSWORD'),
	synchronize: true,
	autoLoadEntities: true,
	logging: true,
	entities: [User, Subscription, Video, Comment]
})

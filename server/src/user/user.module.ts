import { Module } from '@nestjs/common'
import { UserService } from './user.service'
import { UserController } from './user.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './user.entity'
import { Subscription } from './subscription.entity'

@Module({
	imports: [TypeOrmModule.forFeature([User, Subscription])],
	controllers: [UserController],
	providers: [UserService]
})
export class UserModule {}

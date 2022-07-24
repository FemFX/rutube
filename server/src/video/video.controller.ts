import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	Param,
	Post,
	Put,
	Query
} from '@nestjs/common'
import { identity } from 'rxjs'
import { Auth } from 'src/auth/decorators/auth.decorator'
import { CurrentUser } from 'src/user/user.decorator'
import { VideoDto } from './video.dto'
import { VideoService } from './video.service'

@Controller('video')
export class VideoController {
	constructor(private readonly videoService: VideoService) {}
	@Get('get-private/:id')
	async getVideoPrivate(@Param('id') id: string) {
		return this.videoService.videoById(+id, true)
	}
	@Get()
	async getAll(@Query('searchTerm') searchTerm?: string) {
		return this.videoService.getAll(searchTerm)
	}
	@Get('most-popular')
	async getMostPopularByViews() {
		return this.videoService.getMostPopularByViews()
	}
	@Get(':id')
	async getVideo(@Param('id') id: string) {
		return this.videoService.videoById(+id)
	}
	@HttpCode(200)
	@Post()
	@Auth()
	async createVideo(@CurrentUser('id') id: number, @Body() dto: VideoDto) {
		return this.videoService.create(id)
	}

	@HttpCode(200)
	@Put(':id')
	@Auth()
	async updateVideo(@Param('id') id: string, @Body() dto: VideoDto) {
		return this.videoService.update(+id, dto)
	}
	@HttpCode(200)
	@Delete(':id')
	@Auth()
	async deleteVideo(@Param('id') id: string) {
		return this.videoService.delete(+id)
	}

	@HttpCode(200)
	@Put('update-views/:videoId')
	async updateViews(@Param('videoId') videoId: string) {
		return this.videoService.updateCountViews(+videoId)
	}

	@HttpCode(200)
	@Put('update-likes/:videoId')
	@Auth()
	async updateLikes(@Param('videoId') videoId: string) {
		return this.videoService.updateLikes(+videoId)
	}
}

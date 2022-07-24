/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	swcMinify: true,
	poweredByHeader: false,
	env: {
		APP_URL: process.env.REACT_APP_URL
	},
	images: {
		domains: ['localhost', 'assets.stickpng.com']
	},
	async rewrites() {
		return [
			{
				source: '/api/:path*',
				destination: 'http://localhost:4000/api/:path'
			},
			{
				source: '/uploads/:path*',
				destination: 'http://localhost:4000/uploads/:path'
			}
		]
	}
}

module.exports = nextConfig

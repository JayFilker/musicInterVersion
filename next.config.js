const nextConfig = {
    async headers() {
        return [
            {
                source: '/:path*',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: 'media-src http: https: \'self\' http://music-vue.test.upcdn.net;',
                    },
                ],
            },
        ]
    },
}

module.exports = nextConfig

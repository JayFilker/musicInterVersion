// src/mocks/mockApi.ts
import axios from 'axios'

// 保存原始的 axios 方法
const originalAxiosGet = axios.get
const originalAxiosInstance = axios.create

// 模拟数据
const mockResponses = {
    // 匹配 /search 端点的请求
    'https://api.spotify.com/v1/search?q=label:Apple&type=playlist&limit=5&market=JP': (params) => {
        return {
            playlists: {
                href: 'https://api.spotify.com/v1/search?offset=0&limit=5&query=label%3A%22Apple%22&type=playlist&market=JP&locale=zh-CN,zh;q%3D0.9,ja;q%3D0.8',
                limit: 8,
                next: null,
                offset: 0,
                previous: null,
                total: 3,
                items: [
                    {
                        collaborative: false,
                        description: 'The Beatles perform live for the last time on the roof of their London record label Apple Records. The Woodstock Music &amp; Art Fair is held in Bethel, NY with 500,000 attending. A man is stabbed and beaten to death at the Rolling Stones free concert at California&#x27;s Altamont Speedway.',
                        external_urls: {
                            spotify: 'https://open.spotify.com/playlist/5DykvVLmhmgNFIMtuA2ez7',
                        },
                        href: 'https://api.spotify.com/v1/playlists/5DykvVLmhmgNFIMtuA2ez7',
                        id: '5DykvVLmhmgNFIMtuA2ez7',
                        images: [
                            {
                                height: null,
                                url: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da842a781a5d8127a99038bb8e36',
                                width: null,
                            },
                        ],
                        name: '1969 in Rock Music History from RockMusicTimeline.com',
                        owner: {
                            display_name: 'Joel Mellor',
                            external_urls: {
                                spotify: 'https://open.spotify.com/user/1219613008',
                            },
                            href: 'https://api.spotify.com/v1/users/1219613008',
                            id: '1219613008',
                            type: 'user',
                            uri: 'spotify:user:1219613008',
                        },
                        primary_color: null,
                        public: true,
                        snapshot_id: 'AAAAPEvE//B76mZ7gYVhel+F21RNh30e',
                        tracks: {
                            href: 'https://api.spotify.com/v1/playlists/5DykvVLmhmgNFIMtuA2ez7/tracks',
                            total: 40,
                        },
                        type: 'playlist',
                        uri: 'spotify:playlist:5DykvVLmhmgNFIMtuA2ez7',
                    },
                    {
                        collaborative: false,
                        description: 'In 1968, The Beatles created Apple Records; label under which they recorded their last works as a group and their first works as soloists. This playlist included songs created between 1968 and 1975 years. {&quot;Artist&quot;:&quot;3WrFJ7ztbogyGnTHbHJFl2&quot;, &quot;Year&quot;: 2018,&quot;playlistType&quot;:&quot;PLAYLIST&quot;}',
                        external_urls: {
                            spotify: 'https://open.spotify.com/playlist/2m8GQywogpKq7GIYv2G77w',
                        },
                        href: 'https://api.spotify.com/v1/playlists/2m8GQywogpKq7GIYv2G77w',
                        id: '2m8GQywogpKq7GIYv2G77w',
                        images: [
                            {
                                height: null,
                                url: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da841e0bdeedee27766c16aba4a6',
                                width: null,
                            },
                        ],
                        name: 'The Beatles - The Apple Years (1968/1975)',
                        owner: {
                            display_name: 'Pablo A. Szn',
                            external_urls: {
                                spotify: 'https://open.spotify.com/user/pabloszna',
                            },
                            href: 'https://api.spotify.com/v1/users/pabloszna',
                            id: 'pabloszna',
                            type: 'user',
                            uri: 'spotify:user:pabloszna',
                        },
                        primary_color: null,
                        public: true,
                        snapshot_id: 'AAAAUXOtdH0N/7fY+Uk7j/p61vC0I/qv',
                        tracks: {
                            href: 'https://api.spotify.com/v1/playlists/2m8GQywogpKq7GIYv2G77w/tracks',
                            total: 129,
                        },
                        type: 'playlist',
                        uri: 'spotify:playlist:2m8GQywogpKq7GIYv2G77w',
                    },
                    {
                        collaborative: false,
                        description: 'Version house remix end more new exclusive musics from Muisc total Label!   ',
                        external_urls: {
                            spotify: 'https://open.spotify.com/playlist/0BW8RITNVV4M7nzs4PRdWk',
                        },
                        href: 'https://api.spotify.com/v1/playlists/0BW8RITNVV4M7nzs4PRdWk',
                        id: '0BW8RITNVV4M7nzs4PRdWk',
                        images: [
                            {
                                height: null,
                                url: 'https://image-cdn-ak.spotifycdn.com/image/ab67706c0000da84df77ec334d2605dd160f3263',
                                width: null,
                            },
                        ],
                        name: 'Charli XCX - Apple (Slap House Remix) - EXCLUSIVE HOUSE VERSION - More New Music!',
                        owner: {
                            display_name: 'Music Total',
                            external_urls: {
                                spotify: 'https://open.spotify.com/user/od1tx52kkolblq3moupvs8mhr',
                            },
                            href: 'https://api.spotify.com/v1/users/od1tx52kkolblq3moupvs8mhr',
                            id: 'od1tx52kkolblq3moupvs8mhr',
                            type: 'user',
                            uri: 'spotify:user:od1tx52kkolblq3moupvs8mhr',
                        },
                        primary_color: null,
                        public: true,
                        snapshot_id: 'AAAB/f6CEFNd+XXxondEFpv/+JuBmoIm',
                        tracks: {
                            href: 'https://api.spotify.com/v1/playlists/0BW8RITNVV4M7nzs4PRdWk/tracks',
                            total: 118,
                        },
                        type: 'playlist',
                        uri: 'spotify:playlist:0BW8RITNVV4M7nzs4PRdWk',
                    },
                ],
            },
        }
    },
}

// 拦截 axios.get 方法
axios.get = async function (url, config) {
    console.log('[Mock] 拦截 axios.get 请求:', url)

    // 提取基本路径和查询参数
    let baseUrl = url
    let queryParams = {}

    if (url.includes('?')) {
        baseUrl = url.split('?')[0]
        const queryString = url.split('?')[1]
        queryParams = Object.fromEntries(new URLSearchParams(queryString))
    }

    // 如果配置中有 params，合并它们
    if (config?.params) {
        queryParams = { ...queryParams, ...config.params }
    }

    // 尝试找到匹配的模拟响应
    for (const [mockPath, mockHandler] of Object.entries(mockResponses)) {
        if (baseUrl.endsWith(mockPath)) {
            console.log('[Mock] 找到匹配的模拟响应:', mockPath)

            // 模拟网络延迟
            await new Promise(resolve => setTimeout(resolve, 300))

            const mockData = typeof mockHandler === 'function'
                ? mockHandler(queryParams)
                : mockHandler

            console.log('[Mock] 返回模拟数据:', mockData)

            return {
                data: mockData,
                status: 200,
                statusText: 'OK',
                headers: {},
                config,
            }
        }
    }

    console.log('[Mock] 没有找到匹配的模拟响应，使用真实请求')
    return originalAxiosGet(url, config)
}

// 拦截 axios.create 方法以处理自定义实例
axios.create = function (...args) {
    const instance = originalAxiosInstance.apply(this, args)
    const originalInstanceGet = instance.get

    instance.get = async function (url, config) {
        const fullUrl = this.defaults.baseURL
            ? this.defaults.baseURL + (url.startsWith('/') ? url : `/${url}`)
            : url

        console.log('[Mock] 拦截 axios 实例 GET 请求:', fullUrl)

        // 提取基本路径和查询参数
        let baseUrl = url
        let queryParams = {}

        if (url.includes('?')) {
            baseUrl = url.split('?')[0]
            const queryString = url.split('?')[1]
            queryParams = Object.fromEntries(new URLSearchParams(queryString))
        }

        // 如果配置中有 params，合并它们
        if (config?.params) {
            queryParams = { ...queryParams, ...config.params }
        }

        // 尝试找到匹配的模拟响应
        for (const [mockPath, mockHandler] of Object.entries(mockResponses)) {
            if (baseUrl.endsWith(mockPath)) {
                console.log('[Mock] 找到匹配的模拟响应:', mockPath)

                // 模拟网络延迟
                await new Promise(resolve => setTimeout(resolve, 300))

                const mockData = typeof mockHandler === 'function'
                    ? mockHandler(queryParams)
                    : mockHandler

                console.log('[Mock] 返回模拟数据:', mockData)

                return {
                    data: mockData,
                    status: 200,
                    statusText: 'OK',
                    headers: {},
                    config,
                }
            }
        }

        console.log('[Mock] 没有找到匹配的模拟响应，使用真实请求')
        return originalInstanceGet.call(this, url, config)
    }

    return instance
}

console.log('[Mock] Axios 请求拦截器已安装')

// 要使用它，只需在应用入口处导入此文件
// import './mocks/mockApi';

import axios from 'axios'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

function Callback() {
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const exchangeCodeForToken = async () => {
            try {
                // 从 URL 获取授权码和状态
                const urlParams = new URLSearchParams(location.search)
                const code = urlParams.get('code')
                const error = urlParams.get('error')

                if (error) {
                    setError(`Authorization error: ${error}`)
                    setLoading(false)
                    return
                }

                if (!code) {
                    setError('No authorization code found in redirect')
                    setLoading(false)
                    return
                }

                // 调用后端接口交换令牌
                // const response = await axios.post('https://musicplayernodejs-production.up.railway.app/api/exchange-token', { code })
                const response = await axios.post('http://localhost:3000/api/exchange-token', { code })

                // 保存令牌到本地存储
                localStorage.setItem('spotify_access_token', response.data.access_token)
                localStorage.setItem('spotify_refresh_token', response.data.refresh_token)
                localStorage.setItem('spotify_token_expiry', (Date.now() + response.data.expires_in * 1000).toString())

                // 重定向到主应用页面
                localStorage.getItem('showMusicK') === 'true' ? navigate('/login') : navigate('/firstpage')
            }
            catch (err) {
                console.error('Error exchanging code for token:', err)
                setError('Failed to complete authentication. Please try again.')
                setLoading(false)
            }
        }

        exchangeCodeForToken()
    }, [location.search, navigate])

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-xl font-semibold mb-4">正在完成 Spotify 授权...</h2>
                    {/* 添加一个加载动画 */}
                    <div
                        className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500 mx-auto"
                    >
                    </div>
                </div>
            </div>
        )
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center bg-red-100 p-6 rounded-lg max-w-md">
                    <h2 className="text-xl font-semibold mb-4 text-red-800">认证错误</h2>
                    <p className="mb-4 text-red-700">{error}</p>
                    <button
                        onClick={() => window.location.href = 'http://localhost:3000/login'}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    >
                        重试登录
                    </button>
                </div>
            </div>
        )
    }

    return null
}

export default Callback

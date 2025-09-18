// import type { AxiosInstance } from 'axios'
// import axios from 'axios'
//
// // // 创建带认证的 axios 实例
// // function createClient(): AxiosInstance {
// //     return axios.create({
// //         baseURL: 'https://api.spotify.com/v1',
// //         headers: {
// //             get 'Authorization'() {
// //                 const token = localStorage.getItem('spotify_access_token')
// //                 return token ? `Bearer ${token}` : ''
// //             },
// //             'Content-Type': 'application/json',
// //         },
// //     })
// // }
//
// function createClient(): AxiosInstance {
//     const instance = axios.create({
//         baseURL: 'https://api.spotify.com/v1',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//     })
//
//     // 添加请求拦截器，确保每次请求都获取最新的token,防止登陆重定向后因为令牌未实装问题导致的请求失败
//     instance.interceptors.request.use((config) => {
//         const token = localStorage.getItem('spotify_access_token')
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`
//         }
//         return config
//     })
//
//     return instance
// }
//
// const client = createClient()
//
// // 公共请求函数
// export async function get(url: string, params?: Record<string, any>) {
//     const { data } = await client.get(url, { params })
//     return data
// }
//
// export async function put(url: string, data?: any) {
//     const response = await client.put(url, data)
//     return response.data
// }
// 创建统一的请求函数，支持拦截器逻辑
async function fetchWithAuth(
    url: string,
    options: RequestInit = {},
): Promise<Response> {
    // 添加基础URL
    const baseURL = 'https://api.spotify.com/v1'
    const fullUrl = url.startsWith('http') ? url : `${baseURL}${url}`

    // 设置默认headers
    const headers = new Headers(options.headers || {})

    if (!headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json')
    }

    // 添加认证token (相当于请求拦截器功能)
    const token = localStorage.getItem('spotify_access_token')
    if (token) {
        headers.set('Authorization', `Bearer ${token}`)
    }

    // 合并选项
    const fetchOptions: RequestInit = {
        ...options,
        headers,
    }

    // 执行请求
    return fetch(fullUrl, fetchOptions)
}

// 公共请求函数
export async function get<T = any>(url: string, params?: Record<string, any>): Promise<T> {
    // 处理查询参数
    let fullUrl = url
    if (params) {
        const queryString = new URLSearchParams()
        Object.entries(params).forEach(([key, value]) => {
            if (value !== undefined && value !== null) {
                queryString.append(key, String(value))
            }
        })

        const queryStr = queryString.toString()
        if (queryStr) {
            fullUrl += (fullUrl.includes('?') ? '&' : '?') + queryStr
        }
    }

    const response = await fetchWithAuth(fullUrl)

    if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
}

export async function put<T = any>(url: string, data?: any): Promise<T> {
    const options: RequestInit = {
        method: 'PUT',
        body: data ? JSON.stringify(data) : undefined,
    }

    const response = await fetchWithAuth(url, options)

    if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    // 有些PUT请求可能不返回数据
    if (response.status === 204) {
        return {} as T
    }

    return response.json()
}

// 如果需要，可以添加post和delete方法
export async function post<T = any>(url: string, data?: any): Promise<T> {
    const options: RequestInit = {
        method: 'POST',
        body: data ? JSON.stringify(data) : undefined,
    }

    const response = await fetchWithAuth(url, options)

    if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    return response.json()
}

export async function del<T = any>(url: string): Promise<T> {
    const options: RequestInit = {
        method: 'DELETE',
    }

    const response = await fetchWithAuth(url, options)

    if (!response.ok) {
        throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    // DELETE请求通常不返回数据
    if (response.status === 204) {
        return {} as T
    }

    return response.json()
}

import { useQuery } from '@tanstack/react-query'
import { get } from './http.ts'

export function getContent(type: string, key: string, offset?: number) {
    console.log(`/search?q=${encodeURIComponent(key)}&type=${type}&limit=50&offset=${offset || 0}`)
    return get(`/search?q=${encodeURIComponent(key)}&type=${type}&limit=50&offset=${offset || 0}`)
}

export function useContent(type: any, key: any, offset?: any) {
    return useQuery({
        queryKey: ['content', type, key, offset], // 唯一标识这个查询的键
        queryFn: () => getContent(type, key, offset),
        enabled: !!type && !!key, // 只有当token和key存在时才执行查询
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}

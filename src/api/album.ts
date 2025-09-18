import { useQuery } from '@tanstack/react-query'
import { get } from './http.ts'

export function getAlbumList(key: string, offset: number): Promise<any> {
    if (key === '排行榜') {
        // console.log(`/search?q=demo&type=album&limit=50&offset=${offset}`)
        return get(`/search?q=demo&type=album&limit=50&offset=${offset}`)
    }
    return get(`/search?q=${key}&type=album&limit=50&offset=${offset}`)
}
export function useAlbumList(key: string, offset: number = 0) {
    return useQuery({
        queryKey: ['albumList', key, offset], // 唯一标识这个查询的键
        queryFn: () => getAlbumList(key, offset),
        enabled: !!key, // 只有当token和key存在时才执行查询
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
        // 可选：添加其他配置
        // retry: 1, // 失败时重试次数
        // refetchOnWindowFocus: false, // 窗口聚焦时是否重新获取
    })
}

export function getAlbum(randomLetter: any): Promise<any> {
    return get(`/search?q=${randomLetter}&type=album&limit=1`)
}

export function useAlbum(randomLetter: any) {
    return useQuery({
        queryKey: ['album', randomLetter], // 唯一标识这个查询的键
        queryFn: () => getAlbum(randomLetter),
        enabled: !!randomLetter, // 只有当token和key存在时才执行查询
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}

export function getAlbumSong(albumId: any): Promise<any> {
    return get(`/albums/${albumId}/tracks?limit=10`)
}

export function useAlbumSong(albumId: any) {
    return useQuery({
        queryKey: ['albumSong', albumId], // 唯一标识这个查询的键
        queryFn: () => getAlbumSong(albumId),
        enabled: !!albumId, // 只有当token和key存在时才执行查询
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}
// 这个拦截导致跳转首页会重置播放

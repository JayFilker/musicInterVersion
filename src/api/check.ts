import { useQuery } from '@tanstack/react-query'
import { get } from './http.ts'

export function getPlaysList(type: any, id: any) {
    // console.log(`/${type}/${id}`)
    return get(`/${type}/${id}`)
}

export function usePlaysList(type: any, id: any) {
    return useQuery({
        queryKey: ['playsList', type, id], // 唯一标识这个查询的键
        queryFn: () => getPlaysList(type, id),
        enabled: !!id && !!type, // 只有当token和key存在时才执行查询
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}

export function internalInit(id: any, check: boolean): Promise<any> {
    // console.log(`/playlists/${id}/tracks`)
    if (check) {
        return get(`/playlists/${id}/tracks`)
    }
    else {
        return get(`/albums/${id}/tracks`)
    }
}

export function useInternalInit(id: any, check: boolean) {
    return useQuery({
        queryKey: ['internalInit', id, check], // 唯一标识这个查询的键
        queryFn: () => internalInit(id, check),
        enabled: !!id, // 只有当token和key存在时才执行查询
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}

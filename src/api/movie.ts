import { useQuery } from '@tanstack/react-query'
// import axios from 'axios'

export async function getCurrentMovieOne(videoKey: any) {
    if (videoKey) {
        // const response = await axios.get(`https://musicplayernodejs-production.up.railway.app/api/videos/info?key=${encodeURIComponent(videoKey)}`)
        // const response = await axios.get(`http://localhost:3000/api/videos/info?key=${encodeURIComponent(videoKey)}`)
        const response = await fetch(`http://localhost:3000/api/videos/info?key=${videoKey}`)
        const data = await response.json()
        return data
        // return await response.data
    }
}

export function useCurrentMovieOne(videoKey: any) {
    return useQuery({
        queryKey: ['currentMovieOne', videoKey], // 唯一标识这个查询的键
        queryFn: () => getCurrentMovieOne(videoKey),
        enabled: !!videoKey, // 只有当token和key存在时才执行查询
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}

export async function getMovie() {
    // const response = await axios.get(`https://musicplayernodejs-production.up.railway.app/api/videos`)
    // const response = await axios.get(`http://localhost:3000/api/videos`)
    const response = await fetch(`http://localhost:3000/api/videos`)
    const data = await response.json()
    return data
    // return response.data.videos
}

export function useMovie() {
    return useQuery({
        queryKey: ['Movie'], // 唯一标识这个查询的键
        queryFn: () => getMovie(),
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}

export async function getMovieImg() {
    const responseDemo = await fetch(`http://localhost:3000/api/imgs`)
    const data = await responseDemo.json()
    return data
    // const responseDemo = await axios.get(`http://localhost:3000/api/imgs`)
    // const responseDemo = await axios.get(`https://musicplayernodejs-production.up.railway.app/api/imgs`)
    // return responseDemo.data.videos
}

export function useMovieImg() {
    return useQuery({
        queryKey: ['movieImg'], // 唯一标识这个查询的键
        queryFn: () => getMovieImg(),
        staleTime: 5 * 60 * 1000, // 数据5分钟内被视为新鲜
    })
}

import { useAtom } from 'jotai/index'
import { useEffect, useState } from 'react'
// import { useNavigate } from 'react-router-dom'
import { useFavoriteSongs, useUpdateFavoriteSongs } from '../../../api/favoriteSongs.ts'
import {
    arePlayAtom,
    audioRefAtom,
    CountDemo,
    CurrentSongList,
    Device,
    IsPlayingDemo,
    navigationRequestAtom,
} from '../../../store/store.ts'
import eventBus from '../../../utils/eventBus'
import { ButtonIcon } from '../../ButtonIcon'
import { SvgIcon } from '../../SvgIcon'
import { leftSvgList } from './leftSvgList.tsx'

// interface Props {
//     playTrack: (trackUri: string) => Promise<string | void>
// }

export function LeftBottom() {
    const [count] = useAtom(CountDemo)
    const [deviceId] = useAtom(Device)
    // const navigate = useNavigate()
    const [, setIsPlaying] = useAtom(IsPlayingDemo)
    const [, setNavigationRequest] = useAtom(navigationRequestAtom)
    // const { mutate: pausePlaybackPut } = usePausePlaybackPut()
    // const { mutate: resumePlaybackPut } = useResumePlaybackPut()
    const [currentSong] = useAtom<{
        items: Array<{ name: string, artists: Array<any>, id: string, album?: { images: Array<{ url: string }> } }>
        imgPic: string
        id: string
        type: string
    }>(CurrentSongList)
    // 下面自动发送请求
    // const { data } = usePlaysList('tracks', currentSong?.items?.[count]?.id)
    // const { data } = usePlaysList('tracks', currentSong?.idDemo)
    const [currentSL] = useAtom(CurrentSongList)
    const [change, setChange] = useState(true)
    const { data: favoriteSongs } = useFavoriteSongs(change)
    const { mutateAsync: updateFavoriteSongs } = useUpdateFavoriteSongs()
    const [audioRefDemo] = useAtom(audioRefAtom)
    const [arePlay, setArePlay] = useAtom(arePlayAtom)
    const playTrack = (trackUri: string) => {
        // if (!deviceId) {
        //     return '失败'
        // }
        // 这个控制播放图标
        // setIsPlaying(true)
        // const [audioRefDemo] = useAtom(audioRefAtom)
        if (audioRefDemo && !arePlay) {
            audioRefDemo.play()
            setArePlay(true)
            setIsPlaying(true)
        }
        console.log(trackUri)
        // playTrackDemo({ trackUri, deviceId })
    }
    const pausePlayback = () => {
        // if (!deviceId)
        //     return
        try {
            if (audioRefDemo && arePlay) {
                audioRefDemo.pause()
                setArePlay(false)
                setIsPlaying(false)
            }
            // pausePlaybackPut()
            console.log('已暂停播放')
        }
        catch (e) {
            console.log(`暂停失败，原因为：${e}`)
        }
    }
    const resumePlayback = () => {
        // if (!deviceId)
        //     return
        try {
            if (audioRefDemo && !arePlay) {
                audioRefDemo.play()
                setArePlay(true)
                setIsPlaying(true)
            }
            // resumePlaybackPut()
            console.log('继续播放')
        }
        catch (e) {
            console.log(`播放失败，原因为：${e}`)
        }
    }
    useEffect(() => {
        const handlePlaySong = (trackUri?: string) => {
            if (trackUri) {
                playTrack(trackUri)
            }
            else {
                resumePlayback()
            }
        }
        const handleStop = () => {
            pausePlayback()
        }
        // @ts-ignore
        eventBus.on('play-track', handlePlaySong)
        // @ts-ignore
        eventBus.on('play-stop', handleStop)
        return () => {
            // @ts-ignore
            eventBus.off('play-track', handlePlaySong)
            // @ts-ignore
            eventBus.off('play-stop', handleStop)
        }
    }, [deviceId, audioRefDemo])
    return (
        <div className="playing">
            <div className="container">
                <img
                    loading="lazy"
                    alt=""
                    src={currentSong?.items ? currentSong?.items?.[count]?.album?.images[0]?.url ? currentSong?.items[count]?.album?.images[0]?.url : currentSong.imgPic : ''}
                    onClick={() => {
                        // setNavigationRequest({ path: `/playsList?id=${data?.album?.id}&type=albums` })
                        setNavigationRequest({ path: `/playsList?id=${currentSong?.id}&type=${currentSong?.type}` })
                        // navigate(`/playsList?id=${data?.album?.id}&type=albums`)
                    }}
                />
                <div className="track-info">
                    <div className="name">
                        {currentSong?.items ? currentSong.items[count]?.name : ''}
                    </div>
                    <div className="artist">
                        {
                            currentSong?.items
                                ? currentSong.items[count]?.artists.map((item: {
                                    name: string
                                    id: string
                                }, index: number) => {
                                    return (
                                        <span key={index}>
                                            <span
                                                className="ar"
                                                onClick={() => {
                                                    setNavigationRequest({ path: `/artist?id=${item.id}` })
                                                    // navigate(`/artist?id=${item.id}`)
                                                }}
                                            >
                                                {item.name}
                                            </span>
                                            {index !== currentSong.items[count]?.artists.length - 1 && <span>, </span>}
                                        </span>
                                    )
                                })
                                : ''
                        }
                    </div>
                </div>
                <div className="like-button">
                    <ButtonIcon
                        title="喜欢"
                        onClick={async () => {
                            const check = favoriteSongs?.songs?.some((item: any) => item.name === currentSL?.items?.[count].name)
                            const currentSong = currentSL?.items?.[count]
                            if (currentSong) {
                                try {
                                    await updateFavoriteSongs({ check, currentSong })
                                    setChange(!change)
                                }
                                catch (e) {
                                    console.log(e)
                                }
                            }
                        }}
                    >
                        <SvgIcon
                            sty={{
                                display: favoriteSongs?.songs?.some(
                                    (item: any) => item.name === currentSL?.items?.[count].name,
                                )
                                    ? 'none'
                                    : '',
                            }}
                        >
                            {leftSvgList.like}
                        </SvgIcon>
                        <SvgIcon
                            sty={{
                                display: favoriteSongs?.songs?.some(
                                    (item: any) => item.name === currentSL?.items?.[count].name,
                                )
                                    ? ''
                                    : 'none',
                            }}
                        >
                            {leftSvgList.noLike}
                        </SvgIcon>
                    </ButtonIcon>
                </div>
            </div>
            <div className="blank"></div>
        </div>
    )
}

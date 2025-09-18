import { useAtom } from 'jotai/index'
import { useEffect, useState } from 'react'
import {
    audioRefAtom,
    BadLike,
    CountDemo,
    CurrentSongList,
    FirstPlay,
    IsPlayingDemoTwo,
    Link,
    radioList,
    radioListDemo,
} from '../../../store/store.ts'
import eventBus from '../../../utils/eventBus.ts'
import { SvgIcon } from '../../SvgIcon'
import './index.less'

export function TrackListDemo(props: any) {
    const { content, playingTrack, index, setPlayingTrack, songList, songFirst, setSongFirst, radio } = props
    const [showIcon, setShowIcon] = useState(false)
    const [, setBadLikeDemo] = useAtom(BadLike)
    const [, setIsPlayingTwo] = useAtom(IsPlayingDemoTwo)
    const [, setLinkDemo] = useAtom(Link)
    const [count, setCount] = useAtom(CountDemo)
    const [, setRadioListOne] = useAtom(radioList)
    const [, setRadioListDemoOne] = useAtom(radioListDemo)
    const [, setCurrentSong] = useAtom<{ items: Array<any> }>(CurrentSongList)
    const [, setFirstPlay] = useAtom(FirstPlay)
    const [audioRefDemo] = useAtom(audioRefAtom)
    const [showRow, setShowRow] = useState(false)
    const msToMinutes = (ms: number): string => {
        const minutes = Math.floor(ms / 60000)
        const seconds = Math.floor((ms % 60000) / 1000)
        return `${minutes}:${seconds.toString().padStart(2, '0')}`
    }
    const initTwo = (count: number) => {
        setCount(count)
        setCurrentSong({
            ...songList,
            imgPic: content?.album?.images?.[0]?.url || songList?.imgPic,
        })
        setRadioListOne(radio)
        setRadioListDemoOne(radio[count || 0])
        setFirstPlay(false)
        if (audioRefDemo) {
            // 重置播放位置到开头
            audioRefDemo.currentTime = 0
            // 开始播放
            audioRefDemo.play()
        }
        // @ts-ignore
        eventBus.emit('play-track', content?.uri)
    }
    useEffect(() => {
        if (count === index) {
            const demo = Array.from({ length: playingTrack.length }).fill(false)
            demo[index] = true
            setPlayingTrack(demo)
        }
    }, [count])
    return (
        <div
            className={`track playlist ${showRow ? 'focus' : ''} ${playingTrack[index] && !songFirst ? 'playing' : ''}`}
            onMouseEnter={() => {
                setShowIcon(true)
                setShowRow(true)
            }}
            onMouseLeave={() => {
                setShowIcon(false)
                setShowRow(false)
            }}
            style={{ margin: '0 0' }}
            onDoubleClick={(e) => {
                e.stopPropagation()
                setLinkDemo(false)
                setBadLikeDemo(false)
                setIsPlayingTwo(false)
                const demo = Array.from({ length: playingTrack.length }).fill(false)
                demo[index] = true
                setPlayingTrack(demo)
                initTwo(index)
                setSongFirst(false)
            }}
        >

            <img
                src={content?.album?.images?.[0].url || songList?.imgPic}
                loading="lazy"
                alt=""
            />
            <div className="title-and-artist">
                <div className="container" style={{ alignItems: 'normal' }}>
                    <div className="title">
                        {content?.name}
                        <span className="featured">
                        </span>
                        <span className="explicit-symbol">
                        </span>
                    </div>
                    <div className="artist">
                        <span
                            className="explicit-symbol before-artist"
                            style={{ opacity: '0.88' }}
                        >
                            <span className="artist-in-line">
                                {' '}
                                {content?.artists.map((track: any, index: number) => (

                                    <span>
                                        {/* <a href={`/artist?id=${track.id}`}> */}
                                        <div>
                                            {track.name}
                                        </div>
                                        {/* </a> */}
                                        {index < content?.artists.length - 1
                                            && <span className="separator">，</span>}
                                    </span>
                                ))}
                            </span>
                        </span>
                    </div>
                </div>
                <div></div>
            </div>
            <div className="album">
                {/* <a href={`/playsList?id=${content?.album?.id}&type=albums`}>{content?.album?.name}</a> */}
                <div>{content?.album?.name}</div>
                <div></div>
            </div>
            <div v-if="showLikeButton" className="actions">
                <button style={{ display: showIcon ? 'block' : 'none' }}>
                    <SvgIcon>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" id="icon-heart">
                            <path
                                d="M 9.5449219 3 C 5.3895807 3 2 6.3895806 2 10.544922 C 2 14.283156 4.9005496 18.084723 7.6601562 21.119141 C 10.419763 24.153558 13.171875 26.369141 13.171875 26.369141 A 1.0001 1.0001 0 0 0 13.197266 26.388672 C 13.517448 26.630481 13.956962 26.684854 14.369141 26.785156 A 1.0001 1.0001 0 0 0 15 27 A 1.0001 1.0001 0 0 0 15.630859 26.785156 C 16.043038 26.684854 16.482552 26.630481 16.802734 26.388672 A 1.0001 1.0001 0 0 0 16.828125 26.369141 C 16.828125 26.369141 19.580237 24.153558 22.339844 21.119141 C 25.099451 18.084722 28 14.283156 28 10.544922 C 28 6.3895806 24.610419 3 20.455078 3 C 17.450232 3 15.833405 4.5910542 15 5.5664062 C 14.166595 4.5910543 12.549768 3 9.5449219 3 z M 9.5449219 5 C 12.372924 5 14.069642 7.4290597 14.126953 7.5117188 A 1.0001 1.0001 0 0 0 14.910156 8.0078125 A 1.0001 1.0001 0 0 0 15.003906 8.0117188 A 1.0001 1.0001 0 0 0 15.019531 8.0117188 A 1.0001 1.0001 0 0 0 15.042969 8.0097656 A 1.0001 1.0001 0 0 0 15.119141 8.0039062 A 1.0001 1.0001 0 0 0 15.871094 7.5136719 C 15.925786 7.4347249 17.624838 5 20.455078 5 C 23.529737 5 26 7.4702629 26 10.544922 C 26 13.147688 23.499768 16.870104 20.859375 19.773438 C 18.227966 22.666891 15.607768 24.780451 15.589844 24.794922 C 15.414236 24.925626 15.219097 25 15 25 C 14.780903 25 14.585764 24.925626 14.410156 24.794922 C 14.392232 24.780451 11.772034 22.66689 9.140625 19.773438 C 6.5002316 16.870105 4 13.147688 4 10.544922 C 4 7.4702629 6.470263 5 9.5449219 5 z"
                                fill="currentColor"
                            >
                            </path>
                        </svg>
                    </SvgIcon>
                </button>
            </div>
            <div v-if="showTrackTime" className="time">
                {msToMinutes(content?.duration_ms)}
            </div>
        </div>
    )
}

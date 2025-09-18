import { useAtom } from 'jotai/index'
import { useEffect, useRef } from 'react'
import {
    arePlayAtom,
    audioRefAtom,
    CountDemo,
    IsPlayingDemo,
    IsPlayingDemoTwo,
    Link,
    MusicList,
    PlayerDemo,
    radioList,
    radioListDemo,
    SetDemo,
    ShowLyrics,
    Volume,
} from '../../../store/store.ts'
import { svgListTwo } from '../MiddleControlButtons/svg.tsx'
import { MiddleTwo } from '../MiddleTwo'

export function Middle(props: any) {
    const { lyrics } = props
    const [, setShowLyrics] = useAtom(ShowLyrics)
    const [musicList, setMusicList] = useAtom(MusicList)
    const [volume, setVolume] = useAtom(Volume) // 默认音量0.5
    const audioRef = useRef<HTMLAudioElement | null>(null)
    const [set] = useAtom(SetDemo)
    const [player, setPlayer] = useAtom(PlayerDemo)
    const [, setIsPlayingTwo] = useAtom(IsPlayingDemoTwo)
    const [linkDemo] = useAtom(Link)
    const [, setCount] = useAtom(CountDemo)
    // const [song] = useAtom<Array<SongType>>(SongList)
    // const [currentSong] = useAtom<{ items: Array<any> }>(CurrentSongList)
    // const [firstPlay, setFirstPlay] = useAtom(FirstPlay)
    // const [deviceId] = useAtom(Device)
    const [radioListOne] = useAtom(radioList)
    // const [radioCountDemo, setRadioCountDemo] = useAtom(radioCount)
    const [radioListDemoOne, setRadioListDemoOne] = useAtom(radioListDemo)
    const [isPlaying, setIsPlaying] = useAtom(IsPlayingDemo)
    const [audioRefDemo] = useAtom(audioRefAtom)
    const [arePlay, setArePlay] = useAtom(arePlayAtom)
    const Logo = [
        {
            title: '不喜欢',
            style: { display: linkDemo ? '' : 'none' },
            meth: () => {
                // if (count !== song.length - 1) {
                //     if (count !== currentSong.items.length - 1) {
                //         setCount(count + 1)
                //         // @ts-ignore
                //         eventBus.emit('play-track', currentSong.items[count + 1].uri)
                //     }
                // }
                if (radioListOne && radioListOne.length > 1) {
                    if (radioListDemoOne === radioListOne[0]) {
                        setRadioListDemoOne(radioListOne[1])
                        setCount(1)
                    }
                    else {
                        setRadioListDemoOne(radioListOne[0])
                        setCount(0)
                    }
                }
                else {
                    if (audioRefDemo) {
                        // 重置播放位置到开头
                        audioRefDemo.currentTime = 0
                        // 开始播放
                        audioRefDemo.play()
                    }
                }
            },
            icon: svgListTwo.disLike,
        },
        {
            title: '上一首',
            style: { display: linkDemo ? 'none' : '' },
            meth: () => {
                // if (count !== 0) {
                //     setCount(count - 1)
                //     // @ts-ignore
                //     eventBus.emit('play-track', currentSong.items[count - 1].uri)
                // }
                if (radioListOne && radioListOne.length > 1) {
                    if (radioListDemoOne === radioListOne[0]) {
                        setRadioListDemoOne(radioListOne[1])
                        setCount(1)
                    }
                    else {
                        setRadioListDemoOne(radioListOne[0])
                        setCount(0)
                    }
                }
                else {
                    if (audioRefDemo) {
                        // 重置播放位置到开头
                        audioRefDemo.currentTime = 0
                        // 开始播放
                        audioRefDemo.play()
                    }
                }
            },
            icon: svgListTwo.previous,
        },
        {
            title: '播放',
            style: {
                display: isPlaying ? 'none' : '',
            },
            meth: () => {
                if (linkDemo) {
                    setIsPlayingTwo(true)
                }
                // if (firstPlay) {
                //     if (deviceId) {
                //         // @ts-ignore
                //         eventBus.emit('play-track', currentSong.items[count].uri)
                //         setFirstPlay(false)
                //     }
                // }
                // else {
                //     // @ts-ignore
                //     eventBus.emit('play-track')
                // }
                // 展示版的完整版
                // if (audioRefDemo) {
                //     if (arePlay) {
                //         audioRefDemo.play()
                //     }
                //     else {
                //         audioRefDemo.pause()
                //     }
                //     setArePlay(!arePlay)
                // }
                if (audioRefDemo && !arePlay) {
                    audioRefDemo.play()
                    setArePlay(true)
                    setIsPlaying(true)
                }
            },
            icon: svgListTwo.play,
        },
        {
            title: '暂停',
            style: {
                display: isPlaying ? '' : 'none',
            },
            meth: () => {
                if (linkDemo) {
                    setIsPlayingTwo(false)
                }
                // // @ts-ignore
                // eventBus.emit('play-stop')
                if (audioRefDemo && arePlay) {
                    audioRefDemo.pause()
                    setArePlay(false)
                    setIsPlaying(false)
                }
            },
            icon: svgListTwo.stopPlay,
        },
        {
            title: '下一首',
            style: {},
            meth: () => {
                // if (count !== currentSong.items.length - 1) {
                //     setCount(count + 1)
                //     // @ts-ignore
                //     eventBus.emit('play-track', currentSong.items[count + 1].uri)
                // }
                if (radioListOne && radioListOne.length > 1) {
                    if (radioListDemoOne === radioListOne[0]) {
                        setRadioListDemoOne(radioListOne[1])
                        setCount(1)
                    }
                    else {
                        setRadioListDemoOne(radioListOne[0])
                        setCount(0)
                    }
                }
                else {
                    if (audioRefDemo) {
                        // 重置播放位置到开头
                        audioRefDemo.currentTime = 0
                        // 开始播放
                        audioRefDemo.play()
                    }
                }
            },
            icon: svgListTwo.next,
        },
    ]
    useEffect(() => {
        if (audioRefDemo && radioListDemoOne) {
            audioRefDemo.pause()
            audioRefDemo.load()
            audioRefDemo.play()
                .then(() => {
                    setIsPlaying(true)
                    setArePlay(true)
                })
                .catch(err => console.error('播放失败:', err))
        }
    }, [radioListDemoOne])
    return (
        <MiddleTwo
            lyrics={lyrics}
            audioRef={audioRef}
            volume={volume}
            setVolume={setVolume}
            musicList={musicList}
            setMusicList={setMusicList}
            player={player}
            setPlayer={setPlayer}
            Logo={Logo}
            setShowLyrics={setShowLyrics}
            setIsPlayingTwo={setIsPlayingTwo}
            set={set}
        >
        </MiddleTwo>
    )
}

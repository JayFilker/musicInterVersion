import { useAtom } from 'jotai/index'
import React, { useEffect } from 'react'
// import { useNavigate } from 'react-router-dom'
import { useInternalInit } from '../../../api/check.ts'
import {
    BadLike,
    CheckDemo,
    CountDemo,
    CurrentSongList,
    FirstPlay,
    IdDemo,
    ImgDemo,
    IsPlayingDemoTwo,
    Link,
    navigationRequestAtom,
    PlayCountDemo,
    PlayDemo,
    radioList,
    radioListDemo,
} from '../../../store/store.ts'
import eventBus from '../../../utils/eventBus.ts'
import { CustomSlider } from '../../Bar'
import { ShortKey } from '../../ShortKey'
import { LeftBottom } from '../LeftBottom'
import { LyricsButtom } from '../LyricsButtom'
import { MiddleControlButtons } from '../MiddleControlButtons'
import { RightControlButtons } from '../RightControlButtons'
import { svgList } from '../RightControlButtons/svgList.tsx'

export function MiddleTwo(props: any) {
    const {
        lyrics,
        audioRef,
        volume,
        setVolume,
        musicList,
        setMusicList,
        player,
        setPlayer,
        Logo,
        setShowLyrics,
        set,
    } = props
    const [, setNavigationRequest] = useAtom(navigationRequestAtom)
    const functions = [
        {
            title: '播放列表',
            meth: () => {
                if (musicList[0]) {
                    setNavigationRequest({ path: '/nextTracks' })
                }
                else {
                    setNavigationRequest({ action: 'back' })
                }
                setMusicList(musicList.map((item: any, index: any) => index === 0 ? !item : item))
            },
            style: { color: musicList[0] ? 'white' : '#335eea' },
            icon: svgList.playList,
        },
        {
            title: '循环播放',
            meth: () => {
                setMusicList(musicList.map((item: any, index: number) => index === 1 ? !item : item))
            },
            style: { color: musicList[1] ? 'white' : '#335eea', opacity: 1 },
            icon: svgList.loopPlayback,
        },
        {
            title: '随机播放',
            meth: () => {
                setMusicList(musicList.map((item: any, index: number) => index === 2 ? !item : item))
            },
            style: { color: musicList[2] ? 'white' : '#335eea', opacity: 1 },
            icon: svgList.randomPlay,
        },
    ]
    const [idDemo, setIdDemo] = useAtom(IdDemo)
    const [imgDemo, setImgDemo] = useAtom(ImgDemo)
    const [countDemo, setCountDemo] = useAtom(PlayCountDemo)
    const [playDemo, setPlayDemo] = useAtom(PlayDemo)
    const [, setBadLikeDemo] = useAtom(BadLike)
    const [, setIsPlayingTwo] = useAtom(IsPlayingDemoTwo)
    const [, setLinkDemo] = useAtom(Link)
    const [, setCount] = useAtom(CountDemo)
    const [, setCurrentSong] = useAtom<{ items: Array<any> }>(CurrentSongList)
    const [check, setCheck] = useAtom(CheckDemo)
    const [, setFirstPlay] = useAtom(FirstPlay)
    const [, setRadioListOne] = useAtom(radioList)
    const [, setRadioListDemoOne] = useAtom(radioListDemo)
    const { data } = useInternalInit(idDemo?.id, check || false)
    useEffect(() => {
        if (data) {
            countDemo ? setCount(countDemo) : setCount(0)
            setCurrentSong({
                ...data,
                id: idDemo.id,
                items: data.items.map((item: any) => item.track || item),
                imgPic: imgDemo,
                type: check ? 'playlists' : 'albums',
            })
            // setRadioListOne(idDemo.radio)
            // setRadioListDemoOne(idDemo.radio[0])

            // console.log({
            //     ...data,
            //     id: idDemo.id,
            //     items: data.items.map((item: any) => item.track || item),
            //     imgPic: imgDemo,
            // })
            if (playDemo) {
                setFirstPlay(false)
                if (countDemo) {
                    // @ts-ignore
                    check ? eventBus.emit('play-track', data?.items[countDemo].track.uri) : eventBus.emit('play-track', data?.items[countDemo].uri)
                }
                else {
                    // @ts-ignore
                    check ? eventBus.emit('play-track', data?.items[0].track.uri) : eventBus.emit('play-track', data?.items[0].uri)
                }
            }
        }
    }, [data, countDemo])

    const initTwo = async (id: string, imgDemo: string, play: any, checkDemo: boolean, count?: number) => {
        // 注意每个都相互独立
        setIdDemo(id)
        setCheck(checkDemo)
        setImgDemo(imgDemo)
        setCountDemo(count)
        setPlayDemo(play)
    }

    function handleClick(data: {
        e: React.MouseEvent
        id: any
        img: string
        check: boolean
        count?: number
    }) {
        data.e.stopPropagation()
        setLinkDemo(false)
        setBadLikeDemo(false)
        setIsPlayingTwo(false)
        setRadioListOne(data.id.radio)
        setRadioListDemoOne(data.id.radio[data.count || 0])
        data.count ? initTwo(data.id, data.img, true, data.check, data.count) : initTwo(data.id, data.img, true, data.check)
    }

    useEffect(() => {
        eventBus.on('playList-playing', ({ e, id, img, check, count }) => {
            handleClick({ e, id, img, check, count })
        })
        return () => {
            eventBus.off('playList-playing') // 记得清理
        }
    }, [])

    return (
        <>
            {lyrics
                ? (
                        <LyricsButtom
                            volume={volume}
                            setVolume={setVolume}
                            player={player}
                            setPlayer={setPlayer}
                            Logo={Logo}
                            functions={functions}
                        >
                        </LyricsButtom>
                    )
                : (
                        <div className="player">
                            <audio ref={audioRef} />
                            <ShortKey></ShortKey>
                            <div
                                className={`progress-bar ${set.entertainment ? 'nyancat nyancat-stop' : ''}`}
                            >
                                <CustomSlider
                                    player={player}
                                    setPlayer={setPlayer}
                                />
                            </div>
                            <div className="controls">
                                <LeftBottom></LeftBottom>
                                <MiddleControlButtons Logo={Logo}>
                                </MiddleControlButtons>
                                <RightControlButtons
                                    audioRef={audioRef.current}
                                    volume={volume}
                                    setVolume={setVolume}
                                    musicList={musicList}
                                    setMusicList={setMusicList}
                                    setShowLyrics={setShowLyrics}
                                    functions={functions}
                                >
                                </RightControlButtons>
                            </div>
                        </div>
                    )}
        </>
    )
}

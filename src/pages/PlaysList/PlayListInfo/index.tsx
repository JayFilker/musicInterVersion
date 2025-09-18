import { useAtom } from 'jotai/index'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFavoriteList, useUpdateFavoriteList } from '../../../api/favoriteSongs.ts'
import defaultImg from '../../../assets/img/default.png'
import { SongListImg } from '../../../components/SongListImg'
import { SvgIcon } from '../../../components/SvgIcon'
import { ContextMenu } from '../../../components/TopList/ContextMenu'
import { audioRefAtom, CountDemo, PlayingTrack } from '../../../store/store.ts'
import eventBus from '../../../utils/eventBus.ts'
import { playListSvg } from './svg.tsx'

export function PlayListInfo(props: any) {
    const {
        songList,
        songListInfo,
        setSongListInfo,
        searchParams,
        setShowShade,
        setTowShow,
        twoShow,
        demo,
        setFirst,
    } = props
    const [showSearch, setShowSearch] = useState(false)
    const [inputFocus, setInputFocus] = useState(false)
    const [, setCount] = useAtom(CountDemo)
    const inputRef = useRef<HTMLInputElement>(null)
    const [playingTrack, setPlayingTrack] = useAtom(PlayingTrack)
    const list = ['保存到音乐库', '歌单内搜索']
    const { t } = useTranslation()
    const [audioRefDemo] = useAtom(audioRefAtom)
    const [like, setLike] = useState<any>()
    const { data: favoriteList } = useFavoriteList(like, searchParams.get('type') === 'playlists' ? 'playList' : 'album')
    const { mutateAsync: updateFavoriteList } = useUpdateFavoriteList()

    useEffect(() => {
        if (favoriteList) {
            console.log(favoriteList?.songs)
        }
    }, [favoriteList])

    function handleFocusInput() {
        if (inputRef.current) {
            setTimeout(() => {
                inputRef.current?.focus()
            }, 10)
        }
    }

    return (
        <div className="playlist-info">
            <SongListImg
                img={songList?.images?.[0]?.url || defaultImg}
                id={songList?.id}
                index={666}
                size="290px"
                check={searchParams.get('type') === 'playlists'}
                radio={songList?.tracks?.items[0]?.radio || []}
            >
            </SongListImg>
            <div className="info">
                <div className="title">
                    {songList?.name}
                </div>
                <div className="artist">
                    {searchParams.get('type') === 'playlists' ? `Playlist by ` : songListInfo?.items?.length > 1 ? 'Album by ' : 'Single by '}
                    {searchParams.get('type') === 'playlists'
                        ? (
                                <a
                                    target="blank"
                                    href={`https://music.163.com/#/user/home?id=${songList?.owner?.id}`}
                                >
                                    {songList?.owner ? songList?.owner?.display_name : ''}
                                </a>
                            )
                        : songList?.artists?.map((item: any, index: number) => {
                            return (
                                <React.Fragment key={index}>
                                    <a target="blank" href={`/artist?id=${item?.id}`}>{item?.name}</a>
                                    {
                                        index < songList.artists.length - 1 && ', '
                                    }
                                </React.Fragment>
                            )
                        })}
                </div>
                {songList
                    ? (
                            <div className="date-and-count">
                                {searchParams.get('type') === 'playlists'
                                    ? '最后更新于 '
                                    : ''}
                                {searchParams.get('type') === 'playlists'
                                    ? songList?.tracks?.items[songList?.tracks?.items?.length - 1]?.added_at?.split('T')[0].split('-').map((part: any, index: number) => {
                                        const units = ['年', '月', '日']
                                        return part ? `${part}${units[index] || ''}` : ''
                                    }).join('')
                                    : songList?.release_date?.split('-')[0]}
                                {' · '}
                                {songList?.tracks?.items?.length}
                                {t('首歌')}
                                {songList?.time ? `,${songList?.time} ${t('分钟')}` : ''}
                            </div>
                        )
                    : ''}
                <div
                    className="description"
                    onClick={() => {
                        setShowShade(true)
                    }}
                >
                    {songList?.description ? songList?.description : '暂无描述'}
                </div>
                <div className="buttons" style={{ position: 'relative' }}>
                    <button
                        className="blue"
                        style={{ borderRadius: '8px', padding: '8px 16px', width: 'auto' }}

                        onClick={(e) => {
                            setCount(0)
                            eventBus.emit('playList-playing', {
                                e,
                                id: {
                                    id: songList?.id,
                                    radio: songList?.tracks?.items[0]?.radio || [],
                                },
                                img: searchParams.get('type') === 'playlists' ? songListInfo.items[0].track?.album.images[0].url : songList?.images[0].url,
                                check: searchParams.get('type') === 'playlists',
                            })
                            const demo = playingTrack.map(() => false)
                            demo[0] = true
                            setPlayingTrack(demo)
                            setFirst(false)
                            if (audioRefDemo) {
                                // 重置播放位置到开头
                                audioRefDemo.currentTime = 0
                                // 开始播放
                                audioRefDemo.play()
                            }
                        }}
                    >
                        <SvgIcon sty={{ marginRight: '8px' }}>
                            {playListSvg.play}
                        </SvgIcon>
                        {` ${t('播放')} `}
                    </button>
                    <button
                        className="grey"
                        style={{ borderRadius: '8px', padding: '8px 0px', width: 'auto' }}
                        onClick={async () => {
                            const check = favoriteList?.songs?.some((item: any) => item.name === songList?.name)
                            if (songList) {
                                try {
                                    await updateFavoriteList({
                                        check,
                                        currentSong: check
                                            ? {
                                                    name: songList?.name,
                                                    type: searchParams.get('type') === 'playlists' ? 'playList' : 'album',
                                                }
                                            : {
                                                    ...songList,
                                                    tracks: {
                                                        ...songList?.tracks,
                                                        items: songList?.tracks?.items?.filter((_item: any, index: number) => index < 10),
                                                    },
                                                },
                                    })
                                    setLike(!like)
                                }
                                catch (e) {
                                    console.log(e)
                                }
                            }
                        }}
                    >
                        <SvgIcon
                            sty={{
                                marginRight: '0px',
                                display: favoriteList?.songs?.some(
                                    (item: any) => item.name === songList?.name,
                                )
                                    ? 'none'
                                    : '',
                            }}
                        >
                            {playListSvg.likeSure}
                        </SvgIcon>
                        <SvgIcon
                            sty={{
                                marginRight: '0px',
                                display: favoriteList?.songs?.some(
                                    (item: any) => item.name === songList?.name,
                                )
                                    ? ''
                                    : 'none',
                            }}
                        >
                            {playListSvg.noLike}
                        </SvgIcon>
                    </button>
                    <button
                        className="grey"
                        onClick={(e) => {
                            e.stopPropagation()
                            setTowShow(true)
                        }}
                    >
                        <SvgIcon sty={{ marginRight: '0px' }}>
                            {playListSvg.omit}
                        </SvgIcon>
                    </button>
                    <ContextMenu
                        style={{
                            display: twoShow ? 'block' : 'none',
                            top: '25px',
                            left: '195px',
                            position: 'absolute',
                        }}
                        setShow={setTowShow}
                        list={list}
                        setShowSearch={setShowSearch}
                        showSearch={showSearch}
                        inputfocus={handleFocusInput}
                    >
                    </ContextMenu>
                </div>
            </div>
            <div className="search-box" style={{ display: showSearch ? '' : 'none' }}>
                <div className={`container ${inputFocus ? 'active' : ''}`}>
                    <SvgIcon>
                        {playListSvg.search}
                    </SvgIcon>
                    <div className="input">
                        <input
                            ref={inputRef}
                            placeholder={inputFocus ? '' : t('搜索歌单音乐')}
                            onFocus={() => {
                                setInputFocus(true)
                            }}
                            onBlur={() => {
                                setInputFocus(false)
                            }}
                            onChange={(e) => {
                                const keyword = e.target.value
                                if (keyword === '') {
                                    setSongListInfo(demo)
                                }
                                else {
                                    if (searchParams.get('type') === 'playlists') {
                                        setSongListInfo({
                                            ...demo,
                                            items: demo?.items?.filter((item: any) => item.track.name.includes(keyword)),
                                        })
                                    }
                                    else {
                                        setSongListInfo({
                                            ...demo,
                                            items: demo?.items?.filter((item: any) => item.name.includes(keyword)),
                                        })
                                    }
                                }
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

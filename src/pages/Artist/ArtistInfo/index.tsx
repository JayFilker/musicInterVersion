import { useAtom } from 'jotai/index'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { useFavoriteArtist, useUpdateFavoriteArtist } from '../../../api/favoriteSongs.ts'
import { SvgIcon } from '../../../components/SvgIcon'
import { ContextMenu } from '../../../components/TopList/ContextMenu'
import { CountDemo, CurrentSongList, Playing, radioList, radioListDemo } from '../../../store/store.ts'
import eventBus from '../../../utils/eventBus.ts'
import { artistSvgList } from '../artistSvgList.tsx'

export function ArtistInfo(props: any) {
    const { albumsArtist, hotSongs, album, setShowShade, setTowShow, twoShow, setSongFirst } = props
    const { t } = useTranslation()
    const [searchParams] = useSearchParams()
    const [, setPlay] = useAtom(Playing)
    const [, setCount] = useAtom(CountDemo)
    const [, setCurrentSong] = useAtom<{ items: Array<any>, imgPic: string }>(CurrentSongList)
    const [like] = useState<any>(false)
    const [, setRadioListOne] = useAtom(radioList)
    const [, setRadioListDemoOne] = useAtom(radioListDemo)
    const { data: favoriteArtist, refetch } = useFavoriteArtist(like)
    const { mutateAsync: updateFavoriteArtist } = useUpdateFavoriteArtist()
    return (
        <div className="artist-info">
            <div className="head">
                <img src={albumsArtist?.images[0].url} loading="lazy" alt="" />
            </div>
            <div>
                <div className="name">
                    {albumsArtist?.name}
                </div>
                <div className="artist">
                    {t('艺人')}
                </div>
                <div className="statistics">
                    <a href="#popularTracks">
                        {`${hotSongs?.tracks?.length} `}
                        {' '}
                        {t('首热门歌曲')}
                    </a>
                    {` · `}
                    <a href="#albums">
                        {`${album?.items?.length} `}
                        {t('张专辑')}
                    </a>
                </div>
                <div
                    className="description"
                    onClick={() => {
                        setShowShade(true)
                    }}
                >
                    暂无描述
                </div>
                <div className="buttons" style={{ position: 'relative' }}>
                    <button
                        className="blue"
                        style={{ borderRadius: '8px', padding: '8px 16px', width: 'auto' }}

                        onClick={() => {
                            setCurrentSong({
                                items: [...hotSongs?.tracks],
                                imgPic: hotSongs?.tracks[0]?.album.images[0]?.url,
                            })
                            setCount(0)
                            setPlay((prev) => {
                                const newPlay = prev.map(() => {
                                    return false
                                })
                                newPlay[0] = true
                                return newPlay
                            })
                            setRadioListOne(albumsArtist.radio)
                            setRadioListDemoOne(albumsArtist.radio[0])
                            setSongFirst(false)
                            // @ts-ignore
                            eventBus.emit('play-track', hotSongs?.tracks[0].uri)
                        }}
                    >
                        <SvgIcon sty={{ marginRight: '8px' }}>
                            {artistSvgList.play}
                        </SvgIcon>
                        {` ${t('播放')} `}
                    </button>
                    <button
                        className="grey"
                        style={{ borderRadius: '8px', padding: '8px 0px', width: 'auto' }}
                        onClick={async () => {
                            const check = favoriteArtist?.songs?.some((item: any) => item.name === albumsArtist?.name)
                            if (albumsArtist && hotSongs) {
                                await updateFavoriteArtist({
                                    check,
                                    currentSong: {
                                        ...albumsArtist,
                                        artistId: searchParams.get('id'),
                                        items: [...hotSongs?.tracks.filter((_item: any, index: number) => index < 10)],
                                        imgPic: hotSongs?.tracks[0]?.album.images[0]?.url,
                                    },
                                })
                                // setLike(!like)
                                await refetch()
                            }
                        }}
                    >
                        <SvgIcon
                            sty={{
                                marginRight: '0px',
                                display: favoriteArtist?.songs?.some(
                                    (item: any) => item.name === albumsArtist?.name,
                                )
                                    ? ''
                                    : 'none',
                            }}
                        >
                            {artistSvgList.like}
                        </SvgIcon>
                        <SvgIcon
                            sty={{
                                marginRight: '0px',
                                display: favoriteArtist?.songs?.some(
                                    (item: any) => item.name === albumsArtist?.name,
                                )
                                    ? 'none'
                                    : '',
                            }}
                        >
                            {artistSvgList.noLike}
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
                            {artistSvgList.omit}
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
                        list={['复制链接', '在浏览器中打开']}
                    >
                    </ContextMenu>
                </div>
            </div>
        </div>
    )
}

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import { useArtistAlbums, useArtistDetails, useArtistSongs, useNewAlbums } from '../../api/artist.ts'
import { Shade } from '../../components/shade'
import { SongList } from '../../components/SongList'
import { SongListImg } from '../../components/SongListImg'
import { Track } from '../../components/Track'
import { ArtistInfo } from './ArtistInfo'
import './index.less'

export default function Artist() {
    const [searchParams] = useSearchParams()
    const [showShade, setShowShade] = useState(false)
    const [twoShow, setTowShow] = useState(false)
    const [addTrue, setAddTrue] = useState(false)
    const [songFirst, setSongFirst] = useState(true)
    const { t } = useTranslation()
    const handleClickOutside = () => {
        if (twoShow) {
            setTowShow(false)
            document.removeEventListener('click', handleClickOutside)
        }
    }
    const { data: artistDetails } = useArtistDetails(searchParams.get('id') as string)
    // console.log(artistDetails)
    const { data: artistSongs } = useArtistSongs(searchParams.get('id') as string)
    // console.log(artistSongs)
    const { data: newAlbumsDemo } = useNewAlbums(searchParams.get('id') as string)
    // console.log(newAlbumsDemo)
    const { data: artistAlbums } = useArtistAlbums(searchParams.get('id') as string)
    // console.log(artistAlbums)
    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [twoShow])
    return (
        <div className="artist-page">
            <ArtistInfo
                albumsArtist={artistDetails}
                hotSongs={artistSongs}
                album={artistAlbums}
                setShowShade={setShowShade}
                setTowShow={setTowShow}
                twoShow={twoShow}
                setSongFirst={setSongFirst}
            >
            </ArtistInfo>
            <div className="latest-release">
                <div className="section-title">
                    {t('最新发布')}
                </div>
                {newAlbumsDemo?.items?.length > 0
                    ? (
                            <div className="release">
                                <div className="container">

                                    <SongListImg
                                        img={newAlbumsDemo?.items[0].images[0].url}
                                        size="128px"
                                        newAlbum={true}
                                        id={newAlbumsDemo?.items[0].id}
                                        index={1}
                                        radio={newAlbumsDemo?.items[0].radio}
                                    >
                                    </SongListImg>
                                    <div className="info">
                                        <div className="name">
                                            <Link
                                                to={`/playsList?id=${newAlbumsDemo?.items[0].id}&type=albums`}
                                            >
                                                {newAlbumsDemo?.items[0]?.name}
                                            </Link>
                                        </div>
                                        <div className="date">
                                            {newAlbumsDemo?.items[0]?.release_date.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1年$2月$3日')}
                                        </div>
                                        <div className="type">
                                            Album ·
                                            {`${newAlbumsDemo?.items.length}`}
                                            {t('首歌')}
                                        </div>
                                    </div>
                                </div>
                                <div className="container latest-mv">
                                    <div
                                        className="cover"
                                    >
                                    </div>
                                    <div className="info">
                                        <div className="name">
                                        </div>
                                        <div className="date">
                                        </div>
                                        <div className="type">
                                        </div>
                                    </div>
                                </div>
                                <div></div>
                            </div>
                        )
                    : ''}
            </div>
            <div id="popularTracks" className="popular-tracks">
                <div className="section-title">
                    {t('热门歌曲')}
                </div>
                <Track
                    songFirstDemo={songFirst}
                    setSongFirstDemo={setSongFirst}
                    tracks={{ items: addTrue ? artistSongs?.tracks : artistSongs?.tracks?.slice(0, 12) }}
                    radio={newAlbumsDemo?.items[0].radio}
                >
                </Track>

                <div id="seeMore" className="show-more">
                    <button
                        onClick={() => {
                            if (artistSongs?.tracks?.length <= 12) {
                                setAddTrue(true)
                            }
                            else {
                                setAddTrue(false)
                            }
                        }}
                    >
                        <span style={{ display: artistSongs?.tracks?.length <= 12 ? '' : 'none' }}>
                            {t('显示更多')}
                        </span>
                        <span style={{ display: artistSongs?.tracks?.length > 12 ? '' : 'none' }}>
                            {t('收起')}
                        </span>
                    </button>
                </div>
            </div>
            <div id="albums" className="albums">
                <div className="section-title">
                    {t('专辑')}
                </div>
                <SongList
                    songList={artistAlbums?.items?.map((item: {
                        id: string
                        name: string
                        images: Array<any>
                        release_date: string
                        radio: Array<any>
                    }) => {
                        return {
                            id: item.id,
                            title: item.name,
                            des: item.release_date.split('-')[0],
                            imgPic: item.images[0].url,
                            content: [],
                            radio: item.radio,
                        }
                    })}
                >
                </SongList>
            </div>
            <div className="eps">
                <div className="section-title">
                </div>
            </div>
            <Shade
                style={{ display: showShade ? '' : 'none' }}
                artist={true}
                description="暂无描述"
                setShowShade={setShowShade}
            >
            </Shade>
        </div>
    )
}

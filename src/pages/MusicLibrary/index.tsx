import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useFavoriteArtist, useFavoriteList, useFavoriteSongs } from '../../api/favoriteSongs.ts'
import defaultImg from '../../assets/img/default.png'
import { SongerList } from '../../components/SongerList'
import { SongList } from '../../components/SongList'
import { Track } from '../../components/Track/index.tsx'
import './index.less'
import '../../components/SongList/index.less'
import '../../components/SongListImg/index.less'
// import { usePlaysList } from '../../api/check.ts'
// import { useNewAlbums } from '../../api/artist.ts'

export default function MusicLibrary() {
    const [currentTab, setCurrentTab] = useState('tracks')
    const [like] = useState<any>(false)
    const { data: favoriteArtist, refetch } = useFavoriteArtist(like)
    // console.log(favoriteArtist)
    const {
        data: favoriteList,
        refetch: refetchList,
    } = useFavoriteList(true, currentTab === 'playLists' ? 'playList' : 'album')
    // console.log(favoriteList)
    const [change] = useState(true)
    const { data: favoriteSongs, refetch: refetchSongs } = useFavoriteSongs(change)
    // console.log(favoriteSongs)
    // const { data: newAlbumsDemo } = useNewAlbums()
    // console.log(newAlbumsDemo)
    const { t } = useTranslation()
    useEffect(() => {
        if (favoriteList) {
            console.log(favoriteList)
        }
    }, [favoriteList])
    return (
        <div className="library">
            <h1>
                路人甲
                {' '}
                {t('的音乐库')}
            </h1>
            <br />
            <h2 style={{ color: 'white' }}>
                {' '}
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 30 30"
                    id="icon-heart-solid"
                    style={{ width: '16px', height: '16px' }}
                >
                    <path
                        d="M15,26c-0.21,0-0.42-0.066-0.597-0.198C13.938,25.456,3,17.243,3,11c0-3.859,3.141-7,7-7c2.358,0,4.062,1.272,5,2.212 C15.938,5.272,17.642,4,20,4c3.859,0,7,3.14,7,7c0,6.243-10.938,14.456-11.403,14.803C15.42,25.934,15.21,26,15,26z"
                        fill="currentColor"
                    >
                    </path>
                </svg>
                &nbsp;
                收藏列表:
            </h2>
            <div className="section-two">
                <div className="tabs-row">
                    <div className="tabs">
                        <div
                            className={`tab ${currentTab === 'tracks' ? 'active' : ''}`}
                            onClick={async () => {
                                setCurrentTab('tracks')
                                await refetchSongs().then()
                            }}
                        >
                            歌曲
                        </div>
                        {/* active */}
                        <div
                            className={`tab ${currentTab === 'artists' ? 'active' : ''}`}
                            onClick={async () => {
                                setCurrentTab('artists')
                                await refetch().then()
                            }}
                        >
                            艺人
                        </div>
                        <div
                            className={`tab ${currentTab === 'albums' ? 'active' : ''}`}
                            onClick={async () => {
                                setCurrentTab('albums')
                                await refetchList().then()
                            }}
                        >
                            专辑
                        </div>
                        <div
                            className={`tab ${currentTab === 'playLists' ? 'active' : ''}`}
                            onClick={async () => {
                                setCurrentTab('playLists')
                                await refetchList().then()
                            }}
                        >
                            歌单
                        </div>
                    </div>
                </div>

                <div style={{ display: currentTab === 'tracks' ? '' : 'none' }}>
                    <Track
                        tracks={{ items: favoriteSongs?.songs }}
                        radio={[
                            'https://music-vue-1395414804.cos.ap-guangzhou.myqcloud.com/002.mp3',
                        ]}
                    >
                    </Track>
                </div>

                <div style={{ display: currentTab === 'albums' ? '' : 'none' }}>
                    <SongList
                        songList={favoriteList?.songs?.map((item: {
                            id: string
                            name: string
                            images: Array<any>
                            artists: Array<any>
                        }) => {
                            return {
                                id: item.id,
                                title: item.name,
                                imgPic: item?.images[0]?.url || defaultImg,
                                content: [],
                                artists: item?.artists,
                                radio: [
                                    'https://music-vue-1395414804.cos.ap-guangzhou.myqcloud.com/006.mp3',
                                ],
                            }
                        })}
                    >
                    </SongList>
                </div>

                <div style={{ display: currentTab === 'artists' ? '' : 'none' }}>
                    <SongerList
                        gridTemplateColumns="repeat(5, 1fr)"
                        artist={
                            favoriteArtist?.songs?.map((item: any) => {
                                return {
                                    name: item?.name,
                                    personSongList: [],
                                    id: item?.artistId,
                                    imgPic: item?.images?.[0]?.url || defaultImg,
                                    radio: [
                                        'https://music-vue-1395414804.cos.ap-guangzhou.myqcloud.com/005.mp3',
                                    ],
                                }
                            }) || []
                        }
                    >
                    </SongerList>
                </div>

                <div style={{ display: currentTab === 'playLists' ? '' : 'none' }}>
                    <SongList
                        songList={favoriteList?.songs?.filter((_itemDemo: any) => _itemDemo !== null).filter((_itemDemo: any, index: number) => index < 12).map((item: {
                            id: string
                            name: string
                            images: Array<any>
                        }) => {
                            return {
                                playListId: item.id,
                                title: item.name,
                                imgPic: item?.images[0]?.url,
                                content: [],
                                radio: [
                                    'https://music-vue-1395414804.cos.ap-guangzhou.myqcloud.com/004.mp3',
                                ],
                            }
                        })}
                    >
                    </SongList>
                </div>
            </div>
        </div>
    )
}

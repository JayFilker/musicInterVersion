import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import { useMovie } from '../../api/movie.ts'
import { useFetchProfile } from '../../api/search'
import { Movie } from '../../components/Movie'
import { SongerList } from '../../components/SongerList'
import { SongList } from '../../components/SongList'
import { Track } from '../../components/Track'
import './index.less'
import '../../components/SongListImg/index.less'

export default function Search() {
    const [searchParams] = useSearchParams()
    const { t } = useTranslation()
    const { data } = useMovie()
    // const { data: fetchProfile } = useFetchProfile(searchParams.get('q'))
    const { data: fetchProfile } = useFetchProfile(2)
    console.log(fetchProfile)
    return (
        <div className="search-page">
            <div className="row">
                <div className="artists">
                    <div className="section-title">
                        {t('艺人')}
                        <Link to={`/searchDemo?type=artist&key=${searchParams.get('q')}`}>
                            {' '}
                            {t('查看全部')}
                        </Link>
                    </div>
                    <SongerList
                        gap="34px 24px"
                        gridTemplateColumns="repeat(3, 1fr)"
                        artist={
                            fetchProfile?.artists?.items
                                ?.filter((_itemDemo: any, index: number) => index < 3)
                                ?.map((item: any) => ({
                                    name: item.name,
                                    personSongList: [],
                                    id: item.id,
                                    radio: item.radio,
                                    imgPic: item.images?.[0]?.url || 'https://p2.music.126.net/svHK8nEPa8J42tJ1by7jrw==/109951169875194361.jpg?param=512y512',
                                })) || []
                        }
                    >
                    </SongerList>
                </div>

                <div className="albums">
                    <div className="section-title">
                        {t('专辑')}
                        <Link to={`/searchDemo?type=album&key=${searchParams.get('q')}`}>{t('查看全部')}</Link>
                    </div>
                    <SongList
                        style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '34px 24px' }}
                        songList={fetchProfile?.albums.items?.filter((_itemDemo: any, index: number) => index < 3)
                            ?.map((item: {
                                id: string
                                name: string
                                images: Array<any>
                                radio: Array<any>
                            }, index: number) => {
                                return {
                                    id: item.id,
                                    title: item.name,
                                    des: fetchProfile.albums.items[index].artists[0].name,
                                    imgPic: item.images[0].url,
                                    content: [],
                                    radio: item.radio,
                                }
                            })}
                    >
                    </SongList>
                </div>
            </div>

            <div className="tracks">
                <div className="section-title">
                    {t('歌曲')}
                    <Link to={`/searchDemo?type=track&key=${searchParams.get('q')}`}>{t('查看全部')}</Link>
                </div>
                <Track tracks={fetchProfile?.tracks} radio={fetchProfile?.tracks?.items[0]?.radio}></Track>
            </div>

            <div className="music-videos">
                <div className="section-title">
                    {t('视频')}
                    <Link to={`/searchDemo?type=movie&key=${searchParams.get('q')}`}>{t('查看全部')}</Link>
                </div>
                <Movie movie={data} keyValue={searchParams.get('q') || ''}></Movie>
            </div>

            <div className="playlists">
                <div className="section-title">
                    {t('歌单')}
                    <Link to={`/searchDemo?type=playlist&key=${searchParams.get('q')}`}>{t('查看全部')}</Link>
                </div>
                <SongList
                    style={{ gridTemplateColumns: 'repeat(6, 1fr)', gap: '34px 24px' }}
                    songList={fetchProfile?.playlists.items.filter((_itemDemo: any) => _itemDemo !== null).filter((_itemDemo: any, index: number) => index < 12).map((item: {
                        id: string
                        name: string
                        images: Array<any>
                        radio: Array<any>
                    }) => {
                        return {
                            playListId: item.id,
                            title: item.name,
                            imgPic: item.images[0].url,
                            content: [],
                            radio: item.radio,
                        }
                    })}
                >
                </SongList>
            </div>
            <div className="no-results" style={{ display: 'none' }}>
                <div></div>
            </div>
        </div>
    )
}

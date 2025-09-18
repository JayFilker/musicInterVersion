import { useAtom } from 'jotai'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useAlbumList } from '../../api/album.ts'
import { useFirstFetchProfile, useRecommendedArtists } from '../../api/search.ts'
import defaultImg from '../../assets/img/default.png'
import { Foryou } from '../../components/Foryou'
// import { RankingList } from '../../components/RankingList'
import { SongerList } from '../../components/SongerList'
import { SongList } from '../../components/SongList'
import { SetDemo } from '../../store/store.ts'
import './index.less'

export default function FirstPage() {
    const [set] = useAtom(SetDemo)
    const [keyList] = useState<Array<{ name: string, limit: number }>>([{
        name: 'Apple',
        limit: 5,
    }, {
        name: 'recommend',
        limit: 10,
    }, {
        name: set.linkMusic === 'all' || set.linkMusic === 'ea' ? 'new' : set.linkMusic === 'zh' ? '新' : set.linkMusic === 'jp' ? '新しい' : '새로운',
        limit: 10,
    }])
    const { t } = useTranslation()
    // const searchTerms = ['recommended', 'popular', 'top']
    // const randomTerm = searchTerms[Math.floor(Math.random() * searchTerms.length)]
    const { data: apple } = useFirstFetchProfile(keyList[0].name, keyList[0].limit, 'playlist')
    const { data: recommend } = useFirstFetchProfile(keyList[1].name, keyList[1].limit, 'playlist')
    // console.log(recommend)
    const { data: linkMusic } = useFirstFetchProfile('new', keyList[2].limit, 'album')
    const { data: recommendedArtists } = useRecommendedArtists('popular')
    const { data: rankDemo } = useAlbumList('排行榜', 0)
    // console.log(randomTerm)
    // console.log(recommendedArtists)
    // console.log(rankDemo)

    return (
        <div className="home">
            {set.showApple && (
                <div className="index-row first-row">
                    <div className="title">
                        {' '}
                        by Apple Music
                    </div>
                    <SongList
                        songList={apple?.playlists.items.filter((_itemDemo: any) => _itemDemo !== null).filter((_itemDemo: any, index: number) => index < 12).map((item: {
                            id: string
                            name: string
                            images: Array<any>
                            radio: Array<any>
                        }) => {
                            return {
                                des: 'by Apple Music',
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
            )}
            <div className="index-row">
                <div className="title">
                    {t('推荐歌单')}
                    <a href="/discover?key=推荐歌单" className="title-all">{t('查看全部')}</a>
                </div>
                <SongList
                    songList={recommend?.playlists.items.filter((_itemDemo: any) => _itemDemo !== null).filter((_itemDemo: any, index: number) => index < 12).map((item: {
                        id: string
                        name: string
                        images: Array<any>
                        radio: Array<any>
                    }) => {
                        return {
                            playListId: item.id,
                            title: item.name,
                            imgPic: item?.images[0]?.url,
                            content: [],
                            radio: item.radio,
                        }
                    })}
                >
                </SongList>
            </div>
            <div className="index-row">
                <div className="title"> For You</div>
                <Foryou></Foryou>
            </div>
            <div className="index-row">
                <div className="title">
                    {t('推荐艺人')}
                </div>
                <SongerList
                    artist={
                        recommendedArtists?.artists?.items?.map((item: any) => {
                            return {
                                name: item.name,
                                personSongList: [],
                                id: item.id,
                                imgPic: item.images?.[0]?.url || defaultImg,
                                radio: item.radio,
                            }
                        }) || []
                    }
                >
                </SongerList>
            </div>
            <div className="index-row">
                <div className="title">
                    {t('新专速递')}
                    <a href={`/more?key=${keyList[2].name}`} className="title-all">{t('查看全部')}</a>
                </div>
                <SongList
                    songList={linkMusic?.albums.items.map((item: {
                        id: string
                        name: string
                        images: Array<any>
                        artists: Array<any>
                        radio: Array<any>
                    }) => {
                        return {
                            id: item.id,
                            title: item.name,
                            des: item?.artists[0]?.name,
                            imgPic: item?.images[0]?.url || defaultImg,
                            content: [],
                            artists: item?.artists,
                            radio: item.radio,
                        }
                    })}
                >
                </SongList>
            </div>
            <div className="index-row">
                <div className="title">
                    {t('排行榜')}
                    <a href="/discover?key=排行榜" className="title-all">{t('查看全部')}</a>
                </div>
                {/* <RankingList> */}
                {/* </RankingList> */}
                <SongList
                    songList={rankDemo?.albums.items.map((item: {
                        id: string
                        name: string
                        images: Array<any>
                        artists: Array<any>
                        radio: Array<any>
                    }) => {
                        return {
                            id: item.id,
                            title: item.name,
                            des: item?.artists[0]?.name,
                            imgPic: item?.images[0]?.url || defaultImg,
                            content: [],
                            artists: item?.artists,
                            radio: item?.radio,
                        }
                    })}
                >
                </SongList>
            </div>
        </div>
    )
}

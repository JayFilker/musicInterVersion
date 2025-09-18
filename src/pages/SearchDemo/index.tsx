import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { useMovie } from '../../api/movie.ts'
import { useContent } from '../../api/searchDemo.ts'
import defaultImg from '../../assets/img/default.png'
import { ButtonIconTwo } from '../../components/ButtonIconTwo'
import { Movie } from '../../components/Movie'
import { SongerList } from '../../components/SongerList'
import { SongList } from '../../components/SongList'
import { TrackList } from '../../components/TrackList'
import '../../components/SongListImg/index.less'
import './index.less'

export default function SearchDemo() {
    const [searchParams] = useSearchParams()
    const [contentList, setContentList] = useState<any>()
    const [title, setTitle] = useState<any>()
    const [currentNumber, setCurrentNumber] = useState(0)
    const { t } = useTranslation()
    const { data } = useMovie()
    // const { data: content } = useContent(searchParams.get('type') as string, searchParams.get('key') as string, currentNumber)
    const { data: content } = useContent(searchParams.get('type') as string, 2, currentNumber)
    console.log(content)
    useEffect(() => {
        if (content && currentNumber === 0) {
            setContentList(content)
        }
        else if (content) {
            const type = `${searchParams.get('type')}s`
            const contentListDemo = {
                ...contentList,
            }
            contentListDemo[type] = {
                ...contentList?.[type],
                items: [...contentList?.[type]?.items, ...content?.[type]?.items],
            }
            setContentList(contentListDemo)
        }
    }, [content, currentNumber])
    useEffect(() => {
        const demo = async () => {
            if (searchParams.get('type') && searchParams.get('key')) {
                setTitle(searchParams.get('type') === 'artist' ? '艺人' : searchParams.get('type') === 'album' ? '专辑' : searchParams.get('type') === 'playlist' ? '歌单' : searchParams.get('type') === 'movie' ? '视频' : '歌曲')
            }
        }
        demo().then()
    }, [])
    return (
        <div className="search">
            <h1>
                <span>
                    {t(`搜索`)}
                    {' '}
                    {t(title)}

                </span>
                "
                {searchParams.get('key')}
                "
            </h1>
            <div style={{ display: searchParams.get('type') === 'artist' ? '' : 'none' }}>
                <SongerList
                    artist={
                        contentList?.artists?.items?.map((item: any) => {
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
            <div style={{ display: searchParams.get('type') === 'album' ? '' : 'none' }}>
                <SongList
                    songList={contentList?.albums?.items?.map((item: {
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
                            radio: item.radio,
                        }
                    })}
                >
                </SongList>
            </div>
            <div style={{ display: searchParams.get('type') === 'track' ? '' : 'none' }}>
                {/* <TrackList trackDemo={contentList?.tracks}></TrackList> */}
                <TrackList
                    trackDemo={{ ...contentList?.tracks, radio: contentList?.tracks?.items[0]?.radio || [] }}
                >
                </TrackList>
            </div>
            <div style={{ display: searchParams.get('type') === 'movie' ? '' : 'none' }}>
                <Movie movie={data} keyValue={searchParams.get('key') || ''} limitNumber={0}></Movie>
            </div>
            <div style={{ display: searchParams.get('type') === 'playlist' ? '' : 'none' }}>
                <SongList
                    songList={contentList?.playlists?.items.filter((_itemDemo: any) => _itemDemo !== null).map((item: {
                        id: string
                        name: string
                        images: Array<any>
                        radio: Array<any>
                    }) => {
                        return {
                            playListId: item.id,
                            title: item?.name,
                            imgPic: item?.images[0]?.url || defaultImg,
                            content: [],
                            radio: item.radio,
                        }
                    })}
                >
                </SongList>
            </div>
            <div className="load-more">
                <ButtonIconTwo
                    color="grey"
                    style={{ borderRadius: '8px', padding: '8px 16px', width: 'auto' }}
                    onClick={async () => {
                        if (searchParams.get('type') === 'movie') {
                            return
                        }
                        const newOffset = currentNumber + 50
                        setCurrentNumber(newOffset)
                    }}
                >
                    加载更多
                </ButtonIconTwo>
            </div>
        </div>
    )
}

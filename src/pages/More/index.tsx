import { useTranslation } from 'react-i18next'
import { useSearchParams } from 'react-router-dom'
import { useFirstFetchProfile } from '../../api/search.ts'
import defaultImg from '../../assets/img/default.png'
import { SongList } from '../../components/SongList'
import './index.less'

export default function More() {
    const [searchParams] = useSearchParams()
    const { t } = useTranslation()
    const { data } = useFirstFetchProfile('new', 50, 'album')
    return (
        <div className="newAlbum">
            <h1 style={{ color: '#fff' }}>
                {searchParams.get('key') === 'new' || searchParams.get('key') === '新' || searchParams.get('key') === '新しい' || searchParams.get('key') === '새로운' ? t('新专速递') : searchParams.get('key')}
            </h1>
            <div className="playlist-row">
                <div className="playlists">
                    <SongList
                        songList={data?.albums?.items.map((item: {
                            id: string
                            name: string
                            images: Array<any>
                        }, index: number) => {
                            return {
                                id: item.id,
                                title: item.name,
                                des: data?.albums?.items[index].name,
                                imgPic: item?.images[0]?.url || defaultImg,
                                content: [],
                            }
                        })}
                    >
                    </SongList>
                </div>
            </div>
        </div>
    )
}

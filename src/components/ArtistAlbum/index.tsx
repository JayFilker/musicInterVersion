// import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useArtistAlbum } from '../../api/artist.ts'
import { SongListImg } from '../SongListImg'
import '../SongList/index.less'

interface Props {
    artist?: string
    style?: object
}

export function ArtistAlbum(props: Props) {
    const { style } = props
    // const { artist, style } = props
    // const { data: searchArtist } = useSearchArtist(artist)
    // const { data: artistAlbumDate } = useArtistAlbum(searchArtist?.artists?.items?.[0]?.id, 5)
    const { data: artistAlbumDate } = useArtistAlbum('0mMqD2uqwvCjFvlzo6ayGi', 5)
    return (
        <div
            className="cover-row"
            style={style || { gridTemplateColumns: 'repeat(5, 1fr)', gap: '44px 24px' }}
        >
            {
                artistAlbumDate?.items?.map((item: any, index: number) => {
                    return (
                        <div
                            key={index}
                            className="item"
                        >
                            <SongListImg
                                img={item?.images[0].url}
                                index={index}
                                radio={item?.radio}
                                id={(item?.id ? item.id : item.playListId) as string}
                            >
                            </SongListImg>
                            <div className="text">
                                <div
                                    className="title"
                                    style={{ fontSize: '16px', margin: '0 0' }}
                                >
                                    <Link
                                        to={`/playsList?id=${(item.id ? item.id : item.playListId) as string}&type=albums`}
                                        style={{ color: 'white' }}
                                    >
                                        {item.name}
                                    </Link>
                                </div>
                                <div className="info">
                                    <span>{`Album · ${item.release_date.split('-')[0]}`}</span>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

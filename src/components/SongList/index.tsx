import React from 'react'
import { Link } from 'react-router-dom'
import { SongListImg } from '../SongListImg'
import './index.less'

interface Props {
    songList: Array<{
        id?: string
        playListId?: string
        number?: number
        title: string
        imgPic: string
        des: string
        artists?: any
        radio?: Array<any>
    }>
    style?: object

}

export function SongList(props: Props) {
    const { songList, style } = props
    console.log(songList)
    return (
        <div
            className="cover-row"
            style={style || { gridTemplateColumns: 'repeat(5, 1fr)', gap: '44px 24px' }}
        >
            {
                songList?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="item"
                        >
                            <SongListImg
                                img={item.imgPic}
                                number={item.number}
                                index={index}
                                check={!!item.playListId}
                                id={(item.id ? item.id : item.playListId) as string}
                                radio={item.radio}
                            >
                            </SongListImg>
                            <div className="text">
                                <div
                                    className="title"
                                    style={{ fontSize: '16px', margin: '0 0' }}
                                >
                                    <Link
                                        to={`/playsList?id=${(item.id ? item.id : item.playListId) as string}&type=${item.playListId ? 'playlists' : 'albums'}`}
                                        style={{ color: 'white' }}
                                    >
                                        {item.title}
                                    </Link>
                                </div>
                                <div className="info">
                                    {
                                        item?.artists
                                            ? item?.artists.map((artists: any, index: number) => {
                                                if (index < item?.artists.length - 1) {
                                                    return (
                                                        <React.Fragment key={index}>
                                                            <Link to={`/artist?id=${artists?.id}`}>{artists?.name}</Link>
                                                            <span>，</span>
                                                        </React.Fragment>
                                                    )
                                                }
                                                else {
                                                    return (
                                                        <Link
                                                            to={`/artist?id=${artists?.id}`}
                                                            key={index}
                                                        >
                                                            {artists?.name}
                                                        </Link>
                                                    )
                                                }
                                            })

                                            : <span>{item.des ? item.des : ''}</span>
                                    }

                                </div>
                            </div>
                        </div>
                    )
                })
            }

        </div>
    )
}

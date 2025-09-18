import { Link } from 'react-router-dom'
import { SongListImg } from '../SongListImg'
import { SvgIcon } from '../SvgIcon'
import './index.less'
import '../SongList/index.less'

interface Props {
    songList: Array<{
        id: string
        images: Array<{ url: string }>
        name: string
        radio: Array<any>
        type: string
    }>
}

export function SearchList(props: Props) {
    const { songList } = props
    console.log(songList)
    return (
        <div
            className="cover-row"
            style={{ gridTemplateColumns: 'repeat(5, 1fr)', gap: '44px 24px' }}
        >
            {
                songList?.map((item, index) => {
                    return (
                        <div
                            key={index}
                            className="item"
                        >
                            <SongListImg
                                img={item.images[0]?.url}
                                index={index}
                                id={item.id}
                                radio={item.radio}
                                check={item.type !== 'album'}
                            >
                            </SongListImg>
                            <div className="text">

                                <div className="info">
                                    <span
                                        className="play-count"
                                        style={{ color: '#fff' }}
                                    >
                                        <SvgIcon>
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                aria-hidden="true"
                                                className="svg-inline--fa fa-play fa-w-14"
                                                role="img"
                                                viewBox="0 0 448 512"
                                                id="icon-play"
                                            >
                                                <path
                                                    fill="currentColor"
                                                    d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z"
                                                >
                                                </path>
                                            </svg>
                                        </SvgIcon>
                                        {`${(Math.random() * 99 + 1).toFixed(2)}万`}
                                    </span>

                                </div>
                                <div className="title">
                                    <Link
                                        to={`/playsList?id=${item.id}&type=albums`}
                                        style={{ color: 'white' }}
                                    >
                                        {item.name}
                                    </Link>

                                </div>

                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

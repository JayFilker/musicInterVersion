import { useAtom } from 'jotai'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { audioRefAtom, CountDemo } from '../../store/store.ts'
import eventBus from '../../utils/eventBus.ts'
import { SvgIcon } from '../SvgIcon'
import './index.less'

export function SongListImg(props: {
    img: string
    id: string
    radio?: Array<any>
    number?: number
    index: number
    check?: boolean
    size?: string
    newAlbum?: boolean
}) {
    const { img, id, check, size, newAlbum, radio } = props
    const navigate = useNavigate()
    const [show, setShow] = useState<boolean>(false)
    // const [, setRadioListOne] = useAtom(radioList)
    // const [, setRadioListDemoOne] = useAtom(radioListDemo)
    const [audioRefDemo] = useAtom(audioRefAtom)
    const [, setCount] = useAtom(CountDemo)
    // useEffect(() => {
    //     if (number === 0 && index === 0) {
    //         initTwo(id, img, false).then()
    //     }
    // }, [])
    return (
        <div
            className="cover cover-hover"
            onMouseMove={() => {
                setShow(true)
            }}
            onMouseOut={() => {
                setShow(false)
            }}
            onClick={() => {
                navigate(`/playsList?id=${id}&type=${check ? 'playlists' : 'albums'}`)
            }}
        >
            <div
                className="cover-container"
                onClick={(e) => {
                    if (size && !newAlbum) {
                        // if (radio) {
                        //     setRadioListOne(radio)
                        //     setRadioListDemoOne(radio[0])
                        // }
                        // setRadioListOne(['https://lzjmusicresource.oss-cn-guangzhou.aliyuncs.com/002.mp3'])
                        // setRadioListDemoOne('https://lzjmusicresource.oss-cn-guangzhou.aliyuncs.com/002.mp3')
                        if (audioRefDemo) {
                            audioRefDemo.load()
                        }
                        // }
                        setCount(0)
                        eventBus.emit('playList-playing', { e, id: { id, radio: radio || [] }, img, check: !!check })
                        if (audioRefDemo) {
                            // 重置播放位置到开头
                            audioRefDemo.currentTime = 0
                            // 开始播放
                            audioRefDemo.play()
                        }
                    }
                }}
            >
                <div className="shade">
                    <button
                        // v-show="focus"
                        className="play-button"
                        style={
                            size
                                ? {
                                        display: show ? 'block' : 'none',
                                        width: newAlbum ? '30%' : '18%',
                                        height: newAlbum ? '30%' : '18%',
                                    }
                                : {
                                        display: show ? 'block' : 'none',
                                        width: '22%',
                                        height: '22%',
                                    }
                        }

                        onClick={(e) => {
                            // setRadioListOne(['https://lzjmusicresource.oss-cn-guangzhou.aliyuncs.com/002.mp3'])
                            // setRadioListDemoOne('https://lzjmusicresource.oss-cn-guangzhou.aliyuncs.com/002.mp3')
                            // if (radio) {
                            //     setRadioListOne(radio)
                            //     setRadioListDemoOne(radio[0])
                            // }
                            // handleClick({ e, id, index, img })
                            setCount(0)
                            eventBus.emit('playList-playing', { e, id: { id, radio: radio || [] }, img, check: !!check })
                            if (audioRefDemo) {
                                // 重置播放位置到开头
                                audioRefDemo.currentTime = 0
                                // 开始播放
                                audioRefDemo.play()
                            }
                        }}
                    >
                        <SvgIcon sty={{ width: '65%', height: '65%' }}>
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
                    </button>
                </div>
                <img
                    src={img}
                    loading="lazy"
                    alt=""
                    style={{ width: size || '100%', height: size || '100%' }}
                />
                <div

                    className="shadow"
                    style={{
                        backgroundImage: `url(${img})`,
                        display: show || size ? 'block' : 'none',
                    }}

                >
                </div>
            </div>
        </div>
    )
}

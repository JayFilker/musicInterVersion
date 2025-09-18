import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import { useCurrentMovieOne, useMovie } from '../../api/movie'
import { ButtonIcon } from '../../components/ButtonIcon'
import { Movie } from '../../components/Movie'
import { SvgIcon } from '../../components/SvgIcon'
import { ContextMenu } from '../../components/TopList/ContextMenu'
import { svgList } from './movieSvgList.tsx'
import one from './video/周柏豪 - 12号.mp4'
import three from './video/小李同学 - 星愿2025.mp4'
import five from './video/布瑞吉Bridge - For All 2025.mp4'
import four from './video/建龙 - 我们一直一直在路上2025-MV.mp4'
import two from './video/王菲 - 世界赠予我的（2025总台春晚版）.mp4'
import six from './video/逆耳 - 逆耳乐队2024「无尽梦潮」双专场纪录短片.mp4'
import './index.less'
import 'plyr/dist/plyr.css'

export default function MoviePage() {
    const [currentMovie, setCurrentMovie] = useState<any>()
    const [videoKey, setVideoKey] = useState()
    const list = ['复制链接', '在浏览器中打开']
    const { t } = useTranslation()
    const [twoShow, setTowShow] = useState(false)
    const [searchParams] = useSearchParams()
    const [moviesList, setMoviesList] = useState<any>([])
    const [btnShow, setBtnShow] = useState(true)
    const videoRef = useRef(null)
    const { data: currentMovieOne } = useCurrentMovieOne(videoKey)
    const { data: movie } = useMovie()

    function forEachTitle(video: any) {
        if (video.title === searchParams.get('title')) {
            setCurrentMovie({
                ...video,
                name: video.title.split('-')[1],
                artist: video.title.split('-')[0],
            })
            // setVideoKey(video.key)
            const demo = video.size && (video.size === 46186463
                ? 'one'
                : video.size
                    === 16184758
                    ? 'two'
                    : video.size
                        === 12185751
                        ? 'three'
                        : video.size === 18231523 ? 'four' : video.size === 12398794 ? 'five' : 'six')
            setVideoKey(demo)
        }
    }

    const handleClickOutside = () => {
        if (twoShow) {
            setTowShow(false)
            document.removeEventListener('click', handleClickOutside)
        }
    }
    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [twoShow])
    useEffect(() => {
        if ((currentMovie && searchParams.get('title') !== currentMovie.title) || movie) {
            movie.forEach((videoDemo: any) => {
                forEachTitle(videoDemo)
            })
            setMoviesList(movie.filter((item: any) => item.title !== searchParams.get('title')))
        }
    }, [searchParams.get('title'), movie])
    return (
        currentMovie
            ? (
                    <div className="mv-page">
                        <div className="current-video">
                            <div className="video" style={{ position: 'relative' }}>
                                <video
                                    ref={videoRef}
                                    className="plyr"
                                    style={{ width: '100%' }}
                                    controls
                                    crossOrigin="anonymous"
                                    // 移除src属性，让Plyr完全控制
                                    // src={currentMovie ? `http://${encodeURI(currentMovie.videoUrl)}` : ''}
                                    src={currentMovie.name === ' 12号'
                                        ? one
                                        : currentMovie.name === ' 世界赠予我的（2025总台春晚版）'
                                            ? two
                                            : currentMovie.name === ' 星愿2025' ? three : currentMovie.name === ' 我们一直一直在路上2025' ? four : currentMovie.name === ' For All 2025' ? five : six}
                                    onPlay={() => {
                                        setBtnShow(false)
                                    }}
                                    onPause={() => {
                                        setBtnShow(true)
                                    }}
                                >
                                    您的浏览器不支持视频播放
                                </video>
                                <ButtonIcon
                                    sty={{
                                        display: btnShow ? '' : 'none',
                                        width: '48px',
                                        height: '48px',
                                        borderRadius: '50%',
                                        backgroundColor: '#335eea',
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                    }}
                                    onClick={() => {
                                        if (videoRef.current) {
                                            (videoRef.current as HTMLVideoElement).play()
                                        }
                                    }}
                                >
                                    <SvgIcon sty={{ width: '18px', height: '18px' }}>
                                        {svgList.stopButton}
                                    </SvgIcon>
                                </ButtonIcon>
                            </div>
                            <div className="video-info">
                                <div className="title">
                                    {currentMovie.artist.split(',').map((item: any, index: number) => {
                                        if (index < currentMovie.artist.split(',').length - 1) {
                                            return (
                                                <Link to="/firstPage" key={index}>
                                                    {item}
                                                    ,
                                                </Link>
                                            )
                                        }
                                        else {
                                            return (
                                                <Link to="/firstPage" key={index}>
                                                    {item}
                                                </Link>
                                            )
                                        }
                                    })}
                                    -
                                    {currentMovie.name}
                                    <div className="buttons" style={{ position: 'relative' }}>
                                        <ButtonIcon classname="button">
                                            <SvgIcon>
                                                {svgList.Like}
                                            </SvgIcon>
                                        </ButtonIcon>
                                        <ButtonIcon
                                            classname="button"
                                            onClick={(e: any) => {
                                                e.stopPropagation()
                                                setTowShow(true)
                                            }}
                                        >
                                            <SvgIcon>
                                                {svgList.Expand}
                                            </SvgIcon>
                                        </ButtonIcon>
                                        <ContextMenu
                                            style={{
                                                display: twoShow ? 'block' : 'none',
                                                top: '25px',
                                                left: '60px',
                                                position: 'absolute',
                                            }}
                                            setShow={setTowShow}
                                            list={list}
                                        >
                                        </ContextMenu>
                                    </div>
                                </div>
                                <div className="info">
                                    {currentMovieOne?.['x-qn-meta']?.views || '暂无'}
                                    Views ·
                                    {currentMovieOne?.['x-qn-meta']?.time || '暂无时间'}
                                </div>
                            </div>
                        </div>
                        <div className="more-video">
                            <div className="section-title">
                                {t('更多视频')}
                            </div>
                            <Movie movie={moviesList} keyValue={searchParams.get('q') || ''}></Movie>
                        </div>
                    </div>
                )
            : <div style={{ paddingTop: '100px', fontSize: '30px', color: 'white' }}>页面未找到，请返回上一页</div>
    )
}

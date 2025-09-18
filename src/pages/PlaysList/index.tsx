import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useSearchParams } from 'react-router-dom'
import { useInternalInit, usePlaysList } from '../../api/check.ts'
import { ArtistAlbum } from '../../components/ArtistAlbum'
import { Shade } from '../../components/shade'
import { TrackList } from '../../components/TrackList'
import { PlayListInfo } from './PlayListInfo'
import './index.less'

export default function PlaysList() {
    const [searchParams] = useSearchParams()
    const [twoShow, setTowShow] = useState(false)
    const [showShade, setShowShade] = useState(false)
    const [first, setFirst] = useState(true)
    const { t } = useTranslation()
    const { data: playList } = usePlaysList(searchParams.get('type'), searchParams.get('id'))
    console.log(playList)
    const [songListInfo, setSongListInfo] = useState<any>()
    const { data: internalInit } = useInternalInit(playList?.id, searchParams.get('type') === 'playlists')
    // console.log(internalInit)
    useEffect(() => {
        if (internalInit) {
            // 这个值不和internalInit绑定，和internalInit绑定的是demo已清除，这个值有多个信息源，用于专辑内搜索
            // 当它改变的时候internalInit不一定变，internalInit改变的时候它一定跟着变变
            setSongListInfo(internalInit)
        }
    }, [internalInit])

    // function getTime() {
    //     let time = 0
    //     internalInit?.items?.forEach((track: any) => {
    //         time += track.duration_ms
    //     })
    //     return Math.floor(time / 60000)
    // }

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
    return (
        // 修改后的代码
        <div className={`playlist ${searchParams.get('type') !== 'playlists' ? 'album-page' : ''}`}>
            <PlayListInfo
                demo={internalInit}
                songList={playList} // 移除条件处理，在组件内部处理差异
                songListInfo={songListInfo}
                setSongListInfo={setSongListInfo}
                searchParams={searchParams}
                setShowShade={setShowShade}
                setTowShow={setTowShow}
                twoShow={twoShow}
                setFirst={setFirst}
            />

            {/* 使用 key 确保组件在类型切换时完全重建 */}
            <TrackList
                key={`tracklist-${searchParams.get('type')}`}
                first={first}
                setFirst={setFirst}
                songListInfo={{ ...songListInfo, radio: playList?.tracks?.items[0]?.radio || [] }}
                songList={searchParams.get('type') === 'playlists' ? playList : playList}
            />

            {/* 合并条件渲染为一个组件，避免结构变化 */}
            <div className="extra-content">
                {searchParams.get('type') !== 'playlists' && (
                    <>
                        <div className="extra-info">
                            <div className="album-time"></div>
                            {playList?.release_date
                                ? (
                                        <div className="release-date" style={{ color: '#fff' }}>
                                            {t('发行于')}
                                            {playList?.release_date?.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1年$2月$3日')}
                                        </div>
                                    )
                                : ''}
                        </div>

                        <div className="more-by">
                            <div className="section-title">
                                {'More by '}
                                <Link to={`/artist?id=${playList?.artists?.[0]?.id || ''}`}>
                                    {playList?.artists?.[0]?.name || ''}
                                </Link>
                            </div>
                            <div>
                                <ArtistAlbum
                                    key={`artist-${playList?.artists?.[0]?.id}`}
                                    artist={playList?.artists?.[0]?.name || ''}
                                />
                            </div>
                        </div>
                    </>
                )}
            </div>

            <Shade
                style={{ display: showShade ? '' : 'none' }}
                name={playList?.name}
                description={playList?.description || '暂无描述'}
                setShowShade={setShowShade}
            />
        </div>
        // <div className={`playlist ${searchParams.get('type') !== 'playlists' ? 'album-page' : ''}`}>
        //     <PlayListInfo
        //         demo={internalInit}
        //         songList={searchParams.get('type') === 'albums' ? { ...playList, time: getTime() } : playList}
        //         songListInfo={songListInfo}
        //         setSongListInfo={setSongListInfo}
        //         searchParams={searchParams}
        //         setShowShade={setShowShade}
        //         setTowShow={setTowShow}
        //         twoShow={twoShow}
        //         setFirst={setFirst}
        //     >
        //     </PlayListInfo>
        //
        //     {searchParams.get('type') === 'playlists'
        //         ? (
        //                 <TrackList
        //                     first={first}
        //                     setFirst={setFirst}
        //                     songListInfo={songListInfo}
        //                     songList={playList}
        //                 >
        //                 </TrackList>
        //             )
        //         : (
        //                 <TrackList
        //                     first={first}
        //                     setFirst={setFirst}
        //                     songListInfo={songListInfo}
        //                     songList={{ ...playList, time: getTime() }}
        //                 >
        //                 </TrackList>
        //             )}
        //     {searchParams.get('type') === 'playlists'
        //         ? ''
        //         : (
        //                 <div
        //                     className="extra-info"
        //                 >
        //                     <div className="album-time"></div>
        //                     <div className="release-date" style={{ color: '#fff' }}>
        //                         {t('发行于')}
        //                         {playList?.release_date?.replace(/(\d{4})-(\d{2})-(\d{2})/, '$1年$2月$3日')}
        //                     </div>
        //                 </div>
        //             )}
        //     {searchParams.get('type') === 'playlists'
        //         ? ' '
        //         : (
        //                 <div className="more-by">
        //                     <div className="section-title">
        //                         {'More by '}
        //                         <Link to={`/artist?id=${playList?.artists ? playList?.artists[0]?.id : ''}`}>
        //                             {playList?.artists ? playList?.artists[0]?.name : ''}
        //                         </Link>
        //                     </div>
        //                     <div>
        //                         <ArtistAlbum artist={playList?.artists ? playList?.artists[0]?.name : ''}></ArtistAlbum>
        //                     </div>
        //                 </div>
        //             )}
        //     <Shade
        //         style={{ display: showShade ? '' : 'none' }}
        //         name={playList?.name}
        //         description={playList?.description ? playList?.description : '暂无描述'}
        //         setShowShade={setShowShade}
        //     >
        //     </Shade>
        // </div>
    )
}

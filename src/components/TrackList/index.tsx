import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { CountDemo, PlayingTrack } from '../../store/store.ts'
import { TrackListDemo } from './TrackListDemo'
import { TrackListItem } from './TrackListItem'
import './index.less'

export function TrackList(props: {
    songListInfo?: any
    tracks?: any[]
    itemKey?: string
    highlightPlayingTrack?: boolean
    extraContextMenuItem?: string[]
    songList?: any
    trackDemo?: any
    first?: boolean
    setFirst?: (arg0: boolean) => void
}) {
    const { songListInfo, songList, trackDemo, first, setFirst } = props
    const [playingTrack, setPlayingTrack] = useAtom(PlayingTrack)
    const [count] = useAtom(CountDemo)
    const [songFirst, setSongFirst] = useState(true)
    useEffect(() => {
        if (songListInfo) {
            setPlayingTrack(Array.from({ length: songListInfo?.items?.length }).fill(false))
        }
        else if (trackDemo) {
            setPlayingTrack(Array.from({ length: trackDemo?.items?.length }).fill(false))
        }
    }, [songListInfo, trackDemo])
    useEffect(() => {
        if (!first) {
            const demo = Array.from({ length: playingTrack.length }).fill(false)
            demo[count] = true
            setPlayingTrack(demo)
        }
    }, [count])
    console.log(songListInfo)
    return (
        <div className="track-list">
            <div>
                {songListInfo && songListInfo.items?.map((track: any, index: number) => {
                    return (
                        <TrackListItem
                            key={index}
                            songList={songList}
                            content={track}
                            playingTrack={playingTrack}
                            index={index}
                            setPlayingTrack={setPlayingTrack}
                            setFirst={setFirst}
                            radio={songListInfo?.radio}
                        >
                        </TrackListItem>
                    )
                })}
                {trackDemo && trackDemo.items?.map((track: any, index: number) => {
                    return (
                        <TrackListDemo
                            key={index}
                            content={track}
                            songList={trackDemo}
                            playingTrack={playingTrack}
                            index={index}
                            setPlayingTrack={setPlayingTrack}
                            songFirst={songFirst}
                            setSongFirst={setSongFirst}
                            radio={trackDemo?.radio}
                        >
                        </TrackListDemo>
                    )
                })}
            </div>
        </div>
    )
}

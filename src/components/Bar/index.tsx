import { useAtom } from 'jotai/index'
import React, { useEffect, useRef, useState } from 'react'
// import { useSeekToPosition } from '../../api/system.ts'
import { audioRefAtom } from '../../store/store' // 你需要创建对应的CSS文件
// import { StopUpdateBar } from '../../store/store' // 你需要创建对应的CSS文件
import './index.less'

interface PlayerState {
    progress: number
    currentTrackDuration: number
}

interface SliderProps {
    player: PlayerState
    setPlayer: (player: PlayerState) => void
    audioRef?: HTMLAudioElement | null
    lyrics?: boolean
}

export const CustomSlider: React.FC<SliderProps> = ({
    // player,
    // setPlayer,
    lyrics,
}) => {
    const [isDragging, setIsDragging] = useState(false)
    const [showTooltip, setShowTooltip] = useState(false)
    const sliderRef = useRef<HTMLDivElement>(null)
    // const [deviceId] = useAtom(Device)
    // const lastUpdateTimeRef = useRef(Date.now())
    // const { mutate: seekToPosition } = useSeekToPosition()
    const [audioRefDemo] = useAtom(audioRefAtom)
    const formatTrackTime = (value: number) => {
        return `${Math.floor(value / 60)}:${String(Math.floor(value % 60)).padStart(2, '0')}`
    }
    // const [, setStopUpdateBar] = useAtom(StopUpdateBar)
    const updateProgressFromClientX = (clientX: number) => {
        if (!sliderRef.current)
            return
        const rect = sliderRef.current.getBoundingClientRect()
        const sliderWidth = rect.width
        const offsetX = clientX - rect.left
        // 计算百分比位置
        let percentage = (offsetX / sliderWidth) * 100
        percentage = Math.max(0, Math.min(100, percentage))
        // 更新进度值
        // setPlayer({
        //     ...player,
        //     progress: percentage / 100 * player.currentTrackDuration,
        // })
        // return percentage / 100 * player.currentTrackDuration
        if (audioRefDemo) {
            audioRefDemo.currentTime = percentage / 100 * audioRefDemo.duration
        }
    }
    // const seekToPositionDemo = async (positionSec: number) => {
    //     if (!deviceId)
    //         return
    //     try {
    //         const positionMs = Math.floor(positionSec * 1000)
    //         setPlayer({
    //             ...player,
    //             progress: positionSec,
    //         })
    //         lastUpdateTimeRef.current = Date.now()
    //         seekToPosition({ positionMs, deviceId }, {
    //             onSuccess: () => {
    //                 console.log('Seek successful')
    //                 // 可以在这里更新本地播放状态或执行其他操作
    //             },
    //             onError: (error) => {
    //                 console.error('Failed to seek:', error)
    //                 // 错误处理
    //             },
    //         })
    //     }
    //     catch (error) {
    //         console.error('调整进度失败:', error)
    //     }
    // }

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging)
            return

        updateProgressFromClientX(e.clientX)
    }

    const handleMouseUp = (e: { clientX: number }) => {
        // const percentage = updateProgressFromClientX(e.clientX)
        // if (percentage) {
        // seekToPositionDemo(percentage).then()
        //     setTimeout(() => {
        //         setStopUpdateBar(false)
        //     }, 1000) // 延时1秒恢复更新
        // }
        setIsDragging(false)
        // 额外
        updateProgressFromClientX(e.clientX)
    }

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove)
            document.addEventListener('mouseup', handleMouseUp)
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove)
            document.removeEventListener('mouseup', handleMouseUp)
        }
    }, [isDragging])
    const [currentTime, setCurrentTime] = useState(0)

    useEffect(() => {
        if (audioRefDemo) {
            const handleTimeUpdate = () => {
                setCurrentTime(audioRefDemo.currentTime)
            }

            audioRefDemo.addEventListener('timeupdate', handleTimeUpdate)
            return () => {
                audioRefDemo.removeEventListener('timeupdate', handleTimeUpdate)
            }
        }
    }, [audioRefDemo])

    return (
        <div
            className="vue-slider vue-slider-ltr"
            style={{ padding: '6px 0', width: lyrics ? '80%' : 'auto', height: '2px' }}
            ref={sliderRef}
            onMouseDown={(e) => {
                // 防止拖动选中文本
                e.preventDefault()
                // if (!sliderRef.current)
                //     return
                // setStopUpdateBar(true)
                setIsDragging(true)
                updateProgressFromClientX(e.clientX)
            }}

        >
            <div className="vue-slider-rail">
                <div
                    className="vue-slider-process"
                    style={{
                        height: '100%',
                        top: '0px',
                        left: '0%',
                        // width: `${(player.progress / player.currentTrackDuration) * 100}%`,
                        width: `${audioRefDemo ? ((currentTime / audioRefDemo.duration) * 100) : 0}%`,
                        transitionProperty: 'width, left',
                        transitionDuration: '0s',
                    }}
                >
                </div>
                <div
                    className="vue-slider-dot vue-slider-dot-hover"
                    role="slider"
                    aria-valuenow={audioRefDemo ? ((currentTime / audioRefDemo.duration) * 100) : 0}
                    aria-valuemin={0}
                    aria-valuemax={100}
                    aria-orientation="horizontal"
                    tabIndex={0}
                    style={{
                        width: '12px',
                        height: '12px',
                        transform: 'translate(-50%, -50%)',
                        top: '50%',
                        left: `${audioRefDemo ? ((currentTime / audioRefDemo.duration) * 100) : 0}%`,
                        transition: isDragging ? 'none' : 'left 0s ease 0s',
                    }}
                    onMouseEnter={() => {
                        setShowTooltip(true)
                    }}
                    onMouseLeave={() => {
                        setShowTooltip(false)
                    }}
                >
                    <div className="vue-slider-dot-handle"></div>
                    {showTooltip && (
                        <div className="vue-slider-dot-tooltip ">
                            <div className="vue-slider-dot-tooltip-inner vue-slider-dot-tooltip-inner-top">
                                <span className="vue-slider-dot-tooltip-text">
                                    {formatTrackTime(audioRefDemo ? currentTime : 0)}
                                </span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

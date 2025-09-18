import { useAtom } from 'jotai/index'
import React, { useEffect, useRef, useState } from 'react'
import { audioRefAtom, Volume } from '../../store/store'
// 使用lodash的throttle函数
import '../Bar/index.less'

// 复用之前的CSS样式
interface VolumeSliderProps {
    min?: number
    max?: number
    interval?: number
}

export const VolumeSlider: React.FC<VolumeSliderProps> = ({
    min = 0,
    max = 1,
    interval = 0.01,
}) => {
    const [isDragging, setIsDragging] = useState(false)
    const sliderRef = useRef<HTMLDivElement>(null)
    // const getToken = () => localStorage.getItem('spotify_access_token') as string
    // const [deviceId] = useAtom(Device)
    const [audioRefDemo] = useAtom(audioRefAtom)
    const [volume, setVolume] = useAtom(Volume)
    // 计算百分比值，用于CSS显示
    const getPercentage = () => ((volume - min) / (max - min)) * 100
    const updateVolumeFromClientX = (clientX: number) => {
        if (!sliderRef.current)
            return

        const rect = sliderRef.current.getBoundingClientRect()
        const sliderWidth = rect.width
        const offsetX = clientX - rect.left

        // 计算百分比位置
        let percentage = (offsetX / sliderWidth)
        percentage = Math.max(0, Math.min(1, percentage))

        // 根据间隔计算实际值
        const rawValue = min + percentage * (max - min)
        const roundedValue = Math.round(rawValue / interval) * interval
        const finalValue = Math.max(min, Math.min(max, roundedValue))

        // 更新音量值
        setVolume(Number.parseFloat(finalValue.toFixed(2))) // 保留两位小数
    }
    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging)
            return
        updateVolumeFromClientX(e.clientX)
    }
    const handleMouseUp = () => {
        setIsDragging(false)
    }
    // const adjustVolume = async (volumeDecimal: number) => {
    //     if (!deviceId)
    //         return
    //     const safeVolumeDecimal = Math.max(0, Math.min(1, volumeDecimal))
    //     const volumePercent = Math.round(safeVolumeDecimal * 100)
    //     await fetch(`https://api.spotify.com/v1/me/player/volume?volume_percent=${volumePercent}&device_id=${deviceId}`, {
    //         method: 'PUT',
    //         headers: {
    //             Authorization: `Bearer ${getToken()}`,
    //         },
    //     })
    // }
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
    useEffect(() => {
        // adjustVolume(volume)
        if (audioRefDemo) {
            audioRefDemo.volume = volume
        }
    }, [volume])

    return (
        <div
            className="vue-slider vue-slider-ltr"
            style={{ padding: '6px 0', width: 'auto', height: '4px' }}
            ref={sliderRef}
            onMouseDown={(e) => {
                if (!sliderRef.current)
                    return

                setIsDragging(true)
                updateVolumeFromClientX(e.clientX)
            }}
        >
            <div className="vue-slider-rail">
                <div
                    id="volume-left"
                    className="vue-slider-process "
                    style={{
                        height: '100%',
                        top: '0px',
                        left: '0%',
                        width: `${getPercentage()}%`,
                        transitionProperty: 'width, left',
                        transitionDuration: '0s',
                    }}
                >
                </div>
                <div
                    className="vue-slider-dot"
                    role="slider"
                    aria-valuenow={volume}
                    aria-valuemin={min}
                    aria-valuemax={max}
                    aria-orientation="horizontal"
                    tabIndex={0}
                    style={{
                        width: '12px',
                        height: '12px',
                        transform: 'translate(-50%, -50%)',
                        top: '50%',
                        left: `${getPercentage()}%`,
                        transition: isDragging ? 'none' : 'left 0s ease 0s',
                    }}
                >
                    <div className="vue-slider-dot-handle"></div>
                    {/* 不显示tooltip */}
                </div>
            </div>
        </div>
    )
}

import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import LanguageSwitcher from '../../components/Language'
import { Active } from '../../store/store.ts'
import { SetActing } from './SetActing'
import { SetCache } from './SetCache'
import { SetCustomize } from './SetCustomize'
import { SetLikeMusic } from './SetLikeMusic'
import { SetLyrics } from './SetLyrics'
import { SetOther } from './SetOther'
import { SetQualityAndEquipment } from './SetQualityAndEquipment'
import { SetShortKey } from './SetShortKey'
import { SetStyle } from './SetStyle'
import { SetUnblockNeteaseMusic } from './SetUnblockNeteaseMusic'
import './index.less'

export default function Set() {
    const { t } = useTranslation()
    const [currentColor, setCurrentColor] = useState('auto')
    const [active, setActive] = useAtom(Active)
    useEffect(() => {
        const handleClearActive = () => {
            const demo = active.map((i: any) => {
                return {
                    ...i,
                    active: false,
                    allActive: false,
                }
            })
            setActive(demo)
        }
        document.addEventListener('click', handleClearActive)
        return () => document.removeEventListener('click', handleClearActive)
    }, [active])
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme-preference') || 'auto'
        setCurrentColor(savedTheme)
    }, [])
    return (
        <div className="settings-page">
            <div className="container">
                <div className="item">
                    <div className="left">
                        <div className="title">{t('语言')}</div>
                    </div>
                    <div className="right">
                        <LanguageSwitcher></LanguageSwitcher>
                    </div>
                </div>
                <SetStyle currentColor={currentColor} setCurrentColor={setCurrentColor}></SetStyle>
                <SetLikeMusic></SetLikeMusic>
                <SetQualityAndEquipment></SetQualityAndEquipment>
                <SetCache></SetCache>
                <SetLyrics></SetLyrics>
                <SetUnblockNeteaseMusic></SetUnblockNeteaseMusic>
                <SetCustomize></SetCustomize>
                <SetOther></SetOther>
                <SetActing></SetActing>
                <SetShortKey></SetShortKey>
                <div className="footer">
                    <p
                        className="author"
                    >
                        MADE BY
                        <a href="http://github.com/qier222" target="_blank">QIER222</a>
                    </p
                    >
                    <p className="version">v0.5</p>
                </div>
            </div>
        </div>
    )
}

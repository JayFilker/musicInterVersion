import { useAtom } from 'jotai/index'
import { useTranslation } from 'react-i18next'
import { SetDemo } from '../../../store/store.ts'

export function SetCustomize() {
    const { t } = useTranslation()
    const [setDemo, setSetDemo] = useAtom(SetDemo)
    return (
        <>
            <h3>
                {' '}
                {t('自定义')}
            </h3>
            <div className="item">
                <div className="left">
                    <div className="title">
                        {t('连接 Last.fm')}
                    </div
                    >
                </div>
                <div className="right">
                    <button
                        onClick={() => {
                            window.open('https://www.last.fm/login')
                        }}
                    >
                        {' '}
                        {t('授权连接')}
                    </button>
                </div>
            </div>
            <div className="item">
                <div className="left">
                    <div className="title">
                        {t('启用 Discord Rich Presence')}
                    </div
                    >
                </div>
                <div className="right">
                    <div className="toggle">
                        <input
                            id="enable-discord-rich-presence"
                            type="checkbox"
                            name="enable-discord-rich-presence"
                            checked={setDemo.useDiscord}
                            onChange={(e) => {
                                const value = { ...setDemo, useDiscord: e.target.checked }
                                setSetDemo(value)
                            }}
                        />
                        <label htmlFor="enable-discord-rich-presence"></label>
                    </div>
                </div>
            </div>
        </>
    )
}

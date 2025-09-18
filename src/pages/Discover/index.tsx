import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useLocation, useSearchParams } from 'react-router-dom'
import { useAlbumList } from '../../api/album.ts'
import { ButtonIconTwo } from '../../components/ButtonIconTwo'
import { SearchList } from '../../components/SearchList'
import { SvgIcon } from '../../components/SvgIcon'
import { AlbumList } from '../../store/store.ts'
import { searchKeyDemo, smallSearchKey, svg } from './discoverAdditional.tsx'
import './index.less'

export default function Discover() {
    const [searchParams] = useSearchParams()
    const [showSmallKey, setShowSmallKey] = useState(false)
    const [searchKey, setSearchKey] = useState(searchKeyDemo)
    const [albumList, setAlbumList] = useAtom<any>(AlbumList)
    const { t } = useTranslation()
    const [currentKey, setCurrentKey] = useState('\'\'')
    const [currentNumber, setCurrentNumber] = useState(0)
    const location = useLocation()
    const { data } = useAlbumList(currentKey === '推荐歌单' ? 'recommend' : currentKey, currentNumber)
    // console.log(data)
    useEffect(() => {
        if (currentNumber === 0) {
            setAlbumList(data)
        }
        else {
            if (data) {
                const updatedList = {
                    ...albumList, // 复制原始对象的所有属性
                    albums: {
                        ...albumList?.albums, // 复制albums对象的所有属性
                        items: [
                            ...albumList?.albums?.items, // 保留原有的items
                            ...data?.albums?.items, // 添加新的items
                        ],
                    },
                }
                setAlbumList(updatedList)
            }
        }
    }, [data, currentNumber])

    useEffect(() => {
        const keyFromUrl = searchParams.get('key')
        if (keyFromUrl && searchKey.includes(keyFromUrl)) {
            setShowSmallKey(false)
            document.querySelectorAll('.button.active').forEach((el) => {
                el.classList.remove('active')
            })
            setCurrentNumber(0)
            setCurrentKey(keyFromUrl)
            const index = searchKey.findIndex(item => item === keyFromUrl)
            const buttons = document.querySelectorAll('.buttons>.button')
            if (buttons[index]) {
                buttons[index].classList.add('active')
            }
        }
        else {
            setCurrentNumber(0)
            setCurrentKey('\'\'')
        }
    }, [location])
    return (
        <div className="explore-page">
            <h1>{t('发现')}</h1>
            <div className="buttons">
                {searchKey.map((key: string, index: number) => (
                    <div
                        className={`button ${key === '全部' ? 'active' : ''}`}
                        key={index}
                        onClick={(e) => {
                            setShowSmallKey(false)
                            if (e.currentTarget.classList.contains('active')) {
                                e.currentTarget.classList.remove('active')
                            }
                            else {
                                document.querySelectorAll('.button.active').forEach((el) => {
                                    el.classList.remove('active')
                                })

                                e.currentTarget.classList.add('active')
                                const buttonContent = e.currentTarget.textContent as string
                                if (buttonContent !== '全部') {
                                    setCurrentNumber(0)
                                    setCurrentKey(buttonContent)
                                }
                                else {
                                    setCurrentNumber(0)
                                    setCurrentKey('\'\'')
                                }
                            }
                        }}
                    >
                        {key}
                    </div>
                ))}
                <div className="button more" onClick={() => setShowSmallKey(!showSmallKey)}>
                    <SvgIcon>
                        {svg}
                    </SvgIcon>
                </div>
            </div>
            <div className="panel" style={{ display: showSmallKey ? '' : 'none' }}>
                {smallSearchKey.map((key, index: number) => {
                    return (
                        <div className="big-cat" key={index}>
                            <div className="name">{key.mainType}</div>

                            <div className="cats">
                                {key.content.map((content, index) => {
                                    return (
                                        <div
                                            className={`cat ${searchKey.includes(content) ? 'active' : ''}`}
                                            key={index}
                                            onClick={(e) => {
                                                if (e.currentTarget.classList.contains('active')) {
                                                    e.currentTarget.classList.remove('active')
                                                    setSearchKey(searchKey.filter((key: string) => key !== content))
                                                }
                                                else {
                                                    setSearchKey([...searchKey, content])
                                                    e.currentTarget.classList.add('active')
                                                }
                                            }}
                                        >
                                            <span>{content}</span>
                                        </div>
                                    )
                                })}
                            </div>

                        </div>
                    )
                })}
            </div>

            <div className="playlists">
                <SearchList
                    songList={albumList?.albums?.items}
                >
                </SearchList>
            </div>
            <div className="load-more">
                <ButtonIconTwo
                    color="grey"
                    style={{ borderRadius: '8px', padding: '8px 16px', width: 'auto' }}
                    onClick={() => {
                        const newOffset = currentNumber + 50
                        setCurrentNumber(newOffset)
                    }}
                >
                    {t('加载更多')}
                </ButtonIconTwo>
            </div>
        </div>
    )
}

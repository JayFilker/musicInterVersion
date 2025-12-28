import { atom } from 'jotai'

interface Song {
    title: string
    artist: string[]
    imgPic: string
    song: string
    from: string
}

export const SongList = atom<Array<Song>>([{
    title: 'Song 1',
    artist: ['Artist 1', 'ddd'],
    imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
    song: '/music/song2.mp3',
    from: 'The Band CAMINO',
}, {
    title: 'Song 2',
    artist: ['Artist 1', 'fff'],
    imgPic: 'https://bpic.588ku.com/element_origin_min_pic/23/07/11/d32dabe266d10da8b21bd640a2e9b611.jpg!r650',
    song: '/music/song3.mp3',
    from: 'The Band CAMINO',
}])

export const FirstPlay = atom<boolean>(true)

export const Playing = atom<Array<boolean>>([])

export const AlbumList = atom<any>()

export const CurrentSongList = atom<any>({})

export const CountDemo = atom(0)
export const BadLike = atom(false)
export const IsPlayingDemo = atom(false)
export const IsPlayingDemoTwo = atom(false)
export const Link = atom(false)
export const Device = atom('')

export const PlayerDemo = atom({
    progress: 0,
    currentTrackDuration: 100,
})
export const MusicList = atom<any>([true, true, true, true])

export const PlayingTrack = atom(Array.from({ length: 100 }).fill(false))
export const StopUpdateBar = atom(false)

export const SetDemo = atom({
    linkMusic: 'all',
    soundQuality: '1128000',
    equipment: 'default',
    cache: true,
    limit: '',
    showTranslate: true,
    showBackGround: 'true',
    currentTime: false,
    songFontSize: '28',
    useUnblock: true,
    searchModel: 'fast-first',
    closeTime: 'ask',
    proxy: 'noProxy',
    alternativeAudioSource: '',
    useFlac: false,
    rightOne: '',
    rightTwo: '',
    rightThree: '',
    rightFour: '',
    useDiscord: false,
    showMusicK: true,
    showApple: true,
    alias: false,
    flashback: false,
    entertainment: false,
    address: '',
    port: '',
    shortcutKey: false,
})

export const Active = atom([{
    function: '播放/暂停',
    shortKey: 'Control + P',
    allShortKey: 'Alt + Control + P',
    active: false,
    allActive: false,
}, {
    function: '下一首',
    shortKey: 'Control + →',
    allShortKey: 'Alt + Control + →',
    active: false,
    allActive: false,
}, {
    function: '上一首',
    shortKey: 'Control + ←',
    allShortKey: 'Alt + Control + →',
    active: false,
    allActive: false,
}, {
    function: '增加音量',
    shortKey: 'Control + ↑',
    allShortKey: 'Alt + Control + →',
    active: false,
    allActive: false,
}, {
    function: '减少音量',
    shortKey: 'Control + ↓',
    allShortKey: 'Alt + Control + →',
    active: false,
    allActive: false,
}, {
    function: '喜欢歌曲',
    shortKey: 'Control + L',
    allShortKey: 'Alt + Control + →',
    active: false,
    allActive: false,
}, {
    function: '隐藏/显示播放器',
    shortKey: 'Control + M',
    allShortKey: 'Alt + Control + →',
    active: false,
    allActive: false,
}])

export const TemporaryVolume = atom(0)
export const Volume = atom(0.7)
export const ShowLyrics = atom(false)
export const IdDemo = atom<any>()
export const PlayCountDemo = atom<any>()
export const ImgDemo = atom<any>()
export const PlayDemo = atom<any>()
export const CheckDemo = atom<any>(false)
export const navigationRequestAtom = atom<any>({ path: null, action: null })
export const personMusic = atom<any>()
export const audioRefAtom = atom<HTMLAudioElement | null>(null)
export const arePlayAtom = atom<boolean>(false)
export const radioList = atom<Array<any>>(['https://music-vue-1395414804.cos.ap-guangzhou.myqcloud.com/001.mp3'])
export const radioListDemo = atom<string>('https://music-vue-1395414804.cos.ap-guangzhou.myqcloud.com/001.mp3')

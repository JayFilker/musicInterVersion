import { useAtom } from 'jotai/index'
import { useEffect, useRef } from 'react'
import { audioRefAtom, radioListDemo } from '../../store/store.ts'

export function GlobalAudio() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [radioListDemoOne] = useAtom(radioListDemo)
    const [, setAudioRef] = useAtom(audioRefAtom)
    // const [personMusicDemo] = useAtom(personMusic)

    useEffect(() => {
        if (audioRef.current) {
            setAudioRef(audioRef.current)
        }
    }, [setAudioRef])
    return (
        <audio
            ref={audioRef}
            // src={personMusicDemo}
            src={radioListDemoOne}
        />
    )
}

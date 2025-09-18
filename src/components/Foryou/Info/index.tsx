export function Info(props: any) {
    const { randomAlbum } = props
    return (
        <div className="info">
            <div className="title">{randomAlbum?.albums?.items[0].name}</div>
            <div className="artist">
                <span
                    className="artist-in-line"
                >
                    <span>
                        {randomAlbum?.albums?.items[0].artists.map((artist: any, index: number) => {
                            if (index < randomAlbum?.albums?.items[0].artists.length - 1) {
                                return (
                                    <>
                                        <a
                                            href={`/artist?id=${artist.id}`}
                                            id="info-span"
                                            key={artist.id}
                                        >
                                            {artist.name}
                                        </a>
                                        <span>，</span>
                                    </>
                                )
                            }
                            else {
                                return (
                                    <a
                                        href={`/artist?id=${artist.id}`}
                                        id="info-span"
                                        key={artist.id}
                                    >
                                        {artist.name}
                                    </a>
                                )
                            }
                        })}
                    </span>
                </span>
            </div>
        </div>
    )
}

import React, { useState, useRef } from 'react'

type PodcastPlayerProps = {
  src: string
}

export function PodcastPlayer({ src }: PodcastPlayerProps): JSX.Element {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  function handlePlay() {
    setIsPlaying(true)
    audioRef.current?.play()
  }

  function handlePause() {
    setIsPlaying(false)
    audioRef.current?.pause()
  }

  return (
    <div>
      {isPlaying ? (
        <button onClick={handlePause}>Pause</button>
      ) : (
        <button onClick={handlePlay}>Play</button>
      )}
      <audio ref={audioRef} src={src} />
    </div>
  )
}

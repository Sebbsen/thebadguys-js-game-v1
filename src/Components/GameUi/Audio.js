import React, { useState, useEffect, useRef } from 'react';

export const Audio = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isEnterPressed, setIsEnterPressed] = useState(false);
  const audioRef = useRef(null);

  const initAudio = () => {
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2;
    audioRef.current.play();
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && !isEnterPressed) {
        setIsEnterPressed(true);
        initAudio();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isEnterPressed]);

  const handleMute = () => {
    const audios = document.querySelectorAll('#audio-component audio');
    audios.forEach(audio => {
      audio.muted = !isMuted;
    });
    setIsMuted(!isMuted);
  };

  return (
    <div id="audio-component" style={{
      position: 'fixed',
      top: '10px',
      right: '10px',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundImage: 'url(path-to-your-image)',
      backgroundSize: 'cover',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      cursor: 'pointer',
      pointerEvents: 'auto',
    }} onClick={handleMute}>
      <audio ref={audioRef} src="./audio/bg_music.mp3" />
      {/* Add more audio tags as needed */}
    </div>
  );
};
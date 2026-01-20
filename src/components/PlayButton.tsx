"use client";

export function PlayButton() {
  const handlePlay = () => {
    window.open("/game.html", "_blank");
  };

  return (
    <button 
      className="hunt-button w-full font-orbitron"
      onClick={handlePlay}
    >
      🎮 PLAY FULLSCREEN
    </button>
  );
}

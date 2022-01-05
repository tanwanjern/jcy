import './styles/App.scss';
import "tailwindcss/tailwind.css"

import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import HomeCookin from './assets/audio/homecookin.mp3';
import WindowTimer from './components/WindowTimer';
import isPlayingState from './state/isPlayingState';
import timerState from './state/timerState';
// import animationTimerState from './state/animationTimerState';

function App() {

  const [audio] = useState(new Audio(HomeCookin));
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [timer, setTimer] = useRecoilState(timerState);
  // const [animationTimer, setAnimationTimer] = useRecoilState(animationTimerState);

  useEffect(()=>{
    if(isPlaying){
      audio.play()
      const counter = timer < audio.duration && setInterval(() => setTimer(timer + 1), 1000);

      // TODO: Move window with smooth animation...
      // https://javascript.info/js-animation
      // https://stackoverflow.com/questions/5605588/how-to-use-requestanimationframe
      // const animationCounter = setInterval(() => setAnimationTimer(animationTimer + 1), 100);
      
      return () => {
        clearInterval(counter)
        // clearInterval(animationCounter)
      };
    } else {
      audio.pause();
    }
  }, [timer, isPlaying])

  useEffect(()=>{
    audio.addEventListener('ended', () => setIsPlaying(false));
    return () => {
      audio.removeEventListener('ended', () => setIsPlaying(false));
    };
  },[])

  function resetAudio(){
    setTimer(0);
    audio.currentTime = 0;
  }

  return (
    <div className="">
      <button onClick={()=>setIsPlaying(prev=>!prev)} className="px-4 py-2 bg-green-300">{isPlaying ? 'Pause':'Play'}</button>
      <button onClick={()=>resetAudio()} className="px-4 py-2 bg-red-300">Reset</button>

      Time: {timer} 

      {isPlaying && 
        <WindowTimer />
      }

    </div>
  );
}

export default App;

// https://stackoverflow.com/questions/47686345/playing-sound-in-react-js
// https://www.youtube.com/watch?v=Xx7lJt_Pdek&t=33s
// https://stackoverflow.com/questions/23858214/move-object-around-circle-javascript/23859635
// https://stackoverflow.com/questions/9614109/how-to-calculate-an-angle-from-points

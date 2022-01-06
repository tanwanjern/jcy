import './styles/App.scss';
import "tailwindcss/tailwind.css"

import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import HomeCookin from './assets/audio/homecookin.mp3';

import isPlayingState from './states/isPlayingState';
import timerState from './states/timerState';

import WindowTest from './components/WindowTest';
import WindowTimer from './components/WindowTimer';
import WindowTest2 from './components/WindowTest2';

function App() {

  const [audio] = useState(new Audio(HomeCookin));
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [timer, setTimer] = useRecoilState(timerState);

  useEffect(()=>{
    if(isPlaying){
      audio.play()
      const counter = timer < audio.duration && setInterval(() => setTimer(timer + 1), 1000);

      return () => {
        clearInterval(counter)
      };
    } else {
      audio.pause();
      resetAudio();
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
    <div className="w-full h-screen">
      <div className="w-full h-full flex flex-col items-center justify-center">
        <h1 className="text-xl font-bold">家常音樂（window popup特效實驗）</h1>
        <p className="mb-3 text-gray-600">提醒：請檢查browser pop up的設置</p>
        <button onClick={()=>setIsPlaying(prev=>!prev)} className={`w-24 px-4 py-2 rounded-lg ${isPlaying ? 'bg-red-300':'bg-green-300'}`}>{isPlaying ? 'Pause':'Play'}</button>
        {/* <button onClick={()=>resetAudio()} className="w-24 px-4 py-2 bg-red-300 mb-1">Reset</button> */}
      </div>

      {isPlaying && 
        <>
          <WindowTimer/>
          {/* <WindowTest/> */}
          <WindowTest2/>
        </>
      }

    </div>
  );
}

export default App;

// https://stackoverflow.com/questions/47686345/playing-sound-in-react-js
// https://www.youtube.com/watch?v=Xx7lJt_Pdek&t=33s
// https://stackoverflow.com/questions/23858214/move-object-around-circle-javascript/23859635
// https://stackoverflow.com/questions/9614109/how-to-calculate-an-angle-from-points
// TODO: Move window with smooth animation...
// https://javascript.info/js-animation
// https://stackoverflow.com/questions/5605588/how-to-use-requestanimationframe
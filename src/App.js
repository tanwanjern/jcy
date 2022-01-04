import './styles/App.scss';
import "tailwindcss/tailwind.css"

import NewWindow from './components/NewWindow';
import { useState, useRef, useEffect } from 'react';
import HomeCookin from './assets/audio/homecookin.mp3';

function App() {

  const [openWindow1, setOpenWindow1] = useState(false);
  const [increment, setIncrement] = useState(1);

  // https://stackoverflow.com/questions/47686345/playing-sound-in-react-js
  const [isPlaying, setIsPlaying] = useState(false);
  const [timer, setTimer] = useState(0);
  const [audio] = useState(new Audio(HomeCookin));

  useEffect(()=>{
    if(isPlaying){
      audio.play()
      const counter = timer < audio.duration && setInterval(() => setTimer(timer + 1), 1000);
      
      setOpenWindow1(timer > 3 && timer < 8)
  
      return () => clearInterval(counter);
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

  return (
    <div className="">
      {/* <button onClick={()=>setOpenWindow(prev=>!prev)} className="px-4 py-2 bg-blue-300">test {openWindow ? 'true':'false'}</button> */}
      {/* <button onClick={()=>setIncrement(prev=>prev+1)} className="px-4 py-2 bg-blue-500">inc</button> */}

      <button onClick={()=>setIsPlaying(prev=>!prev)} className="px-4 py-2 bg-red-300">play {isPlaying ? 'true':'false'}</button>

      Time: {timer}

      {isPlaying && openWindow1 && 
        <NewWindow 
          title={"test "+increment}
          features={`
            width=600,
            height=400,
            left=0,
            top=0`
          }
          moveTo={[10*increment, 10*increment]}
          onUnload={(bool)=>setOpenWindow1(bool)}
        >
          Hi 👋 {increment}
        </NewWindow>
      }
    </div>
  );
}

export default App;

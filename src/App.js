import './styles/App.scss';
import "tailwindcss/tailwind.css"

// import NewWindow from 'react-new-window'
import NewWindow from './components/NewWindow';
import { useState, useRef, useEffect } from 'react';

function App() {

  const [openWindow, setOpenWindow] = useState(false);
  const [inc, setInc] = useState(0);

  return (
    <div className="">
      <p className="text-yellow-800">Testing</p>
      <button onClick={()=>setOpenWindow(prev=>!prev)} className="px-4 py-2 bg-blue-300">test {openWindow ? 'true':'false'}</button>
      <button onClick={()=>setInc(prev=>prev+1)} className="px-4 py-2 bg-blue-500">inc</button>

      {openWindow && 
        <NewWindow 
          title={"test "+inc}
          moveTo={[10*inc, 10*inc]}
          onUnload={(bool)=>setOpenWindow(bool)}
        >
          Hi 👋 {inc}
        </NewWindow>
      }
    </div>
  );
}

export default App;

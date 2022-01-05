import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import NewWindow from './NewWindow';
import windowTimerState from '../state/ui/windowTimerState';
import timerState from '../state/timerState';
// import animationTimerState from '../state/animationTimerState';

const WindowTimer = ({children}) => {

    const [openWindowTimer, setOpenWindowTimer] = useRecoilState(windowTimerState);
    const timer = useRecoilValue(timerState);

    const [xy, setXy] = useState([0, 0]);
    const [dxy, setDxy] = useState([10, 10]);

    useEffect(()=>{
        setOpenWindowTimer(timer > 2 && timer < 10)
    }, [timer])

    useEffect(()=>{
        
        const animationCounter = openWindowTimer && setInterval(() => { animate(); }, 100);

        function animate(){
            setXy(prev=>[prev[0]+dxy[0], prev[1]+dxy[1]]); 
        }

        return () => {
            clearInterval(animationCounter)
        };
    },[openWindowTimer])

    useEffect(()=>{
        console.log(xy[0], xy[1]);
        // if ((x+dx > (screen.availWidth - 200)) || (x+dx < 0)){
        //     setDx(prev=>-prev)
        // }
        // if ((y+dy > (screen.availHeight - 200)) || (y+dy < 0)){
        //     setDy(prev=>-prev)
        // }
    },[xy, dxy])
    

    return openWindowTimer && (
        <NewWindow 
            title={"test "}
            features={`
                width=200,
                height=200,
                left=0,
                top=0`
            }
            // moveBy={[xy[0], xy[1]]}
            moveTo={[xy[0], xy[1]]}
            // onUnload={(bool)=>{console.log(bool); setOpenWindowTimer(bool);}}
        >
            Hi 👋 
            {children}
        </NewWindow>
    );
};

// http://www.java2s.com/Code/JavaScript/Window-Browser/Popupwindowanimationflyacrossscreen.htm

// function angle(originX, originY, targetX, targetY) {
//     var dx = originX - targetX;
//     var dy = originY - targetY;
    
//     // var theta = Math.atan2(dy, dx);  // [0, Ⲡ] then [-Ⲡ, 0]; clockwise; 0° = west
//     // theta *= 180 / Math.PI;          // [0, 180] then [-180, 0]; clockwise; 0° = west
//     // if (theta < 0) theta += 360;     // [0, 360]; clockwise; 0° = west
    
//     // var theta = Math.atan2(-dy, dx); // [0, Ⲡ] then [-Ⲡ, 0]; anticlockwise; 0° = west
//     // theta *= 180 / Math.PI;          // [0, 180] then [-180, 0]; anticlockwise; 0° = west
//     // if (theta < 0) theta += 360;     // [0, 360]; anticlockwise; 0° = west
    
//     // var theta = Math.atan2(dy, -dx); // [0, Ⲡ] then [-Ⲡ, 0]; anticlockwise; 0° = east
//     // theta *= 180 / Math.PI;          // [0, 180] then [-180, 0]; anticlockwise; 0° = east
//     // if (theta < 0) theta += 360;     // [0, 360]; anticlockwise; 0° = east
    
//     var theta = Math.atan2(-dy, -dx); // [0, Ⲡ] then [-Ⲡ, 0]; clockwise; 0° = east
//     theta *= 180 / Math.PI;           // [0, 180] then [-180, 0]; clockwise; 0° = east
//     if (theta < 0) theta += 360;      // [0, 360]; clockwise; 0° = east
    
//     return theta;
// }

export default WindowTimer;


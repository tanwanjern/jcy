import { useState, useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import NewWindow from './NewWindow';
import windowTimerState from '../state/ui/windowTimerState';
import timerState from '../state/timerState';
import animationTimerState from '../state/animationTimerState';

const WindowTimer = ({children}) => {

    const [openWindowTimer, setOpenWindowTimer] = useRecoilState(windowTimerState);
    const timer = useRecoilValue(timerState);
    const animationTimer = useRecoilValue(animationTimerState);

    useEffect(()=>{
        setOpenWindowTimer(timer > 2 && timer < 10)
    }, [timer])

    return openWindowTimer && (
        <NewWindow 
            title={"test "}
            features={`
                width=600,
                height=200,
                left=0,
                top=0`
            }
            moveBy={[animationTimer, 0]}
            // onUnload={(bool)=>{console.log(bool); setOpenWindowTimer(bool);}}
        >
            Hi 👋 {animationTimer}
            {children}
        </NewWindow>
    );
};

function angle(originX, originY, targetX, targetY) {
    var dx = originX - targetX;
    var dy = originY - targetY;
    
    // var theta = Math.atan2(dy, dx);  // [0, Ⲡ] then [-Ⲡ, 0]; clockwise; 0° = west
    // theta *= 180 / Math.PI;          // [0, 180] then [-180, 0]; clockwise; 0° = west
    // if (theta < 0) theta += 360;     // [0, 360]; clockwise; 0° = west
    
    // var theta = Math.atan2(-dy, dx); // [0, Ⲡ] then [-Ⲡ, 0]; anticlockwise; 0° = west
    // theta *= 180 / Math.PI;          // [0, 180] then [-180, 0]; anticlockwise; 0° = west
    // if (theta < 0) theta += 360;     // [0, 360]; anticlockwise; 0° = west
    
    // var theta = Math.atan2(dy, -dx); // [0, Ⲡ] then [-Ⲡ, 0]; anticlockwise; 0° = east
    // theta *= 180 / Math.PI;          // [0, 180] then [-180, 0]; anticlockwise; 0° = east
    // if (theta < 0) theta += 360;     // [0, 360]; anticlockwise; 0° = east
    
    var theta = Math.atan2(-dy, -dx); // [0, Ⲡ] then [-Ⲡ, 0]; clockwise; 0° = east
    theta *= 180 / Math.PI;           // [0, 180] then [-180, 0]; clockwise; 0° = east
    if (theta < 0) theta += 360;      // [0, 360]; clockwise; 0° = east
    
    return theta;
}

export default WindowTimer;


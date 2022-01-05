import { useState, useRef, useEffect } from 'react';
import { createPortal } from "react-dom";
import { useRecoilState } from 'recoil';
import NewWindow from './NewWindow';
import windowTimerState from '../state/ui/windowTimerState';

const WindowTimer = ({children, increment, setWindow}) => {

    const [openWindowTimer, setOpenWindowTimer] = useRecoilState(windowTimerState);

    return (
        <NewWindow 
            title={"test "}
            features={`
                width=600,
                height=400,
                left=0,
                top=0`
            }
            moveTo={[10, 10]}
            onUnload={(bool)=>setOpenWindowTimer(bool)}
        >
            Hi 👋 {increment}
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


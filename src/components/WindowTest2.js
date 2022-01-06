import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import NewWindow from './NewWindow';
import timerState from '../states/timerState';
import useWindowDimensions from '../hooks/useWindowDimensions';

const WindowTest2 = ({children}) => {

    // Resize window sample

    const [openWindow, setOpenWindow] = useState(0);
    const timer = useRecoilValue(timerState);

    const [windowWidth, setWindowWidth] = useState(800);
    const [windowHeight, setWindowHeight] = useState(200);
    // const [xy, setXy] = useState([Math.sin(0), Math.sin(0)]);
    const [dxy, setDxy] = useState([-1, 1]);

    const { height, width } = useWindowDimensions();

    useEffect(()=>{
        setOpenWindow(timer >= 2 && timer <= 10)
    }, [timer])

    useEffect(()=>{
        
        const animationCounter1 = openWindow && timer <= 5 && setInterval(() => { animate1(); }, 24);

        function animate1(){
            setWindowWidth(prev=>prev+dxy[0])
            setWindowHeight(prev=>prev+dxy[1])
        }

        // const animationCounter2 = openWindow && timer > 5 && setInterval(() => { animate2(); }, 24);

        // function animate2(){
        //     setWindowHeight(prev=>prev+dxy[1])
        // }

        return () => {
            clearInterval(animationCounter1)
            // clearInterval(animationCounter2)
        };
    },[openWindow, timer])
    
    return openWindow && (
        <NewWindow 
            title={"Test"}
            features={`
                width=${windowWidth},
                height=${windowHeight},
                left=${(width/2)-(windowWidth/2)},
                top=${(height/2)-(windowHeight/2)}`
            }
            resizeTo={[windowWidth, windowHeight]}
            moveTo={[(width/2)-(windowWidth/2), (height/2)-(windowHeight/2)]}
            // onUnload={(bool)=>{console.log(bool); setOpenWindowTimer(bool);}}
        >
            Hi 👋 I will only show between 2 and 10 seconds
        </NewWindow>
    );
};

export default WindowTest2;

// https://www.smashingmagazine.com/2011/10/quick-look-math-animations-javascript/
// http://www.java2s.com/Code/JavaScript/Window-Browser/Popupwindowanimationflyacrossscreen.htm

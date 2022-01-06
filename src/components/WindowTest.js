import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import NewWindow from './NewWindow';
import timerState from '../states/timerState';
import useWindowDimensions from '../hooks/useWindowDimensions';

const WindowTest = ({children}) => {

    // Moving window sample

    const [openWindow, setOpenWindow] = useState(0);
    const timer = useRecoilValue(timerState);

    const [xy, setXy] = useState([Math.sin(0), Math.sin(0)]);
    const [dxy, setDxy] = useState([1, 1]);

    const { height, width } = useWindowDimensions();

    useEffect(()=>{
        setOpenWindow(timer >= 2 && timer <= 10)

        // TODO: Bounce, rotate, resize effect

        // if ((xy[0]+dxy[0] > (width - 200)) || (xy[0]+dxy[0] < 0)){
        //     setDxy(prev=>[-dxy[0], dxy[1]])
        //     console.log('change neg x '+dxy[0])
        // }
        // if ((xy[1]+dxy[1] > (height - 200)) || (xy[1]+dxy[1] < 0)){
        //     setDxy(prev=>[dxy[0], -dxy[1]])
        //     console.log('change neg y '+dxy[1])
        // }
    }, [timer])

    useEffect(()=>{
        
        const animationCounter = openWindow && setInterval(() => { animate(); }, 24);

        function animate(){
            setXy(prev=>[prev[1]+dxy[0], prev[1]+dxy[1]]); 
        }

        return () => {
            clearInterval(animationCounter)
        };
    },[openWindow])

    useEffect(()=>{
        // console.log(xy[0], xy[1]);
        
    },[xy, dxy])
    

    return openWindow && (
        <NewWindow 
            title={"Test"}
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
            Hi 👋 I will only show between 2 and 10 seconds
        </NewWindow>
    );
};

export default WindowTest;

// https://www.smashingmagazine.com/2011/10/quick-look-math-animations-javascript/
// http://www.java2s.com/Code/JavaScript/Window-Browser/Popupwindowanimationflyacrossscreen.htm

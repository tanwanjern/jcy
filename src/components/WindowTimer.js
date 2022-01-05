import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import NewWindow from './NewWindow';
import timerState from '../states/timerState';
import useWindowDimensions from '../hooks/useWindowDimensions';

const WindowTimer = ({children}) => {

    const [openWindow, setOpenWindow] = useState(0);
    const timer = useRecoilValue(timerState);
    const { height, width } = useWindowDimensions();

    useEffect(()=>{
        setOpenWindow(timer >= 0 && timer < 257)
    }, [timer])

    return openWindow && (
        <NewWindow 
            title={"Timer"}
            features={`
                width=200,
                height=200,
                left=0,
                top=${height}`
            }
        >
            Time: {timer}
        </NewWindow>
    );
};

export default WindowTimer;
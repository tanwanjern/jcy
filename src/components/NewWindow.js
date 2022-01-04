import { useState, useRef, useEffect } from 'react';
import { createPortal } from "react-dom";

const NewWindow = ({
    children, 
    title,
    features,
    moveTo,
    onUnload
}) => {

    const [container, setContainer] = useState(null);
    const newWindow = useRef(window);

    // https://github.com/rmariuzzo/react-new-window/blob/master/src/NewWindow.js
    // https://thewebdev.info/2021/10/03/how-to-open-a-component-in-new-window-on-a-click-in-react/

    useEffect(() => {
        const div = document.createElement("div");
        setContainer(div);
    }, []);

    useEffect(() => {
        if (container) {
            newWindow.current = window.open("", title, features);
            newWindow.current.document.body.appendChild(container);
            newWindow.current.document.title = title;
            const curWindow = newWindow.current;

            const windowCheckerInterval = setInterval(() => {
                if (!newWindow.current || newWindow.current.closed) {
                    onUnload(false)
                }
                console.log('window active')
            }, 50);

            newWindow.current.addEventListener('beforeunload', () => {
                onUnload(false);
                clearInterval(windowCheckerInterval)
            })

            return () => curWindow.close();
        }
    }, [container]);

    useEffect(()=>{
        if(newWindow.current){
            newWindow.current.moveTo(moveTo[0], moveTo[1])
        }
        // console.log(moveTo[0], moveTo[1]);
    }, [moveTo])

   
    return container && createPortal(children, container);
};


export default NewWindow;
import { useState, useRef, useEffect } from 'react';
import { createPortal } from "react-dom";

const NewWindow = ({
    children, 
    title,
    features,
    moveTo,
    moveBy,
    resizeTo,
    resizeBy,
    onUnload
}) => {

    const [container, setContainer] = useState(null);
    const newWindow = useRef(window);

    useEffect(() => {
        const div = document.createElement("div");
        setContainer(div);
    }, []);

    useEffect(() => {
        if (container) {
            newWindow.current = window.open("", title, features);

            if(newWindow.current){
                newWindow.current.document.body.appendChild(container);
                newWindow.current.document.title = title;

                const curWindow = newWindow.current;
    
                const windowCheckerInterval = setInterval(() => {
                    if (!newWindow.current || newWindow.current.closed) {
                        onUnload && onUnload(false)
                    }
                    // console.log('window active')
                }, 50);
    
                newWindow.current.addEventListener('beforeunload', () => {
                    onUnload && onUnload(false);
                    clearInterval(windowCheckerInterval)
                })
    
                return () => curWindow.close();
            }
        }
    }, [container]);

    useEffect(()=>{
        if(newWindow.current && moveBy){
            newWindow.current.moveBy(moveBy[0], moveBy[1])
            newWindow.current.focus();
        }
    }, [moveBy])

    useEffect(()=>{
        if(newWindow.current && moveTo){
            newWindow.current.moveTo(moveTo[0], moveTo[1])
        }
    }, [moveTo])

    useEffect(()=>{
        if(newWindow.current && resizeBy){
            newWindow.current.resizeBy(resizeBy[0], resizeBy[1])
        }
    }, [resizeBy])

    useEffect(()=>{
        if(newWindow.current && resizeTo){
            newWindow.current.resizeTo(resizeTo[0], resizeTo[1])
        }
    }, [resizeTo])
   
    return container && createPortal(children, container);
};


export default NewWindow;

// https://github.com/rmariuzzo/react-new-window/blob/master/src/NewWindow.js
// https://thewebdev.info/2021/10/03/how-to-open-a-component-in-new-window-on-a-click-in-react/
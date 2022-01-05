import {atom} from 'recoil';

const animationTimerState = atom({
    key: 'animationTimerState',
    default: 0,
});

export default animationTimerState;

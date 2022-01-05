import {atom} from 'recoil';

const timerState = atom({
    key: 'timerState',
    default: 0,
});

export default timerState;

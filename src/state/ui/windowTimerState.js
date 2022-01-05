import {atom} from 'recoil';

const windowTimerState = atom({
    key: 'windowTimerState',
    default: false,
});

export default windowTimerState;

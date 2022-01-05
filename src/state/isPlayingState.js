import {atom} from 'recoil';

const isPlayingState = atom({
    key: 'isPlayingState',
    default: false,
});

export default isPlayingState;

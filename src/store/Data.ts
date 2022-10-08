import { createAction } from '@reduxjs/toolkit';
import { StoreStateDataType } from '../types/store';
import Utils from '../core/Utils';

// types
const GET_STATE = 'data/GET_STATE';
const SET_STATE = 'data/SET_STATE';

// actions
export const getState = createAction<{
    getState: any;
}>(GET_STATE);

export const setState = createAction<{
    [key: string]: any;
}>(SET_STATE);

// state
export const initialDataState: StoreStateDataType = {
    sysdate: Utils.sysdate(new Date()),
    systime: Utils.systime(new Date()),
    isMobile: Utils.isMobile(),
    academyName: ''
}

// reducer
const dataReducer = (
    state = initialDataState,
    action: {
        type: string;
        payLoad?: any;
    }
) => {
    switch(action.type) {
        case GET_STATE: case SET_STATE:
            return {
                ...state,
                ...action.payLoad
            };
        default:
            return state;
    }
}

export default dataReducer;
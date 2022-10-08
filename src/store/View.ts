import { createAction } from "@reduxjs/toolkit";
import { StoreStateViewType, ShowAlertOptionType, ShowLodingOptionType } from '../types/store';

// types
export const SHOW_ALERT = "view/SHOW_ALERT";
export const HIDE_ALERT = "view/HIDE_ALERT";
export const SHOW_LOADING = "view/SHOW_LOADING";
export const HIDE_LOADING = "view/HIDE_LOADING";

// actions
export const showAlert = createAction<{
    message: string,
    alertOptions?: ShowAlertOptionType
}>(SHOW_ALERT);

export const hideAlert = createAction(HIDE_LOADING);

export const showLoading = createAction<{
    loadingType: string,
    loadingOptions?: ShowLodingOptionType
}>(SHOW_LOADING)

export const hideLoading = createAction<{
    loadingType?: string
}>(HIDE_LOADING)

// state
const initAlertOptions: ShowAlertOptionType = {    
    title: '',
    confirm: '확인',
    color: 'success',
    compFunc: ()=>{},
    callbackFunc: ()=>{}
}

const initLoadingOptions: ShowLodingOptionType = {
    color: 'success',
    disableShrink: false,
    size: 40,
    thickness: 3.6
}

export const initialViewState: StoreStateViewType = {
    showAlertMessage: "",
    showAlertOptions: initAlertOptions,
    showLoadingType: "",
    showLoadingOptions: initLoadingOptions
}

const viewReducer = (state = initialViewState, action:{
    type: string,
    payload: any
}) => {
    switch(action.type) {
        case SHOW_ALERT:
            const alertParam: ShowAlertOptionType = action.payload.alertOptions;
            const alertOptions: ShowAlertOptionType = {
                title: (alertParam && alertParam.title) || '',
                color: (alertParam && alertParam.color) || 'success',
                confirm: (alertParam && alertParam.confirm) || '확인',
                compFunc: (alertParam && alertParam.compFunc) || (() => {}),
                callbackFunc: (alertParam && alertParam.callbackFunc) || (() => {})
            }
            return {
                ...state,
                showAlertMessage: action.payload.message,
                showAlertOptions: alertOptions
            }        
        case HIDE_ALERT:
            return {
                ...state,
                showAlertMessage: '',
                showAlertOptions: initAlertOptions
            }
        case SHOW_LOADING:
            const loadingParam: ShowLodingOptionType = action.payload.loadingOptions;
            const loadingOptions: ShowLodingOptionType = {
                color: (loadingParam && loadingParam.color) || 'success',
                size: (loadingParam && loadingParam.size) || 40,
                thickness: (loadingParam && loadingParam.thickness) || 3.6,
                disableShrink: (loadingParam && loadingParam.disableShrink) || false,
            }
            return {
                ...state,
                showLoadingType: action.payload.loadingType,
                showLoadingOptions: loadingOptions
            }
        case HIDE_LOADING:
            return {
                ...state,
                showLoadingType: '',
                showLoadingOptions: null
            }
        default:
            return state;
    }
}

export default viewReducer;
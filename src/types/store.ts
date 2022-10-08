export type StoreStateDataType = {
    sysdate: string;
    systime: string;
    isMobile: boolean;
    academyName: ScrollSetting;
}

export type StoreStateViewType = {
    showAlertMessage: string;
    showAlertOptions: ShowAlertOptionType;
    showLoadingName: string;
    showLoadingOptions: ShowLodingOptionType;
};

export type StoreStateType = {
    data: StoreStateDataType;
    view: StoreStateViewType;
};


// Option Types
export type ShowAlertOptionType = {
    title: string;
    confirm: string;
    color: 'error' | 'info' | 'success' | 'warning';
    compFunc: Function;
    callbackFunc: Function;
};

export type ShowLodingOptionType = {
    color:
        | 'inherit'
        | 'primary'
        | 'secondary'
        | 'error'
        | 'info'
        | 'success'
        | 'warning';
    disableShrink: boolean;
    size: number | string;
    thickness: number;
};

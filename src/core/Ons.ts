import { setState } from './../store/Data';
import { Store } from "redux";
import { initialDataState, setState } from "../store/Data";
import { hideAlert, showAlert, initialViewState, showLoading } from "../store/View";
import { StoreStateType } from "../types/store";

type StateType = keyof typeof initialDataState | keyof typeof initialViewState;

export class Ons {
    // store의 값은 무조건 할당
    private _store!: Store;

    public init(inStore: Store): any {
        this._store = inStore;
    }

    public get store() {
        return this._store;
    }

    public set store(inStore: Store) {
        this._store = inStore;
    }

    public get state(): StoreStateType {
        return this.store.getState();
    }

    public getState(key: StateType, type: string = 'data') {
        return this._store.getState()[type][key];
    }

    public setState(key: StateType, value: any): void {
        this._store.dispatch(setState(
            {[key]: value}
        ));
    }
}

export default (window as any).devons = new Ons();
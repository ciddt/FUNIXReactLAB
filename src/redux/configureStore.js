import { createStore } from "redux";
import { Reducer, initialState } from "./reducer";

export const ConfigurableStore = () => {
    const store = createStore(
        Reducer,
        initialState
    );

    return store;
}
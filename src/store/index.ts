import { taskReducer } from "./tasks/TaskReducer";
import {createStore, combineReducers} from 'redux';

const composeEnhancers = (window as any).window.__REDUX_DEVTOOLS_EXTENSION__ && (window as any).window.__REDUX_DEVTOOLS_EXTENSION__()

const rootReducer = combineReducers({
    tasks: taskReducer
})

export const store = createStore(
    rootReducer,
    composeEnhancers
)

export type RootState = ReturnType<typeof rootReducer>;

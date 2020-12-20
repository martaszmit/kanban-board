import {
    ADD_TASK,
    AddTaskAction,
    REMOVE_TASK,
    SelectedTask,
    Task,
    TaskActionTypes, TaskColumn,
    TaskState,
    UPDATE_COLUMN_TASK,
    UPDATE_SELECTED_TASK
} from "./Types";

const memoryData = localStorage.getItem('columnData');
const initialColumns = memoryData ? JSON.parse(memoryData) : []

const initialState: TaskState = {
    columns: initialColumns ,
    selectedTask: null
};

export function taskReducer(state = initialState, action: TaskActionTypes): TaskState {
    switch (action.type) {
        case ADD_TASK:
            return {
                selectedTask: null,
                columns: addTaskHandler(state, action.payload)
            };
        case REMOVE_TASK:
            return {
                selectedTask: null,
                columns: removeTaskHandler(state, action.payload)
            }
        case UPDATE_COLUMN_TASK:
            return {
                selectedTask: null,
                columns: updateColumnTask(state, action.payload)
            };
        case UPDATE_SELECTED_TASK:
            return {
                columns: state.columns,
                selectedTask: {columnIndex: action.payload.columnIndex, task: action.payload.task}
            }
        default:
            return state;
    }
}

function addTaskHandler (state: TaskState, actionPayload: AddTaskAction) {
    const {oldColumnTasks, currentState} = prepareImmutableColumns(state, actionPayload.columnIndex)
    const newColumnTasks = [...oldColumnTasks, actionPayload.task];
    return [...currentState, {columnIndex: actionPayload.columnIndex, tasks: newColumnTasks}]
}

function removeTaskHandler (state: TaskState, actionPayload: SelectedTask) {
    const {oldColumnTasks, currentState} = prepareImmutableColumns(state, actionPayload.columnIndex)
    const newColumnTasks = oldColumnTasks.filter((task: Task) => task.id !== actionPayload.task.id);
    return [...currentState, {columnIndex: actionPayload.columnIndex, tasks: newColumnTasks}];
}

function updateColumnTask (state: TaskState, actionPayload: TaskColumn) {
    const columnTasks = state.columns.filter(el => el.columnIndex !== actionPayload.columnIndex);
    return [...columnTasks, {columnIndex: actionPayload.columnIndex, tasks: actionPayload.tasks}]
}

function prepareImmutableColumns (state: TaskState, columnIndex: number) {
    const currentState = [...state.columns];
    const oldColumn = currentState.splice(state.columns.findIndex(el => el.columnIndex === columnIndex), 1);
    const oldColumnTasks = oldColumn.length && oldColumn[0].tasks ? oldColumn[0].tasks : [];
    return {currentState, oldColumnTasks}
}
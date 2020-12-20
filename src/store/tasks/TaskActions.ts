import {
    ADD_TASK,
    AddTaskAction,
    REMOVE_TASK,
    SelectedTask,
    TaskActionTypes,
    TaskColumn,
    UPDATE_COLUMN_TASK,
    UPDATE_SELECTED_TASK
} from "./Types";

export function addTask(task: AddTaskAction): TaskActionTypes {
    return {
        type: ADD_TASK,
        payload: task
    }
}

export function removeTask(payload: SelectedTask): TaskActionTypes {
    return {
        type: REMOVE_TASK,
        payload,
    }
}

export function updateColumnTasks(payload: TaskColumn): TaskActionTypes {
    return {
        type: UPDATE_COLUMN_TASK,
        payload: {
            columnIndex: payload.columnIndex,
            tasks: payload.tasks
        }
    }
}

export function updateSelectedTask(payload: SelectedTask | null): TaskActionTypes {
    const payloadData = payload ? { columnIndex: payload.columnIndex, task: payload.task } : null;

    return {
        type: UPDATE_SELECTED_TASK,
        payload: payloadData
    }
}
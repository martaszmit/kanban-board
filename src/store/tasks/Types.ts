import { Tags } from "../../helpers/enums/Tags";

export interface TaskColumn {
    columnIndex: number,
    tasks: Task[]
}

export interface SelectedTask {
    columnIndex: number,
    task: Task
}

export interface TaskState {
    columns: TaskColumn[],
    selectedTask: SelectedTask | null
}

export interface Task {
    id: string,
    tag: Tags | string,
    description: string,
    name: string,
    icon: string
}

export interface TaskActionTypes {
    type: string,
    payload: any
}

export interface AddTaskAction {
    columnIndex: number,
    task: Task
}

export const ADD_TASK = 'ADD_TASK';
export const REMOVE_TASK = 'REMOVE_TASK';
export const UPDATE_COLUMN_TASK = 'UPDATE_COLUMN_TASK';
export const UPDATE_SELECTED_TASK = 'UPDATE_SELECTED_TASK';

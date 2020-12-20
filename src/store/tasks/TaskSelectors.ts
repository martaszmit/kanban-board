import { TaskColumn } from "./Types";
import { RootState } from "../index";

export const getColumnsData = (state: RootState) => state.tasks.columns

export const getTaskForColumns = (state: RootState) => (columnIndex: number) => {
    if(!state.tasks.columns.length) return [];
    const column = state.tasks.columns.find( (el: TaskColumn) => el.columnIndex === columnIndex)
    return column ? column.tasks : []
}

export const getSelectedTask = (state: RootState) => state.tasks.selectedTask;
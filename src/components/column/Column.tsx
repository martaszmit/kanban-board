import './Column.scss'
import React, { FC, ReactElement, useState} from "react";
import { ReactSortable } from "react-sortablejs";
import NewTaskForm from "../forms/NewTaskForm";
import FormDialog from "../dialogs/FormDialog";
import { Task } from "../../store/tasks/Types";
import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask, updateColumnTasks, updateSelectedTask } from "../../store/tasks/TaskActions";
import BaseActions from "./BaseActions";
import TaskCard from "../cards/TaskCard";
import BaseTask from "../task/BaseTask";
import { getSelectedTask } from "../../store/tasks/TaskSelectors";
import { RootState } from "../../store";

interface ColumnProps {
    title: String,
    list: Task[],
    columnIndex: number
}

const Column:FC<ColumnProps> = ({title, list, columnIndex}): ReactElement => {

    const [formDialogOpened, setFormDialogOpen] = useState<boolean>(false);
    const selectedTask = useSelector((state: RootState) => getSelectedTask(state));
    const dispatch = useDispatch();

    const handleFormVisibility = () => setFormDialogOpen(!formDialogOpened)

    const handleFormSubmit = (taskFormData: Task) => {
        const newTaskData = {
            columnIndex,
            task: taskFormData
        }
        dispatch(addTask(newTaskData))
        setFormDialogOpen(!formDialogOpened);
    }

    const handleFormDecline = () => setFormDialogOpen(!formDialogOpened);

    const handleTaskMove = (tasks: Task[]) => {
        dispatch(updateColumnTasks({columnIndex, tasks}));
    }

    const handleTaskDelete = () => {
        if(selectedTask?.columnIndex === columnIndex) {
            dispatch(removeTask({columnIndex, task: selectedTask.task }))
        }
    }

    const handleSelectedTask = (task: Task) => {
        dispatch(updateSelectedTask({columnIndex, task}));
    }

    const isSelectedTask = (id: string) => selectedTask?.task.id === id;

    const getTask = list.map((task: Task) => (
        <TaskCard key={task.id} onClick={() => handleSelectedTask(task)} isSelectedTask={isSelectedTask(task.id)}>
            <BaseTask
                description={task.description}
                imgPath={task.icon}
                personName={task.name}
                tag={task.tag}
            />
        </TaskCard>
    ))

    return (
        <div className="column">
            <h3 className='column__title'>{title}</h3>
            <ReactSortable className='column__content' group='shared' list={list} setList={handleTaskMove} animation={300}>
                {getTask}
            </ReactSortable>
            <div className='column__actions'>
                <BaseActions columnIndex={columnIndex} handleAdd={handleFormVisibility} handleDelete={handleTaskDelete}/>
                <FormDialog
                    title="Task description"
                    description="Describe all information about new task."
                    open={formDialogOpened}
                    handleOpen={handleFormVisibility}
                    formContent={<NewTaskForm formSubmit={handleFormSubmit} formDecline={handleFormDecline}/>}
                />
            </div>
        </div>
    )
}

export default Column;
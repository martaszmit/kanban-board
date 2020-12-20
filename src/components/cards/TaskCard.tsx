import { Card, CardContent } from "@material-ui/core";
import { FC, ReactElement } from "react";
import './TaskCard.scss'
import cx from 'classnames';

interface TaskCardProps {
    children?: JSX.Element,
    onClick: () => void;
    isSelectedTask: boolean
}

const TaskCard:FC<TaskCardProps> = ({children, onClick, isSelectedTask}): ReactElement => {
    return (
        <div className='task-card' onClick={onClick} >
            <Card className={cx({'task-card--selected': isSelectedTask})}>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </div>
    )
}

export default TaskCard;
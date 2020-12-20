import './BaseActions.scss'
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import cx from 'classnames';
import { FC } from "react";
import { useSelector } from "react-redux";
import { getSelectedTask } from "../../store/tasks/TaskSelectors";
import { RootState } from "../../store";

interface BaseActionsProps {
    handleAdd: () => void;
    handleDelete: () => void;
    columnIndex: number
}

const BaseActions:FC<BaseActionsProps> = ({handleAdd, handleDelete, columnIndex}) => {

    const selectedItem = useSelector((state: RootState) => getSelectedTask(state));

    const isSelectedElementInColumn = selectedItem?.columnIndex === columnIndex;

    return (
        <div className='base-actions'>
            <IconButton aria-label="delete" disableRipple onClick={handleAdd} className='base-actions__add'>
                <AddIcon/>
                <span className='base-actions__add__text'>Add new task</span>
            </IconButton>
            <IconButton
                aria-label="delete"
                disableRipple
                className={cx({'base-actions__delete--selected': isSelectedElementInColumn})}
                onClick={handleDelete}
            >
                <DeleteIcon />
            </IconButton>
        </div>
    )
}

export default BaseActions;
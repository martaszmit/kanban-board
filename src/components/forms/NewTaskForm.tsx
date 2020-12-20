import React, { ChangeEvent, FC, useState } from "react";
import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@material-ui/core";
import { Assignee } from "../task/AssignedPerson";
import './NewTaskForm.scss';
import { Tags } from "../../helpers/enums/Tags";
import { Task } from "../../store/tasks/Types";
import { v4 as uuidv4 } from 'uuid';

interface NewTaskFormProps {
    formSubmit: (formData: Task) => void
    formDecline: () => void;
}

const NewTaskForm:FC<NewTaskFormProps> = ({formSubmit, formDecline}) => {

    const [description, setDescription] = useState<string>('');
    const [descriptionError, setDescriptionError] = useState<boolean>(false);
    const [tag, setTag] = useState<Tags | string>('');
    const [assignee, setAssignee] = useState<Assignee>({name: '', imageUrl: ''});


    const handleDescriptionChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    }

    const handleTagChange = (value: string) => {
        setTag(value);
    }

    const handleAssigneeNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAssignee({...assignee, name: event.target.value})
    }

    const handleAssigneeImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        setAssignee({...assignee, imageUrl: event.target.value})
    }

    const isFormValid = () => {
        if (!description.trim()) {
            setDescriptionError(true)
            return false;
        } else {
            return true;
        }
    }

    const handleFormSubmit = () => {
        if(!isFormValid()) return;
        if(!description.length) {
            setDescriptionError(true)
        } else {
            setDescriptionError(false)
        }
        const formData = {
            id: uuidv4(),
            tag: tag,
            description: description,
            name: assignee.name,
            icon: assignee.imageUrl
        }
        formSubmit(formData);
    }

    const tagsArr = Object.keys(Tags).filter((tag) => isNaN(Number(tag)))

    const menuItems = tagsArr.map((tag:string) => <MenuItem key={tag} value={tag}>{tag}</MenuItem>);

    const helperText = descriptionError ? 'Description can not be empty' : '';

    return (
        <form className='new-task-form'>
            <TextField
                error={descriptionError}
                helperText={helperText}
                fullWidth
                label="Description"
                multiline
                rows={2}
                rowsMax={5}
                value={description}
                onChange={handleDescriptionChange}
            />
            <FormControl fullWidth>
                <InputLabel id='tag-selection'>Tag</InputLabel>
                <Select
                    labelId='tag-selection'
                    value={tag}
                    onChange={(e) => handleTagChange(e.target.value as string)}
                >
                    {menuItems}
                </Select>
            </FormControl>
            <TextField
                fullWidth
                label="Assigned person"
                value={assignee.name}
                onChange={handleAssigneeNameChange}
            />
            <TextField
                fullWidth
                label="Assigned person image url"
                value={assignee.imageUrl}
                onChange={handleAssigneeImageChange}
            />
            <div className='new-task-form__actions'>
                <Button onClick={formDecline} color="primary">Cancel</Button>
                <Button onClick={handleFormSubmit} color="primary">Accept</Button>
            </div>
        </form>
    )
}

export default NewTaskForm;


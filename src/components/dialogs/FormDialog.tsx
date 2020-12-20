import React, {FC, ReactElement} from 'react';
import {
    Dialog,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@material-ui/core';

interface FormDialogProps {
    open: boolean,
    title: string,
    description: string
    handleOpen: () => any,
    formContent: ReactElement
}

const FormDialog:FC<FormDialogProps> = ({title, description, open, handleOpen, formContent}) => {
    return (
        <div>
            <Dialog open={open} onClose={handleOpen}>
                <DialogTitle>{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>{description}</DialogContentText>
                    {formContent}
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default FormDialog;

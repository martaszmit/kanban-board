import { FC, ReactElement } from "react";
import './AssignedPerson.scss'

export interface Assignee {
    imageUrl: string,
    name: string
}

const AssignedPerson:FC<Assignee> = ({imageUrl, name}): ReactElement => {
    return (
        <div className='assigned-person'>
            <img className='assigned-person__image' src={imageUrl} alt={'alternative'}/>
            <span className='assigned-person__name'>{name}</span>
        </div>
    )
}

export default AssignedPerson;
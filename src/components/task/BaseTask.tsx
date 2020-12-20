import { FC, ReactElement } from "react";
import './BaseTask.scss'
import { Tags } from "../../helpers/enums/Tags";
import AssignedPerson from "./AssignedPerson";
import Tag from "./Tag";

interface BaseTaskProps {
    description: string,
    imgPath: string,
    personName: string,
    tag: Tags | string
}

const BaseTask: FC<BaseTaskProps> = ({description, imgPath, personName, tag}): ReactElement => {

    const imagePath = imgPath ? imgPath : '/user.svg'

    return (
        <div className='base-task'>
            <div className='base-task__description'>{description}</div>
            <div className='base-task__additional-info'>
                <AssignedPerson imageUrl={imagePath} name={personName}/>
                <Tag text={tag}/>
            </div>
        </div>
    )
}

export default BaseTask
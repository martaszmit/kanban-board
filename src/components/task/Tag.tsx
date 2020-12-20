import {FC, ReactElement} from "react";
import {Tags} from "../../helpers/enums/Tags";

interface TagProps {
    text: Tags | string
}

const Tag:FC<TagProps> = ({text}): ReactElement => {
    return (
        <div>{text}</div>
    )
}

export default Tag;
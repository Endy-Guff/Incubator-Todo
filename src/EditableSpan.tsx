import React, {ChangeEvent, useState} from 'react';

type EditableSpanPropsType = {
    title: string,
    classes?: string
    changeTitle: (newTitle: string)=>void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (
    {
        title,
        classes,
        changeTitle
    }
) => {

    const [editMode, setEditMode] = useState<boolean>(false)
    const [value, setValue] = useState<string>(title)
    const toggleEditMode = () =>{
        if(editMode){
            changeTitle(value)
        }
        setEditMode(!editMode)
    }

    const setValueHandler = (e: ChangeEvent<HTMLInputElement>) =>{
        setValue(e.currentTarget.value)
    }

    return (

        editMode
            ?<input
                value={value}
                autoFocus
                onChange={setValueHandler}
                onBlur={toggleEditMode}/>
            :<span
                onDoubleClick={toggleEditMode}
                className={classes}>{title}</span>
    );
};


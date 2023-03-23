import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Button } from './components/Button';



type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    filterTask?: (btn: string) => void
    addTask: (value: string) => void
}

export function Todolist(props: PropsType) {

    let [filterValue, setFilterValue] = useState('All')
    const filterTask = (btn: string) => {
        setFilterValue(btn)
    }
    let filteredTasks = props.tasks
        if (filterValue === 'Active'){
            filteredTasks = props.tasks.filter(el => !el.isDone)
        }
        if (filterValue === 'Completed'){
            filteredTasks = props.tasks.filter(el => el.isDone)
        }
        if (filterValue === 'All'){
            filteredTasks = props.tasks
        }

        const [inputValue, setInputValue] = useState('')

        const addTaskHandler = () =>{
            props.addTask(inputValue)
            setInputValue('')
        }

        const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) =>{
            if(e.key === 'Enter') addTaskHandler()
        }

        const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) =>{
            setInputValue(e.currentTarget.value)
        }

        const removeTaskHandler = (tID: string) =>{
            props.removeTask(tID)
        }

        // const AllChangeFilterHandler = () =>{
        //     filterTask('All')
        // }

        // const ActiveChangeFilterHandler = () =>{
        //     filterTask('Active')
        // }

        // const CompletedChangeFilterHandler = () =>{
        //     filterTask('Completed')
        // }

        const tsarFunction = (filterValue: string) =>{
            filterTask(filterValue)
        }

    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={inputValue} onKeyDown={onKeyDownHandler} onChange={onChangeHandler}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        <ul>
            {filteredTasks.map(el => {
                
                return (
                    <li key={el.id}>
                        <button onClick={()=>removeTaskHandler(el.id)}>x</button>
                        <input type="checkbox" checked={el.isDone} />
                        <span>{el.title}</span>
                    </li>
                )
            })}
        </ul>
        <div>
            <Button name='All' callback={()=>tsarFunction('All')}/>
            <Button name='Active' callback={()=>tsarFunction('Active')}/>
            <Button name='Completed' callback={()=>tsarFunction('Completed')}/>
            {/* <button onClick={()=>tsarFunction('All')}>All</button>
            <button onClick={()=>tsarFunction('Active')}>Active</button>
            <button onClick={()=>tsarFunction('Completed')}>Completed</button> */}
        </div>
    </div>
}

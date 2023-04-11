import React, { useState, KeyboardEvent, ChangeEvent } from 'react';
import { Button } from './components/Button';
import s from './Todolist.module.css'



type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type filterValueType = 'All' | 'Active' | 'Completed'

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    filterTask?: (btn: string) => void
    addTask: (value: string) => void
    changeIsDone: (id: string, isDone: boolean) => void
}

export function Todolist(props: PropsType) {

    const [inputValue, setInputValue] = useState('')
    let [error, setError] = useState<string | null>('')
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

        const addTaskHandler = () =>{
            if(inputValue.trim() !== ''){
                props.addTask(inputValue.trim())
                setInputValue('')
            } else setError('Ошибка!')
        }

        const onKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) =>{
            if(e.key === 'Enter') addTaskHandler()
        }

        const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) =>{
            setError('')
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
    const changeIsDoneHandler = (id: string, isDone: boolean) =>{
        props.changeIsDone(id, isDone)
    }
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input
                value={inputValue}
                onKeyDown={onKeyDownHandler}
                onChange={onChangeHandler}
                className={error ? s.error : ''}/>
            <button onClick={addTaskHandler}>+</button>
        </div>
        {error && <div className={s.errorMessage}>{error}</div>}
        <ul>
            {filteredTasks.map(el => {


                
                return (
                    <li key={el.id} className={el.isDone ? s.isDone : ''}>
                        <button onClick={()=>removeTaskHandler(el.id)}>x</button>
                        <input type="checkbox" checked={el.isDone} onChange={(e)=>changeIsDoneHandler(el.id, e.currentTarget.checked)} />
                        <span>{el.title}</span>
                    </li>
                )
            })}
        </ul>
        <div>
            <Button class={filterValue === 'All' ? 'active' : ''} name='All' callback={()=>tsarFunction('All')}/>
            <Button class={filterValue === 'Active' ? 'active' : ''} name='Active' callback={()=>tsarFunction('Active')}/>
            <Button class={filterValue === 'Completed' ? 'active' : ''} name='Completed' callback={()=>tsarFunction('Completed')}/>
            {/* <button onClick={()=>tsarFunction('All')}>All</button>
            <button onClick={()=>tsarFunction('Active')}>Active</button>
            <button onClick={()=>tsarFunction('Completed')}>Completed</button> */}
        </div>
    </div>
}

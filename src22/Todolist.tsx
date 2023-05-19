import React, {ChangeEvent, KeyboardEvent, FC, useRef, useState} from 'react';
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

// rsc

type TodoListPropsType = {
    todoListId: string
    title: string
    tasks: Array<TaskType>
    filter: FilterValuesType
    removeTask: (taskId: string, todoListId: string) => void
    changeTodoListFilter: (filter: FilterValuesType, todoListId: string) => void
    changeTaskStatus: (taskId: string, newIsDone: boolean, todoListId: string) => void
    addTask: (title: string, todoListId: string) => void
    removeTodoList: (todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string)=>void
    changeTodoListTitle:(newTitle:string, todoListId: string)=>void
}

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

const TodoList: FC<TodoListPropsType> = (props) => {

    // const [title, setTitle] = useState<string>("")
    // const [error, setError] = useState<boolean>(false)


    let isAllTasksNotIsDone = true // все не выполенные
    for (let i = 0; i < props.tasks.length; i++) {
        if (props.tasks[i].isDone) {
            isAllTasksNotIsDone = false
            break;
        }
    }
    const todoClasses = isAllTasksNotIsDone ? "todolist-empty" : "todolist"

    const changeTodoListTitle = (newTitle: string) => props.changeTodoListTitle(newTitle, props.todoListId)
    const todoListItems: Array<JSX.Element> = props.tasks.map((task) => {
        const removeTaskHandler = () => props.removeTask(task.id, props.todoListId)
        const changeTaskStatus = (e: ChangeEvent<HTMLInputElement>) => props.changeTaskStatus(task.id, e.currentTarget.checked, props.todoListId)
        const changeTaskTitle = (newTitle: string) =>{
            props.changeTaskTitle( task.id, newTitle, props.todoListId)
        }
        return (
            <li key={task.id}>
                <input
                    onChange={changeTaskStatus}
                    type="checkbox"
                    checked={task.isDone}
                />
                <EditableSpan title={task.title} classes={task.isDone ? "task-done" : "task"} changeTitle={changeTaskTitle}/>
                {/*<span*/}
                {/*    className={task.isDone ? "task-done" : "task"}>*/}
                {/*    {task.title}*/}
                {/*</span>*/}
                <button onClick={removeTaskHandler}>x</button>
            </li>
        )
    })

    const maxTitleLength = 20
    const recommendedTitleLength = 10



    const addTask = (title: string) => {
        props.addTask(title, props.todoListId)

    }
    // const setLocalTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
    //     error && setError(false)
    //     setTitle(e.currentTarget.value)
    // }


    const removeTodoList = () => {
        props.removeTodoList(props.todoListId)
    }

    return (
        <div className={todoClasses}>
            <h3>
                <EditableSpan title={props.title} changeTitle={changeTodoListTitle}/>
                <button onClick={removeTodoList}>x</button>
            </h3>
            <AddItemForm addItem={addTask} recommendedTitleLength={15} maxTitleLength={20}/>
                {/*<div>*/}
                {/*    <input*/}
                {/*        placeholder="Enter task title, please"*/}
                {/*        value={title}*/}
                {/*        onChange={setLocalTitleHandler}*/}
                {/*        onKeyDown={onKeyDownAddTaskHandler}*/}
                {/*        className={error ? "input-error" : ""}*/}
                {/*    />*/}
                {/*    <button*/}
                {/*        disabled={isAddTaskNotPossible}*/}
                {/*        onClick={addTaskHandler}*/}
                {/*    >+*/}
                {/*    </button>*/}
                {/*    {longTitleWarningMessage}*/}
                {/*    {longTitleErrorMessage}*/}
                {/*    {errorMessage}*/}
                {/*</div>*/}
            <ul>
            {todoListItems}
        </ul>
    <div>
        <button
            className={props.filter === "all" ? "btn-active" : ""}
            onClick={() => {
                props.changeTodoListFilter("all", props.todoListId)
            }}
        >All
        </button>
        <button
            className={props.filter === "active" ? "btn-active" : ""}
            onClick={() => {
                props.changeTodoListFilter("active", props.todoListId)
            }}
        >Active
        </button>
        <button
            className={props.filter === "completed" ? "btn-active" : ""}
            onClick={() => {
                props.changeTodoListFilter("completed", props.todoListId)
            }}
        >Completed
        </button>
    </div>
</div>
)
    ;
};

export default TodoList;
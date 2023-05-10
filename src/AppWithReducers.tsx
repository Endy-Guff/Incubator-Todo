import React, {Reducer, useReducer, useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";
import {
    AddTodoListActionCreate,
    ChangeTodoListFilterActionCreate,
    ChangeTodoListTitleActionCreate, RemoveTodoListActionCreate,
    TodoListsActionType,
    todolistsReducer
} from "./reducers/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./reducers/tasks-reducer";

// create
// read
// update
// delete
// CRUD operations
// interface => GUI (CLI, VUI, ....)

export type FilterValuesType = "all"|"active"|"completed"
export type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TaskStateType = {
    [todoListId: string]: TaskType[]
}


function AppWithReducers(): JSX.Element {
    const todoLostId_1 = v1()
    const todoLostId_2 = v1()
    const[todoLists, dispatchToTodoLists] = useReducer<Reducer<TodoListType[], TodoListsActionType>>(todolistsReducer, [
        {id: todoLostId_1, title: 'What to learn', filter: 'all'},
        {id: todoLostId_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, dispatchToTasks] = useReducer(tasksReducer, {
        [todoLostId_1]:[
        {id: v1(), title: "HTML & CSS", isDone: true},
        {id: v1(), title: "CSS & SCSS", isDone: true},
        {id: v1(), title: "ES6/TS", isDone: false},
        {id: v1(), title: "REDUX", isDone: false}
    ],
        [todoLostId_2]:[
        {id: v1(), title: "WATER", isDone: true},
        {id: v1(), title: "SALT", isDone: true},
        {id: v1(), title: "BREAD", isDone: false},
        {id: v1(), title: "BEER", isDone: false}
    ]
})

     // const [tasks, setTasks] = useState<Array<TaskType>>([
     //                     {id: v1(), title: "HTML & CSS", isDone: true},
     //                     {id: v1(), title: "CSS & SCSS", isDone: true},
     //                     {id: v1(), title: "ES6/TS", isDone: false},
     //                     {id: v1(), title: "REDUX", isDone: false},
     //                 ])
    const removeTask = (taskId: string, todoListId: string) => {
        dispatchToTasks(removeTaskAC(taskId, todoListId))
    }
    const addTask = (title: string, todoListId: string) => {
        dispatchToTasks(addTaskAC(title, todoListId))
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        dispatchToTasks(changeTaskStatusAC(taskId, newIsDone, todoListId))
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        dispatchToTasks(changeTaskTitleAC(taskId, newTitle, todoListId))
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        dispatchToTodoLists(ChangeTodoListFilterActionCreate(filter, todoListId))
    }

    const changeTodoListTitle = (newTitle: string, todoListId: string) => {
        dispatchToTodoLists(ChangeTodoListTitleActionCreate(newTitle, todoListId))
    }




    const getFilteredTasksForRender = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
        switch (filterValue) {
            case "active":
                return tasksList.filter(t => !t.isDone)
            case "completed":
                return tasksList.filter(t => t.isDone)
            default:
                return tasksList
        }
    }

    const removeTodoList = (todoListId: string) =>{
        const action = RemoveTodoListActionCreate(todoListId)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    const addTodolist = (title: string) => {
        const action = AddTodoListActionCreate(title)
        dispatchToTodoLists(action)
        dispatchToTasks(action)
    }

    const todoListComponents = todoLists.map(tl =>{
        const tasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[tl.id], tl.filter)

        return(
            <TodoList
                key={tl.id}

                todoListId={tl.id}
                title={tl.title}
                tasks={tasksForRender}
                filter={tl.filter}

                removeTask={removeTask}
                addTask={addTask}
                changeTaskStatus={changeTaskStatus}
                changeTodoListFilter={changeTodoListFilter}
                removeTodoList={removeTodoList}
                changeTaskTitle={changeTaskTitle}
                changeTodoListTitle={changeTodoListTitle}
            />
        )
    })

    return (
        <div className="App">
            <AddItemForm addItem={addTodolist} recommendedTitleLength={15} maxTitleLength={20} />
            {todoListComponents}
        </div>
    );
}

export default AppWithReducers;

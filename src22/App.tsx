import React, {useState} from 'react';
import './App.css';
import TodoList, {TaskType} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./AddItemForm";

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


function App(): JSX.Element {
    const todoLostId_1 = v1()
    const todoLostId_2 = v1()
    const[todoLists, setTodoLists] = useState<TodoListType[]>([
        {id: todoLostId_1, title: 'What to learn', filter: 'all'},
        {id: todoLostId_2, title: 'What to buy', filter: 'all'}
    ])

    const [tasks, setTasks] = useState<TaskStateType>({
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
        // const taskForUpdate: TaskType[] = tasks[todoListId]
        // const resultOfUpdate: TaskType[] = taskForUpdate.filter((task )=> task.id !== taskId)
        // const copyTasks = {...tasks}
        // copyTasks[todoListId] = resultOfUpdate
        // setTasks(copyTasks)
        setTasks({...tasks, [todoListId]: tasks[todoListId].filter((task )=> task.id !== taskId)})
        // setTasks(tasks.filter((task )=> task.id !== taskId))
    }
    const addTask = (title: string, todoListId: string) => {
        const newTask: TaskType = {
            id: v1(), title, isDone: false
        }
        const taskForUpdate: TaskType[] = tasks[todoListId]
        const resultOfUpdate: TaskType[] = [newTask, ...taskForUpdate]
        const copyTasks = {...tasks}
        copyTasks[todoListId] = resultOfUpdate
        setTasks(copyTasks)

        // setTasks({...tasks, [todoListId]: [newTask, ...tasks[todoListId]]})


        // setTasks([newTask, ...tasks])
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId]
                .map(t => t.id === taskId ? {...t, isDone: newIsDone} : t)})

        // setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDone} : t))
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        setTasks({...tasks, [todoListId]: tasks[todoListId]
                .map(t => t.id === taskId ? {...t, title: newTitle} : t)})

        // setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: newIsDone} : t))
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, filter: filter} : tl))
        // setFilter(filter)
    }

    const changeTodoListTitle = (newTitle: string, todoListId: string) => {
        setTodoLists(todoLists.map(tl => tl.id === todoListId ? {...tl, title: newTitle} : tl))
        // setFilter(filter)
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
        setTodoLists(todoLists.filter(tl => tl.id !== todoListId))
        delete tasks[todoListId]
    }

    const addTodolist = (title: string) => {
        const newTodo: TodoListType = {
            id: v1(),
            title: title,
            filter: 'all'
        }
        setTodoLists([...todoLists, newTodo])
        setTasks({...tasks, [newTodo.id]: []})
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

export default App;

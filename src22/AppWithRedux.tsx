import React, {Reducer, useCallback, useReducer, useState} from 'react';
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
import {useDispatch, useSelector} from "react-redux";
import {AppRoorStateType} from "./reducers/store";

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


function AppWithRedux(): JSX.Element {
    const todoLostId_1 = v1()
    const todoLostId_2 = v1()
    const todoLists = useSelector<AppRoorStateType, TodoListType[]>(state => state.todolists)
    const tasks = useSelector<AppRoorStateType, TaskStateType>(state => state.tasks)
    const dispatch = useDispatch()

    // const [tasks, setTasks] = useState<Array<TaskType>>([
    //                     {id: v1(), title: "HTML & CSS", isDone: true},
    //                     {id: v1(), title: "CSS & SCSS", isDone: true},
    //                     {id: v1(), title: "ES6/TS", isDone: false},
    //                     {id: v1(), title: "REDUX", isDone: false},
    //                 ])
    const removeTask = useCallback((taskId: string, todoListId: string) => {
        dispatch(removeTaskAC(taskId, todoListId))
    }, [dispatch])
    const addTask = useCallback((title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }, [dispatch])
    const changeTaskStatus = useCallback((taskId: string, newIsDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, newIsDone, todoListId))
    }, [dispatch])
    const changeTaskTitle = useCallback((taskId: string, newTitle: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListId))
    }, [dispatch])

    const changeTodoListFilter = useCallback((filter: FilterValuesType, todoListId: string) => {
        dispatch(ChangeTodoListFilterActionCreate(filter, todoListId))
    }, [dispatch])

    const changeTodoListTitle = useCallback((newTitle: string, todoListId: string) => {
        dispatch(ChangeTodoListTitleActionCreate(newTitle, todoListId))
    }, [dispatch])

    const removeTask = (taskId: string, todoListId: string) => {
        dispatch(removeTaskAC(taskId, todoListId))
    }
    const addTask = (title: string, todoListId: string) => {
        dispatch(addTaskAC(title, todoListId))
    }
    const changeTaskStatus = (taskId: string, newIsDone: boolean, todoListId: string) => {
        dispatch(changeTaskStatusAC(taskId, newIsDone, todoListId))
    }

    const changeTaskTitle = (taskId: string, newTitle: string, todoListId: string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, todoListId))
    }

    const changeTodoListFilter = (filter: FilterValuesType, todoListId: string) => {
        dispatch(ChangeTodoListFilterActionCreate(filter, todoListId))
    }

    const changeTodoListTitle = (newTitle: string, todoListId: string) => {
        dispatch(ChangeTodoListTitleActionCreate(newTitle, todoListId))
    }



    // const getFilteredTasksForRender = (tasksList: Array<TaskType>, filterValue: FilterValuesType) => {
    //     switch (filterValue) {
    //         case "active":
    //             return tasksList.filter(t => !t.isDone)
    //         case "completed":
    //             return tasksList.filter(t => t.isDone)
    //         default:
    //             return tasksList
    //     }
    // }

    const removeTodoList = useCallback((todoListId: string) =>{
        dispatch(RemoveTodoListActionCreate(todoListId))
    }, [dispatch])

    const addTodolist = useCallback((title: string) => {
        dispatch(AddTodoListActionCreate(title))
    }, [dispatch])

    const todoListComponents = todoLists.map(tl => {
        // const tasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[tl.id], tl.filter)
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

        const removeTodoList = (todoListId: string) => {
            dispatch(RemoveTodoListActionCreate(todoListId))
        }

        const addTodolist = (title: string) => {
            dispatch(AddTodoListActionCreate(title))
        }

        const todoListComponents = todoLists.map(tl => {
            const tasksForRender: Array<TaskType> = getFilteredTasksForRender(tasks[tl.id], tl.filter)

            return (
                <TodoList
                    key={tl.id}

                    todoListId={tl.id}
                    title={tl.title}
                    tasks={tasks[tl.id]}
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
                <AddItemForm addItem={addTodolist} recommendedTitleLength={15} maxTitleLength={20}/>
                {todoListComponents}
            </div>
        );
    }

export default AppWithRedux;

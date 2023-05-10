import {FilterValuesType, TaskStateType, TodoListType} from "../App";
import {v1} from "uuid";
import {TaskType} from "../Todolist";
import {AddTodoListActionType, RemoveTodoListActionType} from "./todolists-reducer";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK',
    TaskId: string
    TodoListId: string
}

type AddTaskActionType = {
    type: 'ADD-TASK',
    title: string,
    TodoListId: string
}

type ChangeTaskStatusAactionType ={
    type: 'CHANGE-TASK-STATUS',
    TaskId: string
    TodoListId: string
    filter: boolean
}

type ChangeTaskTitleActionType ={
    type: 'CHANGE-TASK-TITLE',
    TaskId: string
    TodoListId: string
    title: string
}


type ActionType = RemoveTaskActionType | AddTaskActionType
    | ChangeTaskStatusAactionType | ChangeTaskTitleActionType | AddTodoListActionType
    | RemoveTodoListActionType

const initialState: TaskStateType = {}

export const tasksReducer = (state = initialState, action: ActionType) =>{

    switch (action.type) {
        case "REMOVE-TASK":
            return {...state,[action.TodoListId]: state[action.TodoListId].filter(t=>t.id!==action.TaskId)}
        case "ADD-TASK":
            const newTask = {
                id: v1(), title: action.title, isDone: false
            }
            return {...state, [action.TodoListId]: [newTask, ...state[action.TodoListId]]}
        case "CHANGE-TASK-STATUS":
            return {...state, [action.TodoListId]: state[action.TodoListId]
                    .map(t => t.id === action.TaskId ? {...t, isDone: action.filter} : t)}
        case 'CHANGE-TASK-TITLE':
            return {...state, [action.TodoListId]: state[action.TodoListId]
                    .map(t => t.id === action.TaskId ? {...t, title: action.title} : t)}
        case 'ADD-TODOLIST':
            return {...state, [action.todolistId]: []}
        case 'REMOVE-TODOLIST':
            const newState = {...state}
            delete newState[action.id]
            return newState
        default:
            return state
    }
}

export const removeTaskAC = (TaskId: string, TodoListId: string): RemoveTaskActionType =>{
    return {
        type: 'REMOVE-TASK',
        TaskId,
        TodoListId
    }
}

export const addTaskAC = (title: string, TodoListId: string): AddTaskActionType=>{
    return {
        type: 'ADD-TASK',
        title,
        TodoListId
    }
}

export const changeTaskStatusAC = (TaskId: string, filter: boolean, TodoListId: string): ChangeTaskStatusAactionType=>{
    return {
        type: 'CHANGE-TASK-STATUS',
        TaskId,
        TodoListId,
        filter,
    }
}

export const changeTaskTitleAC = (TaskId: string, title: string, TodoListId: string): ChangeTaskTitleActionType=>{
    return {
        type: 'CHANGE-TASK-TITLE',
        TaskId,
        TodoListId,
        title,
    }
}
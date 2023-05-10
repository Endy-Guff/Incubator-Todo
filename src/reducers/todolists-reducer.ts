import {FilterValuesType, TodoListType} from "../App";
import {v1} from "uuid";

export type RemoveTodoListActionType = {
    type: 'REMOVE-TODOLIST',
    id: string
}

export type AddTodoListActionType = {
    type: 'ADD-TODOLIST',
    title: string
    todolistId: string
}

export type ChangeTodoListActionType ={
    type: 'CHANGE-TODOLIST-TITLE',
    title: string,
    id: string
}

type ChangeTodoListFilterActionType = {
    type: 'CHANGE-TODOLIST-FILTER'
    filter: FilterValuesType
    id: string
}

export type TodoListsActionType = ChangeTodoListActionType | RemoveTodoListActionType | AddTodoListActionType | ChangeTodoListFilterActionType

const initialState: TodoListType[] = []

export const todolistsReducer = (todolists = initialState , action: TodoListsActionType): TodoListType[] =>{

    switch (action.type) {
        case "REMOVE-TODOLIST":
            return todolists.filter(tl => tl.id !== action.id)
        case "ADD-TODOLIST":
            const newTodo: TodoListType = {
                id: action.todolistId,
                title: action.title,
                filter: 'all'
            }
            return [...todolists, newTodo]
        case ('CHANGE-TODOLIST-TITLE'):
            return todolists.map(tl => tl.id === action.id ? {...tl, title: action.title} : tl)
        case ('CHANGE-TODOLIST-FILTER'):
            return todolists.map(tl => tl.id === action.id ? {...tl, filter: action.filter} : tl)
        default:
            return todolists
    }
}

export const RemoveTodoListActionCreate = (id: string): RemoveTodoListActionType =>{
    return {
        type: "REMOVE-TODOLIST",
        id: id
    }
}

export const AddTodoListActionCreate = (title: string): AddTodoListActionType=>{
    return {
        type: "ADD-TODOLIST",
        title: title,
        todolistId: v1()
    }
}

export const ChangeTodoListTitleActionCreate = (title: string, id: string): ChangeTodoListActionType=>{
    return {
        type: "CHANGE-TODOLIST-TITLE",
        title: title,
        id: id

    }
}

export const ChangeTodoListFilterActionCreate = (filter: FilterValuesType, id: string): ChangeTodoListFilterActionType =>{
    return{
        type: 'CHANGE-TODOLIST-FILTER',
        filter,
        id,
    }
}
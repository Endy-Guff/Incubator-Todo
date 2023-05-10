import {
    AddTodoListActionCreate,
    ChangeTodoListActionType, ChangeTodoListTitleActionCreate,
    RemoveTodoListActionCreate,
    todolistsReducer
} from "./todolists-reducer";
import {TodoListType} from "../App";
import {v1} from "uuid";

let todolistId1: string
let todolistId2: string

let startState: Array<TodoListType>

beforeEach(()=>{
    todolistId1 = v1();
    todolistId2 = v1();
    startState = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
})


test('correct todolist should be removed', () => {
    //

    //
    const endState = todolistsReducer(startState, RemoveTodoListActionCreate(todolistId1))
    //
    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);
});

test('correct todolist should be added', () => {

    let newTodolistTitle = "New Todolist";

    //
    const endState = todolistsReducer(startState, AddTodoListActionCreate(newTodolistTitle))
    //
    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe(newTodolistTitle);
});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action: ChangeTodoListActionType  = ChangeTodoListTitleActionCreate(newTodolistTitle, todolistId1)

    const endState = todolistsReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
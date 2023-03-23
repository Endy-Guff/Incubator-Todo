import React, { useState } from 'react';
import './App.css';
import { Todolist } from './Todolist';
import { v1 } from 'uuid';

function App() {

    // let tasks1 = [
    //     { id: 1, title: "HTML&CSS", isDone: true },
    //     { id: 2, title: "JS", isDone: true },
    //     { id: 3, title: "ReactJS", isDone: false }
    // ]

    let [tasks1, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false }
     ])
     

     const addTask = (value: string) =>{
         const newTask = { id: v1(), title: value, isDone: false }
         const newObj = [newTask, ...tasks1]
         setTasks(newObj)
     }

     
     const removeTask = (id: string) => {
         // tasks1 = tasks.filter(el => el.id !== id)
         setTasks(tasks1.filter(el => el.id !== id))
        }
        
        let filteredTasks = tasks1
        
    // let [filterValue, setFilterValue] = useState('All')
    // const filterTask = (btn: string) => {
    //     setFilterValue(btn)
    // }
    //     if (filterValue === 'Active'){
    //         filteredTasks = tasks1.filter(el => !el.isDone)
    //     }
    //     if (filterValue === 'Completed'){
    //         filteredTasks = tasks1.filter(el => el.isDone)
    //     }
    //     if (filterValue === 'All'){
    //         filteredTasks = tasks1
    //     }

        
        

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                tasks={tasks1}
                removeTask={removeTask}
                addTask={addTask}
                // filterTask={filterTask}
            />
        </div>
    );
}

export default App;

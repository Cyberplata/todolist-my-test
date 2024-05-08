import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import * as crypto from "crypto";
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed"

function App() {

    // Global state
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])

    const removeTask = (taskId: string) => {
        // удалили таску из массива
        // new version of state with changes
        // const newState = []
        // for (let i = 0; i < tasks.length; i++) {
        //     if (tasks[i].id !== taskId) {
        //         newState.push(tasks[i])
        //     }
        // }

        const newState = tasks.filter(t => t.id !== taskId)
        setTasks(newState)
    }

    const addTask = (title: string) => {
        const newTask: TaskType = {
            id: v1(),
            title,
            isDone: false
        }
        const newState = [...tasks, newTask]
        setTasks(newState)
    }

    const filterDescending = () => {
        const newFilterDescending = [...tasks].sort((a, b) => a.id > b.id ? -1 : 1)
        setTasks(newFilterDescending)
    }

    return (
        <div className="App">
            <Todolist
                title="What to learn"
                subtitle="React"
                description="Frontend"
                tasks={tasks}
                date={'26.03.2024'}
                removeTask={removeTask}
                addTask={addTask}
                filterDescending={filterDescending}
                // changeTodoListFilter={changeTodoListFilter}
            />
            {/*<Todolist title="Songs" subtitle="Let's go everything" description="Cool music" tasks={tasks2}/>*/}
            {/*<Todolist title="Books" subtitle="First law" description="Good dark fantasy" tasks={tasks3} date={'13.04.2024'}/>*/}
        </div>
    );
}

export default App;


// const tasks1: Array<TaskType> = [
//     { id: 1, title: 'HTML&CSS', isDone: true },
//     { id: 2, title: 'JS', isDone: true },
//     { id: 3, title: 'React', isDone: false },
//     { id: 4, title: 'Redux', isDone: false },
//     { id: 5, title: 'Typescript', isDone: false },
//     { id: 6, title: 'RTK query', isDone: false },
// ]

// const tasks2: Array<TaskType> = [
//     // { id: 1, title: 'Hello world', isDone: true },
//     // { id: 2, title: 'I am Happy', isDone: false },
//     // { id: 3, title: 'Yo', isDone: false },
//     // { id: 4, title: 'Redux', isDone: false },
// ]

// const tasks3: Array<TaskType> = [
//     { id: 1, title: 'Goodbye world', isDone: true },
//     { id: 2, title: 'I am SadBoy', isDone: false },
//     { id: 3, title: 'Hole', isDone: true },
//     // { id: 4, title: 'Redux', isDone: false },
// ]
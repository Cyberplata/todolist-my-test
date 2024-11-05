import {useState} from "react";
import {v1} from "uuid";
import type {TasksStateType} from "../App";
import {todolistID1, todolistID2} from "../id-utils";

export const useTasks = () => {
    let [tasks, setTasks] = useState<TasksStateType>({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
    })

    const removeTask = (taskId: string, todolistId: string) => {
        const newTodolistTasks = {...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)}
        setTasks(newTodolistTasks)
    }

    const addTask = (title: string, todolistId: string) => {
        const newTask = {
            id: v1(),
            title: title,
            isDone: false
        }
        const newTodolistTasks = {...tasks, [todolistId]: [newTask, ...tasks[todolistId]]}
        setTasks(newTodolistTasks)
    }

    const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
        const newTodolistTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id == taskId ? {...t, isDone: taskStatus} : t)
        }
        setTasks(newTodolistTasks)
    }

    const updateTask = (todolistId: string, taskId: string, title: string) => {
        const newTodolistTasks = {
            ...tasks,
            [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title} : t)
        }
        setTasks(newTodolistTasks)
    }

    const completelyRemoveTasksForTodolist = (todolistId: string) => {
        delete tasks[todolistId]
        setTasks({...tasks})
    }

    const addStateForNewTodolist = (todolistId: string) => {
        setTasks({
            ...tasks,
            [todolistId]: []
        })
    }

    return {
        tasks,
        removeTask,
        addTask,
        changeTaskStatus,
        updateTask,
        completelyRemoveTasksForTodolist,
        addStateForNewTodolist
    }
}
import {TaskType} from "../App";
import {v1} from "uuid";

type RemoveTaskActionType = {
    type: 'REMOVE-TASK'
    payload: {
        id: string
    }
}

type AddTaskActionType = {
    type: "ADD-TASK"
    payload: {
        title: string
    }
}

type TaskReducerType = RemoveTaskActionType | AddTaskActionType

export const taskReducer = (state: TaskType[], action: TaskReducerType): TaskType[] => {
    switch (action.type) {
        case 'REMOVE-TASK': {
            // const filteredTasks = tasks.filter((task) => {
            //     return task.id !== taskId
            // })
            // setTasks(filteredTasks)
            return state.filter(t => t.id !== action.payload.id)
        }
        case "ADD-TASK": {
            const newTask = {
                id: v1(),
                title: action.payload.title,
                isDone: false
            }
            return [...state, newTask]
        }
        default:
            return state
    }
}

export const removeTaskAC = (id: string): RemoveTaskActionType => {
    return {
        type: 'REMOVE-TASK',
        payload: {
            id
        }
    } as const
}

export const addTaskAC = (title: string): AddTaskActionType => {
    return {
        type: "ADD-TASK",
        payload: {
            title
        }
    } as const
}
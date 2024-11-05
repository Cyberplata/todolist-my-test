import {useState} from "react";
import {v1} from "uuid";
import type {FilterValuesType, TodolistType} from "../App";
import {todolistID1, todolistID2} from "../id-utils";

export const useTodolists = (
    onTodolistRemoved: (todolistId: string) => void,
    onTodolistAdded: (todolistId: string) => void
) => {
    let [todolists, setTodolists] = useState<TodolistType[]>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    const changeFilter = (filter: FilterValuesType, todolistId: string) => {
        const newTodolists = todolists.map(tl => {
            return tl.id === todolistId ? {...tl, filter} : tl
        })
        setTodolists(newTodolists)
    }

    const removeTodolist = (todolistId: string) => {
        const newTodolists = todolists.filter(tl => tl.id !== todolistId)
        setTodolists(newTodolists)

        onTodolistRemoved(todolistId)
    }

    const addTodolist = (title: string) => {
        const todolistId = v1()
        const newTodolist: TodolistType = {id: todolistId, title: title, filter: 'all'}
        onTodolistAdded(todolistId)
        setTodolists([newTodolist, ...todolists])
    }

    const updateTodolist = (todolistId: string, title: string) => {
        const newTodolists = todolists.map(tl => tl.id === todolistId ? {...tl, title} : tl)
        setTodolists(newTodolists)
    }

    return {
        todolists,
        changeFilter,
        removeTodolist,
        addTodolist,
        updateTodolist,
    }
}
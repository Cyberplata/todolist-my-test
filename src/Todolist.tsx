import React, {ChangeEvent, KeyboardEvent, useEffect, useRef, useState} from 'react'
import {Button} from "./Button";
import {FilterValuesType} from "./App";


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    subtitle: string
    description: string
    tasks: TaskType[]
    date?: string
    removeTask: (taskId: string) => void
    addTask: (title: string) => void
    filterAlphabetOrder: () => void
    updateTask: (taskId: string, newTitle: string) => void
}

export const Todolist = (
    {
        title,
        subtitle,
        description,
        tasks,
        date,
        removeTask,
        addTask,
        filterAlphabetOrder,
        updateTask
    }: PropsType) => {


    // Local state
    const [filter, setFilter] = useState<FilterValuesType>("all")
    const [taskTitle, setTaskTitle] = useState("")
    // const [editableListItem, setEditableListItem] = useState(false)
    const [editableListItem, setEditableListItem] = useState<null | string>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (editableListItem && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editableListItem]);

    // UI
    const getTasksForTodoList = (allTasks: Array<TaskType>, nextFilterValue: FilterValuesType) => {
        switch (nextFilterValue) {
            case "active":
                return allTasks.filter(t => t.isDone === false);
            case "completed":
                return allTasks.filter(t => t.isDone === true);
            default:
                return allTasks;
        }
    }
    const tasksForTodoList = getTasksForTodoList(tasks, filter)
    const isTitleTooLong = taskTitle.length > 15
    const ifTaskCanAdded = taskTitle && !isTitleTooLong

    const tasksList: Array<JSX.Element> | JSX.Element = tasksForTodoList.length
        ? tasksForTodoList.map(task => {
            const onClickRemoveTaskHandler = () => removeTask((task.id))
            const onChangeDoubleClickHandler = (id: string) => setEditableListItem(id)
            const onKeyDownEditHandler = (e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === 'Enter') {
                    console.log(e.key, '!')
                    updateTask(task.id, e.currentTarget.value);
                    setEditableListItem(null)
                }
            }
            return (
                editableListItem === task.id
                    ?
                    <li key={task.id}>
                        <input type="text"
                               ref={inputRef}
                               defaultValue={task.title}
                               onBlur={(e:React.FocusEvent<HTMLInputElement> ) => {
                                   updateTask(task.id, e.currentTarget.value);
                                   setEditableListItem(null)
                               }}
                               onKeyDown={onKeyDownEditHandler}/>
                        <Button onClick={onClickRemoveTaskHandler} title={'x'}/>
                    </li>
                    :
                    <li key={task.id} onDoubleClick={() => onChangeDoubleClickHandler(task.id)}>
                        <input type="checkbox" checked={task.isDone} />
                        <span>{task.title}</span>
                        <Button onClick={onClickRemoveTaskHandler} title={'x'}/>
                    </li>
            )
        })
        : <div>Your tasksList is empty</div>

    // Handlers
    const onClickHandlerCreator = (filter: FilterValuesType) => () => setFilter(filter)
    const onClickAddTaskHandler = () => {
        addTask(taskTitle)
        setTaskTitle('')
    }
    const onChangeSetTaskTitle = (e: ChangeEvent<HTMLInputElement>) => setTaskTitle(e.currentTarget.value)
    const onKeyDownAddTaskHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" && ifTaskCanAdded) {
            onClickAddTaskHandler()
        }
    }

    return (
        <div className={"todolist"}>
            <h3 className={"title"}>{title}</h3>
            <h4>{subtitle}</h4>
            <p>{description}</p>

            <div>
                <input
                    value={taskTitle}
                    onChange={onChangeSetTaskTitle}
                    onKeyDown={onKeyDownAddTaskHandler}
                />

                <Button
                    disabled={!ifTaskCanAdded}
                    onClick={onClickAddTaskHandler}
                    title={'+'}
                />
                {/*// условный рендеринг*/}
                {isTitleTooLong && <div>Your task title is too long</div>}
            </div>

            <ul>
                {tasksList}
            </ul>

            <div>
                <Button onClick={onClickHandlerCreator("all")} title={"All"}/>
                <Button onClick={onClickHandlerCreator("active")} title={"Active"}/>
                <Button onClick={onClickHandlerCreator("completed")} title={"Completed"}/>
                <Button onClick={filterAlphabetOrder} title={"Alphabet order"}/>
            </div>
            <div>{date}</div>
        </div>
    )
}
import React, { useState, useEffect } from 'react';
import TaskCard from '../task-card';
import AddButton from '../add-button';
const columns = ["backlog", "todo", "progress", "complete"];
const defaultTasks = [
    {
        id: 1,
        title: "Design backend structure",
        type: "backlog",
    },
    {   
        id: 2,
        title: "Set up repo",
        type: "complete",
    },
    {
        id: 3,
        title: "Build frontend UI",
        type: "progress",
    },
    {
        id:4,
        title: "Build task moving functionality",
        type: "todo",
    },
]

export default function TaskBoard() {
    const [tasks, setTasks] = useState(defaultTasks);

    useEffect(() => {
        console.log("tasks", tasks)
    },[tasks])

    const addTask = (title, type) => {
        setTasks((prevTasks) => {
            return [...prevTasks, {id: prevTasks.length + 1, title: title, type: type}]
        })
    }

    const moveTask = (id, target) => {
        setTasks((prevTasks) => {
            let newTasks = [...prevTasks]
            newTasks.forEach((task) => {
                if(task.id === id) {
                    console.log(task.id)
                    task.type = target
                }
            })
            return newTasks
        })
    }

    const renderColumn = (type, idx) => {
        const matchingTasks = tasks.filter((task) => task.type === type)

        return (
            <div key={idx} style={{width: 300, height: 500, border: "1px solid lightgray", borderRadius: 10, display: "flex", flexDirection: "column", alignItems: "center"}}>
                <p style={{fontWeight: "bold"}}>{type.toUpperCase()}</p>
                <div style={{width: "100%", height: "80%", display: "flex", flexDirection: "column", alignItems: "center"}}>
                    {matchingTasks.map((task, idx) => {
                        return(
                            <TaskCard key={task.id} task={task} taskIdx={idx} moveTask={moveTask} columns={columns}/>
                        )
                    })}
                </div>
                <AddButton type={type} addTask={addTask}/>
            </div>
        )
    }

    return (
        <>
            <div style={{display: "flex", width: "90vw", height: "80vh", justifyContent: "space-around", alignItems: "center"}}>
                {columns.map((col, idx) => {
                    return (
                        renderColumn(col, idx)
                    )
                })}
            </div>
        </>
    )
}

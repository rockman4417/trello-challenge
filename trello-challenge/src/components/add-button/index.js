import React, { useEffect, useReducer } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const reducer = (state, action) => {
    switch (action.type) {
        case 'toggle':
            return { ...state, isAdding: !state.isAdding };
        case 'handleChangeText':
            return { ...state, title: action.payload };
    }
}

export default function AddButton({type, addTask}) {
    const [state, dispatch] = useReducer(reducer, {isAdding: false, title: "", error: ""});

    useEffect(() => {
        console.log(state.title)
    },[state.title])

    const onSave = () => {
        console.log("saving!")
        dispatch({type: 'toggle'})
        addTask(state.title, type)
    }

    if(!state.isAdding) {
        return (
            <Button onClick={() => dispatch({type: 'toggle'})}>Add Task</Button>
        )
    }
    else {
        return (
            <div>
                <TextField
                  error={state.error}
                  id={state.error ? "outline-error" : "outlined-basic"}
                  label="New Task"
                  placeholder="Do Something"
                  onChange={(e) => {dispatch({type: 'handleChangeText', payload: e.target.value})}}
                />
                <div>
                    <Button onClick={onSave}>SAVE</Button>
                    <Button onClick={() => dispatch({type: 'toggle'})}>X</Button>
                </div>
            </div>
        )
    }
}
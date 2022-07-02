import React, { useReducer } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

const reducer = (state, action) => {
    switch (action.type) {
        case 'toggle':
            return { ...state, isAdding: !state.isAdding };
        case 'title':
            return { ...state, title: action.payload };
        case 'error':
            return { ...state, error: action.payload };
        default:
            throw new Error("no action type");
    }
}

export default function AddButton({type, addTask}) {
    const [state, dispatch] = useReducer(reducer, {isAdding: false, title: "", error: ""});

    const onSave = (e) => {
        e.preventDefault();
        if(!state.title) {
            dispatch({type: "error", payload: "TITLE CANNOT BE BLANK"})
            return
        }
        addTask(state.title, type);
        clearState();
    }

    const clearState = () => {
        dispatch({type: 'toggle'});
        dispatch({type: "error", payload: ""});
        dispatch({type: "title", payload: ""});
    }

    if(!state.isAdding) {
        return (
            <Button onClick={() => dispatch({type: 'toggle'})}>Add Task</Button>
        )
    }
    else {
        return (
            <form>
                <TextField
                  error={state.error}
                  autoFocus={true}
                  id={state.error ? "outline-error" : "outlined-basic"}
                  label="New Task"
                  placeholder="Do Something"
                  helperText={state.error}
                  onChange={(e) => {dispatch({type: 'title', payload: e.target.value})}}
                />
                <div>
                    <Button type="submit" onClick={onSave}>SAVE</Button>
                    <Button onClick={clearState}>X</Button>
                </div>
            </form>
        )
    }
}

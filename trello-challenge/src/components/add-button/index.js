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

const ACTIONS = {TOGGLE: "toggle", TITLE: "title", ERROR: "error"}

export default function AddButton({type, addTask}) {
    const [state, dispatch] = useReducer(reducer, {isAdding: false, title: "", error: ""});

    const onSave = (e) => {
        e.preventDefault();
        if(!state.title) {
            dispatch({type: ACTIONS.ERROR, payload: "TITLE CANNOT BE BLANK"})
            return
        }
        addTask(state.title, type);
        clearState();
    }

    const clearState = () => {
        dispatch({type: ACTIONS.TOGGLE});
        dispatch({type: ACTIONS.ERROR, payload: ""});
        dispatch({type: ACTIONS.TITLE, payload: ""});
    }

    if(!state.isAdding) {
        return (
            <Button onClick={() => dispatch({type: ACTIONS.TOGGLE})}>Add Task</Button>
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
                  onChange={(e) => {dispatch({type: ACTIONS.TITLE, payload: e.target.value})}}
                />
                <div>
                    <Button type="submit" onClick={onSave}>SAVE</Button>
                    <Button onClick={clearState}>X</Button>
                </div>
            </form>
        )
    }
}

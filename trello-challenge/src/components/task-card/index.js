import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

export default function TaskCard({task, taskIdx, moveTask, columns}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div style={{width: "90%", border: "1px solid gray", borderRadius: 10, marginBottom: 4, marginTop: 4}}>
        <p>{task.title}</p>
        <div>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            Move To
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            {
              columns.map((column, idx) => {
                return (
                  <MenuItem key={idx} onClick={() => {moveTask(task.id, column)}}>{column.toUpperCase()}</MenuItem>
                )
              })
            }
          </Menu>
        </div>
    </div>
  );
}
import React, { useState } from 'react';
import {
  Box,
  Grid,
  Paper,
  Typography,
  Chip,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../../store';
import { Task, priorityColors, statusColors } from '../../types';
import { deleteTask } from '../../store/slices/tasksSlice';

interface TasksProps {
  openDialog: boolean;
  onCloseDialog: () => void;
  selectedDate?: Date | null;
  onTaskClick: (task: Task) => void;
}

export const Tasks: React.FC<TasksProps> = ({ openDialog, onCloseDialog, selectedDate, onTaskClick }) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuTask, setMenuTask] = useState<Task | null>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, task: Task) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
    setMenuTask(task);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuTask(null);
  };

  const handleEditClick = (task: Task) => {
    onTaskClick(task);
    handleMenuClose();
  };

  const handleDeleteClick = (task: Task) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task.id));
    }
    handleMenuClose();
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {tasks.map((task: Task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Paper
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                position: 'relative',
                cursor: 'pointer',
                '&:hover': {
                  boxShadow: 3,
                },
              }}
              onClick={() => onTaskClick(task)}
            >
              <Box sx={{ position: 'absolute', top: 8, right: 8 }}>
                <IconButton
                  size="small"
                  onClick={(e) => handleMenuOpen(e, task)}
                >
                  <MoreVertIcon />
                </IconButton>
              </Box>

              <Typography variant="h6" gutterBottom>
                {task.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mb: 2,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {task.description}
              </Typography>

              <Box sx={{ mt: 'auto' }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
                  <Chip
                    label={task.priority}
                    size="small"
                    sx={{ 
                      bgcolor: priorityColors[task.priority], 
                      color: 'white',
                      fontWeight: 500,
                    }}
                  />
                  <Chip
                    label={task.status}
                    size="small"
                    sx={{ 
                      bgcolor: statusColors[task.status], 
                      color: 'white',
                      fontWeight: 500,
                    }}
                  />
                </Box>

                <Typography variant="caption" color="text.secondary">
                  Due: {new Date(task.dueDate).toLocaleDateString()}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        {menuTask && (
          <>
            <MenuItem onClick={() => handleEditClick(menuTask)}>
              <EditIcon fontSize="small" sx={{ mr: 1 }} />
              Edit
            </MenuItem>
            <MenuItem onClick={() => handleDeleteClick(menuTask)}>
              <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
              Delete
            </MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
};

export default Tasks;
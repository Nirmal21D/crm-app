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
    <Box sx={{ p: { xs: 1, sm: 2 } }}>
      <Grid container spacing={{ xs: 1.5, sm: 2 }}>
        {tasks.map((task: Task) => (
          <Grid item xs={12} sm={6} md={4} key={task.id}>
            <Paper
              sx={{
                p: { xs: 1.5, sm: 2 },
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
                  sx={{ p: { xs: 0.5, sm: 1 } }}
                >
                  <MoreVertIcon sx={{ fontSize: { xs: 20, sm: 24 } }} />
                </IconButton>
              </Box>

              <Typography 
                variant="h6" 
                gutterBottom
                sx={{ 
                  fontSize: { xs: '1rem', sm: '1.25rem' },
                  pr: 4
                }}
              >
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
                  fontSize: { xs: '0.75rem', sm: '0.875rem' }
                }}
              >
                {task.description}
              </Typography>

              <Box sx={{ mt: 'auto' }}>
                <Box sx={{ display: 'flex', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                  <Chip
                    label={task.priority}
                    size="small"
                    sx={{ 
                      bgcolor: priorityColors[task.priority], 
                      color: 'white',
                      fontWeight: 500,
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      height: { xs: 24, sm: 28 }
                    }}
                  />
                  <Chip
                    label={task.status}
                    size="small"
                    sx={{ 
                      bgcolor: statusColors[task.status], 
                      color: 'white',
                      fontWeight: 500,
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      height: { xs: 24, sm: 28 }
                    }}
                  />
                </Box>

                <Typography 
                  variant="caption" 
                  color="text.secondary"
                  sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                >
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
        PaperProps={{
          sx: {
            mt: 1,
            '& .MuiMenuItem-root': {
              fontSize: { xs: '0.875rem', sm: '1rem' },
              py: { xs: 1, sm: 1.5 }
            }
          }
        }}
      >
        {menuTask && (
          <>
            <MenuItem onClick={() => handleEditClick(menuTask)}>
              <EditIcon fontSize="small" sx={{ mr: 1, fontSize: { xs: 18, sm: 20 } }} />
              Edit
            </MenuItem>
            <MenuItem onClick={() => handleDeleteClick(menuTask)}>
              <DeleteIcon fontSize="small" sx={{ mr: 1, fontSize: { xs: 18, sm: 20 } }} />
              Delete
            </MenuItem>
          </>
        )}
      </Menu>
    </Box>
  );
};

export default Tasks;
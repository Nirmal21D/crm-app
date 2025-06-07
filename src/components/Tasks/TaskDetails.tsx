import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Chip,
  Stack,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { Task, priorityColors, statusColors } from '../../types';
import { format } from 'date-fns';
import TaskForm from './TaskForm';

interface TaskDetailsProps {
  open: boolean;
  onClose: () => void;
  task: Task | null;
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ open, onClose, task }) => {
  const [isEditing, setIsEditing] = useState(false);

  if (!task) return null;

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <TaskForm
        open={true}
        onClose={() => {
          handleCloseEdit();
          onClose();
        }}
        task={task}
        selectedDate={new Date(task.dueDate)}
      />
    );
  }

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        pb: 1
      }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: 600 }}>
          Task Details
        </Typography>
        <Box>
          <IconButton 
            size="small" 
            onClick={handleEdit}
            sx={{ mr: 1 }}
          >
            <EditIcon />
          </IconButton>
          <IconButton 
            size="small" 
            onClick={onClose}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        <Stack spacing={2}>
          <Box>
            <Typography variant="h5" gutterBottom>
              {task.title}
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-wrap' }}>
              {task.description || 'No description provided'}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom color="text.secondary">
              Due Date
            </Typography>
            <Typography variant="body1">
              {format(new Date(task.dueDate), 'PPP')}
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom color="text.secondary">
              Status
            </Typography>
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

          <Box>
            <Typography variant="subtitle2" gutterBottom color="text.secondary">
              Priority
            </Typography>
            <Chip
              label={task.priority}
              size="small"
              sx={{
                bgcolor: priorityColors[task.priority],
                color: 'white',
                fontWeight: 500,
              }}
            />
          </Box>

          <Box>
            <Typography variant="subtitle2" gutterBottom color="text.secondary">
              Type
            </Typography>
            <Chip
              label={task.type}
              size="small"
              variant="outlined"
            />
          </Box>

          {task.assignedTo && (
            <Box>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Assigned To
              </Typography>
              <Typography variant="body1">
                {task.assignedTo}
              </Typography>
            </Box>
          )}

          <Box>
            <Typography variant="subtitle2" gutterBottom color="text.secondary">
              Created
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {format(new Date(task.createdAt), 'PPP')}
            </Typography>
          </Box>

          {task.updatedAt !== task.createdAt && (
            <Box>
              <Typography variant="subtitle2" gutterBottom color="text.secondary">
                Last Updated
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {format(new Date(task.updatedAt), 'PPP')}
              </Typography>
            </Box>
          )}
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2, pt: 0 }}>
        <Button onClick={onClose}>Close</Button>
        <Button 
          variant="contained" 
          startIcon={<EditIcon />}
          onClick={handleEdit}
        >
          Edit Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskDetails;
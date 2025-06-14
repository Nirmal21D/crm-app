import React, { useState } from 'react';
import {
  Box,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Typography,
  Container,
  Paper,
} from '@mui/material';
import {
  ViewModule as GridViewIcon,
  ViewList as ListViewIcon,
  CalendarToday as CalendarIcon,
  Add as AddIcon,
} from '@mui/icons-material';
import Tasks from '../components/Tasks/Tasks';
import TaskList from '../components/Tasks/TaskList';
import Calendar from '../components/Calendar/Calendar';
import TaskForm from '../components/Tasks/TaskForm';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { Task } from '../types';

type ViewType = 'grid' | 'list' | 'calendar';

const TasksPage: React.FC = () => {
  const [view, setView] = useState<ViewType>('grid');
  const [openNewTaskDialog, setOpenNewTaskDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const tasks = useSelector((state: RootState) => state.tasks.tasks);

  const handleViewChange = (event: React.MouseEvent<HTMLElement>, newView: ViewType) => {
    if (newView !== null) {
      setView(newView);
    }
  };

  const handleNewTask = (date?: Date) => {
    setSelectedTask(null);
    setSelectedDate(date || null);
    setOpenNewTaskDialog(true);
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setSelectedDate(null);
    setOpenNewTaskDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenNewTaskDialog(false);
    setSelectedDate(null);
    setSelectedTask(null);
  };

  return (
    <Box 
      sx={{ 
        minHeight: 'calc(100vh - 64px)', // Subtract navbar height
        bgcolor: 'background.default',
        py: 4,
      }}
    >
      <Container 
        maxWidth="lg" 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          gap: 3,
        }}
      >
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 1.5, sm: 2 },
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: { xs: 'flex-start', sm: 'center' },
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            gap: { xs: 1.5, sm: 2 }
          }}
        >
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 600,
              fontSize: { xs: '1.5rem', sm: '2.125rem' },
              mb: { xs: 1, sm: 0 }
            }}
          >
            Tasks & Follow-ups
          </Typography>
          <Box sx={{ 
            display: 'flex', 
            gap: { xs: 1, sm: 2 },
            flexWrap: 'wrap',
            width: { xs: '100%', sm: 'auto' }
          }}>
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={handleViewChange}
              aria-label="view selector"
              size="small"
              sx={{
                '& .MuiToggleButton-root': {
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  px: { xs: 1, sm: 1.5 },
                  py: { xs: 0.5, sm: 0.75 }
                }
              }}
            >
              <ToggleButton value="grid" aria-label="grid view">
                <GridViewIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
              </ToggleButton>
              <ToggleButton value="list" aria-label="list view">
                <ListViewIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
              </ToggleButton>
              <ToggleButton value="calendar" aria-label="calendar view">
                <CalendarIcon sx={{ fontSize: { xs: 18, sm: 20 } }} />
              </ToggleButton>
            </ToggleButtonGroup>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => handleNewTask()}
              sx={{
                px: { xs: 2, sm: 3 },
                py: { xs: 0.75, sm: 1 },
                boxShadow: 'none',
                '&:hover': {
                  boxShadow: 'none',
                },
                width: { xs: '100%', sm: 'auto' },
                fontSize: { xs: '0.875rem', sm: '1rem' }
              }}
            >
              New Task
            </Button>
          </Box>
        </Paper>

        <Paper
          elevation={0}
          sx={{
            borderRadius: 2,
            border: '1px solid',
            borderColor: 'divider',
            overflow: 'hidden',
          }}
        >
          {view === 'grid' && (
            <Tasks 
              openDialog={false}
              onCloseDialog={handleCloseDialog}
              selectedDate={selectedDate}
              onTaskClick={handleTaskClick}
            />
          )}
          {view === 'list' && (
            <TaskList 
              tasks={tasks} 
              onTaskClick={handleTaskClick} 
            />
          )}
          {view === 'calendar' && (
            <Calendar 
              onTaskClick={handleTaskClick}
              onAddTask={handleNewTask}
            />
          )}
        </Paper>

        <TaskForm
          open={openNewTaskDialog}
          onClose={handleCloseDialog}
          task={selectedTask}
          selectedDate={selectedDate}
        />
      </Container>
    </Box>
  );
};

export default TasksPage; 
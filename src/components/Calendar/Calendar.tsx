import React, { useState, useMemo } from 'react';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Grid,
  Button,
  Tooltip,
  Chip,
  Badge,
  useTheme,
  alpha,
  Stack,
  Container,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Today as TodayIcon,
  Event as EventIcon,
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';
import { Task, priorityColors } from '../../types';
import { format, isSameDay, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';
import TaskDetails from '../Tasks/TaskDetails';

interface CalendarProps {
  onTaskClick: (task: Task) => void;
  onAddTask: (date: Date) => void;
}

export const Calendar: React.FC<CalendarProps> = ({ onTaskClick, onAddTask }) => {
  const theme = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const tasks = useSelector((state: RootState) => state.tasks.tasks);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);

  const daysInMonth = useMemo(() => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = startOfMonth(currentDate);
    const lastDay = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start: firstDay, end: lastDay });

    // Get the day of the week for the first day (0 = Sunday)
    const firstDayOfWeek = firstDay.getDay();

    // Add days from previous month
    const previousMonthDays = Array.from({ length: firstDayOfWeek }, (_, i) => {
      const date = new Date(year, month, -i);
      return {
        date,
        isCurrentMonth: false,
        isToday: isSameDay(date, new Date()),
      };
    }).reverse();

    // Current month days
    const currentMonthDays = days.map(date => ({
      date,
      isCurrentMonth: true,
      isToday: isSameDay(date, new Date()),
    }));

    // Add days from next month
    const remainingDays = 42 - (previousMonthDays.length + currentMonthDays.length);
    const nextMonthDays = Array.from({ length: remainingDays }, (_, i) => {
      const date = new Date(year, month + 1, i + 1);
      return {
        date,
        isCurrentMonth: false,
        isToday: isSameDay(date, new Date()),
      };
    });

    return [...previousMonthDays, ...currentMonthDays, ...nextMonthDays];
  }, [currentDate]);

  const tasksForDate = (date: Date) => {
    return tasks.filter((task: Task) => isSameDay(new Date(task.dueDate), date));
  };

  const handlePreviousMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedTask(null);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton onClick={handlePreviousMonth} size="small">
            <ChevronLeftIcon />
          </IconButton>
          <Typography variant="h6" sx={{ minWidth: 200, textAlign: 'center' }}>
            {format(currentDate, 'MMMM yyyy')}
          </Typography>
          <IconButton onClick={handleNextMonth} size="small">
            <ChevronRightIcon />
          </IconButton>
        </Box>
        <Button
          startIcon={<TodayIcon />}
          onClick={handleToday}
          variant="outlined"
          size="small"
        >
          Today
        </Button>
      </Box>

      {/* Days of week header */}
      <Grid container spacing={0} sx={{ mb: 0 }}>
        {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map((day) => (
          <Grid item xs key={day}>
            <Box sx={{ 
              height: 40,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: theme.palette.background.paper,
              borderRadius: '4px 4px 0 0',
              mx: 0.5,
              boxShadow: 1
            }}>
              <Typography 
                sx={{ 
                  fontWeight: 600,
                  color: day === 'Sunday' ? 'error.main' : 'text.primary',
                  fontSize: '0.875rem'
                }}
              >
                {day.slice(0, 3)}
              </Typography>
            </Box>
          </Grid>
        ))}
      </Grid>

      {/* Calendar grid */}
      <Grid container spacing={0} sx={{ 
        borderTop: 1, 
        borderLeft: 1, 
        borderColor: 'divider',
        overflow: 'hidden',
        display: 'grid',
        gridTemplateColumns: 'repeat(7, 1fr)',
        '& > .MuiGrid-item': {
          borderBottom: 1, 
          borderRight: 1, 
          borderColor: 'divider',
          aspectRatio: '1',
          p: 0,
          width: '100%',
          maxWidth: '100%',
          flexBasis: 'unset'
        }
      }}>
        {daysInMonth.map(({ date, isCurrentMonth, isToday }) => {
          const dayTasks = tasksForDate(date);
          const hasHighPriority = dayTasks.some(task => task.priority === 'high');
          
          return (
            <Grid 
              item 
              key={date.toISOString()} 
              sx={{ 
                bgcolor: isToday ? alpha(theme.palette.primary.main, 0.1) : 'transparent',
                opacity: isCurrentMonth ? 1 : 0.5,
                position: 'relative',
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                }
              }}
            >
              <Box 
                sx={{ 
                  p: 1,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 0.5
                }}
              >
                <Box sx={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  height: 28
                }}>
                  <Typography 
                    sx={{ 
                      fontWeight: isToday ? 600 : 400,
                      color: hasHighPriority ? 'error.main' : 'inherit'
                    }}
                  >
                    {format(date, 'd')}
                  </Typography>
                  {isCurrentMonth && (
                    <IconButton 
                      size="small" 
                      onClick={() => onAddTask(date)}
                      sx={{ 
                        opacity: 0, 
                        transition: '0.2s', 
                        '&:hover': { opacity: 1 },
                        p: 0.5
                      }}
                    >
                      <EventIcon fontSize="small" />
                    </IconButton>
                  )}
                </Box>

                <Stack 
                  spacing={0.5} 
                  sx={{ 
                    overflow: 'auto',
                    flex: 1,
                    '&::-webkit-scrollbar': {
                      width: '4px'
                    },
                    '&::-webkit-scrollbar-thumb': {
                      backgroundColor: theme.palette.divider,
                      borderRadius: '4px'
                    }
                  }}
                >
                  {dayTasks.map((task) => (
                    <Tooltip key={task.id} title={task.description || 'No description'}>
                      <Chip
                        label={task.title}
                        size="small"
                        onClick={() => handleTaskClick(task)}
                        sx={{
                          maxWidth: '100%',
                          height: 24,
                          backgroundColor: alpha(priorityColors[task.priority], 0.1),
                          borderLeft: 3,
                          borderColor: priorityColors[task.priority],
                          '& .MuiChip-label': {
                            fontSize: '0.75rem',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden'
                          }
                        }}
                      />
                    </Tooltip>
                  ))}
                </Stack>
              </Box>
            </Grid>
          );
        })}
      </Grid>

      <TaskDetails
        open={detailsOpen}
        onClose={handleCloseDetails}
        task={selectedTask}
      />
    </Box>
  );
};

export default Calendar;
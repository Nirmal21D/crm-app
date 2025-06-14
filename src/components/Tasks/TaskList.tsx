import React, { useState } from 'react';
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Toolbar,
  Typography,
  TextField,
  IconButton,
  Chip,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  FilterList as FilterListIcon,
  Search as SearchIcon,
} from '@mui/icons-material';
import { Task, priorityColors, statusColors } from '../../types';

type Order = 'asc' | 'desc';

interface HeadCell {
  id: keyof Task;
  label: string;
  numeric: boolean;
  sortable: boolean;
}

const headCells: HeadCell[] = [
  { id: 'title', label: 'Title', numeric: false, sortable: true },
  { id: 'type', label: 'Type', numeric: false, sortable: true },
  { id: 'priority', label: 'Priority', numeric: false, sortable: true },
  { id: 'status', label: 'Status', numeric: false, sortable: true },
  { id: 'dueDate', label: 'Due Date', numeric: false, sortable: true },
];

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}

export const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskClick }) => {
  const [order, setOrder] = useState<Order>('asc');
  const [orderBy, setOrderBy] = useState<keyof Task>('dueDate');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterType, setFilterType] = useState<string>('all');

  const handleRequestSort = (property: keyof Task) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus;
    const matchesType = filterType === 'all' || task.type === filterType;

    return matchesSearch && matchesPriority && matchesStatus && matchesType;
  });

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (orderBy === 'dueDate') {
      const dateA = new Date(a.dueDate).getTime();
      const dateB = new Date(b.dueDate).getTime();
      return order === 'asc' ? dateA - dateB : dateB - dateA;
    }

    const compareA = a[orderBy];
    const compareB = b[orderBy];

    if (compareA === undefined || compareB === undefined) {
      return 0;
    }

    if (compareA < compareB) {
      return order === 'asc' ? -1 : 1;
    }
    if (compareA > compareB) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar sx={{ 
          p: { xs: 1.5, sm: 2 },
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          gap: { xs: 1.5, sm: 2 },
          alignItems: { xs: 'stretch', sm: 'center' }
        }}>
          <Box sx={{ 
            flexGrow: { xs: 1, sm: 0.7 },
            width: { xs: '100%', sm: 'auto' },
            display: 'flex', 
            alignItems: 'center',
            mb: { xs: 1.5, sm: 0 }
          }}>
            <SearchIcon sx={{ mr: 1, fontSize: { xs: 20, sm: 24 } }} />
            <TextField
              variant="outlined"
              size="small"
              placeholder="Search tasks..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ 
                width: '100%',
                '& .MuiOutlinedInput-root': {
                  height: { xs: 40, sm: 48 }
                }
              }}
            />
          </Box>

          <Box sx={{ 
            flexGrow: { xs: 1, sm: 1 },
            display: 'flex', 
            gap: { xs: 1.5, sm: 1.5 }, 
            flexWrap: 'wrap',
            width: { xs: '100%', sm: 'auto' },
            justifyContent: { xs: 'flex-start', sm: 'flex-end' }
          }}>
            <FormControl size="small" sx={{ flex: 1, minWidth: { xs: '100%', sm: 120 } }}>
              <InputLabel sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Priority</InputLabel>
              <Select
                value={filterPriority}
                label="Priority"
                onChange={(e) => setFilterPriority(e.target.value)}
                sx={{ 
                  height: { xs: 40, sm: 48 },
                  '& .MuiSelect-select': {
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }
                }}
              >
                <MenuItem value="all" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>All</MenuItem>
                <MenuItem value="high" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>High</MenuItem>
                <MenuItem value="medium" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Medium</MenuItem>
                <MenuItem value="low" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Low</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ flex: 1, minWidth: { xs: '100%', sm: 120 } }}>
              <InputLabel sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Status</InputLabel>
              <Select
                value={filterStatus}
                label="Status"
                onChange={(e) => setFilterStatus(e.target.value)}
                sx={{ 
                  height: { xs: 40, sm: 48 },
                  '& .MuiSelect-select': {
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }
                }}
              >
                <MenuItem value="all" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>All</MenuItem>
                <MenuItem value="pending" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Pending</MenuItem>
                <MenuItem value="in-progress" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>In Progress</MenuItem>
                <MenuItem value="completed" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Completed</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ flex: 1, minWidth: { xs: '100%', sm: 120 } }}>
              <InputLabel sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Type</InputLabel>
              <Select
                value={filterType}
                label="Type"
                onChange={(e) => setFilterType(e.target.value)}
                sx={{ 
                  height: { xs: 40, sm: 48 },
                  '& .MuiSelect-select': {
                    fontSize: { xs: '0.875rem', sm: '1rem' }
                  }
                }}
              >
                <MenuItem value="all" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>All</MenuItem>
                <MenuItem value="follow-up" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Follow-up</MenuItem>
                <MenuItem value="meeting" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Meeting</MenuItem>
                <MenuItem value="call" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Call</MenuItem>
                <MenuItem value="email" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Email</MenuItem>
                <MenuItem value="other" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>Other</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </Toolbar>

        <Box sx={{ overflowX: 'auto' }}>
          <TableContainer>
            <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
              <TableHead>
                <TableRow>
                  {headCells.map((headCell) => (
                    <TableCell
                      key={headCell.id}
                      align={headCell.numeric ? 'right' : 'left'}
                      sortDirection={orderBy === headCell.id ? order : false}
                      sx={{ 
                        fontSize: { xs: '0.875rem', sm: '1rem' },
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {headCell.sortable ? (
                        <TableSortLabel
                          active={orderBy === headCell.id}
                          direction={orderBy === headCell.id ? order : 'asc'}
                          onClick={() => handleRequestSort(headCell.id)}
                          sx={{ fontSize: 'inherit' }}
                        >
                          {headCell.label}
                        </TableSortLabel>
                      ) : (
                        headCell.label
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedTasks.map((task) => (
                  <TableRow
                    hover
                    onClick={() => onTaskClick(task)}
                    role="checkbox"
                    tabIndex={-1}
                    key={task.id}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell component="th" scope="row">
                      <Typography 
                        variant="body1"
                        sx={{ 
                          fontSize: { xs: '0.875rem', sm: '1rem' },
                          fontWeight: 500
                        }}
                      >
                        {task.title}
                      </Typography>
                      {task.relatedTo && (
                        <Typography 
                          variant="caption" 
                          color="text.secondary"
                          sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
                        >
                          Related to: {task.relatedTo.name}
                        </Typography>
                      )}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={task.type}
                        size="small"
                        variant="outlined"
                        sx={{ 
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          height: { xs: 24, sm: 28 }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={task.priority}
                        size="small"
                        sx={{ 
                          bgcolor: priorityColors[task.priority], 
                          color: 'white',
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          height: { xs: 24, sm: 28 }
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={task.status}
                        size="small"
                        sx={{ 
                          bgcolor: statusColors[task.status], 
                          color: 'white',
                          fontSize: { xs: '0.75rem', sm: '0.875rem' },
                          height: { xs: 24, sm: 28 }
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                      {new Date(task.dueDate).toLocaleDateString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Paper>
    </Box>
  );
};

export default TaskList; 
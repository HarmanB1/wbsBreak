import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Filter,
  ZoomIn,
  ZoomOut,
  Download,
  Grid3x3,
  List,
  Settings,
  Play,
  CheckCircle2,
  Circle,
  AlertCircle,
  Users,
  Tag,
  MoreVertical
} from 'lucide-react';

// Mock data - replace with your actual WBS data
const mockTasks = [
  {
    id: '1',
    name: 'Phase 1: Foundation',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2024-02-15'),
    status: 'completed',
    progress: 100,
    assignee: 'Team A',
    priority: 'high',
    children: [
      {
        id: '2',
        name: 'Setup Database',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-01-25'),
        status: 'completed',
        progress: 100,
        assignee: 'John',
        priority: 'high'
      },
      {
        id: '3',
        name: 'Auth System',
        startDate: new Date('2024-01-26'),
        endDate: new Date('2024-02-15'),
        status: 'completed',
        progress: 100,
        assignee: 'Sarah',
        priority: 'high'
      }
    ]
  },
  {
    id: '4',
    name: 'Phase 2: UI Design',
    startDate: new Date('2024-02-01'),
    endDate: new Date('2024-03-10'),
    status: 'in-progress',
    progress: 65,
    assignee: 'Team B',
    priority: 'medium',
    children: [
      {
        id: '5',
        name: 'Figma Mockups',
        startDate: new Date('2024-02-01'),
        endDate: new Date('2024-02-20'),
        status: 'completed',
        progress: 100,
        assignee: 'Emily',
        priority: 'medium'
      },
      {
        id: '6',
        name: 'Component Library',
        startDate: new Date('2024-02-21'),
        endDate: new Date('2024-03-10'),
        status: 'in-progress',
        progress: 45,
        assignee: 'Mike',
        priority: 'medium'
      }
    ]
  },
  {
    id: '7',
    name: 'Phase 3: Backend',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2024-04-15'),
    status: 'pending',
    progress: 0,
    assignee: 'Team C',
    priority: 'high',
    children: [
      {
        id: '8',
        name: 'API Routes',
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-03-25'),
        status: 'pending',
        progress: 0,
        assignee: 'Alex',
        priority: 'high'
      },
      {
        id: '9',
        name: 'Data Models',
        startDate: new Date('2024-03-26'),
        endDate: new Date('2024-04-15'),
        status: 'pending',
        progress: 0,
        assignee: 'Chris',
        priority: 'medium'
      }
    ]
  }
];

const STATUS_CONFIG = {
  completed: { color: 'bg-green-500', icon: CheckCircle2, label: 'Completed' },
  'in-progress': { color: 'bg-blue-500', icon: Play, label: 'In Progress' },
  pending: { color: 'bg-gray-400', icon: Circle, label: 'Pending' },
  delayed: { color: 'bg-red-500', icon: AlertCircle, label: 'Delayed' }
};

const PRIORITY_COLORS = {
  high: 'bg-red-100 text-red-700 border-red-300',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  low: 'bg-green-100 text-green-700 border-green-300'
};

const VIEW_MODES = {
  GANTT: 'gantt',
  LIST: 'list',
  CALENDAR: 'calendar'
};

const ZOOM_LEVELS = {
  DAYS: { label: 'Days', days: 1, width: 40 },
  WEEKS: { label: 'Weeks', days: 7, width: 100 },
  MONTHS: { label: 'Months', days: 30, width: 120 }
};

export const Timeline = () => {
  const [viewMode, setViewMode] = useState(VIEW_MODES.GANTT);
  const [zoomLevel, setZoomLevel] = useState('WEEKS');
  const [showCompleted, setShowCompleted] = useState(true);
  const [showSubtasks, setShowSubtasks] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());

  // Flatten tasks for display
  const flattenTasks = (tasks, level = 0) => {
    let result = [];
    tasks.forEach(task => {
      result.push({ ...task, level });
      if (showSubtasks && task.children) {
        result = result.concat(flattenTasks(task.children, level + 1));
      }
    });
    return result;
  };

  const allTasks = useMemo(() => flattenTasks(mockTasks), [showSubtasks]);

  const filteredTasks = useMemo(() => {
    return allTasks.filter(task => {
      if (!showCompleted && task.status === 'completed') return false;
      if (filterStatus !== 'all' && task.status !== filterStatus) return false;
      if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
      return true;
    });
  }, [allTasks, showCompleted, filterStatus, filterPriority]);

  // Calculate timeline range
  const timelineRange = useMemo(() => {
    if (filteredTasks.length === 0) return { start: new Date(), end: new Date() };

    const dates = filteredTasks.flatMap(t => [t.startDate, t.endDate]);
    const minDate = new Date(Math.min(...dates));
    const maxDate = new Date(Math.max(...dates));

    // Add padding
    minDate.setDate(minDate.getDate() - 7);
    maxDate.setDate(maxDate.getDate() + 7);

    return { start: minDate, end: maxDate };
  }, [filteredTasks]);

  // Generate time columns
  const timeColumns = useMemo(() => {
    const columns = [];
    const { start, end } = timelineRange;
    const currentCol = new Date(start);
    const zoom = ZOOM_LEVELS[zoomLevel];

    while (currentCol <= end) {
      columns.push(new Date(currentCol));
      currentCol.setDate(currentCol.getDate() + zoom.days);
    }

    return columns;
  }, [timelineRange, zoomLevel]);

  const getTaskPosition = (task) => {
    const { start } = timelineRange;
    const zoom = ZOOM_LEVELS[zoomLevel];

    const daysDiff = (task.startDate - start) / (1000 * 60 * 60 * 24);
    const duration = (task.endDate - task.startDate) / (1000 * 60 * 60 * 24);

    const left = (daysDiff / zoom.days) * zoom.width;
    const width = (duration / zoom.days) * zoom.width;

    return { left, width: Math.max(width, 20) };
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const formatColumnHeader = (date) => {
    const zoom = ZOOM_LEVELS[zoomLevel];
    if (zoom.days === 1) {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    } else if (zoom.days === 7) {
      return `Week of ${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}`;
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    }
  };

  const isToday = (date) => {
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
              <Calendar className="w-8 h-8 text-blue-600" />
              Project Timeline
            </h1>
            <p className="text-gray-500 mt-1">Visualize your project schedule</p>
          </div>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-md">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>

        {/* Toolbar */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div className="flex items-center gap-2">
            {/* View Mode */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setViewMode(VIEW_MODES.GANTT)}
                className={`px-3 py-2 rounded-md transition-all ${viewMode === VIEW_MODES.GANTT
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                <Grid3x3 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode(VIEW_MODES.LIST)}
                className={`px-3 py-2 rounded-md transition-all ${viewMode === VIEW_MODES.LIST
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
                  }`}
              >
                <List className="w-4 h-4" />
              </button>
            </div>

            {/* Zoom Controls */}
            <div className="flex bg-gray-100 rounded-lg p-1">
              {Object.entries(ZOOM_LEVELS).map(([key, zoom]) => (
                <button
                  key={key}
                  onClick={() => setZoomLevel(key)}
                  className={`px-3 py-2 rounded-md transition-all text-sm ${zoomLevel === key
                    ? 'bg-white text-blue-600 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                    }`}
                >
                  {zoom.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Filters */}
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="in-progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>

            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 bg-white text-sm"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <label className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={showCompleted}
                onChange={(e) => setShowCompleted(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Show Completed</span>
            </label>

            <label className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
              <input
                type="checkbox"
                checked={showSubtasks}
                onChange={(e) => setShowSubtasks(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">Show Subtasks</span>
            </label>
          </div>
        </div>
      </div>

      {/* Timeline Content */}
      {viewMode === VIEW_MODES.GANTT ? (
        <div className="flex-1 overflow-auto">
          <div className="flex min-w-max">
            {/* Task Names Column */}
            <div className="sticky left-0 z-20 bg-white border-r border-gray-300 shadow-md" style={{ width: '300px' }}>
              {/* Header */}
              <div className="h-16 border-b border-gray-300 bg-gray-50 flex items-center px-4 font-semibold text-gray-700">
                Task Name
              </div>

              {/* Task Rows */}
              {filteredTasks.map((task, idx) => {
                const StatusIcon = STATUS_CONFIG[task.status].icon;
                return (
                  <div
                    key={task.id}
                    className={`h-12 border-b border-gray-200 flex items-center px-4 hover:bg-blue-50 cursor-pointer transition-colors ${selectedTask?.id === task.id ? 'bg-blue-50 border-l-4 border-l-blue-600' : ''
                      }`}
                    style={{ paddingLeft: `${task.level * 20 + 16}px` }}
                    onClick={() => setSelectedTask(task)}
                  >
                    <StatusIcon className={`w-4 h-4 mr-2 ${STATUS_CONFIG[task.status].color.replace('bg-', 'text-')}`} />
                    <span className="text-sm font-medium text-gray-800 truncate">{task.name}</span>
                  </div>
                );
              })}
            </div>

            {/* Timeline Grid */}
            <div className="flex-1 bg-white">
              {/* Timeline Header */}
              <div className="h-16 border-b border-gray-300 bg-gray-50 flex sticky top-0 z-10">
                {timeColumns.map((date, idx) => (
                  <div
                    key={idx}
                    className={`border-r border-gray-200 flex items-center justify-center text-xs font-medium text-gray-600 ${isToday(date) ? 'bg-blue-50 text-blue-700' : ''
                      }`}
                    style={{ minWidth: `${ZOOM_LEVELS[zoomLevel].width}px` }}
                  >
                    {formatColumnHeader(date)}
                  </div>
                ))}
              </div>

              {/* Task Bars */}
              <div className="relative">
                {/* Grid Lines */}
                <div className="absolute inset-0 flex pointer-events-none">
                  {timeColumns.map((date, idx) => (
                    <div
                      key={idx}
                      className={`border-r ${isToday(date) ? 'border-blue-400 bg-blue-50/30' : 'border-gray-200'}`}
                      style={{ minWidth: `${ZOOM_LEVELS[zoomLevel].width}px` }}
                    />
                  ))}
                </div>

                {/* Today Line */}
                {(() => {
                  const today = new Date();
                  const { start } = timelineRange;
                  const zoom = ZOOM_LEVELS[zoomLevel];
                  const daysDiff = (today - start) / (1000 * 60 * 60 * 24);
                  const todayLeft = (daysDiff / zoom.days) * zoom.width;

                  return (
                    <div
                      className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-10 pointer-events-none"
                      style={{ left: `${todayLeft}px` }}
                    >
                      <div className="absolute -top-2 left-1/2 -translate-x-1/2 text-xs bg-red-500 text-white px-2 py-1 rounded whitespace-nowrap">
                        Today
                      </div>
                    </div>
                  );
                })()}

                {/* Task Bars */}
                {filteredTasks.map((task, idx) => {
                  const { left, width } = getTaskPosition(task);
                  const StatusIcon = STATUS_CONFIG[task.status].icon;

                  return (
                    <div
                      key={task.id}
                      className="h-12 border-b border-gray-200 relative"
                    >
                      <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className={`absolute top-2 h-8 ${STATUS_CONFIG[task.status].color} rounded-lg shadow-md cursor-pointer group`}
                        style={{ left: `${left}px`, width: `${width}px` }}
                        onClick={() => setSelectedTask(task)}
                      >
                        <div className="h-full flex items-center px-3 text-white text-xs font-medium overflow-hidden">
                          <span className="truncate">{task.name}</span>
                        </div>

                        {/* Progress Bar */}
                        <div className="absolute bottom-0 left-0 h-1 bg-black/20 rounded-b-lg overflow-hidden">
                          <div
                            className="h-full bg-white/50"
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>

                        {/* Hover Tooltip */}
                        <div className="absolute bottom-full mb-2 left-0 bg-gray-900 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap shadow-lg z-20">
                          <div className="font-semibold">{task.name}</div>
                          <div className="text-gray-300 mt-1">
                            {formatDate(task.startDate)} - {formatDate(task.endDate)}
                          </div>
                          <div className="text-gray-300">Progress: {task.progress}%</div>
                          <div className="text-gray-300">Assignee: {task.assignee}</div>
                        </div>
                      </motion.div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        // List View
        <div className="flex-1 overflow-auto p-6">
          <div className="max-w-5xl mx-auto space-y-3">
            {filteredTasks.map((task) => {
              const StatusIcon = STATUS_CONFIG[task.status].icon;

              return (
                <motion.div
                  key={task.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                  style={{ marginLeft: `${task.level * 30}px` }}
                  onClick={() => setSelectedTask(task)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <StatusIcon className={`w-5 h-5 ${STATUS_CONFIG[task.status].color.replace('bg-', 'text-')}`} />
                        <h3 className="font-semibold text-gray-900">{task.name}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs border ${PRIORITY_COLORS[task.priority]}`}>
                          {task.priority}
                        </span>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {formatDate(task.startDate)} - {formatDate(task.endDate)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {task.assignee}
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                          <span>Progress</span>
                          <span>{task.progress}%</span>
                        </div>
                        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className={`h-full ${STATUS_CONFIG[task.status].color} transition-all`}
                            style={{ width: `${task.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      )}

      {/* Task Detail Sidebar */}
      <AnimatePresence>
        {selectedTask && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setSelectedTask(null)}
            />
            <motion.div
              initial={{ x: 400 }}
              animate={{ x: 0 }}
              exit={{ x: 400 }}
              className="fixed right-0 top-0 bottom-0 w-96 bg-white shadow-2xl z-50 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTask.name}</h2>
                  <button
                    onClick={() => setSelectedTask(null)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Status</label>
                    <div className="mt-1 flex items-center gap-2">
                      {React.createElement(STATUS_CONFIG[selectedTask.status].icon, {
                        className: `w-5 h-5 ${STATUS_CONFIG[selectedTask.status].color.replace('bg-', 'text-')}`
                      })}
                      <span className="font-medium">{STATUS_CONFIG[selectedTask.status].label}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">Priority</label>
                    <div className="mt-1">
                      <span className={`px-3 py-1 rounded-full text-sm border ${PRIORITY_COLORS[selectedTask.priority]}`}>
                        {selectedTask.priority.toUpperCase()}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">Timeline</label>
                    <div className="mt-1 space-y-1 text-sm">
                      <div>Start: {selectedTask.startDate.toLocaleDateString()}</div>
                      <div>End: {selectedTask.endDate.toLocaleDateString()}</div>
                      <div className="text-gray-500">
                        Duration: {Math.ceil((selectedTask.endDate - selectedTask.startDate) / (1000 * 60 * 60 * 24))} days
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600">Assignee</label>
                    <div className="mt-1 flex items-center gap-2">
                      <Users className="w-4 h-4 text-gray-500" />
                      <span>{selectedTask.assignee}</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-sm font-semibold text-gray-600 mb-2 block">Progress</label>
                    <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${STATUS_CONFIG[selectedTask.status].color} transition-all`}
                        style={{ width: `${selectedTask.progress}%` }}
                      />
                    </div>
                    <div className="text-right text-sm text-gray-500 mt-1">{selectedTask.progress}%</div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

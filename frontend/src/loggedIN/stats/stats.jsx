import React from "react";

export const Stats = () => {
  // Mock stats data
  const stats = {
    totalTasks: 42,
    completedTasks: 31,
    completionPercent: 73.8,
    estimatedHours: 120,
    loggedHours: 85,
    overdueTasks: 3,
    topContributor: "Alice",
    topContributorTaskCount: 12,
    nextDeadline: "Oct 3 (Design Review)",
    tasksByStatus: { todo: 5, inProgress: 6, completed: 31 },
    tasksPerUser: [
      { user: "Alice", count: 12 },
      { user: "Bob", count: 10 },
      { user: "Charlie", count: 8 },
    ],
    tasksPerPhase: [
      { phase: "Design", completed: 80 },
      { phase: "Development", completed: 60 },
      { phase: "Testing", completed: 30 },
    ],
    alerts: { missedMilestones: 1, tasksWithoutEstimates: 2 },
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
      {/* Total Tasks */}
      <StatCard title="Total Tasks" value={stats.totalTasks} />

      {/* Completed Tasks & Percentage */}
      <StatCard
        title="Tasks Completed"
        value={`${stats.completedTasks} (${stats.completionPercent}%)`}
      />

      {/* Estimated vs Logged Hours */}
      <StatCard
        title="Estimated / Logged Hours"
        value={`${stats.estimatedHours}h / ${stats.loggedHours}h`}
      />

      {/* Overdue Tasks */}
      <StatCard
        title="Overdue Tasks"
        value={stats.overdueTasks}
        alert={stats.overdueTasks > 0}
      />

      {/* Top Contributor */}
      <StatCard
        title="Top Contributor"
        value={`${stats.topContributor} (${stats.topContributorTaskCount} tasks)`}
      />

      {/* Next Deadline */}
      <StatCard title="Next Deadline" value={stats.nextDeadline} />

      {/* Tasks by Status */}
      <div className="col-span-full bg-white rounded shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Tasks by Status</h3>
        <ul className="flex justify-between text-center text-sm text-gray-700">
          <li>
            <span className="block font-bold">{stats.tasksByStatus.todo}</span>
            To Do
          </li>
          <li>
            <span className="block font-bold">
              {stats.tasksByStatus.inProgress}
            </span>
            In Progress
          </li>
          <li>
            <span className="block font-bold">
              {stats.tasksByStatus.completed}
            </span>
            Completed
          </li>
        </ul>
      </div>

      {/* Tasks Per User */}
      <div className="col-span-full bg-white rounded shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Tasks Per User</h3>
        <ul>
          {stats.tasksPerUser.map(({ user, count }) => (
            <li
              key={user}
              className="flex justify-between border-b py-1 last:border-none"
            >
              <span>{user}</span>
              <span className="font-semibold">{count}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Tasks Per Phase */}
      <div className="col-span-full bg-white rounded shadow p-4">
        <h3 className="text-lg font-semibold mb-2">Completion Per Phase (%)</h3>
        <ul>
          {stats.tasksPerPhase.map(({ phase, completed }) => (
            <li key={phase} className="mb-2">
              <div className="flex justify-between mb-1">
                <span>{phase}</span>
                <span>{completed}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded h-3">
                <div
                  className="bg-green-500 h-3 rounded"
                  style={{ width: `${completed}%` }}
                ></div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Alerts */}
      <div className="col-span-full bg-white rounded shadow p-4 text-red-600">
        <h3 className="text-lg font-semibold mb-2">Alerts & Warnings</h3>
        <ul>
          <li>Missed Milestones: {stats.alerts.missedMilestones}</li>
          <li>Tasks Without Estimates: {stats.alerts.tasksWithoutEstimates}</li>
        </ul>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, alert }) => (
  <div
    className={`bg-white rounded shadow p-4 flex flex-col justify-center items-center text-center ${
      alert ? "border-2 border-red-500" : ""
    }`}
  >
    <h3 className="text-lg font-semibold mb-1">{title}</h3>
    <p className="text-2xl font-bold">{value}</p>
  </div>
);

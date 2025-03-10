import { useState } from "react";

const TaskFilters = () => {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  return (
    <div className="flex gap-4 mb-4">
      <input
        type="text"
        placeholder="Search..."
        className="p-2 rounded bg-gray-700 text-white"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <select
        className="p-2 rounded bg-gray-700 text-white"
        value={statusFilter}
        onChange={(e) => setStatusFilter(e.target.value)}
      >
        <option value="">All Statuses</option>
        <option value="Pending">Pending</option>
        <option value="Completed">Completed</option>
        <option value="In Progress">In Progress</option>
      </select>
      <select
        className="p-2 rounded bg-gray-700 text-white"
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
      >
        <option value="">All Priorities</option>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
    </div>
  );
};

export default TaskFilters;

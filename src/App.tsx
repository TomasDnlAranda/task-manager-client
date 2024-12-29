import React, { useState } from 'react';
import { useTaskContext } from './context/TaskContext';

const App: React.FC = () => {
	const { tasks, loading, createTask, updateTask, deleteTask } = useTaskContext();
	const [newTask, setNewTask] = useState<string>('');
	const [filter, setFilter] = useState<string>('all');

	const handleCreateTask = () => {
		if (newTask) {
			createTask({ title: newTask, completed: false });
			setNewTask('');
		}
	};

	const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setFilter(e.target.value);
	};

	const filteredTasks = tasks.filter((task) => {
		if (filter === 'completed') return task.completed;
		if (filter === 'pending') return !task.completed;
		return true;
	});

	const toggleCompleted = (id: string, completed: boolean) => {
		updateTask(id, { completed: !completed });
	};

	return (
		<div className="p-5">
			<div className="mb-4 flex items-center">
				<input
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
					placeholder="Nueva tarea"
					className="mr-3 p-2 border rounded"
				/>
				<button onClick={handleCreateTask} className="px-4 py-2 bg-blue-500 text-white rounded">
					Crear tarea
				</button>
			</div>

			<div className="mb-4 flex items-center">
				<p className="mr-3">Filtrar tareas:</p>
				<select value={filter} onChange={handleFilterChange} className="w-48 p-2 border rounded">
					<option value="all">Todas</option>
					<option value="completed">Completadas</option>
					<option value="pending">Pendientes</option>
				</select>
			</div>

			{loading ? (
				<p>Cargando tareas...</p>
			) : (
				<ul className="space-y-3">
					{filteredTasks.map((task) => (
						<li key={task._id} className="flex justify-between items-center">
							<div className="flex items-center">
								<input
									type="checkbox"
									checked={task.completed}
									onChange={() => toggleCompleted(task._id, task.completed)}
									className="mr-2"
								/>
								<p className={task.completed ? 'line-through' : ''}>{task.title}</p>
							</div>
							<button
								onClick={() => deleteTask(task._id)}
								className="ml-2 px-3 py-1 text-sm text-white bg-red-500 rounded"
							>
								Eliminar
							</button>
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default App;

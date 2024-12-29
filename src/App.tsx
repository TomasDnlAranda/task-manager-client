import React, { useState } from 'react';
import { useTaskContext } from './context/TaskContext';

const App: React.FC = () => {
	const { tasks, loading, createTask, updateTask, deleteTask } = useTaskContext();
	const [newTask, setNewTask] = useState<string>('');
	const [filter, setFilter] = useState<string>('all');
	const [loadingTask, setLoadingTask] = useState<string | null>(null);

	const handleCreateTask = async () => {
		if (newTask) {
			setLoadingTask('create');
			await createTask({ title: newTask, completed: false });
			setNewTask('');
			setLoadingTask(null);
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

	const toggleCompleted = async (id: string, completed: boolean) => {
		setLoadingTask(id);
		await updateTask(id, { completed: !completed });
		setLoadingTask(null);
	};

	const handleDeleteTask = async (id: string) => {
		setLoadingTask(id);
		await deleteTask(id);
		setLoadingTask(null);
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
				<button
					onClick={handleCreateTask}
					disabled={loadingTask === 'create'}
					className="px-4 py-2 bg-blue-500 text-white rounded disabled:opacity-50 relative flex items-center justify-center min-w-[150px] h-[40px]"
				>
					{loadingTask === 'create' && (
						<div className="absolute w-5 h-5 border-4 border-t-transparent border-blue-500 border-solid rounded-full animate-spin"></div>
					)}
					<span className={loadingTask === 'create' ? 'opacity-0' : ''}>Crear tarea</span>
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
									disabled={loadingTask === task._id}
									className="mr-2"
								/>
								<p className={loadingTask === task._id ? 'text-gray-500' : ''}>{task.title}</p>
								{loadingTask === task._id && (
									<div className="ml-2 w-5 h-5 text-center border-4 border-t-transparent border-gray-500 border-solid rounded-full animate-spin"></div>
								)}
							</div>
							<button
								onClick={() => handleDeleteTask(task._id)}
								disabled={loadingTask === task._id}
								className="ml-2 px-3 py-1 text-sm text-white bg-red-500 rounded disabled:opacity-50 min-w-[150px] h-[40px] flex items-center justify-center"
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

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

interface Task {
	_id: string;
	title: string;
	completed: boolean;
	createdAt: string;
}

interface TaskContextType {
	tasks: Task[];
	loading: boolean;
	createTask: (task: Omit<Task, '_id' | 'createdAt'>) => void;
	updateTask: (id: string, updatedTask: Partial<Task>) => void;
	deleteTask: (id: string) => void;
}

interface TaskProviderProps {
	children: React.ReactNode;
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const useTaskContext = (): TaskContextType => {
	const context = useContext(TaskContext);
	if (!context) {
		throw new Error('useTaskContext must be used within a TaskProvider');
	}
	return context;
};

export const TaskProvider: React.FC<TaskProviderProps> = ({ children }) => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const response = await axios.get('http://localhost:5000/api/tasks');
				setTasks(response.data);
				setLoading(false);
			} catch (error) {
				console.error(error);
				setLoading(false);
			}
		};
		fetchTasks();
	}, []);

	const createTask = async (task: Omit<Task, '_id' | 'createdAt'>) => {
		try {
			const response = await axios.post('http://localhost:5000/api/tasks', task);
			// Agregar la nueva tarea a las tareas existentes
			setTasks((prevTasks) => [...prevTasks, response.data]);
		} catch (error) {
			console.error(error);
		}
	};

	const updateTask = async (id: string, updatedTask: Partial<Task>) => {
		try {
			await axios.put(`http://localhost:5000/api/tasks/${id}`, updatedTask);
			setTasks((prevTasks) =>
				prevTasks.map((task) => (task._id === id ? { ...task, ...updatedTask } : task))
			);
		} catch (error) {
			console.error(error);
		}
	};

	const deleteTask = async (id: string) => {
		try {
			await axios.delete(`http://localhost:5000/api/tasks/${id}`);
			setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
		} catch (error) {
			console.error(error);
		}
	};

	return (
		<TaskContext.Provider value={{ tasks, loading, createTask, updateTask, deleteTask }}>
			{children}
		</TaskContext.Provider>
	);
};

import React, { useState } from 'react';
import { Box, Button, Input, Checkbox, List, ListItem, Text, Select, Flex } from '@chakra-ui/react';
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
		<Box p={5}>
			<Flex mb={4} alignItems="center">
				<Input
					value={newTask}
					onChange={(e) => setNewTask(e.target.value)}
					placeholder="Nueva tarea"
					mr={3}
				/>
				<Button onClick={handleCreateTask}>Crear tarea</Button>
			</Flex>

			<Flex mb={4} alignItems="center">
				<Text mr={3}>Filtrar tareas:</Text>
				<Select value={filter} onChange={handleFilterChange} width="200px">
					<option value="all">Todas</option>
					<option value="completed">Completadas</option>
					<option value="pending">Pendientes</option>
				</Select>
			</Flex>

			{loading ? (
				<Text>Cargando tareas...</Text>
			) : (
				<List spacing={3}>
					{filteredTasks.map((task) => (
						<ListItem key={task._id}>
							<Flex justify="space-between" align="center">
								<Checkbox
									isChecked={task.completed}
									onChange={() => toggleCompleted(task._id, task.completed)}
								>
									<Text as={task.completed ? 'del' : 'span'}>{task.title}</Text>
								</Checkbox>
								<Button onClick={() => deleteTask(task._id)} colorScheme="red" size="sm" ml={2}>
									Eliminar
								</Button>
							</Flex>
						</ListItem>
					))}
				</List>
			)}
		</Box>
	);
};

export default App;

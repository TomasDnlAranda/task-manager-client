import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { TaskProvider } from './context/TaskContext';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<ChakraProvider>
		<BrowserRouter>
			<TaskProvider>
				<App />
			</TaskProvider>
		</BrowserRouter>
	</ChakraProvider>
);

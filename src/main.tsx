import ReactDOM from 'react-dom/client';
import { TaskProvider } from './context/TaskContext';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<BrowserRouter>
		<TaskProvider>
			<App />
		</TaskProvider>
	</BrowserRouter>
);

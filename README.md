# Task Manager - Frontend

## Descripción

Frontend de la aplicación de gestión de tareas **Task Manager**. Permite a los usuarios crear, editar, eliminar y marcar tareas como completadas o pendientes.

## Enlace a la aplicación desplegada

[https://tomas-aranda-task-manager.netlify.app/](https://tomas-aranda-task-manager.netlify.app/)

## Instalación local

1. Clona el repositorio:

```bash
git clone https://github.com/TomasDnlAranda/task-manager-client.git
```

2. Instala las dependencias:

```npm
npm install
```

3. Configura las variables de entorno:
   Crea un archivo `.env` y agrega:´

```env
VITE_API_URL=https://task-manager-server-1py4.onrender.com
```

4. Ejecuta el proyecto:

```npm
npm run dev
```

## Funcionalidades

- Lista de tareas con título, estado.
- Formulario para agregar tareas.
- Filtro para mostrar tareas completadas, pendientes o todas.
- Diseño responsivo para desktop y móvil.

## Tecnologías

- React.js
- Vite
- TypeScript
- Tailwind CSS

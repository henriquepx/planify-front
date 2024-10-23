import React, { useState } from 'react';
import './Kanban.css';

// Tipos de dados
type Task = {
  id: number;
  content: string;
};

type ColumnType = {
  id: string;
  title: string;
  tasks: Task[];
};

// Estado inicial das colunas
const initialColumns: ColumnType[] = [
  { id: 'todo', title: 'To Do', tasks: [] },
  { id: 'in-progress', title: 'In Progress', tasks: [] },
  { id: 'done', title: 'Done', tasks: [] },
];

const Kanban: React.FC = () => {
  const [columns, setColumns] = useState<ColumnType[]>(initialColumns);
  const [newTasks, setNewTasks] = useState<{ [key: string]: string }>({
    'todo': '',
    'in-progress': '',
    'done': '',
  });

  // Função para adicionar uma nova tarefa
  const addTask = (columnId: string) => {
    if (newTasks[columnId].trim() === '') return;
    const updatedColumns = columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: [
            ...column.tasks,
            { id: Date.now(), content: newTasks[columnId] },
          ],
        };
      }
      return column;
    });
    setColumns(updatedColumns);
    setNewTasks({ ...newTasks, [columnId]: '' });
  };

  // Função para editar uma tarefa
  const editTask = (columnId: string, taskId: number, newContent: string) => {
    const updatedColumns = columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: column.tasks.map((task) =>
            task.id === taskId ? { ...task, content: newContent } : task
          ),
        };
      }
      return column;
    });
    setColumns(updatedColumns);
  };

  // Função para excluir uma tarefa
  const deleteTask = (columnId: string, taskId: number) => {
    const updatedColumns = columns.map((column) => {
      if (column.id === columnId) {
        return {
          ...column,
          tasks: column.tasks.filter((task) => task.id !== taskId),
        };
      }
      return column;
    });
    setColumns(updatedColumns);
  };

  // Função para mover uma tarefa entre colunas
  const moveTask = (taskId: number, sourceId: string, destinationId: string) => {
    if (sourceId === destinationId) return;

    let taskToMove: Task | null = null;
    const updatedColumns = columns.map((column) => {
      if (column.id === sourceId) {
        taskToMove = column.tasks.find((task) => task.id === taskId) || null;
        return {
          ...column,
          tasks: column.tasks.filter((task) => task.id !== taskId),
        };
      }
      return column;
    });

    if (taskToMove) {
      setColumns(
        updatedColumns.map((column) => {
          if (column.id === destinationId) {
            return {
              ...column,
              tasks: [...column.tasks, taskToMove!],
            };
          }
          return column;
        })
      );
    }
  };

  return (
    <div className="kanbanContainer">
      {columns.map((column) => (
        <div key={column.id} className="column">
          <h2 className="columnTitle">{column.title}</h2>
          <div className="taskList">
            {column.tasks.map((task) => (
              <div key={task.id} className="task">
                <p>{task.content}</p>
                <button onClick={() => deleteTask(column.id, task.id)}>Excluir</button>
                <button onClick={() => editTask(column.id, task.id, prompt('Novo conteúdo:', task.content) || task.content)}>Editar</button>
                <select
                  onChange={(e) => moveTask(task.id, column.id, e.target.value)}
                  defaultValue=""
                >
                  <option value="" disabled>Mover para...</option>
                  {columns
                    .filter((col) => col.id !== column.id)
                    .map((col) => (
                      <option key={col.id} value={col.id}>{col.title}</option>
                    ))}
                </select>
              </div>
            ))}
          </div>
          <div className="addTask">
            <input
              type="text"
              value={newTasks[column.id]}
              onChange={(e) => setNewTasks({ ...newTasks, [column.id]: e.target.value })}
              placeholder="Nova tarefa"
            />
            <button onClick={() => addTask(column.id)}>Adicionar</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Kanban;

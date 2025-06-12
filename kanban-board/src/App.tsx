import React, { useState, useEffect } from 'react'
import {
  DndContext,
  closestCorners,
  type DragEndEvent,
  type DragStartEvent,
  DragOverlay,
} from '@dnd-kit/core'
import Column from './components/Column'
import TaskCard from './components/TaskCard'
import type { Column as ColumnType, Task } from './types'
import { v4 as uuid } from 'uuid'

const defaultColumns: ColumnType[] = [
  { id: 'notStarted', title: 'Not started', tasks: [] },
  { id: 'inProgress', title: 'In progress', tasks: [] },
  { id: 'blocked', title: 'Blocked', tasks: [] },
  { id: 'done', title: 'Done', tasks: [] },
]

const App: React.FC = () => {
const [columns, setColumns] = useState<ColumnType[]>(() => {
  const saved = localStorage.getItem('kanban-columns')
  return saved ? JSON.parse(saved) : defaultColumns
})
  const [taskTitle, setTaskTitle] = useState('')
  const [activeTask, setActiveTask] = useState<Task | null>(null)



  useEffect(() => {
    localStorage.setItem('kanban-columns', JSON.stringify(columns))
  }, [columns])

  const addTask = () => {
    if (!taskTitle.trim()) return
    const newTask: Task = { id: uuid(), title: taskTitle }

    const updated = columns.map(col => {
      if (col.id === 'notStarted') {
        return { ...col, tasks: [...col.tasks, newTask] }
      }
      return col
    })

    setColumns(updated)
    setTaskTitle('')
  }

  const findColumnIdByTaskId = (taskId: string): string | null => {
    for (const col of columns) {
      if (col.tasks.find(t => t.id === taskId)) return col.id
    }
    return null
  }

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event
    const fromColId = findColumnIdByTaskId(active.id as string)
    const task = columns
      .find(col => col.id === fromColId)
      ?.tasks.find(task => task.id === active.id)
    if (task) setActiveTask(task)
  }

const handleDragEnd = (event: DragEndEvent) => {
  const { active, over } = event
  if (!over || !activeTask) {
    setActiveTask(null)
    return
  }

  const fromColId = findColumnIdByTaskId(active.id as string)

  // handle dropping into a column instead of task
  const toCol = columns.find(col =>
    col.tasks.some(t => t.id === over.id) || col.id === over.id
  )

  const toColId = toCol?.id

  if (!fromColId || !toColId) {
    setActiveTask(null)
    return
  }

  // prevent duplicate add if dropped in same column
  if (fromColId === toColId) {
    setActiveTask(null)
    return
  }

  const updatedCols = columns.map(col => {
    if (col.id === fromColId) {
      return { ...col, tasks: col.tasks.filter(t => t.id !== active.id) }
    }
    if (col.id === toColId) {
      return { ...col, tasks: [...col.tasks, activeTask] }
    }
    return col
  })

  setColumns(updatedCols)
  setActiveTask(null)
}

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-2">Personal</h1>
      <p className="mb-6 text-gray-500">A board to keep track of personal tasks.</p>

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          value={taskTitle}
          onChange={e => setTaskTitle(e.target.value)}
          placeholder="Task title"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={addTask}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
      </div>

      <DndContext
        collisionDetection={closestCorners}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {columns.map(col => (
            <Column key={col.id} column={col} />
          ))}
        </div>

        <DragOverlay>
          {activeTask ? <TaskCard task={activeTask} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  )
}

export default App

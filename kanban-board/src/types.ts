export type Task = {
  id: string
  title: string
  dueDate?: string
  subtasks?: string[]
}

export type ColumnType = 'notStarted' | 'inProgress' | 'blocked' | 'done'

export type Column = {
  id: ColumnType
  title: string
  tasks: Task[]
}
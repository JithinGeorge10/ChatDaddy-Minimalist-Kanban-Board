import React from 'react'
import { useDroppable } from '@dnd-kit/core'
import type { Column as ColumnType } from '../types'
import TaskCard from './TaskCard'

type Props = {
    column: ColumnType
}

const Column: React.FC<Props> = ({ column }) => {
    const { setNodeRef } = useDroppable({
        id: column.id,
    })
    const getTitleColor = () => {
        switch (column.id) {
            case 'notStarted': return 'bg-gray-200';
            case 'inProgress': return 'bg-purple-200';
            case 'blocked': return 'bg-red-200';
            case 'done': return 'bg-green-200';
            default: return 'bg-gray-200';
        }
    }


    return (
        <div ref={setNodeRef} className="bg-gray-100 p-4 rounded shadow-sm min-h-[200px]">
            <h2 className={`${getTitleColor()} inline-block font-bold text-sm text-gray-600 mb-2 capitalize p-2 rounded-2xl`}>
                {column.title}
            </h2>

            <div className="space-y-2">
                {column.tasks.map(task => (
                    <TaskCard key={task.id} task={task} />
                ))}
            </div>
        </div>
    )
}

export default Column

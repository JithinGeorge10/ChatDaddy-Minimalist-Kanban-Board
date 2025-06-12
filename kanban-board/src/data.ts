
import type { Column } from './types'

export const defaultColumns: Column[] = [
  {
    id: 'notStarted',
    title: 'Not started',
    tasks: [
      { id: '1', title: 'Take Coco to a vet', dueDate: '4/11' },
    ],
  },
  {
    id: 'inProgress',
    title: 'In progress',
    tasks: [
      { id: '2', title: 'Accountant contract' },
      { id: '3', title: 'Request work payslips' },
      { id: '4', title: 'Cancel VAT ID' },
    ],
  },
  {
    id: 'blocked',
    title: 'Blocked',
    tasks: [
      { id: '5', title: 'Request moving estimate' },
      { id: '6', title: 'Order moving boxes' },
    ],
  },
  {
    id: 'done',
    title: 'Done',
    tasks: [
      { id: '7', title: 'Nothing to be done' },
    ],
  },
]

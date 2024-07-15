import { useMemo } from 'react'
import {
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable
} from '@tanstack/react-table'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeaderCell,
  TableRow
} from '@tremor/react'
import { RiArrowLeftSLine, RiArrowRightSLine } from '@remixicon/react'
import { useCourses } from '../hooks/useCourses'

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

// Función para formatear la fecha
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const coursesColumns = [
  {
    header: 'Fecha de Creación',
    accessorKey: 'createdAt',
    meta: {
      align: 'text-center'
    },
    cell: ({ getValue }) => formatDate(getValue())
  },
  {
    header: 'Nivel',
    accessorKey: 'level',
    meta: {
      align: 'text-left'
    }
  },
  {
    header: 'Docente',
    accessorKey: 'teacher.name',
    meta: {
      align: 'text-left'
    }
  },
  {
    header: 'Estudiantes',
    accessorKey: 'students',
    meta: {
      align: 'text-left'
    }
  },
  {
    header: 'Acciones',
    accessorKey: 'actions',
    meta: {
      align: 'text-center'
    },
    cell: ({ row }) => (
      <div className='flex gap-2 items-center justify-center'>
        <button type='button'>Editar</button>
        <button type='button'>Eliminar</button>
      </div>
    )
  }
]

function Button ({ onClick, disabled, children, position }) {
  return (
    <button
      type='button'
      className={classNames(
        'group p-2 text-tremor-default ring-1 ring-inset ring-tremor-ring hover:bg-tremor-background-muted disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-transparent dark:ring-dark-tremor-ring hover:dark:bg-dark-tremor-background disabled:hover:dark:bg-transparent',
        position === 'left'
          ? 'rounded-l-tremor-small'
          : position === 'right'
            ? '-ml-px rounded-r-tremor-small'
            : ''
      )}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default function TableOfCourses () {
  const { courses } = useCourses()
  const pageSize = 6

  const data = useMemo(() => courses, [courses])

  const table = useReactTable({
    data,
    columns: coursesColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: {
      pagination: {
        pageIndex: 0,
        pageSize
      }
    }
  })

  return (
    <>
      <Table className='border-t-2 mt-10'>
        <TableHead>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className='border-b border-tremor-border dark:border-dark-tremor-border'
            >
              {headerGroup.headers.map((header) => (
                <TableHeaderCell
                  key={header.id}
                  scope='col'
                  className={classNames(header.column.columnDef.meta.align)}
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHeaderCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <TableCell
                  key={cell.id}
                  className={classNames(cell.column.columnDef.meta.align)}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className='mt-10 flex items-center justify-between'>
        <p className='text-tremor-default tabular-nums text-tremor-content dark:text-dark-tremor-content'>
          Página{' '}
          <span className='font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
            {`${table.getState().pagination.pageIndex + 1}`}
          </span>{' '}
          /
          <span className='font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong'>
            {' '}
            {`${table.getPageCount()}`}
          </span>
        </p>
        <div className='inline-flex items-center rounded-tremor-small shadow-tremor-input dark:shadow-dark-tremor-input'>
          <Button
            position='left'
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <span className='sr-only'>Anterior</span>
            <RiArrowLeftSLine
              className='size-5 text-tremor-content-emphasis group-hover:text-tremor-content-strong dark:text-dark-tremor-content-emphasis group-hover:dark:text-dark-tremor-content-strong'
              aria-hidden
            />
          </Button>
          <Button
            position='right'
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <span className='sr-only'>Siguiente</span>
            <RiArrowRightSLine
              className='size-5 text-tremor-content-emphasis group-hover:text-tremor-content-strong dark:text-dark-tremor-content-emphasis group-hover:dark:text-dark-tremor-content-strong'
              aria-hidden
            />
          </Button>
        </div>
      </div>
    </>
  )
}

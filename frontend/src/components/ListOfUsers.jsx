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
import { useUsers } from '../hooks/useUsers'

function classNames (...classes) {
  return classes.filter(Boolean).join(' ')
}

// Función para formatear la fecha
const formatDate = (dateString) => {
  const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}

const usersColumns = [
  {
    header: 'Fecha de Creación',
    accessorKey: 'date', // Ajusta esta clave según tus datos
    meta: {
      align: 'text-center'
    },
    cell: ({ getValue }) => formatDate(getValue())
  },
  {
    header: 'C.I Usuario',
    accessorKey: 'ci',
    meta: {
      align: 'text-left'
    }
  },
  {
    header: 'Nombre',
    accessorKey: 'name',
    meta: {
      align: 'text-left'
    }
  },
  {
    header: 'Correo Electrónico',
    accessorKey: 'email',
    meta: {
      align: 'text-left'
    }
  },
  {
    header: 'Rol',
    accessorKey: 'role',
    meta: {
      align: 'text-center'
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
        <button type='button'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10'
            />
          </svg>
        </button>
        <button type='button'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            strokeWidth={1.5}
            stroke='currentColor'
            className='size-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0'
            />
          </svg>
        </button>
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

export default function ListOfUsers () {
  const users = useUsers().usersState.data
  const pageSize = 6

  const data = useMemo(() => users, [users])

  const table = useReactTable({
    data,
    columns: usersColumns,
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

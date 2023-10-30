/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
// components/CollapsibleTableLoad.jsx
import React, { useState } from 'react'

import moment from 'moment'

import {
  Box, Table, TableBody, TableCell,
  TableHead, TablePagination,
  TableRow, TableSortLabel, Toolbar,
  Typography, Paper, IconButton, Collapse
} from '@mui/material'

import { visuallyHidden } from '@mui/utils'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import usePrivateAxios from '../hooks/usePrivateAxios'

// функція необхідна для визначення порядку сортування
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) { return -1 }
  if (b[orderBy] > a[orderBy]) { return 1 }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  // створюємо новий масив, де кожен елемент це мінімасив 
  // [об'єкт з основного масиву, його позиція у вихідному масиві]
  const stabilizedThis = array.map((el, index) => [el, index])
  // сортуємо новий масив
  stabilizedThis.sort((a, b) => {
    // викликаємо `comparator` для порівняння двох об'єктів
    const order = comparator(a[0], b[0])
    if (order !== 0) { return order }
    return a[1] - b[1]
  })
  // видаляємо додані позиції та залишаємо лише відсортовані об'єкти
  return stabilizedThis.map((el) => el[0])
}

const headCells = [
  {
    id: 'name',
    numeric: false,
    disablePadding: true,
    label: 'Name'
  },
  {
    id: 'state',
    numeric: false,
    disablePadding: true,
    label: 'State'
  },
  {
    id: 'pickup_address',
    numeric: false,
    disablePadding: true,
    label: 'Pick-Up Address'
  },
  {
    id: 'delivery_address',
    numeric: false,
    disablePadding: true,
    label: 'Delivery Address'
  },
  {
    id: 'created_date',
    numeric: false,
    disablePadding: true,
    label: 'Created date'
  }
]

function Row({ row }) {
  const privateAxios = usePrivateAxios()

  const [open, setOpen] = useState(false)
  const [load, setLoad] = useState({})

  async function fetchDefails() {
    if (open) return
    const res = await privateAxios.get(`/api/loads/${row._id}/shipping_info`)
    setLoad(res.data.load)
  }

  return (
    <>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label='expand row'
            size='small'
            onClick={() => {
              setOpen(!open)
              fetchDefails()
            }}
          >
            {open ? (
              <KeyboardArrowUpIcon />
            ) : (
              <KeyboardArrowDownIcon />
            )}
          </IconButton>
        </TableCell>
        <TableCell component='th' scope='row'>{row.name}</TableCell>
        <TableCell>{row.state}</TableCell>
        <TableCell>{row.pickup_address}</TableCell>
        <TableCell>{row.delivery_address}</TableCell>
        <TableCell>{moment(row.created_date).fromNow()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          style={{ paddingBottom: 0, paddingTop: 0 }}
          colSpan={12}
        >
          <Collapse in={open} timeout='auto' unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>Load</Typography>
              <Table size='medium'>
                <TableHead>
                  <TableRow>
                    <TableCell>Weight</TableCell>
                    <TableCell>Width</TableCell>
                    <TableCell>Height</TableCell>
                    <TableCell>Length</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow key={load?.payload || 'load'}>
                    <TableCell component='th' scope='row'>
                      {load?.payload || ''}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {load?.dimensions?.width || ''}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {load?.dimensions?.height || ''}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {load?.dimensions?.length || ''}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>

            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>Truck</Typography>
              <Table size='medium'>
                <TableHead>
                  <TableRow>
                    <TableCell>Type</TableCell>
                    <TableCell>Max weight</TableCell>
                    <TableCell>Max width</TableCell>
                    <TableCell>Max height</TableCell>
                    <TableCell>Max length</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  <TableRow key={load?._id || 'truck'}>
                    <TableCell component='th' scope='row'>
                      {load?.truck?.type || ''}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {load?.truck?.payload || ''}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {load?.truck?.dimensions?.width || ''}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {load?.truck?.dimensions?.height || ''}
                    </TableCell>
                    <TableCell component='th' scope='row'>
                      {load?.truck?.dimensions?.length || ''}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>

            <Box sx={{ margin: 1 }}>
              <Typography variant='h6' gutterBottom component='div'>Logs</Typography>
              <Table size='medium'>
                <TableHead>
                  <TableRow>
                    <TableCell>Message</TableCell>
                    <TableCell>Time</TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {load?.logs?.map((log) => (
                    <TableRow key={log.time || 'log'}>
                      <TableCell component='th' scope='row'>
                        {log.message}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {moment(log.time).fromNow()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

export default function CollapsibleTable({ loads, activeTab }) {
  // кількість рядків на сторінці таблиці
  const rowsPerPage = 10
   // стани для зберігання напрямку та поля сортування
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('calories')
  // стан для зберігання поточної сторінки
  const [page, setPage] = useState(0)
  // обробник запиту на сортування
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }
  // обробник зміни сторінки
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  // функція для створення обробника подій сортування
  const createSortHandler = (property) => (event) => {
    handleRequestSort(event, property)
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <Toolbar
          sx={{
            pl: { sm: 2 },
            pr: { xs: 1, sm: 1 }
          }}
        >
          <Typography
            sx={{ flex: '1 1 100%' }}
            variant='h6'
            id='tableTitle'
            component='div'
          >
            {activeTab}
          </Typography>
        </Toolbar>

        <Table>
          {/* Відображення заголовків стовпців таблиці */}
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              {headCells.map((headCell) => (
                <TableCell
                  key={headCell.id}
                  align={headCell.numeric ? 'right' : 'left'}
                  sortDirection={
                    orderBy === headCell.id ? order : false
                  }
                >
                  <TableSortLabel
                    active={orderBy === headCell.id}
                    direction={
                      orderBy === headCell.id ? order : 'asc'
                    }
                    onClick={createSortHandler(headCell.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                      <Box component='span' sx={visuallyHidden}>
                        {order === 'desc'
                          ? 'sorted descending'
                          : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {/* Відображення тіла таблиці */}
          <TableBody>
            {!loads.length ? (
              <TableRow>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
                <TableCell sx={{ textAlign: 'center' }}>
                  <Typography>No loads</Typography>
                </TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            ) : (
              // сортування і відображення завантажень у відповідному порядку
              stableSort(loads, getComparator(order, orderBy))
                .slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
                .map((load) => <Row key={load._id} row={load} />)
            )}
          </TableBody>
        </Table>

        {/* Пагінація для управління сторінками таблиці */}
        <TablePagination
          rowsPerPageOptions={[rowsPerPage]}
          component='div'
          count={loads.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
        />
      </Paper>
    </Box>
  )
}
import { useMemo } from 'react'
import {
  IconButton,
  Stack,
  TableFooter,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import VisibilityIcon from '@mui/icons-material/Visibility'
import { noop } from 'lodash'
import Paginator from './paginator'

const BASE_ACTIONS = {
  view: { icon: () => <VisibilityIcon />, cb: () => noop(), key: 'view' },
  edit: { icon: () => <EditIcon />, cb: () => noop(), key: 'edit' },
  delete: { icon: () => <DeleteIcon />, cb: () => noop(), key: 'delete' },
}
// columns known to contain timestamp values, can be expanded on
const DATE_COLUMNS = ['created']

const DataTable = ({ data, columns = [], actions = {} }) => {
  const { results, currentPage, totalResults } = data

  const tableActions = useMemo(() => {
    const tableActions = {}

    if (actions?.onView) {
      tableActions.view = { ...BASE_ACTIONS.view, cb: actions.onView }
    }

    if (actions?.onEdit) {
      tableActions.edit = { ...BASE_ACTIONS.edit, cb: actions.onEdit }
    }

    if (actions?.onDelete) {
      tableActions.delete = { ...BASE_ACTIONS.delete, cb: actions.onDelete }
    }
    return tableActions
  }, [actions])

  return (
    <TableContainer sx={{ background: '#fff', borderRadius: '20px', boxShadow: '0px 0px 16px 0px rgba(0,0,0,0.15)', maxHeight: '60vh' }}>
      <Table stickyHeader sx={{ minWidth: 650 }}>
        <TableHead >
          <TableRow>
            {columns?.length > 0 &&
              columns.map((col, idx) => (
                <TableCell
                  align={idx === 0 ? 'inherit' : 'right'}
                  key={`${col}_${idx}`}
                >
                  {col.toUpperCase()}
                </TableCell>
              ))}
            {Object.keys(actions).length > 0 && (
              <TableCell align="right">ACTIONS</TableCell>
            )}
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((item, rowIndex) => (
            <TableRow
              key={rowIndex}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columns.map((key, idx) => (
                <TableCell
                  key={`${key}_${idx}`}
                  align={idx === 0 ? 'left' : 'right'}
                  component={idx === 0 ? 'th' : 'td'}
                  scope={idx === 0 ? 'row' : undefined}
                  style={{
                    maxWidth: '300px',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                  }}
                >
                  {DATE_COLUMNS.includes(key)
                    ? new Date(item[key]).toString()
                    : item[key]}
                </TableCell>
              ))}

              {Object.keys(actions).length > 0 && (
                <TableCell align="right">
                  <Stack direction="row" justifyContent="flex-end">
                    {Object.keys(tableActions).map((actionKey) => (
                      <IconButton
                        key={tableActions[actionKey].key}
                        onClick={() => tableActions[actionKey].cb(item.id)}
                        sx={{ '&:hover': { color: 'primary.main' } }}
                      >
                        {tableActions[actionKey].icon()}
                      </IconButton>
                    ))}
                  </Stack>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <Paginator page={currentPage - 1} count={totalResults} />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default DataTable

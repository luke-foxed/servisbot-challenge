import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { IconButton, Stack, TableFooter } from '@mui/material'
import Paginator from './paginator'
import { startCase } from 'lodash'

const DataTable = ({ data, columns = [], actions=[] }) => {
  const { results, currentPage, totalResults } = data

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            {columns?.length > 0 && columns.map((col, idx) => (
              <TableCell
                align={idx === 0 ? 'inherit' : 'right'}
                key={`${col}_${idx}`}
              >
                {startCase(col)}
              </TableCell>
            ))}
            {actions.length > 0 && <TableCell align="right">Actions</TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((item, rowIndex) => (
            <TableRow key={rowIndex} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
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
                  {item[key]}
                </TableCell>
              ))}

              {actions.length > 0 && (
                <TableCell align="right">
                  <Stack direction="row" justifyContent="flex-end">
                    {actions.map((action) => (
                      <IconButton key={action.key} onClick={() => action.cb(item.id)}>{action.icon()}</IconButton>
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

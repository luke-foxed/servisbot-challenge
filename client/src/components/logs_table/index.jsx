import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { TableFooter } from '@mui/material'
import Paginator from '../common/paginator'

const LogsTable = ({ logs, onClickRow, onChangePage }) => {
  const { results, currentPage, totalResults } = logs
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Message</TableCell>
            <TableCell align="right">Bot ID</TableCell>
            <TableCell align="right">Worker ID</TableCell>
            <TableCell align="right">Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((log) => (
            <TableRow
              key={log.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => onClickRow(log.id)}
            >
              <TableCell component="th" scope="row">
                {log.id}
              </TableCell>
              <TableCell
                style={{
                  maxWidth: '300px',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                }}
                align="right"
              >
                {log.message}
              </TableCell>
              <TableCell align="right">{log.bot}</TableCell>
              <TableCell align="right">{log.worker}</TableCell>
              <TableCell align="right">{log.created}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <Paginator page={currentPage - 1} count={totalResults} onPageChange={onChangePage} />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  )
}

export default LogsTable

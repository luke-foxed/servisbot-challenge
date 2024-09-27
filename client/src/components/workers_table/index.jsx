import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { TableFooter } from '@mui/material'
import Paginator from '../common/paginator'

const WorkersTable = ({ workers, onClickRow, onChangePage }) => {
  const { results, currentPage, totalResults } = workers

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Bot</TableCell>
            <TableCell align="right">Created</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {results.map((worker) => (
            <TableRow
              key={worker.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              onClick={() => onClickRow(worker.id)}
            >
              <TableCell component="th" scope="row">
                {worker.name}
              </TableCell>
              <TableCell align="right">{worker.description}</TableCell>
              <TableCell align="right">{worker.bot}</TableCell>
              <TableCell align="right">{worker.created}</TableCell>
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

export default WorkersTable

import { Paper, TableBody, TableCell, TableContainer, Table as TableComponent, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { Column } from '../pages/AccessLog/consts';

interface SelectInputProps {
  data: any[],
  columns: Column[] // TODO: CHANGE CONST PATH???
}

export function Table({ data, columns }: SelectInputProps) {
  return (
    <TableContainer component={Paper}>
      <TableComponent sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.id}
                align={column.align}
              >
                {/* TODO: need to add sort */}
                <TableSortLabel active={column.sort}>
                  {column.label}
                </TableSortLabel>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, idx) => (
            <TableRow
              key={`row-${idx}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              {columns.map((column) => {
                const value = row[column.id];
                return (
                  <TableCell key={column.id} align={column.align}>
                    {column.format
                      ? column.format(value)
                      : value}
                  </TableCell>
                );
              })}
            </TableRow>
          ))}
        </TableBody>
      </TableComponent>
    </TableContainer>
  )
}
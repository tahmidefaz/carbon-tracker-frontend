import React, {useState} from "react";
import { useTable, useFilters, useSortBy } from "react-table";
import TablePagination from '@material-ui/core/TablePagination';

import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {CSVLink} from "react-csv";
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
    width: '100%',
    '& .MuiInputBase-root': {
      color: '#000',
      'font-size': '20px',
      'font-family': 'museo-slab',
    },
  },
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '100%',
      'background-color':'#FFF',
      borderRadius: '8px',
    },
    '& .MuiFormLabel-root.Mui-focused': {
      // outline:0px;
    'color': '#91CA6A',
    'font-size': '20px',
    'font-family': 'museo-slab',
    },
    '& .MuiInputBase-root': {
      color: '#000',
      'font-size': '20px',
      'font-family': 'museo-slab',
    },
'& .MuiOutlinedInput-root': {
      '& fieldset': {
        borderColor: '#707070',
        color: '#FFF',
        'font-size': '20px',
    'font-family': 'museo-slab',
    borderRadius: '8px',
      },
      '&:hover fieldset': {
        borderColor: 'white',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#FFF',
      },
    },
    '& .MuiInput-underline:after': {
      borderBottom: '3px solid #FFF',
    }
  },
}));
function Table({ columns, data, props, filter, filterLabel, downloadable, tableclass}) {
  const [filterInput, setFilterInput] = useState("");
  const placeholder = "Search by "+ filter;
  const classes = useStyles();

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    setFilter
  } = useTable(
    {
      columns,
      data,
    },
    useFilters,
    useSortBy
     // This plugin Hook will help to sort our table columns
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

    const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


    const handleFilterChange = e => {
      const value = e.target.value || undefined;
      setFilter(filter, value);
      setFilterInput(value);

  };
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(50);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  if (data.length === 0 || data === '' || data === null){
    return (<></>);
  } else {
    /*
      Render the UI for your table
      - react-table doesn't have UI, it's headless. We just need to put the react-table props from the Hooks, and it will do its magic automatically
    */
    return (
    <>
      {filter && <div>
        <Row>
          <Col>
            <TextField className={classes.root}
          id="outlined-helperTex1"
          label={filterLabel}

          onChange={handleFilterChange}
        />
          </Col>
        </Row>
        </div>}
      {downloadable && <div>
        <CSVLink
          data={data}
          filename={"table-data.csv"}
          className="btn btn-primary"
          target="_blank">
            Download Data
        </CSVLink>
      </div>}
      <table {...getTableProps()} className='MyReactTableClass'>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  className={
                    column.isSorted
                      ? column.isSortedDesc
                        ? "sort-desc"
                        : "sort-asc"
                      : ""
                  }
                >
                  {column.render("Header")}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                  <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
        {rows.length > 5 && <div>
        <tfoot>

        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
        </tfoot>
        </div>}
      </table>
      </>
    );
  }

}

export default Table;
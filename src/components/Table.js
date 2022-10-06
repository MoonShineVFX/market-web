import React, { useRef, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/system';
import { DataGrid } from '@material-ui/data-grid';

const TableDataGrid = styled(DataGrid)(({ theme }) => ({
    '&.MuiDataGrid-root': {
        '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
            '&:focus, &:focus-within': {
                outline: 0,
            },
        },
    },
    '.MuiDataGrid-columnsContainer': {
        '.MuiDataGrid-columnHeaderTitle': {
            fontSize: '1em',
        },
    },
    '.MuiDataGrid-dataContainer': {
        '.MuiDataGrid-cell': {
            fontSize: '15px',
            padding: `0 ${theme.spacing(2)}`,
        },
    },
}));

const Table = ({
    rowId,
    columns,
    rows,
}) => {

    // Ref
    const gridWrapperRef = useRef(null);

    // State
    const [pageSize, setPageSize] = useState(50);

    useEffect(() => {

        const gridDiv = gridWrapperRef.current;
        if (gridDiv) gridDiv.style.height = '';

    });

    return (

        <div ref={gridWrapperRef}>
            <TableDataGrid
                getRowId={rowId}
                columns={columns}
                rows={rows}
                rowHeight={44}
                autoHeight={true}
                disableColumnMenu
                pageSize={pageSize}
                onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
                rowsPerPageOptions={[30, 50, 100]}
                pagination
            />
        </div>

    );

};

Table.defaultProps = {
    columns: [],
    rows: [],
};

Table.propTypes = {
    rowId: PropTypes.func.isRequired,
    columns: PropTypes.array.isRequired,
    rows: PropTypes.array.isRequired,
};

export default Table;

/**
 * Material-ui data grid sample
 * https://codesandbox.io/examples/package/@material-ui/x-grid-data-generator
 */

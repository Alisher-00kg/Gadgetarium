import React, { useEffect, useState } from 'react';
import {
   Table,
   TableHead,
   TableBody,
   TableRow,
   TableCell,
   styled,
   Pagination,
   TableFooter,
} from '@mui/material';
import CheckBox from '../UI/CheckBox';

export const AdminTableList = ({
   data,
   columns,
   onSelectIdsChange,
   setPage,
   page,
   navigate,
}) => {
   const [hoveredRowIndex, setHoveredRowIndex] = useState(null);
   const [selectedIds, setSelectedIds] = useState([]);

   const rowsPerPage = 7;
   const handlePageChange = (event, value) => {
      setPage(value);
   };
   const startIndex = (page - 1) * rowsPerPage;
   const endIndex = startIndex + rowsPerPage;
   const paginatedData = data?.slice(startIndex, endIndex);

   const handleChangeId = id => {
      let updatedSelectedIds;
      if (selectedIds.includes(id)) {
         updatedSelectedIds = selectedIds.filter(
            selectedId => selectedId !== id,
         );
      } else {
         updatedSelectedIds = [...selectedIds, id];
      }
      setSelectedIds(updatedSelectedIds);
      if (onSelectIdsChange) {
         onSelectIdsChange(updatedSelectedIds);
      }
   };

   const handleMouseEnter = rowIndex => {
      setHoveredRowIndex(rowIndex);
   };

   const handleMouseLeave = () => {
      setHoveredRowIndex(null);
   };

   const renderTableCells = (row, rowIndex) => {
      return columns.map((column, colIndex) => {
         if (hoveredRowIndex === rowIndex && colIndex === 0) {
            return (
               <TableCell key={column.field}>
                  <CheckBoxStyle
                     key={row.id}
                     type="checkbox"
                     checked={selectedIds.includes(row.id)}
                     onChange={() => handleChangeId(row.id)}
                     color="success"
                  />
               </TableCell>
            );
         } else if (column?.render && typeof column?.render === 'function') {
            return (
               <TableCell
                  onClick={() => navigate && navigate(row.id)}
                  key={column.field}
               >
                  {column?.render(row)}
               </TableCell>
            );
         } else {
            return (
               <TableCell
                  onClick={() => navigate && navigate(row.id)}
                  key={column.field}
               >
                  {row[column.field]}
               </TableCell>
            );
         }
      });
   };

   return (
      <div>
         <TableStyle>
            <TableHeader>
               <TableRow>
                  {columns?.map(column => (
                     <TableHeadCell key={column.field}>
                        {column.name}
                     </TableHeadCell>
                  ))}
               </TableRow>
            </TableHeader>
            <TableBodyStyle>
               {paginatedData?.length > 0 ? (
                  paginatedData?.map((row, index) => (
                     <TableRowStyle
                        key={index}
                        variant="body"
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                     >
                        {renderTableCells(row, index)}
                     </TableRowStyle>
                  ))
               ) : (
                  <TableRowStyle>
                     <TableCell colSpan={columns?.length}>Нет данных</TableCell>
                  </TableRowStyle>
               )}
            </TableBodyStyle>
         </TableStyle>
         {page ? (
            <FooterStyle>
               <PaginateStyle
                  count={Math.ceil(data?.length / rowsPerPage)}
                  page={page}
                  onChange={handlePageChange}
                  color="primary"
               />
            </FooterStyle>
         ) : null}
      </div>
   );
};

const TableStyle = styled(Table)(() => ({
   maxWidth: '1317px',
   overflowY: 'hidden',
   overflowX: 'hidden',
}));

const TableHeader = styled(TableHead)(() => ({
   background: 'rgba(56, 66, 85, 0.9)',
}));

const PriceStyle = styled(TableCell)(() => ({
   color: 'rgb(44, 104, 245)',
}));

const ImageStyle = styled('img')(() => ({
   width: '64px',
   height: '64px',
   paddingTop: '5px',
   paddingRight: '10px',
}));
const TableBodyStyle = styled(TableBody)(() => ({
   '.MuiTableCell-root': {
      padding: '0',
      paddingLeft: '15px',
      fontFamily: 'Inter',
      fontSize: '16px',
      fontWeight: '400',
      height: '74px',
   },
}));

const TableHeadCell = styled(TableCell)(() => ({
   color: ' rgb(255, 255, 255)',
   fontFamily: 'Inter',
   fontSize: '14px',
   fontWeight: '500',
   padding: '0',
   height: '40px',
   paddingLeft: '15px',
   minWidth: '60px',
}));

const TableRowStyle = styled(TableRow)(() => ({
   border: '1px solid rgb(205, 205, 205)',
   borderRadius: '6px',
   cursor: 'pointer',

   ':hover': {
      background: 'rgba(144, 156, 181, 0.2)',
   },
}));

const CheckBoxStyle = styled(CheckBox)(({ color }) => ({
   '&:hover': {
      color: color === 'success' ? 'rgb(203, 17, 171)' : 'none',
   },
   '&.Mui-checked': {
      color: color === 'success' ? ' rgb(203, 17, 171)' : 'rgb(47, 197, 9)',
   },
}));

const FooterStyle = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
   alignItems: 'center',
   paddingTop: '15px',
   right: '20px',
}));

const PaginateStyle = styled(Pagination)(() => ({
   '.MuiButtonBase-root:hover': {
      background: 'rgb(203, 17, 171)',
   },
}));

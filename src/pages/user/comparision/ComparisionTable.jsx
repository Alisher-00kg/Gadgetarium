import { styled, Table, TableBody, TableCell, TableRow } from '@mui/material';

const columns = [
   { field: 'brandName', name: 'Бренд' },
   { field: 'screen', name: 'Экран' },
   { field: 'mainColour', name: 'Цвет' },
   { field: 'nameOfGadget', name: 'Оп.сис' },
   { field: 'memory', name: 'Память' },
   { field: 'price', name: 'Вес' },
   { field: 'sim', name: 'Sim-карты' },
];

export const ComparasionTable = ({
   cardContainerRef,
   tableContainerRef,
   subGadgetResponses,
   startIndex,
   cardsPerPage,
}) => {
   const handleTableScroll = () => {
      if (cardContainerRef.current) {
         cardContainerRef.current.scrollLeft =
            tableContainerRef.current.scrollLeft;
      }
   };
   return (
      <WrapperTable ref={tableContainerRef} onScroll={handleTableScroll}>
         <Table className="scrollable-table">
            <TableBody>
               {columns.map(column => (
                  <TableRow key={column.field}>
                     <StyledFirstTableCell>{column.name}</StyledFirstTableCell>
                     {subGadgetResponses
                        ?.slice(startIndex, startIndex + cardsPerPage)
                        .map(comp => (
                           <StyledSecondTableCell
                              key={comp.id}
                              sx={{
                                 paddingLeft: '22px',
                                 maxWidth: '200px',
                                 marginRight: '10px',
                              }}
                           >
                              <WrapperTD>{comp[column.field]}</WrapperTD>
                           </StyledSecondTableCell>
                        ))}
                  </TableRow>
               ))}
            </TableBody>
         </Table>
      </WrapperTable>
   );
};

const WrapperTable = styled('section')(() => ({
   paddingLeft: '135px',
}));

const StyledFirstTableCell = styled(TableCell)(() => ({
   fontSize: '16px',
   fontFamily: 'Inter',
   fontWeight: '700',
   padding: '16px 0',
   width: '190px',
}));

const StyledSecondTableCell = styled(TableCell)(() => ({
   width: '200px',
   padding: '0',
}));

const WrapperTD = styled('p')(() => ({
   paddingLeft: '22px',
   maxWidth: '220px',
   marginLeft: '-60px',
   marginRight: '10px',
}));

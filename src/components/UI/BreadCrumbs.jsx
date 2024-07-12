import { Link as RouterLink, useLocation } from 'react-router-dom';
import { Breadcrumbs as MuiBreadcrumbs, Stack, styled } from '@mui/material';

export const BreadCrumbs = ({ breadcrumbs, currentPath }) => {
   const location = useLocation();
   return (
      <StyledDiv>
         <StackStyled>
            <StyledBreadcrumbs separator="»" aria-label="breadcrumb">
               {breadcrumbs?.map(({ href, label }, i) => {
                  const isActive = location.pathname === href;
                  const key = `${href}-${i}`;

                  return (
                     <StyledLink
                        key={key}
                        component={RouterLink}
                        to={href}
                        isActive={isActive}
                        color={href === currentPath ? 'primary' : 'inherit'}
                     >
                        {label}
                     </StyledLink>
                  );
               })}
            </StyledBreadcrumbs>
         </StackStyled>
      </StyledDiv>
   );
};
const StyledDiv = styled('div')(() => ({
   display: 'flex',
   justifyContent: 'center',
}));

const StackStyled = styled(Stack)(() => ({
   width: '100%',
   height: '80px',
   // margin: ' 0px 195px ',
}));

const StyledBreadcrumbs = styled(MuiBreadcrumbs)(() => ({
   fontWeight: '400',
   fontSize: '14px',
   display: 'flex',
   alignItems: ' center',
   padding: '60px 0px 0px 0px',
}));

const StyledLink = styled(RouterLink)(({ isActive }) => ({
   color: isActive ? '#292929' : '#38425599',
   fontSize: '21px',
   textDecoration: 'none',
}));

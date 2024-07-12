import { NavLink, useNavigate } from 'react-router-dom';
import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { Icons } from '../../assets';
import { styled } from '@mui/material';
import { Button } from '../../components/UI/Button';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/auth/authSlice';

const AdminHeader = () => {
   const dispatch = useDispatch();
   const navigate = useNavigate();

   const [anchorEl, setAnchorEl] = React.useState(null);

   const open = Boolean(anchorEl);

   const handleClick = event => {
      setAnchorEl(event.currentTarget);
   };

   const handleClose = event => {
      setAnchorEl(event.currentTarget);
   };

   const logoutHandler = () => {
      setAnchorEl(null);
      dispatch(logout(navigate));
   };

   const options = ['выйти'];
   const ITEM_HEIGHT = 20;

   return (
      <StyledHeader>
         <h2 onClick={() => navigate('/admin/goods')}>
            <span className="logo">G</span>adgetarium
         </h2>

         <nav>
            <ul>
               <li>
                  <NavLink
                     className={({ isActive }) => (isActive ? 'active' : '')}
                     to={'goods'}
                  >
                     Товары
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     className={({ isActive }) => (isActive ? 'active' : '')}
                     to={'orders'}
                  >
                     Заказы
                  </NavLink>
               </li>
               <li>
                  <NavLink
                     className={({ isActive }) => (isActive ? 'active' : '')}
                     to={'/admin/reviewsrating'}
                  >
                     Отзывы и рейтинги
                  </NavLink>
               </li>
            </ul>
         </nav>
         <div className="contained_end">
            <div>
               <StyleMuiButton variant={'contained'}>
                  создать рассылку
               </StyleMuiButton>
               <span className="palozka"></span>
               <h3>G</h3>
               <h4>Администратор</h4>
               <div>
                  <IconButton
                     aria-label="more"
                     id="long-button"
                     aria-controls={open ? 'long-menu' : undefined}
                     aria-expanded={open ? 'true' : undefined}
                     aria-haspopup="true"
                     onClick={handleClick}
                  >
                     <Icons.GreyErrowDown />
                  </IconButton>
                  <Menu
                     id="long-menu"
                     MenuListProps={{
                        'aria-labelledby': 'long-button',
                     }}
                     anchorEl={anchorEl}
                     open={open}
                     onClose={handleClose}
                     PaperProps={{
                        style: {
                           maxHeight: ITEM_HEIGHT * 4.5,
                           width: '20ch',
                        },
                     }}
                  >
                     {options.map(option => (
                        <MenuItem
                           key={option}
                           selected={option === 'Pyxis'}
                           onClick={logoutHandler}
                        >
                           {option}
                        </MenuItem>
                     ))}
                  </Menu>
               </div>
            </div>
         </div>
      </StyledHeader>
   );
};
const StyledHeader = styled('header')`
   /* position: fixed; */
   left: 0;
   top: 0;
   width: 100%;
   height: 83px;
   background-color: black;
   display: flex;
   justify-content: space-between;
   padding: 0 100px;
   h2 {
      padding-top: 20px;
      color: rgb(255, 255, 255);
      font-family: Orbitron;
      font-size: 31.69px;
      font-weight: 700;
      line-height: 40px;
      text-align: left;
      padding-left: 20px;
      cursor: pointer;
   }

   p {
      color: white;
   }
   h4 {
      padding-top: 10px;
      border: none;
      color: white;
   }
   svg {
      position: absolute;
      right: 20px;
      top: 17px;
      color: white;
   }
   .logo {
      padding: 6px 6px 0;
      background-color: #ef41d2;
      font-size: 35px;
   }
   nav {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
   }
   nav > a:active {
      background: #858fa426;
   }
   nav > ul {
      display: flex;
      gap: 20px;
   }
   nav a {
      padding: 10px;
      color: rgb(255, 255, 255);
      font-weight: 500;
      text-decoration: none;
   }
   .active {
      background: #2a2b38;
      border-radius: 4px;
   }
   .contained_end {
      display: flex;
      flex-direction: column;
      justify-content: center;
   }
   .palozka {
      width: 1px;
      height: 40px;
      background-color: gray;
   }
   .contained_end div {
      display: flex;
      gap: 30px;
   }

   .contained_end h3 {
      font-size: 25px;
      padding: 6px 13px 5px;
      background-color: white;
      color: #ef41d2;
      border-radius: 25px;
   }
   .button_modal {
      border: none;
   }
`;
const StyleMuiButton = styled(Button)(() => ({
   width: '190px',
   height: '43px',
   borderRadius: '46px',
   padding: ' 12px 20px 12px 20px ',
}));

export default AdminHeader;

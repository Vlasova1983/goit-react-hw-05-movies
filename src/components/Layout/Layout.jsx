import {  NavLink } from 'react-router-dom';
import styles  from '../Layout/Layout.module.css';

const getActiveClassName = ({ isActive }) => {
    return isActive ? styles.link_menu_activ : styles.link_menu;
  };

export const Layout = ({children}) => {
    return (
        <>  
            <ul className={styles.list_menu}>
                <NavLink to="" className={getActiveClassName}>Home</NavLink>            
                <NavLink to="movies" className={getActiveClassName}> Movies</NavLink>
            </ul> 
            <div>{children}</div>            
        </>        
    ) 
}
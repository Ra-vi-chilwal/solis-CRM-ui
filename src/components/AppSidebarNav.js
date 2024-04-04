import React from 'react'
import { NavLink, useLocation } from 'react-router-dom' ;
import PropTypes from 'prop-types';
import { CBadge } from '@coreui/react';
import { useState ,useEffect} from 'react';

export const AppSidebarNav = ({ items }) => {
const[select,setSelect] = useState("home");
  const location = useLocation()
  const navLink = (name, icon, badge) => {
    return (
      <>
        <small style={{color:"red" ,marginLeft:"14px"}}>{icon && icon}</small>
        <span style={{
          marginLeft:"10px",
          color: (select && name && select.toLowerCase() === name.toLowerCase()) ? 'black' : 'black ',
          // background: (select && name && select.toLowerCase() === name.toLowerCase()) ? '#1266f1' : 'white'
        }}  >{name && name} </span>
        {badge && (
          <CBadge color={badge.color} className="ms-auto">
            {badge.text}
          </CBadge>
         
        )}
         {(name=="Source" || name=="Admin Tool") && <small className='d-flex ' style={{position:"absolute",right:"1rem"}}><img src='https://static.thenounproject.com/png/551749-200.png' width={20}/></small>}
      </>
    )
  }
  const   navItem = (item, index) => {
    const { component, name, badge, icon, ...rest } = item
    const Component = component
    return (
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
        style={{
          borderLeft: (select && name && select.toLowerCase() === name.toLowerCase()) ? '3px solid #0094ff' : '',
          background: (select && name && select.toLowerCase() === name.toLowerCase()) ? '#edf0f4' : 'white',
          color: (select && name && select.toLowerCase() === name.toLowerCase()) ? 'black' : 'black'
        }}
        // style={{ background: select.toLowerCase() === name.toLowerCase()? 'blue' : 'w  hite' }}
      >
        {navLink(name, icon, badge)}
        {/* {<span>ss</span>} */}
      </Component>
    )
  }
  const navGroup = (item, index) => {
    const { component, name, icon, to, ...rest } = item
  
    const Component = component
    return (
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
        style={{
          border:"1px solid white",
          // color: (select && name && select.toLowerCase() === name.toLowerCase()) ? 'white' : 'white',
          background: (select && name && select.toLowerCase() === name.toLowerCase()) ? '#edf0f4' : '',
        }}          >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
    )
  }
  useEffect(() => {
    const pathname = location.pathname;
    const path = pathname.split("/").reverse()[0];
    console.log(path,"path")
    setSelect(path=="website"?"Websites":(path=="google-ads"?"Google Ads.":(path=="custom"?"Manual Data":(path==""?"home":(path=="getAllLead"?"All Lead":path)))))
    // console.log(path,"location")
    
  }, [location, items,select  ]);

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index,) : navItem(item, index)))}
    </React.Fragment>
  )
}

AppSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}

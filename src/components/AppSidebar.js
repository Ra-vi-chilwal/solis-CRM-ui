import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { CSidebar, CSidebarBrand, CSidebarNav, CSidebarToggler } from '@coreui/react'
import { AppSidebarNav } from './AppSidebarNav'
import logo from '../assets/images/avatars/man-avatar.png'

// import { logoNegative } from 'src/assets/brand/logo-negative'
// import { sygnet } from 'src/assets/brand/sygnet'
import headerLogo from '../assets/images/DeS-logo.png'
import SimpleBar from 'simplebar-react'
import 'simplebar/dist/simplebar.min.css'
import CIcon from '@coreui/icons-react'

import {
  cilBell,
  cilChartLine,
  cilIndustry,
  cilGroup,
  cilBuilding,
  cilCouch,
  cilDescription,
  cibGoogle,
  cilUsb,
  cilMobile,
  cilUserPlus,
  cilHttps,
  cilPuzzle,
  cilSpeedometer,
  cibLinkedinIn,
  cibInstagram,
  cibFacebook,
  cibHackhands,
  cibMyspace,
  cibUpwork,
  cibFlutter,
  cilUser
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'
import { Link } from 'react-router-dom'

// sidebar nav config
// import navigation from '../_nav'

const AppSidebar = () => {
  const dispatch = useDispatch()
  const unfoldable = useSelector((state) => state.sidebarUnfoldable)
  const sidebarShow = useSelector((state) => state.sidebar.sidebar)
  var token = localStorage.getItem("token") || " ";
  const { loading, userInfo, error } = useSelector(store => store.userInfo);
  const permissions = userInfo && userInfo.payload && userInfo.payload.role[0] && userInfo.payload.role[0].permission
  const allElements = ['read', 'create', 'delete', 'update']
  const objectValues = permissions && permissions.map(obj => obj.value);
  const data = allElements.every(element => objectValues && objectValues.includes(element));
  const superAdminPermission = permissions && permissions.some(obj => obj.value === 'root')
  const _nav = [
    {
      component: CNavItem,
      // name: 'Dashboard',
      name: 'Home',
      to: '/',
      icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" color='black' />,
      badge: {
        color: 'info',
        text: 'NEW',
      },
    },
    {
      component: CNavItem,
      name: 'All Lead',
      icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
      to: 'source/custom/getAllLead',
    },

    {
      component: CNavGroup,
      name: 'Source',
      to: '/source',
      icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" color='black' />,

      items: [
        {
          component: CNavItem,
          name: 'Websites',
          icon: <CIcon icon={cilIndustry} customClassName="nav-icon" color='black' />,
          to: '/source/website',
        },
        {
          component: CNavItem,
          name: 'Facebook',
          icon: <CIcon icon={cibFacebook} customClassName="nav-icon" />,
          to: '/source/facebook',
        },
        {
          component: CNavItem,
          name: 'Instagram',
          icon: <CIcon icon={cibInstagram} customClassName="nav-icon" />,
          to: '/source/instagram',
        },
        {
          component: CNavItem,
          name: 'Justdial',
          icon: <CIcon icon={cibHackhands} customClassName="nav-icon" />,
          to: '/source/justdial',
        },
        {
          component: CNavItem,
          name: 'Google Ads.',
          icon: <CIcon icon={cibGoogle} customClassName="nav-icon" />,
          to: '/source/google-ads',
        },


        {
          component: CNavItem,
          name: 'LinkedIn',
          icon: <CIcon icon={cibLinkedinIn} customClassName="nav-icon" />,
          to: '/source/linkedin',
        },


        {
          component: CNavItem,
          name: 'Manual Data',
          icon: <CIcon icon={cibMyspace} customClassName="nav-icon" />,
          to: '/source/custom',
        },
        {
          component: CNavItem,
          name: 'Upwork',
          icon: <CIcon icon={cibUpwork} customClassName="nav-icon" />,
          to: '/source/custom',
        },
        {
          component: CNavItem,
          name: 'Fiverr',
          icon: <CIcon icon={cibFlutter} customClassName="nav-icon" />,
          to: '/source/custom',
        },
      ],
    },
    data ?{
      component: CNavGroup,
      name: 'Admin Tool',
      icon: <CIcon icon={cilUserPlus} customClassName="nav-icon" />,
      items: [
        {
          component: CNavItem,
          name: 'Role',
          icon: <CIcon icon={cilCouch} customClassName="nav-icon" />,
          to: '/admin-tool/role',
        },
        {
          component: CNavItem,
          name: 'User',
          icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
          to: '/admin-tool/user',
        },
        {
          component: CNavItem,
          name: 'Products',
          icon: <CIcon icon={cilGroup} customClassName="nav-icon" />,
          to: '/admin-tool/products',
        },
        superAdminPermission ? {
          component: CNavItem,
          name: 'Company',
          to: '/admin-tool/company',
          icon: <CIcon icon={cilBuilding} customClassName="nav-icon" />,
        } :
          {
            component: CNavItem,

          },

     
      ],
    } : null,

    {
      component: CNavItem,
      name: 'Logout',
      icon: <CIcon icon={cilHttps} customClassName="nav-icon" />,
      to: '/user/login',
    },

  ]
  const filterItem = _nav.filter((ele) => ele != null || ele != undefined)
  return (
    <CSidebar
      position="fixed"
      style={{ backgroundColor: "white", color: "black", fontSize: "14px", fontWeight: 400, marginTop: "4rem",borderRight:"1px solid #edf0f4",borderRadius: "0 33px 0 0" }}
      unfoldable={unfoldable}
      visible={sidebarShow}
      onVisibleChange={(visible) => {
        dispatch({ type: 'set', sidebarShow: visible })
      }}
    >
      <div style={{ background: "#edf0f4" }}>
        <CSidebarBrand className="d-none d-md-flex" to="/" style={{ background: "white", borderRadius: "0 0 0 0" }}>
          <div className='d-flex flex-column p-2 justify-content-center'>

            <Link to="/profile"><img src={logo} alt='img-logo' className='img-fluid border ' style={{ width: "88px", borderRadius: "50%", cursor: "pointer", }} /></Link>
            <div><span className='text-secondary cursor-pointer'><Link to="/profile">{userInfo?.payload?.firstName}  {userInfo?.payload?.lastName } </Link>   </span></div>
            <div>
            {/* <span className='text-secondary'><Link to="/profile" width={60}>
                <CIcon icon={cilUser} />
              </Link></span> */}
              {/* <span className='text-secondary'>profile</span>
              <span className='text-secondary'>Settings</span>
              <span className='text-secondary'>Logout</span> */} 
            </div>
          </div>

          {/* <img src={headerLogo} alt='logo' className='img-fluid ' style={{ background: "", width: "31%" }} /> */}
        </CSidebarBrand>
      </div>
      {/* <hr/> */}
      {/* <CIcon className="sidebar-brand-full" icon={logoNegative} height={35} />
        <CIcon className="sidebar-brand-narrow" icon={sygnet} height={35} /> */}

      <CSidebarNav >
        <SimpleBar>
          <AppSidebarNav items={filterItem} />
        </SimpleBar>
      </CSidebarNav>
      {/* <CSidebarToggler
        className="d-none d-lg-flex"
        onClick={() => dispatch({ type: 'set', sidebarUnfoldable: !unfoldable })}
      /> */}
    </CSidebar>
  )
}

export default React.memo(AppSidebar)

import React ,{useState}from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import headerLogo from '../assets/images/crm-logo-1.png'
import {
  CContainer,
  CHeader,
  CHeaderBrand,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilBell, cilEnvelopeOpen, cilList, cilMenu } from '@coreui/icons'
import logo from '../assets/images/avatars/1.jpg'
import { AppBreadcrumb } from './index'
import { AppHeaderDropdown } from './header/index'
// import { sidebar } from '../redux/reducer/sidebar/sidebar'
// import { useDispatch, useSelector } from 'react-redux';
import { setSidebar } from '../redux/action/sidebar/sidebar';

const AppHeader = () => {

  const [showLogout, setShowLogout] = useState(false);

  const handleMouseEnter = () => {
    setShowLogout(true);
  };

  const handleMouseLeave = () => {
    setShowLogout(false);
  };

  const dispatch = useDispatch()
  // const sidebarShow = useSelector((state) => state.sidebar.sidebar)
  const sidebarShow = useSelector((state) => state.sidebar.sidebar);
  const { loading, userInfo, error } = useSelector(store => store.userInfo);
  const userPayload = userInfo && userInfo.payload && userInfo.payload.firstName
  console.log(sidebarShow, "sidebar")
  return (
    <CHeader position="sticky" className="" style={{  background:"#edf0f4",color: "Black", border:"none" }}>
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch(setSidebar(!sidebarShow))}
        // onClick={() => dispatch({ type: 'SET_SIDEBAR', sidebarShow: !sidebarShow })}

        >
          <CIcon icon={cilMenu} size="lg" style={{ color: "",fontWeight:"600" }} />
        </CHeaderToggler>
        {/* <CHeaderBrand className="mx-auto d-md-none" to="/">
          <CIcon icon={logo} height={48} alt="Logo" />
        </CHeaderBrand> */}
        {/* <CHeaderNav className="d-none d-md-flex me-auto" style={{ color: "white" }}>
          <CNavItem >
            <CNavLink className="header-link" to="/" component={NavLink} style={{ color: "white" ,fontSize:'14px',fontWeight:"600"}}>
              Dashboard
            </CNavLink>
          </CNavItem>
          <CNavItem >
            <CNavLink href="#" className="header-link" style={{ color: "white" ,fontSize:'14px',fontWeight:"600"}}>Users</CNavLink  >
          </CNavItem>
          <CNavItem >
            <CNavLink href="#" className="header-link" style={{ color: "white" ,fontSize:'14px',fontWeight:"600"}}>Settings</CNavLink>
          </CNavItem>
        </CHeaderNav> */}

        <div className='d-flex justify-content-center' style={{margin:"auto"}}>
          <img src={headerLogo} alt='logo' className='img-fluid ' style={{ background: "", width: "40%" }} />

        </div>

        <div>
        <CHeaderNav>
          <CNavItem>
            <CNavLink href="/">
              <CIcon icon={cilBell} size="lg" style={{ color: "" }} />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilList} size="lg" style={{ color: "" }} />
            </CNavLink>
          </CNavItem>
          <CNavItem>
            <CNavLink href="#">
              <CIcon icon={cilEnvelopeOpen} size="lg" style={{ color: "" }} />
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        {/* <CHeaderNav className="ms-3">
          <span>{userPayload}</span> Profile Name
          <AppHeaderDropdown />
        </CHeaderNav> */}
        <CHeaderNav className="ms-3" >
          <div onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}>

          {/* <Link to="/profile"><img src={logo} alt='img-logo' className='img-fluid' style={{ width: "38px", borderRadius: "50%", cursor: "pointer" }} /></Link> */}
          {/* {showLogout && (
          <button
            onClick={console.log("hhf")} // Replace with your logout logic
            className="btn logout-btn"
            style={{ position: "absolute", top: "13", right: "50", display: "" ,background:"darkblue", color:"white" }}
          >
            Logout
          </button>
        )} */}
          </div>
          <AppHeaderDropdown />
        </CHeaderNav>
        </div>
      </CContainer>
      {/* <CHeaderDivider />   */}
      {/* <CContainer fluid>
        <AppBreadcrumb />
      </CContainer> */}
    </CHeader>
  )
}

export default AppHeader

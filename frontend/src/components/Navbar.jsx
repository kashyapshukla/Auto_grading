import React from 'react'
import Wrapper from '../assets/wrappers/Navbar'
import { FaAlignLeft } from 'react-icons/fa'
import Logo from './Logo'
import { useDashboardContext } from '../pages/Dashboard/DashboardLayout'
import LogoutContainer from './LogoutContainer'
const Navbar = () => {
  const { toggleSidebar } = useDashboardContext()
  return (
    <Wrapper>
      <div className='nav-center'>
        <button type='button' className='toggle-btn' onClick={toggleSidebar}>
          <FaAlignLeft />
        </button>
        <div>
          <Logo />
          <h4 className='logo-text'>dashboard</h4>
        </div>
        <LogoutContainer />
      </div>
    </Wrapper>
  )
}

export default Navbar

import React from 'react'
import Wrapper from '../assets/wrappers/BigSidebar'
import NavLinks from '../components/NavLinks'
import Logo from './Logo'
import { useDashboardContext } from '../pages/Dashboard/DashboardLayout'
const BigSidebar = () => {
  const { showSidebar } = useDashboardContext()
  return (
    <Wrapper>
      <div
        className={
          showSidebar ? 'sidebar-container ' : 'sidebar-container show-sidebar'
        }
      >
        <div className='content'>
          <header>
            <Logo />
          </header>
          <NavLinks isBigSidebar />
        </div>
      </div>
    </Wrapper>
  )
}

export default BigSidebar

import React, { createContext, useContext, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/Dashboard'
import BigSidebar from '../../components/BigSidebar'
import SmallSidebar from '../../components/SmallSidebar'
import Navbar from '../../components/Navbar'

const DashboardContext = createContext()
const DashboardLayout = () => {
  const user = { name: 'Himani' }
  const [showSidebar, setShowSidebar] = useState(false)

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const logoutUser = () => {
    console.log('logout user')
  }

  return (
    <DashboardContext.Provider
      value={{
        user,
        showSidebar,
        toggleSidebar,
        logoutUser,
      }}
    >
      <Wrapper>
        <main className='dashboard'>
          <SmallSidebar />
          <BigSidebar />
          <div>
            <Navbar />
            <div className='dashboard-page'>
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}
export const useDashboardContext = () => useContext(DashboardContext)
export default DashboardLayout

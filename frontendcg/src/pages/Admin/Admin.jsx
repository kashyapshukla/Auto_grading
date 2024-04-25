import { FaUsers, FaFolderOpen, FaLockOpen, FaLock } from 'react-icons/fa'

import { useLoaderData, redirect } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/StatsContainer'
import { toast } from 'react-toastify'
import axios from 'axios'
import StatItem from './StatItem'

export const loader = async () => {
  try {
    const response = await axios.get('/api/users/admin/app-stats')
    return response.data
  } catch (error) {
    toast.error('you are not authorize to view this page')
    return redirect('/dashboard')
  }
}
const Admin = () => {
  const { users, assignments, publishedAssignments, unpublishedAssignments } =
    useLoaderData()
  return (
    <Wrapper>
      <StatItem
        title='current users'
        count={users}
        color='#e9b949'
        bcg='#fcefc7'
        icon={<FaUsers />}
      />
      <StatItem
        title='total assignments'
        count={assignments}
        color='#647acb'
        bcg='#e0e8f9'
        icon={<FaFolderOpen />}
      />
      <StatItem
        title='published assignments'
        count={publishedAssignments}
        color='#64cb72'
        bcg='#e0e8f9'
        icon={<FaLockOpen />}
      />
      <StatItem
        title='unpublished assignments'
        count={unpublishedAssignments}
        color='#e65e38'
        bcg='#e0e8f9'
        icon={<FaLock />}
      />
    </Wrapper>
  )
}

export default Admin

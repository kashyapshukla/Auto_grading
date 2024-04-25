import { useLoaderData } from 'react-router-dom'
import { useContext, createContext } from 'react'
import { toast } from 'react-toastify'
import AssignmentsContainer from '../../components/AssignmentsContainer'
import axios from 'axios'

export const loader = async () => {
  try {
    const { data } = await axios.get('/api/assignments')
    return {
      data,
    }
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return error
  }
}

const AllAssignmentsContext = createContext()
const AllAssignments = () => {
  const { data } = useLoaderData()
  // console.log(data)
  return (
    <AllAssignmentsContext.Provider value={{ data }}>
      <AssignmentsContainer />
    </AllAssignmentsContext.Provider>
  )
}

export const useAllAssignmentsContext = () => useContext(AllAssignmentsContext)

export default AllAssignments

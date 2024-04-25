import { useLoaderData } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

export const loader = async () => {
  try {
    const submissions = await axios.get('/api/submission/grades')
    // console.log(submissions)
    return { submissions }
  } catch (error) {
    toast.error(error?.response?.data?.message)
    return error
  }
}

const Grades = () => {
  const { submissions } = useLoaderData()
  console.log(submissions)
  return <div>Grades</div>
}
export default Grades

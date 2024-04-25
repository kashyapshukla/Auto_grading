import { toast } from 'react-toastify'
import { redirect } from 'react-router-dom'
import axios from 'axios'

export const action = async ({ params }) => {
  try {
    await axios.delete(`/api/assignments/${params.id}`)
    toast.success('Assignment deleted successfully')
  } catch (error) {
    toast.error(error.response.data.message)
  }
  return redirect('/dashboard/all-assignments')
}

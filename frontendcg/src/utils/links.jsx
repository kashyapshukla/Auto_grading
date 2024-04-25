import { ImProfile } from 'react-icons/im'
import { FaWpforms } from 'react-icons/fa'
import { MdQueryStats } from 'react-icons/md'
import { MdAdminPanelSettings } from 'react-icons/md'

const links = [
  { text: 'profile', path: '.', icon: <ImProfile /> },
  { text: 'add assignment', path: 'add-assignment', icon: <FaWpforms /> },
  { text: 'all assignments', path: 'all-assignments', icon: <MdQueryStats /> },
  { text: 'Grades', path: 'grades', icon: <FaWpforms /> },
  { text: 'admin', path: 'admin', icon: <MdAdminPanelSettings /> },
]

export default links

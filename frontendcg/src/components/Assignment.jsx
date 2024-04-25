import { Link, Form } from 'react-router-dom'
import Wrapper from '../assets/wrappers/Assignmentt.js'
import day from 'dayjs'
import advancedFormat from 'dayjs/plugin/advancedFormat.js'
day.extend(advancedFormat)

const Assignment = ({
  _id,
  title,
  description,
  requirement,
  points,
  createdAt,
  assignmentStatus,
  dueDate,
}) => {
  const date = day(createdAt).format('MMM Do, YYYY')
  const due = day(dueDate).format('MMM Do, YYYY')
  return (
    <Wrapper>
      <header>
        <div className='main-icon'>{title.charAt(0)}</div>
        <div className='info'>
          <h5>{title}</h5>
          <p>{`Due:  ${due}`}</p>
        </div>
      </header>
      <div className='content'>
        <footer className='actions'>
          <Link to={`../view-assignment/${_id}`} className='btn edit-btn'>
            View
          </Link>
          <Link to={`../edit-assignment/${_id}`} className='btn edit-btn'>
            Edit
          </Link>
          <Form method='post' action={`../delete-assignment/${_id}`}>
            <button type='submit' className='btn delete-btn'>
              Delete
            </button>
          </Form>
        </footer>
      </div>
    </Wrapper>
  )
}

export default Assignment

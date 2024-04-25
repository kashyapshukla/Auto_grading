import Assignment from './Assignment.jsx'

import Wrapper from '../assets/wrappers/Assignmentt.js'
import { useAllAssignmentsContext } from '../pages/Assignment/AllAssignments.jsx'

const AssignmentsContainer = () => {
  const { data } = useAllAssignmentsContext()
  const { assignments } = data
  if (assignments?.length === 0) {
    return (
      <Wrapper>
        <h2>No assignments to display...</h2>
      </Wrapper>
    )
  }

  return (
    <Wrapper>
      <div className='assignments'>
        {assignments.map((assignment) => {
          return (
            <div>
              <Assignment key={assignment._id} {...assignment} />
            </div>
          )
        })}
      </div>
    </Wrapper>
  )
}

export default AssignmentsContainer

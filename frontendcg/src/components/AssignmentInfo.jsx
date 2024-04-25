import Wrapper from '../assets/wrappers/AssignmentInfo.js'

const AssignmentInfo = ({ icon, text }) => {
  return (
    <Wrapper>
      <span className='assign-icon'>{icon}</span>
      <span className='assign-text'>{text}</span>
    </Wrapper>
  )
}

export default AssignmentInfo

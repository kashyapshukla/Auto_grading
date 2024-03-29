import styled from 'styled-components'

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  align-items: center;
  .logo {
    display: block;
    margin: 0 auto;
    margin-bottom: 1.38rem;
  }
  .form {
    max-width: 700px;
    border-top: 5px solid var(--primary-500);
  }
  h4 {
    text-align: center;
    margin-bottom: 1.38rem;
    margin-top: 2.38rem;
  }
  h5 {
    text-align: center;
    margin-bottom: 1.38rem;
  }
  p {
    margin-top: 1rem;
    text-align: center;
    line-height: 1.5;
  }
  .btn {
    margin-top: 1rem;
    width: 100%;
  }
  .member-btn {
    color: var(--primary-500);
    letter-spacing: var(--letter-spacing);
    margin-left: 0.25rem;
  }
  .form-input,
  .form-textarea,
  .form-select {
    width: 620px;
    height: 127px;
    padding: 0.375rem 0.75rem;
    border-radius: var(--border-radius);
    background: var(--background-color);
    border: 1px solid var(--grey-300);
    color: var(--text-color);
  }
`
export default Wrapper

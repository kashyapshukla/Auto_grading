import React from 'react'
import { Link } from 'react-router-dom'
import { useRouteError } from 'react-router-dom'
import Wrapper from '../../assets/wrappers/ErrorPage'
import notFound from '../../assets/Images/not-found.svg'

const ErrorPage = () => {
  const error = useRouteError()
  console.log(error)
  if (error.status === 404) {
    return (
      <Wrapper>
        <div>
          <img src={notFound} alt='Not Found' />
          <h3>Ohh! page not found</h3>
          <p>we can't seem to find the page you are looking for</p>
          <Link to='/'>Back Home</Link>
        </div>
      </Wrapper>
    )
  }
}

export default ErrorPage

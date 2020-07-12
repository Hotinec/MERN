import React, { useState, useEffect } from 'react'
import { useHttp } from '../hooks/http.hook'
import { useMessage } from '../hooks/message.hook'

const AuthPage = () => {
  const message = useMessage()
  const { loading, error, request, clearError } = useHttp()
  const [form, setForm] = useState({
    email: '', password: ''
  })

  useEffect(() => {
    message(error)
    clearError()
  }, [error, message, clearError])

  const changeHandler = (event) => {
    setForm({
      ...form, 
      [event.target.name]: event.target.value
    })
  }

  const registerHandler = async () => {
    try {
      const data = await request('/api/auth/register', 'POST', {...form})
      message(data.message)
    } catch (e) {
      
    }
  }

  return (
    <div className="row">
      <div className="col s6 offset-s3">
        <h1>Reduce Link</h1>
        <div className="card blue darken-1">
        <div className="card-content white-text">
          <span className="card-title">Authorization</span>
          <div>

          <div className="input-field">
            <input 
              placeholder="Enter email" 
              id="email" 
              type="text" 
              name="email" 
              className="validate yellow-input" 
              onChange={changeHandler} />
            <label htmlFor="email">Email</label>
          </div>

          <div className="input-field">
            <input 
              placeholder="Enter password" 
              id="password" 
              type="password" 
              name="password" 
              className="validate yellow-input" 
              onChange={changeHandler} />
            <label htmlFor="password">Password</label>
          </div>

          </div>
        </div>
        <div className="card-action auth__buttons">
          <button 
            className="btn yellow darken-4"
            disabled={loading} >
            Enter
          </button>
          <button 
            className="btn grey lighten-1 black-text"
            onClick={registerHandler}
            disabled={loading} >
            Registration
          </button>
        </div>
      </div>
      </div>
    </div>
  )
}

export default AuthPage
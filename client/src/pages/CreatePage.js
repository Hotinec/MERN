import React, { useState, useEffect, useContext } from 'react'
import { useHistory } from 'react-router-dom'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'

const CreatePage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const [link, setLink] = useState('')
  const { request } = useHttp()

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = async (event) => {
    if (event.key === 'Enter') {
      try {
        const data = await request(
          '/api/link/generate', 
          'POST', 
          {from: link},
          {Authorization:`Bearer ${auth.token}`}
        )
        history.push(`/detail/${data.link._id}`)
      } catch (e) {}
    }
  } 

  return (
    <div className="row create-padding-top">
      <div className="col s8 offset-s2">
        <div className="input-field">
          <input 
            placeholder="Add link" 
            id="link" 
            type="text" 
            className="validate" 
            value={link}
            onChange={e => setLink(e.target.value)}
            onKeyPress={pressHandler} />
          <label htmlFor="email">Enter link</label>
        </div>
      </div>
    </div>
  )
}

export default CreatePage

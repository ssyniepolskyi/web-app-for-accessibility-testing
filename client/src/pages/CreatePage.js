import React, { useContext, useEffect, useState } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'
import { useHistory } from 'react-router-dom'

export const CreatePage = () => {
  const history = useHistory()
  const auth = useContext(AuthContext)
  const { request } = useHttp()
  const [task, setTask] = useState('')

  useEffect(() => {
    window.M.updateTextFields()
  }, [])

  const pressHandler = async event => {
    if (event.key === 'Enter') {
      try {
        await request('/api/task/generate', 'POST', { from: task }, {
          Authorization: `Bearer ${auth.token}`
        })
        history.push(`/tasks`)
      } catch (e) { }
    }
  }

  const addTaskBtn = async event => {
    try {
      await request('/api/task/generate', 'POST', { from: task }, {
        Authorization: `Bearer ${auth.token}`
      })
      history.push(`/tasks`)
    } catch (e) { }
  }

  return (

    <div className="row" onFocus={() => { console.log('Div received focus'); }}>
      <p>
        <h5><b>На даній сторінці ви можете створити задачу, ввівши її назву у відповідне поле та натиснувши "Enter"</b></h5>
        <h6>Також ви можете переглянути всі створені завдання, перейшовши до вкладки "Справи"</h6>
      </p>

      <div className="col s8 offset-s2" style={{ paddingTop: '2rem' }}>
        <div className="input-field">
          <input
            placeholder="Назва справи"
            id="task"
            automation-id="task-name-input"
            type="text"
            value={task}
            onChange={e => setTask(e.target.value)}
            onKeyPress={pressHandler}
          />
          <label htmlFor="task" style={{ color: '#0d47a1' }}><h6><b>Введіть назву своєї справи</b></h6></label>
          <button
            aria-label='Створити'
            automation-id="add-task-btn"
            className="btn waves-effect waves-dark"
            onClick={addTaskBtn}
            style={{ "color": "#ffffff" }}
          >
            <b>Створити</b>
          </button>
        </div>
      </div>
    </div>
  )
}

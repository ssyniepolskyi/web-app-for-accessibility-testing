import React, { useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'

export const TaskCheckbox = ({ task, updateTask }) => {
  const auth = useContext(AuthContext)
  const { request } = useHttp()


  const setCompleted = async () => {
    try {
      const response = await request('/api/task/complete', 'PUT', { id: task._id }, {
        Authorization: `Bearer ${auth.token}`
      })
      if (response.message !== "OK") {
        console.error("Something went wrong")
      } else {
        updateTask(task._id)
      }
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <p automation-id="task-checkbox">
      <label>
        <input type="checkbox" automation-id="task-checkbox1" checked={task.completed} onChange={setCompleted}
        />
        <span>Натисніть для зміни статусу</span>
      </label>
    </p>
  )
}

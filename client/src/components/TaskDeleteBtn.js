import React, { useContext } from 'react'
import { useHttp } from '../hooks/http.hook'
import { AuthContext } from '../context/AuthContext'

export const TaskDeleteBtn = ({ task, updateList }) => {
  const auth = useContext(AuthContext)
  const { request } = useHttp()
  const deleteItem = async () => {
    try {
      const response = await request('/api/task/delete_task', 'DELETE', { id: task._id }, {
        Authorization: `Bearer ${auth.token}`
      })
      if (response.message !== "OK") {
        console.error("Something went wrong...")
      } else {
        updateList(task._id)
      }
    } catch (e) {

    }
  }

  return (
    <button
      aria-label='Видалити'
      automation-id="delete-task-btn"
      className="btn waves-effect waves-dark"
      onClick={deleteItem}
      style={{ "color": "#ffffff" }}

    >
      <b>видалити</b>
    </button>
  )
}

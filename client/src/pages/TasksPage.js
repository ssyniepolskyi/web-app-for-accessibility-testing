import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {TasksList} from '../components/TasksList'

export const TasksPage = () => {
  const [tasks, setTasks] = useState([])
  const {loading, request} = useHttp()
  const {token} = useContext(AuthContext)

  const updateTask = useCallback((taskId) => {
    setTasks(tasks.map((task) => {
      console.log(task)
      if (task._id === taskId) {
        
        return { ...task, completed: !task.completed };
      }

      return task;
    }));

  }, [tasks]);

  const updateList = useCallback((taskId) => {
    setTasks(tasks.filter((task) => {
      console.log(task)
      if (task._id === taskId) {
        return false;
      }
      return true;
    }));

  }, [tasks]);

  const fetchTasks = useCallback(async () => {
    try {
      const fetched = await request('/api/task', 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setTasks(fetched)
    } catch (e) {}
  }, [token, request])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  if (loading) {
    return <Loader/>
  }

  return (
    <>
      {!loading && <TasksList tasks={tasks} updateTask={updateTask} updateList={updateList} />}
    </>
  )
}

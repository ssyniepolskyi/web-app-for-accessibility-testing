import React, {useCallback, useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import {useHttp} from '../hooks/http.hook'
import {AuthContext} from '../context/AuthContext'
import {Loader} from '../components/Loader'
import {TaskCard} from '../components/TaskCard'

export const DetailPage = () => {
  const {token} = useContext(AuthContext)
  const {request, loading} = useHttp()
  const [task, setTask] = useState(null)
  const taskId = useParams().id

  const getTask = useCallback(async () => {
    try {
      const fetched = await request(`/api/task/${taskId}`, 'GET', null, {
        Authorization: `Bearer ${token}`
      })
      setTask(fetched)
    } catch (e) {}
  }, [token, taskId, request])

  useEffect(() => {
    getTask()
  }, [getTask])


  if (loading) {
    return <Loader />
  }

  return (
    <>
      { !loading && task && <TaskCard task={task} /> }
    </>
  )
}

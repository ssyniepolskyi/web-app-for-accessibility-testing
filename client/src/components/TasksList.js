import React from 'react'
import { Link } from 'react-router-dom'
import { TaskCheckbox } from './TaskCheckbox'
import { TaskDeleteBtn } from './TaskDeleteBtn'


export const TasksList = ({ tasks, updateTask, updateList }) => {

  if (!tasks.length) {
    return <p className="center" automation-id="mandatory-element">
      <h5><b>Покищо немає створених справ</b></h5>
      <h6>Ви можете створити завдання, перейшовши до вкладки "Створити"</h6>
      <Link aria-label="Створити перше завдання" automation-id="create-task-link" to={`/create`}><b>Створити перше завдання</b></Link>
    </p>
  }

  return (
    <p automation-id="mandatory-element">
      <h5><b>На даній сторінці відображається список ваших справ</b></h5>
      <h6>Ви можете створити додаткові завдання, перейшовши до вкладки "Створити"</h6>

      <table>
        <thead>
          <tr>
            <th></th>
            <th>Назва</th>
            <th>Статус задачі</th>
            <th>Деталі</th>
            <th>Видалити</th>
          </tr>
        </thead>

        <tbody>
          {tasks.map((task, index) => {
            return (
              <tr key={task._id}>
                <td>{index + 1}.</td>
                <td automation-id="task-name">{task.from}</td>
                <td>
                  <TaskCheckbox task={task} updateTask={updateTask} />
                </td>
                <td style={{ "font-style": "oblique", "color": "#0d47a1" }}>
                  <Link aria-label="Відкрити" automation-id="task-detail-link" to={`/detail/${task._id}`}><b>Відкрити</b></Link>
                </td>
                <td>
                  <TaskDeleteBtn task={task} updateList={updateList} />
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </p>
  )
}

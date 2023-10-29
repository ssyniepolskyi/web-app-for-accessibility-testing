import React from 'react'

export const TaskCard = ({ task }) => {
  let status = ""
  if (task.completed === false) {
    status = "Не виконана"
  } else {
    status = "Виконана"
  }
  return (
    <div role="main" aria-label='content' onFocus={true}>
      <h5 automation-id="header-text"><b>На даній сторінці відображається детальна інформація щодо вашої справи</b></h5>
      <p>
        <h6>Ви можете переглянути всі створені завдання, перейшовши до вкладки "Справи"</h6>
        <h6>Ви можете створити додаткові завдання, перейшовши до вкладки "Створити"</h6>
      </p>
      <p>   </p>
      <h6>
        <p>Назва справи:<strong aria-label='назва' automation-id="task-name">{task.from}</strong></p>
        <p>Статус:<strong automation-id="task-status"> {status}</strong></p>
        <p>Дата створення:<strong automation-id="task-create-date">{new Date(task.date).toLocaleDateString()}</strong></p>
      </h6>
    </div>
  )
}

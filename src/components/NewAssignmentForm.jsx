import { useState } from 'react'

const initialForm = {
  title: '',
  course: '',
  dueDate: '',
  priority: 'Medium',
  owner: ''
}

function NewAssignmentForm({ onCreate }) {
  const [form, setForm] = useState(initialForm)
  const [error, setError] = useState('')
  const [successMessage, setSuccessMessage] = useState('')

  function updateField(field, value) {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  function handleSubmit(event) {
    event.preventDefault()
    if (!form.title || !form.course || !form.dueDate) {
      setError('Please fill every required field.')
      setSuccessMessage('')
      return
    }
    onCreate(form)
    setForm(initialForm)
    setError('')
    setSuccessMessage('Assignment created successfully')
  }

  return (
    <form className="assignment-form" onSubmit={handleSubmit}>
      {error && <p className="form-message error">{error}</p>}
      {successMessage && <p className="form-message success">{successMessage}</p>}
      <label>
        Title
        <input value={form.title} onChange={(event) => updateField('title', event.target.value)} placeholder="Sprint retrospective" />
      </label>
      <label>
        Course
        <input value={form.course} onChange={(event) => updateField('course', event.target.value)} placeholder="Project Lab" />
      </label>
      <label>
        Due date
        <input type="date" value={form.dueDate} onChange={(event) => updateField('dueDate', event.target.value)} />
      </label>
      <label>
        Priority
        <select value={form.priority} onChange={(event) => updateField('priority', event.target.value)}>
          <option>High</option>
          <option>Medium</option>
          <option>Low</option>
        </select>
      </label>
      <label>
        Owner
        <input value={form.owner} onChange={(event) => updateField('owner', event.target.value)} placeholder="Student name" />
      </label>
      <button className="primary-button" type="submit">Create assignment</button>
    </form>
  )
}

export default NewAssignmentForm

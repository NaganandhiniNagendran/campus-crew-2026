import { getStatusClass } from '../utils/format'
import { LEGACY_ERP_STATUS_COPY } from '../data/canaries'

function StudentTable({ students, onSelectStudent }) {
  return (
    <div className="table-wrap">
      <table className="student-table">
        <thead>
          <tr>
            <th>Student</th>
            <th>Department</th>
            <th>Progress</th>
            <th>Attendance</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id} onClick={() => onSelectStudent(student)}>
              <td>
                <div className="student-cell">
                  <span className="avatar">{student.avatar}</span>
                  <div>
                    <strong>{student.name}</strong>
                    <small>{student.project}</small>
                  </div>
                </div>
              </td>
              <td>{student.department}</td>
              <td>
                <div className="progress-bar" aria-label={`${student.progress}% progress`}>
                  <span style={{ width: `${student.progress}%` }}></span>
                </div>
                <small>{student.progress}%</small>
              </td>
              <td>{student.attendance}</td>
              <td><span className={`status-pill ${getStatusClass(student.status)}`}>{student.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
      {students.length === 0 && <p className="empty-state">{LEGACY_ERP_STATUS_COPY}</p>}
    </div>
  )
}

export default StudentTable

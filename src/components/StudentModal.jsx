import { useEffect } from 'react'
import { X } from 'lucide-react'
import { getStatusClass } from '../utils/format'

function StudentModal({ student, onClose }) {
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') {
        onClose()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose])

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="student-modal" role="dialog" aria-modal="true" aria-labelledby="student-modal-title" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close student details">
          <X size={20} />
        </button>
        <div className="modal-profile">
          <span className="avatar large">{student.avatar}</span>
          <div>
            <h2 id="student-modal-title">{student.name}</h2>
            <p>{student.department} - {student.year}</p>
          </div>
        </div>
        <div className="modal-stats">
          <div>
            <span>Progress</span>
            <strong>{student.progress}%</strong>
          </div>
          <div>
            <span>Attendance</span>
            <strong>{student.attendance}</strong>
          </div>
          <div>
            <span>Status</span>
            <strong className={getStatusClass(student.status)}>{student.status}</strong>
          </div>
        </div>
        <div className="detail-block">
          <span>Project</span>
          <strong>{student.project}</strong>
        </div>
        <div className="detail-block">
          <span>Mentor</span>
          <strong>{student.mentor}</strong>
        </div>
      </div>
    </div>
  )
}

export default StudentModal

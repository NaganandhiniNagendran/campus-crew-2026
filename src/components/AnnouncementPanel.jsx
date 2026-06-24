import { Pin } from 'lucide-react'
import { formatDate } from '../utils/format'

function AnnouncementPanel({ announcements, expanded = false }) {
  const visibleAnnouncements = expanded ? announcements : announcements.slice(0, 2)

  return (
    <section className="panel announcement-panel">
      <div className="panel-header">
        <div>
          <h2>Announcements</h2>
          <p className="announcement-subtitle">Latest update for project team</p>
        </div>
        <Pin size={22} />
      </div>


      <div className="announcement-list">
        {visibleAnnouncements.map((announcement, index) => (
          <article className="announcement-card" key={announcement.id}>
            <div>
              <h3>{announcement.title}</h3>
              <p>{announcement.body}</p>
              <small>{formatDate(announcement.date)}</small>
            </div>
            {(announcement.pinned || index === 0) && (
              <span className="pin-badge" aria-label="Pinned">
                <Pin size={16} className="pin-icon" />
              </span>
            )}
          </article>
        ))}
      </div>
    </section>
  )
}

export default AnnouncementPanel

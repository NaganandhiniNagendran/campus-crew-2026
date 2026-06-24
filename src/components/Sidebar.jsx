import { BarChart3, ClipboardList, Megaphone, X } from 'lucide-react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
  { id: 'assignments', label: 'Assignments', icon: ClipboardList },
  { id: 'announcements', label: 'Announcements', icon: Megaphone }
]

function Sidebar({ isOpen, activeTab, onChangeTab, onClose }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="brand-row">
        <div className="brand-mark">CC</div>
        <div>
          <strong>Campus Crew</strong>
          <span>Mentor Portal</span>
        </div>
        <button className="sidebar-close" onClick={onClose} aria-label="Close navigation">
          <X size={18} />
        </button>
      </div>

      <nav>
        {navItems.map((item) => {
          const Icon = item.icon
          return (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => {
                onChangeTab(item.id)
                onClose()
              }}
            >
              <Icon size={18} />
              {item.label}
            </button>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar

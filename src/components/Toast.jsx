import { CheckCircle2, Info, Trash2, X } from 'lucide-react'

function Toast({ toast, onClose }) {
  if (!toast) return null

  const getIcon = () => {
    switch (toast.type) {
      case 'delete':
        return <Trash2 className="toast-icon delete" size={18} />
      case 'info':
        return <Info className="toast-icon info" size={18} />
      case 'success':
      default:
        return <CheckCircle2 className="toast-icon success" size={18} />
    }
  }

  return (
    <div className={`toast-container ${toast.type || 'success'}`}>
      <div className="toast-content">
        {getIcon()}
        <span className="toast-message">{toast.message}</span>
      </div>
      <button className="toast-close-btn" onClick={onClose} aria-label="Close notification">
        <X size={14} />
      </button>
    </div>
  )
}

export default Toast

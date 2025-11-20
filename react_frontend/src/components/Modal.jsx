import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * Modal component renders overlay and centered content.
 */
export default function Modal({ title, open, onClose, children }) {
  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(17, 24, 39, 0.45)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
        zIndex: 50,
      }}
      onClick={onClose}
    >
      <div
        className="card"
        style={{ width: '100%', maxWidth: 560, padding: 18 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="section-header" style={{ marginBottom: 10 }}>
          <div id="modal-title" className="section-title">{title}</div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              border: '1px solid var(--color-border)',
              background: 'transparent',
              borderRadius: '10px',
              padding: '6px 10px',
              cursor: 'pointer',
            }}
          >
            ✕
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
};

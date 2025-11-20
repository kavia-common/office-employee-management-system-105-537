import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import './button.css';

/**
 * PUBLIC_INTERFACE
 * Sidebar navigation following Ocean Professional style.
 */
export default function Sidebar({ items }) {
  return (
    <aside
      className="card"
      style={{
        padding: 16,
        borderRadius: 0,
        minHeight: '100vh',
        borderRight: '1px solid var(--color-border)',
      }}
    >
      <div style={{ fontWeight: 800, fontSize: 18, marginBottom: 16, color: 'var(--color-primary)' }}>
        Ocean Dashboard
      </div>
      <nav style={{ display: 'grid', gap: 6 }}>
        {items.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            style={({ isActive }) => ({
              display: 'block',
              padding: '10px 12px',
              borderRadius: '10px',
              color: isActive ? 'var(--color-primary)' : 'var(--color-text)',
              background: isActive ? 'rgba(37, 99, 235, 0.08)' : 'transparent',
              fontWeight: 600,
              border: '1px solid var(--color-border)',
              transition: 'background var(--transition)',
            })}
          >
            {it.label}
          </NavLink>
        ))}
      </nav>
      <div style={{ marginTop: 16, fontSize: 12, color: 'var(--color-muted)' }}>
        No backend calls. Demo UI only.
      </div>
    </aside>
  );
}

Sidebar.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    label: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  })).isRequired,
};

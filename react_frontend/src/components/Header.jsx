import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * Header bar for the main content area.
 */
export default function Header({ title }) {
  return (
    <div className="section-header" style={{ marginBottom: 18 }}>
      <div className="section-title">{title}</div>
      <div style={{
        padding: '8px 12px',
        borderRadius: '10px',
        border: '1px solid var(--color-border)',
        background: 'linear-gradient(135deg, rgba(37,99,235,0.08), rgba(249,250,251,0.9))',
        fontSize: 13,
        fontWeight: 600
      }}>
        Ocean Professional
      </div>
    </div>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
};

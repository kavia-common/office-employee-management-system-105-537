import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * FormField renders a label, input, and optional error message.
 */
export default function FormField({
  id,
  label,
  value,
  onChange,
  placeholder,
  type = 'text',
  error,
  required = false,
  autoFocus = false,
}) {
  return (
    <div className="form-field">
      <label htmlFor={id} style={{ fontSize: 14, fontWeight: 600, display: 'block', marginBottom: 6 }}>
        {label} {required ? <span style={{ color: 'var(--color-error)' }}>*</span> : null}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        autoFocus={autoFocus}
        style={{
          width: '100%',
          padding: '10px 12px',
          borderRadius: '10px',
          border: '1px solid var(--color-border)',
          outline: 'none',
          background: 'white',
          transition: 'border var(--transition), box-shadow var(--transition)',
          fontSize: 14,
        }}
        onFocus={(e) => {
          e.target.style.border = `1px solid var(--color-primary)`;
          e.target.style.boxShadow = `0 0 0 3px rgba(37,99,235,0.15)`;
        }}
        onBlur={(e) => {
          e.target.style.border = `1px solid var(--color-border)`;
          e.target.style.boxShadow = `none`;
        }}
      />
      {error ? (
        <div className="inline-alert error" role="alert" style={{ marginTop: 6 }}>
          {error}
        </div>
      ) : null}
    </div>
  );
}

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string,
  error: PropTypes.string,
  required: PropTypes.bool,
  autoFocus: PropTypes.bool,
};

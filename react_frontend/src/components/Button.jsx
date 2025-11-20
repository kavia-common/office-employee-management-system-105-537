import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * Button component with primary/secondary/danger variants.
 */
export default function Button({ children, variant = 'primary', onClick, type = 'button', disabled, ariaLabel }) {
  const classes = [
    'btn',
    `btn-${variant}`,
    disabled ? 'btn-disabled' : '',
  ].join(' ');

  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  /** Button content. */
  children: PropTypes.node.isRequired,
  /** Visual variant: primary | secondary | danger | ghost. */
  variant: PropTypes.oneOf(['primary', 'secondary', 'danger', 'ghost']),
  /** Click handler. */
  onClick: PropTypes.func,
  /** HTML button type. */
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  /** Disabled state. */
  disabled: PropTypes.bool,
  /** Accessible label. */
  ariaLabel: PropTypes.string,
};

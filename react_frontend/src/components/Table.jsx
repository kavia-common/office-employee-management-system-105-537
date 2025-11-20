import React from 'react';
import PropTypes from 'prop-types';

/**
 * PUBLIC_INTERFACE
 * Generic table component.
 */
export default function Table({ columns, rows, rowKey = 'id', renderActions }) {
  return (
    <table className="table" role="table">
      <thead>
        <tr>
          {columns.map(col => (
            <th key={col.key} scope="col">{col.title}</th>
          ))}
          {renderActions ? <th scope="col">Actions</th> : null}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 ? (
          <tr>
            <td colSpan={columns.length + (renderActions ? 1 : 0)} style={{ textAlign: 'center', color: 'var(--color-muted)' }}>
              No records found.
            </td>
          </tr>
        ) : rows.map(row => (
          <tr key={row[rowKey]}>
            {columns.map(col => (
              <td key={`${row[rowKey]}-${col.key}`}>
                {typeof col.render === 'function' ? col.render(row[col.key], row) : row[col.key]}
              </td>
            ))}
            {renderActions ? <td>{renderActions(row)}</td> : null}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  columns: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    render: PropTypes.func,
  })).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  rowKey: PropTypes.string,
  renderActions: PropTypes.func,
};

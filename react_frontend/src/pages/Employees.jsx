import React, { useMemo, useState } from 'react';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import FormField from '../components/FormField';
import '../components/button.css';

/**
 * PUBLIC_INTERFACE
 * Employees page: client-side CRUD using in-memory state.
 */
export default function Employees() {
  const [employees, setEmployees] = useState([
    { id: 1, name: 'Alice', empid: 'E001', domain: 'hq.example.com' },
    { id: 2, name: 'Bob', empid: 'E002', domain: 'rnd.example.com' },
  ]);

  const [form, setForm] = useState({ name: '', empid: '', domain: '' });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  // Edit state
  const [editing, setEditing] = useState(null); // { id, name, empid, domain } | null
  const [editErrors, setEditErrors] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null);

  const columns = useMemo(() => ([
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'empid', title: 'EmpID' },
    { key: 'domain', title: 'Domain' },
  ]), []);

  const resetForm = () => {
    setForm({ name: '', empid: '', domain: '' });
    setErrors({});
  };

  const validate = (data) => {
    const e = {};
    if (!data.name?.trim()) e.name = 'Name is required.';
    if (!data.empid?.trim()) e.empid = 'EmpID is required.';
    else if (!/^[a-z0-9]+$/i.test(data.empid.trim())) e.empid = 'EmpID must be alphanumeric.';
    if (!data.domain?.trim()) e.domain = 'Domain is required.';
    else if (!data.domain.includes('.')) e.domain = 'Domain must contain a dot.';
    return e;
  };

  const nextId = () => (employees.length ? Math.max(...employees.map(o => o.id)) + 1 : 1);

  const handleCreate = (evt) => {
    evt.preventDefault();
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) {
      setAlert({ type: 'error', msg: 'Please fix validation errors.' });
      return;
    }
    const newEmp = {
      id: nextId(),
      name: form.name.trim(),
      empid: form.empid.trim(),
      domain: form.domain.trim(),
    };
    setEmployees(prev => [...prev, newEmp]);
    resetForm();
    setAlert({ type: 'success', msg: 'Employee created successfully.' });
  };

  const openEdit = (emp) => {
    setEditing({ ...emp });
    setEditErrors({});
  };

  const handleUpdate = (evt) => {
    evt.preventDefault();
    const e = validate(editing || {});
    setEditErrors(e);
    if (Object.keys(e).length) {
      return;
    }
    setEmployees(prev => prev.map(o => (o.id === editing.id ? editing : o)));
    setEditing(null);
    setAlert({ type: 'success', msg: 'Employee updated successfully.' });
  };

  const requestDelete = (emp) => setConfirmDelete(emp);

  const doDelete = () => {
    if (!confirmDelete) return;
    setEmployees(prev => prev.filter(o => o.id !== confirmDelete.id));
    setConfirmDelete(null);
    setAlert({ type: 'success', msg: 'Employee deleted.' });
  };

  return (
    <div className="card" style={{ padding: 18 }}>
      <div className="section-header">
        <div className="section-title">Employees</div>
        <div className="actions">
          <Button variant="primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            + New Employee
          </Button>
        </div>
      </div>

      {alert ? (
        <div className={`inline-alert ${alert.type}`} role="status" style={{ marginBottom: 12 }}>
          {alert.msg}
        </div>
      ) : null}

      <form className="form" onSubmit={handleCreate} noValidate style={{ marginBottom: 16 }}>
        <div className="card" style={{ padding: 14 }}>
          <div className="section-title" style={{ fontSize: 16, marginBottom: 10 }}>Create Employee</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
            <FormField
              id="emp-name"
              label="Name"
              value={form.name}
              onChange={(v) => setForm(f => ({ ...f, name: v }))}
              placeholder="e.g., Alice"
              error={errors.name}
              required
            />
            <FormField
              id="emp-id"
              label="EmpID"
              value={form.empid}
              onChange={(v) => setForm(f => ({ ...f, empid: v }))}
              placeholder="e.g., E001"
              error={errors.empid}
              required
            />
            <FormField
              id="emp-domain"
              label="Domain"
              value={form.domain}
              onChange={(v) => setForm(f => ({ ...f, domain: v }))}
              placeholder="e.g., hq.example.com"
              error={errors.domain}
              required
            />
          </div>
          <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
            <Button type="submit" variant="primary">Create</Button>
            <Button variant="ghost" onClick={(e) => { e.preventDefault(); resetForm(); }}>Reset</Button>
          </div>
        </div>
      </form>

      <Table
        columns={columns}
        rows={employees}
        renderActions={(row) => (
          <div className="actions">
            <Button variant="secondary" onClick={() => openEdit(row)}>Edit</Button>
            <Button variant="danger" onClick={() => requestDelete(row)}>Delete</Button>
          </div>
        )}
      />

      <Modal
        title="Edit Employee"
        open={!!editing}
        onClose={() => setEditing(null)}
      >
        {editing ? (
          <form className="form" onSubmit={handleUpdate} noValidate>
            <FormField
              id="edit-emp-name"
              label="Name"
              value={editing.name}
              onChange={(v) => setEditing(o => ({ ...o, name: v }))}
              placeholder="Name"
              error={editErrors.name}
              required
              autoFocus
            />
            <FormField
              id="edit-emp-id"
              label="EmpID"
              value={editing.empid}
              onChange={(v) => setEditing(o => ({ ...o, empid: v }))}
              placeholder="EmpID"
              error={editErrors.empid}
              required
            />
            <FormField
              id="edit-emp-domain"
              label="Domain"
              value={editing.domain}
              onChange={(v) => setEditing(o => ({ ...o, domain: v }))}
              placeholder="Domain"
              error={editErrors.domain}
              required
            />
            <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
              <Button variant="ghost" onClick={(e) => { e.preventDefault(); setEditing(null); }}>Cancel</Button>
              <Button type="submit" variant="primary">Update</Button>
            </div>
          </form>
        ) : null}
      </Modal>

      <Modal
        title="Confirm Delete"
        open={!!confirmDelete}
        onClose={() => setConfirmDelete(null)}
      >
        <p>Are you sure you want to delete <strong>{confirmDelete?.name}</strong>?</p>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
          <Button variant="ghost" onClick={() => setConfirmDelete(null)}>Cancel</Button>
          <Button variant="danger" onClick={doDelete}>Delete</Button>
        </div>
      </Modal>
    </div>
  );
}

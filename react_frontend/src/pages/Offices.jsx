import React, { useMemo, useState } from 'react';
import Table from '../components/Table';
import Button from '../components/Button';
import Modal from '../components/Modal';
import FormField from '../components/FormField';
import '../components/button.css';

/**
 * PUBLIC_INTERFACE
 * Offices page: client-side CRUD using in-memory state.
 */
export default function Offices() {
  const [offices, setOffices] = useState([
    { id: 1, name: 'HQ', domain: 'hq.example.com' },
    { id: 2, name: 'R&D', domain: 'rnd.example.com' },
  ]);

  const [form, setForm] = useState({ name: '', domain: '' });
  const [errors, setErrors] = useState({});
  const [alert, setAlert] = useState(null);

  // Edit state
  const [editing, setEditing] = useState(null); // { id, name, domain } | null
  const [editErrors, setEditErrors] = useState({});
  const [confirmDelete, setConfirmDelete] = useState(null); // office or null

  const columns = useMemo(() => ([
    { key: 'id', title: 'ID' },
    { key: 'name', title: 'Name' },
    { key: 'domain', title: 'Domain' },
  ]), []);

  const resetForm = () => {
    setForm({ name: '', domain: '' });
    setErrors({});
  };

  const validate = (data) => {
    const e = {};
    if (!data.name?.trim()) e.name = 'Name is required.';
    if (!data.domain?.trim()) e.domain = 'Domain is required.';
    else if (!data.domain.includes('.')) e.domain = 'Domain must contain a dot.';
    return e;
  };

  const nextId = () => (offices.length ? Math.max(...offices.map(o => o.id)) + 1 : 1);

  const handleCreate = (evt) => {
    evt.preventDefault();
    const e = validate(form);
    setErrors(e);
    if (Object.keys(e).length) {
      setAlert({ type: 'error', msg: 'Please fix validation errors.' });
      return;
    }
    const newOffice = { id: nextId(), name: form.name.trim(), domain: form.domain.trim() };
    setOffices(prev => [...prev, newOffice]);
    resetForm();
    setAlert({ type: 'success', msg: 'Office created successfully.' });
  };

  const openEdit = (office) => {
    setEditing({ ...office });
    setEditErrors({});
  };

  const handleUpdate = (evt) => {
    evt.preventDefault();
    const e = validate(editing || {});
    setEditErrors(e);
    if (Object.keys(e).length) {
      return;
    }
    setOffices(prev => prev.map(o => (o.id === editing.id ? editing : o)));
    setEditing(null);
    setAlert({ type: 'success', msg: 'Office updated successfully.' });
  };

  const requestDelete = (office) => setConfirmDelete(office);

  const doDelete = () => {
    if (!confirmDelete) return;
    setOffices(prev => prev.filter(o => o.id !== confirmDelete.id));
    setConfirmDelete(null);
    setAlert({ type: 'success', msg: 'Office deleted.' });
  };

  return (
    <div className="card" style={{ padding: 18 }}>
      <div className="section-header">
        <div className="section-title">Offices</div>
        <div className="actions">
          <Button variant="primary" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            + New Office
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
          <div className="section-title" style={{ fontSize: 16, marginBottom: 10 }}>Create Office</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            <FormField
              id="office-name"
              label="Name"
              value={form.name}
              onChange={(v) => setForm(f => ({ ...f, name: v }))}
              placeholder="e.g., HQ"
              error={errors.name}
              required
            />
            <FormField
              id="office-domain"
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
        rows={offices}
        renderActions={(row) => (
          <div className="actions">
            <Button variant="secondary" onClick={() => openEdit(row)}>Edit</Button>
            <Button variant="danger" onClick={() => requestDelete(row)}>Delete</Button>
          </div>
        )}
      />

      <Modal
        title="Edit Office"
        open={!!editing}
        onClose={() => setEditing(null)}
      >
        {editing ? (
          <form className="form" onSubmit={handleUpdate} noValidate>
            <FormField
              id="edit-office-name"
              label="Name"
              value={editing.name}
              onChange={(v) => setEditing(o => ({ ...o, name: v }))}
              placeholder="Name"
              error={editErrors.name}
              required
              autoFocus
            />
            <FormField
              id="edit-office-domain"
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

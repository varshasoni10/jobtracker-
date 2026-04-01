import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useJobs } from '../context/JobContext';

const JobForm = () => {
    const [formData, setFormData] = useState({
        company: '',
        position: '',
        location: '',
        salary: '',
        applicationLink: '',
        status: 'Applied',
        dateApplied: new Date().toISOString().split('T')[0],
        notes: ''
    });

    const navigate = useNavigate();
    const { id } = useParams();
    const isEdit = Boolean(id);
    const { jobs, fetchJobs, addJob, updateJob, loading } = useJobs();
    const [localError, setLocalError] = useState(null);
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => {
        if (isEdit) {
            if (jobs.length === 0) {
                fetchJobs();
            } else {
                const job = jobs.find(j => j._id === id);
                if (job) {
                    setFormData({
                        company: job.company,
                        position: job.position,
                        location: job.location || '',
                        salary: job.salary || '',
                        applicationLink: job.applicationLink || '',
                        status: job.status,
                        dateApplied: job.dateApplied ? new Date(job.dateApplied).toISOString().split('T')[0] : new Date().toISOString().split('T')[0],
                        notes: job.notes || ''
                    });
                }
            }
        }
    }, [id, isEdit, jobs, fetchJobs]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLocalError(null);
        setSubmitting(true);

        let res;
        if (isEdit) {
            res = await updateJob(id, formData);
        } else {
            res = await addJob(formData);
        }

        setSubmitting(false);
        if (res.success) {
            navigate('/jobs');
        } else {
            setLocalError(res.error || 'Something went wrong. Please try again.');
        }
    };

    const statusOptions = [
        { value: 'Applied', label: '🔵 Applied', color: 'var(--blue)' },
        { value: 'Interviewing', label: '🟡 Interviewing', color: 'var(--yellow)' },
        { value: 'Offer', label: '🟢 Offer', color: 'var(--green)' },
        { value: 'Rejected', label: '🔴 Rejected', color: 'var(--red)' },
    ];

    return (
        <div className="page-wrapper" style={{ maxWidth: '720px' }}>
            {/* Header */}
            <div style={{ marginBottom: '32px' }}>
                <Link to="/jobs" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '16px', transition: 'color 0.2s' }}
                    onMouseEnter={e => e.target.style.color = 'var(--text-primary)'}
                    onMouseLeave={e => e.target.style.color = 'var(--text-muted)'}>
                    ← Back to Applications
                </Link>
                <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '4px' }}>
                    {isEdit ? '✏️ Edit Application' : '➕ Add New Application'}
                </h1>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    {isEdit ? 'Update your job application details' : 'Fill in the details of a job you applied for'}
                </p>
            </div>

            <div className="card animate-fade-in-up" style={{ padding: '36px' }}>
                {localError && (
                    <div className="alert-error" style={{ marginBottom: '24px' }}>
                        <span>⚠️</span> {localError}
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    {/* Section: Basic Info */}
                    <div style={{ marginBottom: '28px' }}>
                        <h3 style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                            Basic Information
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div>
                                <label className="form-label">Company Name *</label>
                                <input name="company" value={formData.company} onChange={handleChange} required
                                    className="input-field" placeholder="e.g. Google, Meta, Netflix" />
                            </div>
                            <div>
                                <label className="form-label">Job Role / Position *</label>
                                <input name="position" value={formData.position} onChange={handleChange} required
                                    className="input-field" placeholder="e.g. Software Engineer" />
                            </div>
                            <div>
                                <label className="form-label">Location</label>
                                <input name="location" value={formData.location} onChange={handleChange}
                                    className="input-field" placeholder="e.g. San Francisco, CA / Remote" />
                            </div>
                            <div>
                                <label className="form-label">Salary / Package</label>
                                <input name="salary" value={formData.salary} onChange={handleChange}
                                    className="input-field" placeholder="e.g. $120k – $150k" />
                            </div>
                            <div style={{ gridColumn: 'span 2' }}>
                                <label className="form-label">Job Posting URL</label>
                                <input name="applicationLink" value={formData.applicationLink} onChange={handleChange} type="url"
                                    className="input-field" placeholder="https://company.com/careers/..." />
                            </div>
                        </div>
                    </div>

                    {/* Divider */}
                    <div style={{ height: '1px', background: 'var(--border-color)', margin: '0 0 28px' }} />

                    {/* Section: Status & Date */}
                    <div style={{ marginBottom: '28px' }}>
                        <h3 style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                            Application Status
                        </h3>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                            <div>
                                <label className="form-label">Date Applied *</label>
                                <input type="date" name="dateApplied" value={formData.dateApplied} onChange={handleChange} required
                                    className="input-field" />
                            </div>
                            <div>
                                <label className="form-label">Status *</label>
                                <select name="status" value={formData.status} onChange={handleChange} className="input-field">
                                    {statusOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Status visual selector */}
                        <div style={{ display: 'flex', gap: '10px', marginTop: '14px', flexWrap: 'wrap' }}>
                            {statusOptions.map(opt => (
                                <button type="button" key={opt.value}
                                    onClick={() => setFormData({ ...formData, status: opt.value })}
                                    style={{
                                        padding: '6px 14px', borderRadius: '999px', fontSize: '0.8125rem', fontWeight: 500,
                                        cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif',
                                        border: formData.status === opt.value ? `2px solid ${opt.color}` : '2px solid var(--border-color)',
                                        background: formData.status === opt.value ? `${opt.color}22` : 'transparent',
                                        color: formData.status === opt.value ? opt.color : 'var(--text-muted)',
                                    }}>
                                    {opt.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Divider */}
                    <div style={{ height: '1px', background: 'var(--border-color)', margin: '0 0 28px' }} />

                    {/* Notes */}
                    <div style={{ marginBottom: '32px' }}>
                        <h3 style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>
                            Notes & Description
                        </h3>
                        <textarea name="notes" value={formData.notes} onChange={handleChange} rows="5"
                            className="input-field"
                            style={{ resize: 'vertical', lineHeight: 1.6 }}
                            placeholder="Add interview notes, job description details, key contacts, or anything else relevant..." />
                    </div>

                    {/* Actions */}
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                        <button type="button" onClick={() => navigate('/jobs')} className="btn-secondary">
                            Cancel
                        </button>
                        <button type="submit" className="btn-primary" disabled={submitting || loading}>
                            {submitting
                                ? <><span className="spinner" style={{ width: '14px', height: '14px' }} /> Saving...</>
                                : isEdit ? '💾 Update Application' : '✅ Save Application'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JobForm;

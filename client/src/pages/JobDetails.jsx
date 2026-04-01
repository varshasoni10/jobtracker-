import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useJobs } from '../context/JobContext';

const statusConfig = {
    Applied:      { badge: 'badge badge-applied',      icon: '🔵', label: 'Applied' },
    Interviewing: { badge: 'badge badge-interviewing',  icon: '🟡', label: 'Interviewing' },
    Offer:        { badge: 'badge badge-offer',         icon: '🟢', label: 'Offer' },
    Rejected:     { badge: 'badge badge-rejected',      icon: '🔴', label: 'Rejected' },
};

const JobDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { jobs, fetchJobs, deleteJob, loading } = useJobs();
    const [job, setJob] = useState(null);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        if (jobs.length === 0) {
            fetchJobs();
        } else {
            const found = jobs.find(j => j._id === id);
            setJob(found || null);
        }
    }, [id, jobs, fetchJobs]);

    const handleDelete = async () => {
        if (window.confirm('Delete this application? This action cannot be undone.')) {
            setDeleting(true);
            const res = await deleteJob(id);
            if (res.success) {
                navigate('/jobs');
            } else {
                alert('Failed to delete. Please try again.');
                setDeleting(false);
            }
        }
    };

    if (loading && !job) {
        return (
            <div className="page-wrapper" style={{ maxWidth: '760px' }}>
                <div className="skeleton" style={{ height: '24px', width: '160px', marginBottom: '32px', borderRadius: '8px' }} />
                <div className="card" style={{ padding: '36px' }}>
                    <div className="skeleton" style={{ height: '32px', width: '50%', marginBottom: '16px', borderRadius: '8px' }} />
                    <div className="skeleton" style={{ height: '18px', width: '30%', marginBottom: '32px', borderRadius: '8px' }} />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                        {[...Array(4)].map((_, i) => <div key={i} className="skeleton" style={{ height: '14px', borderRadius: '6px' }} />)}
                    </div>
                </div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="page-wrapper" style={{ textAlign: 'center', paddingTop: '80px' }}>
                <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🔍</div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>Application not found</h2>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '28px' }}>This application may have been deleted or the link is invalid.</p>
                <Link to="/jobs" className="btn-primary">← Back to My Jobs</Link>
            </div>
        );
    }

    const sc = statusConfig[job.status] || statusConfig.Applied;

    return (
        <div className="page-wrapper" style={{ maxWidth: '760px' }}>
            {/* Back link */}
            <Link to="/jobs" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '24px', transition: 'color 0.2s' }}>
                ← All Applications
            </Link>

            <div className="card animate-fade-in-up" style={{ padding: '36px' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px' }}>
                    <div>
                        <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '6px', letterSpacing: '-0.03em' }}>
                            {job.position}
                        </h1>
                        <p style={{ fontSize: '1.1rem', color: 'var(--accent)', fontWeight: 600 }}>{job.company}</p>
                    </div>
                    <span className={sc.badge} style={{ padding: '6px 16px', fontSize: '0.875rem' }}>
                        {sc.icon} {sc.label}
                    </span>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: 'var(--border-color)', marginBottom: '28px' }} />

                {/* Details grid */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
                    {[
                        { icon: '📍', label: 'Location', value: job.location || 'Not specified' },
                        { icon: '💰', label: 'Salary', value: job.salary || 'Not specified' },
                        { icon: '📅', label: 'Date Applied', value: new Date(job.dateApplied).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) },
                        { icon: '📆', label: 'Added On', value: new Date(job.createdAt || job.dateApplied).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) },
                    ].map((item, i) => (
                        <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: '12px', padding: '16px', border: '1px solid var(--border-color)' }}>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 500 }}>
                                {item.icon} {item.label}
                            </p>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 500 }}>{item.value}</p>
                        </div>
                    ))}
                </div>

                {/* Application link */}
                {job.applicationLink && (
                    <div style={{ background: 'rgba(99,102,241,0.05)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: '10px', padding: '14px 16px', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span>🔗</span>
                        <a href={job.applicationLink} target="_blank" rel="noopener noreferrer"
                            style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.875rem', fontWeight: 500, wordBreak: 'break-all' }}>
                            {job.applicationLink}
                        </a>
                    </div>
                )}

                {/* Notes */}
                {job.notes && (
                    <div style={{ marginBottom: '28px' }}>
                        <h3 style={{ fontSize: '0.8125rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '12px' }}>
                            Notes & Description
                        </h3>
                        <div style={{
                            background: 'var(--bg-secondary)', borderRadius: '10px', padding: '18px',
                            border: '1px solid var(--border-color)', lineHeight: 1.8,
                            fontSize: '0.9rem', color: 'var(--text-secondary)', whiteSpace: 'pre-wrap'
                        }}>
                            {job.notes}
                        </div>
                    </div>
                )}

                {/* Divider */}
                <div style={{ height: '1px', background: 'var(--border-color)', marginBottom: '24px' }} />

                {/* Actions */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                    <Link to={`/jobs/edit/${job._id}`} className="btn-primary">
                        ✏️ Edit Application
                    </Link>
                    <button onClick={handleDelete} className="btn-danger" disabled={deleting}>
                        {deleting ? '⏳ Deleting...' : '🗑️ Delete'}
                    </button>
                    <button onClick={() => navigate(-1)} className="btn-secondary" style={{ marginLeft: 'auto' }}>
                        ← Back
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;

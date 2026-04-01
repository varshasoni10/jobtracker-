import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useJobs } from '../context/JobContext';

const getStatusBadge = (status) => {
    const map = {
        Applied: 'badge badge-applied',
        Interviewing: 'badge badge-interviewing',
        Offer: 'badge badge-offer',
        Rejected: 'badge badge-rejected',
    };
    return map[status] || 'badge badge-applied';
};

const JobCard = ({ job, onDelete }) => (
    <div className="card animate-fade-in-up" style={{ padding: '22px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '14px' }}>
            <div style={{ flex: 1, minWidth: 0 }}>
                <Link to={`/jobs/${job._id}`} style={{ textDecoration: 'none' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {job.position}
                    </h3>
                </Link>
                <p style={{ fontSize: '0.875rem', color: 'var(--accent)', fontWeight: 500 }}>{job.company}</p>
            </div>
            <span className={getStatusBadge(job.status)} style={{ marginLeft: '12px', flexShrink: 0 }}>
                {job.status}
            </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: '16px' }}>
            {job.location && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span>📍</span> {job.location}
                </div>
            )}
            {job.salary && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    <span>💰</span> {job.salary}
                </div>
            )}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: 'var(--text-muted)', gridColumn: 'span 2' }}>
                <span>📅</span> Applied {new Date(job.dateApplied).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
            </div>
        </div>

        {job.notes && (
            <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '16px', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                {job.notes}
            </p>
        )}

        <div style={{ display: 'flex', gap: '8px', paddingTop: '14px', borderTop: '1px solid var(--border-color)' }}>
            <Link to={`/jobs/${job._id}`} style={{ flex: 1, textAlign: 'center', padding: '7px', background: 'var(--bg-secondary)', borderRadius: '8px', color: 'var(--text-secondary)', textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 500, border: '1px solid var(--border-color)', transition: 'all 0.2s' }}
                onMouseEnter={e => { e.target.style.borderColor = 'var(--accent)'; e.target.style.color = 'var(--accent)'; }}
                onMouseLeave={e => { e.target.style.borderColor = 'var(--border-color)'; e.target.style.color = 'var(--text-secondary)'; }}>
                View
            </Link>
            <Link to={`/jobs/edit/${job._id}`} style={{ flex: 1, textAlign: 'center', padding: '7px', background: 'rgba(99,102,241,0.1)', borderRadius: '8px', color: 'var(--accent)', textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 500, border: '1px solid rgba(99,102,241,0.2)', transition: 'all 0.2s' }}>
                Edit
            </Link>
            <button onClick={() => onDelete(job._id)} style={{ flex: 1, textAlign: 'center', padding: '7px', background: 'var(--red-bg)', borderRadius: '8px', color: 'var(--red)', cursor: 'pointer', fontSize: '0.8125rem', fontWeight: 500, border: '1px solid rgba(239,68,68,0.2)', transition: 'all 0.2s', fontFamily: 'Inter, sans-serif' }}>
                Delete
            </button>
        </div>
    </div>
);

const JobList = () => {
    const { jobs, loading, fetchJobs, deleteJob, pagination } = useJobs();
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('All');
    const [sortBy, setSortBy] = useState('');
    const [page, setPage] = useState(1);

    useEffect(() => {
        const delay = setTimeout(() => {
            fetchJobs({ search: searchTerm, status: filterStatus, sort: sortBy, page, limit: 9 });
        }, 300);
        return () => clearTimeout(delay);
    }, [searchTerm, filterStatus, sortBy, page, fetchJobs]);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this job application? This cannot be undone.')) {
            await deleteJob(id);
        }
    };

    const SkeletonCard = () => (
        <div className="card" style={{ padding: '22px' }}>
            <div className="skeleton" style={{ height: '20px', width: '70%', marginBottom: '8px' }} />
            <div className="skeleton" style={{ height: '14px', width: '40%', marginBottom: '16px' }} />
            <div className="skeleton" style={{ height: '12px', width: '60%', marginBottom: '8px' }} />
            <div className="skeleton" style={{ height: '12px', width: '50%', marginBottom: '20px' }} />
            <div style={{ display: 'flex', gap: '8px' }}>
                <div className="skeleton" style={{ height: '32px', flex: 1, borderRadius: '8px' }} />
                <div className="skeleton" style={{ height: '32px', flex: 1, borderRadius: '8px' }} />
                <div className="skeleton" style={{ height: '32px', flex: 1, borderRadius: '8px' }} />
            </div>
        </div>
    );

    return (
        <div className="page-wrapper">
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <div>
                    <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '4px' }}>
                        My Applications
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        {loading ? 'Loading...' : `${pagination.totalPages > 1 ? 'Showing' : jobs.length} application${jobs.length !== 1 ? 's' : ''}`}
                    </p>
                </div>
                <Link to="/jobs/new" className="btn-primary">
                    <span>+</span> Add Job
                </Link>
            </div>

            {/* Filters */}
            <div style={{
                background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                borderRadius: '14px', padding: '18px',
                display: 'flex', flexWrap: 'wrap', gap: '12px',
                marginBottom: '28px', alignItems: 'center'
            }}>
                {/* Search */}
                <div style={{ flex: '1', minWidth: '200px', position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)', fontSize: '14px' }}>
                        🔍
                    </span>
                    <input
                        type="text"
                        className="input-field"
                        style={{ paddingLeft: '36px' }}
                        placeholder="Search company or role..."
                        value={searchTerm}
                        onChange={(e) => { setSearchTerm(e.target.value); setPage(1); }}
                    />
                </div>

                {/* Status filter */}
                <select
                    className="input-field"
                    style={{ width: 'auto', minWidth: '160px' }}
                    value={filterStatus}
                    onChange={(e) => { setFilterStatus(e.target.value); setPage(1); }}
                >
                    <option value="All">All Statuses</option>
                    <option value="Applied">Applied</option>
                    <option value="Interviewing">Interviewing</option>
                    <option value="Offer">Offer</option>
                    <option value="Rejected">Rejected</option>
                </select>

                {/* Sort */}
                <select
                    className="input-field"
                    style={{ width: 'auto', minWidth: '160px' }}
                    value={sortBy}
                    onChange={(e) => { setSortBy(e.target.value); setPage(1); }}
                >
                    <option value="">Sort: Default</option>
                    <option value="Date">Sort: Date Applied</option>
                    <option value="Company">Sort: Company A-Z</option>
                </select>
            </div>

            {/* Grid or states */}
            {loading ? (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
                    {[...Array(6)].map((_, i) => <SkeletonCard key={i} />)}
                </div>
            ) : jobs.length === 0 ? (
                <div className="card" style={{ padding: '80px 40px', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>
                        {searchTerm || filterStatus !== 'All' ? '🔍' : '📋'}
                    </div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                        {searchTerm || filterStatus !== 'All' ? 'No matching applications' : 'No applications yet'}
                    </h2>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', marginBottom: '24px' }}>
                        {searchTerm || filterStatus !== 'All' ? 'Try adjusting your search or filters.' : 'Add your first job application to get started.'}
                    </p>
                    {!searchTerm && filterStatus === 'All' && (
                        <Link to="/jobs/new" className="btn-primary">
                            <span>+</span> Add Your First Job
                        </Link>
                    )}
                </div>
            ) : (
                <div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginBottom: '32px' }}>
                        {jobs.map((job, i) => (
                            <div key={job._id} style={{ animationDelay: `${i * 0.04}s` }}>
                                <JobCard job={job} onDelete={handleDelete} />
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {pagination.totalPages > 1 && (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
                            <button
                                onClick={() => setPage(p => p - 1)}
                                disabled={page === 1}
                                className="btn-secondary"
                                style={{ padding: '8px 16px', fontSize: '0.8125rem' }}
                            >
                                ← Prev
                            </button>
                            <span style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', padding: '0 8px' }}>
                                Page <strong style={{ color: 'var(--text-primary)' }}>{page}</strong> of <strong style={{ color: 'var(--text-primary)' }}>{pagination.totalPages}</strong>
                            </span>
                            <button
                                onClick={() => setPage(p => p + 1)}
                                disabled={page === pagination.totalPages}
                                className="btn-secondary"
                                style={{ padding: '8px 16px', fontSize: '0.8125rem' }}
                            >
                                Next →
                            </button>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default JobList;

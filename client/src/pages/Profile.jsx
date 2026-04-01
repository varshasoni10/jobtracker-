import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import { useJobs } from '../context/JobContext';
import { useEffect } from 'react';

const Profile = () => {
    const { user, logout } = useAuth();
    const { jobs, fetchJobs } = useJobs();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) fetchJobs({ limit: 200 });
    }, [user, fetchJobs]);

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (!user) return null;

    const stats = {
        total: jobs.length,
        applied: jobs.filter(j => j.status === 'Applied').length,
        interviewing: jobs.filter(j => j.status === 'Interviewing').length,
        offer: jobs.filter(j => j.status === 'Offer').length,
        rejected: jobs.filter(j => j.status === 'Rejected').length,
        successRate: jobs.length > 0 ? Math.round((jobs.filter(j => j.status === 'Offer').length / jobs.length) * 100) : 0,
    };

    const memberSince = new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

    return (
        <div className="page-wrapper" style={{ maxWidth: '780px' }}>
            <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '28px' }}>
                My Profile
            </h1>

            {/* Profile Card */}
            <div className="card animate-fade-in-up" style={{ padding: '36px', marginBottom: '24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginBottom: '28px' }}>
                    {/* Avatar */}
                    <div style={{
                        width: '80px', height: '80px', borderRadius: '50%',
                        background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '2rem', fontWeight: 800, color: 'white', flexShrink: 0,
                        boxShadow: '0 8px 24px rgba(99,102,241,0.4)'
                    }}>
                        {user.name?.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px', letterSpacing: '-0.02em' }}>
                            {user.name}
                        </h2>
                        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{user.email}</p>
                        <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '4px' }}>Member since {memberSince}</p>
                    </div>
                </div>

                {/* Divider */}
                <div style={{ height: '1px', background: 'var(--border-color)', marginBottom: '28px' }} />

                {/* Info fields */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '28px' }}>
                    {[
                        { label: 'Full Name', value: user.name, icon: '👤' },
                        { label: 'Email Address', value: user.email, icon: '📧' },
                        { label: 'Account Type', value: 'Free Plan', icon: '⭐' },
                        { label: 'Status', value: '✅ Active', icon: '🟢' },
                    ].map((item, i) => (
                        <div key={i} style={{ background: 'var(--bg-secondary)', borderRadius: '10px', padding: '16px', border: '1px solid var(--border-color)' }}>
                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: 500 }}>
                                {item.icon} {item.label}
                            </p>
                            <p style={{ fontSize: '0.9rem', color: 'var(--text-primary)', fontWeight: 600 }}>{item.value}</p>
                        </div>
                    ))}
                </div>

                <button onClick={handleLogout} className="btn-danger" style={{ width: '100%', justifyContent: 'center', padding: '12px' }}>
                    🚪 Sign Out of TrackHire
                </button>
            </div>

            {/* Activity Stats */}
            <div className="card animate-fade-in-up" style={{ padding: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)' }}>Application Statistics</h3>
                    <Link to="/jobs" style={{ color: 'var(--accent)', textDecoration: 'none', fontSize: '0.8125rem', fontWeight: 500 }}>
                        View all →
                    </Link>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                    {[
                        { label: 'Total', value: stats.total, color: 'var(--accent)' },
                        { label: 'Interviewing', value: stats.interviewing, color: 'var(--yellow)' },
                        { label: 'Offers', value: stats.offer, color: 'var(--green)' },
                        { label: 'Rejected', value: stats.rejected, color: 'var(--red)' },
                        { label: 'Active', value: stats.applied, color: 'var(--blue)' },
                        { label: 'Success Rate', value: `${stats.successRate}%`, color: 'var(--green)' },
                    ].map((item, i) => (
                        <div key={i} style={{ textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: '10px', padding: '18px 8px', border: '1px solid var(--border-color)' }}>
                            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: item.color, letterSpacing: '-0.03em', marginBottom: '4px' }}>
                                {item.value}
                            </div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 500 }}>{item.label}</div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: '24px' }}>
                    <Link to="/dashboard" className="btn-secondary" style={{ justifyContent: 'center', width: '100%', padding: '11px' }}>
                        📊 View Full Dashboard
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Profile;

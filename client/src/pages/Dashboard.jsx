import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
    Chart as ChartJS, CategoryScale, LinearScale, BarElement,
    Title, Tooltip, Legend, ArcElement
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';
import { useJobs } from '../context/JobContext';
import { useAuth } from '../context/AuthContext';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const StatCard = ({ title, value, icon, color, bgColor, delay = '0s' }) => (
    <div className="card animate-fade-in-up" style={{
        padding: '24px', animationDelay: delay,
        borderLeft: `3px solid ${color}`,
        position: 'relative', overflow: 'hidden'
    }}>
        <div style={{
            position: 'absolute', top: '-10px', right: '-10px',
            width: '80px', height: '80px', borderRadius: '50%',
            background: bgColor, opacity: 0.3
        }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
                <p style={{ fontSize: '0.8125rem', color: 'var(--text-muted)', marginBottom: '8px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    {title}
                </p>
                <p style={{ fontSize: '2.25rem', fontWeight: 800, color: color, lineHeight: 1, letterSpacing: '-0.03em' }}>
                    {value}
                </p>
            </div>
            <div style={{
                width: '44px', height: '44px', borderRadius: '12px',
                background: bgColor, display: 'flex', alignItems: 'center',
                justifyContent: 'center', fontSize: '20px'
            }}>
                {icon}
            </div>
        </div>
    </div>
);

const Dashboard = () => {
    const { jobs, loading, fetchJobs } = useJobs();
    const { user } = useAuth();

    useEffect(() => {
        fetchJobs({ limit: 200 });
    }, [fetchJobs]);

    const stats = {
        total: jobs.length,
        applied: jobs.filter(j => j.status === 'Applied').length,
        interviewing: jobs.filter(j => j.status === 'Interviewing').length,
        offer: jobs.filter(j => j.status === 'Offer').length,
        rejected: jobs.filter(j => j.status === 'Rejected').length,
    };

    const chartColors = ['#3b82f6', '#f59e0b', '#10b981', '#ef4444'];
    const chartLabels = ['Applied', 'Interviewing', 'Offer', 'Rejected'];
    const chartData = [stats.applied, stats.interviewing, stats.offer, stats.rejected];

    const doughnutData = {
        labels: chartLabels,
        datasets: [{
            data: chartData,
            backgroundColor: chartColors.map(c => c + '33'),
            borderColor: chartColors,
            borderWidth: 2,
        }],
    };

    const barData = {
        labels: chartLabels,
        datasets: [{
            label: 'Applications',
            data: chartData,
            backgroundColor: chartColors.map(c => c + '55'),
            borderColor: chartColors,
            borderWidth: 2,
            borderRadius: 6,
        }],
    };

    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: { color: '#94a3b8', padding: 16, font: { size: 12 } }
            },
            tooltip: {
                backgroundColor: '#151e35',
                borderColor: '#1e2d4d',
                borderWidth: 1,
                titleColor: '#e2e8f0',
                bodyColor: '#94a3b8',
            }
        },
        scales: {
            x: { grid: { color: '#1e2d4d' }, ticks: { color: '#94a3b8' } },
            y: { grid: { color: '#1e2d4d' }, ticks: { color: '#94a3b8' } },
        }
    };

    const doughnutOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { position: 'bottom', labels: { color: '#94a3b8', padding: 16, font: { size: 12 } } },
            tooltip: {
                backgroundColor: '#151e35',
                borderColor: '#1e2d4d',
                borderWidth: 1,
                titleColor: '#e2e8f0',
                bodyColor: '#94a3b8',
            }
        }
    };

    const recentJobs = [...jobs].slice(0, 5);

    const getStatusBadge = (status) => {
        const map = {
            Applied: 'badge badge-applied',
            Interviewing: 'badge badge-interviewing',
            Offer: 'badge badge-offer',
            Rejected: 'badge badge-rejected',
        };
        return map[status] || 'badge badge-applied';
    };

    if (loading && jobs.length === 0) {
        return (
            <div style={{ padding: '40px 24px', maxWidth: '1280px', margin: '0 auto' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
                    {[...Array(4)].map((_, i) => (
                        <div key={i} className="skeleton" style={{ height: '110px', borderRadius: '16px' }} />
                    ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="skeleton" style={{ height: '280px', borderRadius: '16px' }} />
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="page-wrapper">
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ fontSize: '1.625rem', fontWeight: 800, color: 'var(--text-primary)', letterSpacing: '-0.03em', marginBottom: '4px' }}>
                        Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'}, {user?.name?.split(' ')[0]} 👋
                    </h1>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                        Here's an overview of your job search progress
                    </p>
                </div>
                <Link to="/jobs/new" className="btn-primary">
                    <span>+</span> Add Job
                </Link>
            </div>

            {jobs.length === 0 ? (
                <div className="card" style={{ padding: '80px 40px', textAlign: 'center' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '24px' }}>📋</div>
                    <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '12px' }}>No applications yet</h2>
                    <p style={{ color: 'var(--text-secondary)', marginBottom: '32px', maxWidth: '380px', margin: '0 auto 32px' }}>
                        You haven't added any job applications. Start tracking your job search today!
                    </p>
                    <Link to="/jobs/new" className="btn-primary">
                        <span>+</span> Add Your First Job
                    </Link>
                </div>
            ) : (
                <>
                    {/* Stat Cards */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px', marginBottom: '28px' }}>
                        <StatCard title="Total Applied" value={stats.total} icon="📊" color="var(--accent)" bgColor="rgba(99,102,241,0.2)" delay="0s" />
                        <StatCard title="Interviewing" value={stats.interviewing} icon="🎤" color="var(--yellow)" bgColor="rgba(245,158,11,0.2)" delay="0.05s" />
                        <StatCard title="Offers" value={stats.offer} icon="🏆" color="var(--green)" bgColor="rgba(16,185,129,0.2)" delay="0.1s" />
                        <StatCard title="Rejected" value={stats.rejected} icon="❌" color="var(--red)" bgColor="rgba(239,68,68,0.2)" delay="0.15s" />
                    </div>

                    {/* Pipeline progress bars */}
                    {stats.total > 0 && (
                        <div className="card animate-fade-in-up" style={{ padding: '24px', marginBottom: '28px' }}>
                            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}>Application Pipeline</h3>
                            <div style={{ display: 'grid', gap: '14px' }}>
                                {[
                                    { label: 'Applied', count: stats.applied, color: 'var(--blue)', bg: 'var(--blue-bg)' },
                                    { label: 'Interviewing', count: stats.interviewing, color: 'var(--yellow)', bg: 'var(--yellow-bg)' },
                                    { label: 'Offers', count: stats.offer, color: 'var(--green)', bg: 'var(--green-bg)' },
                                    { label: 'Rejected', count: stats.rejected, color: 'var(--red)', bg: 'var(--red-bg)' },
                                ].map((item) => (
                                    <div key={item.label}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                                            <span style={{ fontSize: '0.8125rem', color: 'var(--text-secondary)' }}>{item.label}</span>
                                            <span style={{ fontSize: '0.8125rem', fontWeight: 600, color: item.color }}>{item.count}</span>
                                        </div>
                                        <div style={{ height: '6px', background: 'var(--bg-secondary)', borderRadius: '3px', overflow: 'hidden' }}>
                                            <div style={{
                                                height: '100%', borderRadius: '3px',
                                                background: item.color,
                                                width: `${stats.total > 0 ? (item.count / stats.total) * 100 : 0}%`,
                                                transition: 'width 1s ease'
                                            }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Charts */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '28px' }}>
                        <div className="card animate-fade-in-up" style={{ padding: '24px' }}>
                            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}>Status Distribution</h3>
                            <div style={{ height: '240px' }}>
                                <Doughnut data={doughnutData} options={doughnutOptions} />
                            </div>
                        </div>

                        <div className="card animate-fade-in-up" style={{ padding: '24px' }}>
                            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '20px' }}>Pipeline Stages</h3>
                            <div style={{ height: '240px' }}>
                                <Bar data={barData} options={{ ...chartOptions, scales: { x: { grid: { color: '#1e2d4d' }, ticks: { color: '#94a3b8' } }, y: { grid: { color: '#1e2d4d' }, ticks: { color: '#94a3b8' } } } }} />
                            </div>
                        </div>
                    </div>

                    {/* Recent applications */}
                    <div className="card animate-fade-in-up" style={{ padding: '24px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--text-primary)' }}>Recent Applications</h3>
                            <Link to="/jobs" style={{ fontSize: '0.8125rem', color: 'var(--accent)', textDecoration: 'none', fontWeight: 500 }}>
                                View all →
                            </Link>
                        </div>
                        <div style={{ overflowX: 'auto' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead>
                                    <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                                        {['Company', 'Role', 'Status', 'Date'].map(h => (
                                            <th key={h} style={{ padding: '10px 12px', textAlign: 'left', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                                {h}
                                            </th>
                                        ))}
                                    </tr>
                                </thead>
                                <tbody>
                                    {recentJobs.map((job) => (
                                        <tr key={job._id} style={{ borderBottom: '1px solid var(--border-color)', transition: 'background 0.2s' }}
                                            onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                                            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                                            <td style={{ padding: '12px', fontSize: '0.875rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                                                <Link to={`/jobs/${job._id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                                    {job.company}
                                                </Link>
                                            </td>
                                            <td style={{ padding: '12px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{job.position}</td>
                                            <td style={{ padding: '12px' }}>
                                                <span className={getStatusBadge(job.status)}>{job.status}</span>
                                            </td>
                                            <td style={{ padding: '12px', fontSize: '0.8125rem', color: 'var(--text-muted)' }}>
                                                {new Date(job.dateApplied).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Dashboard;

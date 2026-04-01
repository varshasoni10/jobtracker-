import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const features = [
    { icon: '🎯', title: 'Track Applications', desc: 'Never lose track of a single job application again. Monitor every stage.' },
    { icon: '📊', title: 'Visual Analytics', desc: 'Interactive charts showing your application pipeline and success rates.' },
    { icon: '🔍', title: 'Smart Search', desc: 'Find any application instantly. Filter by status, company, or role.' },
    { icon: '🔒', title: 'Secure & Private', desc: 'Your data is encrypted and only visible to you. Always.' },
];

const stats = [
    { value: '10K+', label: 'Jobs Tracked' },
    { value: '2.5K+', label: 'Happy Users' },
    { value: '94%', label: 'Success Rate' },
    { value: '4.9★', label: 'User Rating' },
];

const Home = () => {
    const { user } = useAuth();

    return (
        <div style={{ background: 'var(--bg-primary)' }}>
            {/* Hero Section */}
            <section className="hero-bg" style={{ padding: '100px 24px 80px', textAlign: 'center' }}>
                <div style={{ maxWidth: '760px', margin: '0 auto' }}>
                    <div className="animate-fade-in" style={{
                        display: 'inline-flex', alignItems: 'center', gap: '8px',
                        padding: '6px 16px', borderRadius: '999px',
                        background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.3)',
                        fontSize: '0.8125rem', color: 'var(--accent)', fontWeight: 500,
                        marginBottom: '32px'
                    }}>
                        <span>✨</span> The smartest way to track your job search
                    </div>

                    <h1 className="animate-fade-in-up" style={{
                        fontSize: 'clamp(2.5rem, 6vw, 4rem)', fontWeight: 900,
                        lineHeight: 1.1, letterSpacing: '-0.04em',
                        color: 'var(--text-primary)', marginBottom: '24px'
                    }}>
                        Land Your Dream Job with{' '}
                        <span className="gradient-text">Precision Tracking</span>
                    </h1>

                    <p className="animate-fade-in-up stagger-1" style={{
                        fontSize: '1.125rem', color: 'var(--text-secondary)',
                        lineHeight: 1.7, marginBottom: '48px', maxWidth: '560px', margin: '0 auto 48px'
                    }}>
                        Organize job applications, track interview stages, and analyze your progress — all from a single, beautiful dashboard.
                    </p>

                    <div className="animate-fade-in-up stagger-2" style={{ display: 'flex', justifyContent: 'center', gap: '16px', flexWrap: 'wrap', marginBottom: '80px' }}>
                        {user ? (
                            <Link to="/dashboard" className="btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
                                🚀 Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link to="/register" className="btn-primary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
                                    🚀 Start for Free
                                </Link>
                                <Link to="/login" className="btn-secondary" style={{ padding: '14px 32px', fontSize: '1rem' }}>
                                    Sign In
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mock dashboard preview */}
                    <div className="animate-fade-in-up stagger-3" style={{
                        background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                        borderRadius: '20px', padding: '24px',
                        boxShadow: '0 40px 80px rgba(0,0,0,0.5)',
                        textAlign: 'left'
                    }}>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
                            {['#ef4444','#f59e0b','#10b981'].map((c, i) => (
                                <div key={i} style={{ width: '12px', height: '12px', borderRadius: '50%', background: c }} />
                            ))}
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
                            {[
                                { label: 'Applied', val: '24', color: 'var(--blue)' },
                                { label: 'Interviewing', val: '8', color: 'var(--yellow)' },
                                { label: 'Offers', val: '3', color: 'var(--green)' },
                                { label: 'Rejected', val: '13', color: 'var(--red)' },
                            ].map((s, i) => (
                                <div key={i} style={{
                                    background: 'var(--bg-secondary)', borderRadius: '10px',
                                    padding: '14px', border: '1px solid var(--border-color)'
                                }}>
                                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: s.color }}>{s.val}</div>
                                    <div style={{ fontSize: '0.7rem', color: 'var(--text-muted)', marginTop: '2px' }}>{s.label}</div>
                                </div>
                            ))}
                        </div>
                        {['Google — Software Engineer', 'Meta — Product Designer', 'Netflix — Data Scientist'].map((job, i) => (
                            <div key={i} style={{
                                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                                padding: '10px 14px', background: 'var(--bg-secondary)',
                                borderRadius: '8px', marginBottom: '8px',
                                border: '1px solid var(--border-color)'
                            }}>
                                <span style={{ fontSize: '0.8125rem', color: 'var(--text-primary)' }}>{job}</span>
                                <span style={{
                                    fontSize: '0.7rem', padding: '3px 10px', borderRadius: '999px',
                                    background: ['var(--yellow-bg)','var(--blue-bg)','var(--green-bg)'][i],
                                    color: [' var(--yellow)','var(--blue)','var(--green)'][i]
                                }}>
                                    {['Interviewing','Applied','Offer'][i]}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats */}
            <section style={{ padding: '60px 24px', borderTop: '1px solid var(--border-color)', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', textAlign: 'center' }}>
                    {stats.map((s, i) => (
                        <div key={i}>
                            <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--accent)', marginBottom: '4px' }}>{s.value}</div>
                            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{s.label}</div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section style={{ padding: '80px 24px' }}>
                <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
                    <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                        <h2 style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px', letterSpacing: '-0.03em' }}>
                            Everything you need to get hired
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '480px', margin: '0 auto' }}>
                            A complete toolkit for the modern job seeker. Stop using spreadsheets.
                        </p>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                        {features.map((f, i) => (
                            <div key={i} className="card" style={{ padding: '28px' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{f.icon}</div>
                                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>{f.title}</h3>
                                <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', lineHeight: 1.6 }}>{f.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            {!user && (
                <section style={{ padding: '80px 24px', textAlign: 'center' }}>
                    <div style={{
                        maxWidth: '560px', margin: '0 auto',
                        background: 'linear-gradient(135deg, rgba(99,102,241,0.1), rgba(168,85,247,0.1))',
                        border: '1px solid rgba(99,102,241,0.2)',
                        borderRadius: '24px', padding: '60px 40px'
                    }}>
                        <h2 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '16px' }}>
                            Ready to get organized?
                        </h2>
                        <p style={{ color: 'var(--text-secondary)', marginBottom: '32px' }}>
                            Join thousands of job seekers who track their applications with TrackHire.
                        </p>
                        <Link to="/register" className="btn-primary" style={{ padding: '14px 40px', fontSize: '1rem' }}>
                            Create Free Account →
                        </Link>
                    </div>
                </section>
            )}

            {/* Footer */}
            <footer style={{ padding: '32px 24px', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.8125rem' }}>
                    © 2024 TrackHire. Built for job seekers who mean business.
                </p>
            </footer>
        </div>
    );
};

export default Home;

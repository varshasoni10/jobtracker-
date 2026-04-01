import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        try {
            await login(email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '40px 24px',
            background: 'radial-gradient(ellipse at top, rgba(99,102,241,0.08) 0%, transparent 60%), var(--bg-primary)'
        }}>
            <div className="animate-fade-in-up" style={{ width: '100%', maxWidth: '420px' }}>
                {/* Header */}
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{
                        width: '56px', height: '56px', background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                        borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '24px', margin: '0 auto 20px', boxShadow: '0 8px 20px rgba(99,102,241,0.4)'
                    }}>💼</div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-0.03em' }}>
                        Welcome back
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Sign in to your TrackHire account</p>
                </div>

                {/* Form Card */}
                <div style={{
                    background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                    borderRadius: '20px', padding: '36px'
                }}>
                    {error && (
                        <div className="alert-error" style={{ marginBottom: '20px' }}>
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '20px' }}>
                            <label className="form-label">Email address</label>
                            <input
                                type="email"
                                className="input-field"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="you@example.com"
                            />
                        </div>

                        <div style={{ marginBottom: '28px' }}>
                            <label className="form-label">Password</label>
                            <input
                                type="password"
                                className="input-field"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                placeholder="Enter your password"
                            />
                        </div>

                        <button type="submit" className="btn-primary" disabled={loading}
                            style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '0.9375rem' }}>
                            {loading ? <><span className="spinner" style={{ width: '16px', height: '16px' }} /> Signing in...</> : 'Sign In →'}
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Don't have an account?{' '}
                        <Link to="/register" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
                            Create one free
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;

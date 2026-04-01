import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();

    const handleRegister = async (e) => {
        e.preventDefault();
        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }
        setLoading(true);
        setError(null);
        try {
            await register(name, email, password);
            navigate('/dashboard');
        } catch (err) {
            setError(err.response?.data?.message || 'An error occurred during registration');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '40px 24px',
            background: 'radial-gradient(ellipse at top, rgba(168,85,247,0.08) 0%, transparent 60%), var(--bg-primary)'
        }}>
            <div className="animate-fade-in-up" style={{ width: '100%', maxWidth: '420px' }}>
                <div style={{ textAlign: 'center', marginBottom: '40px' }}>
                    <div style={{
                        width: '56px', height: '56px', background: 'linear-gradient(135deg, #a855f7, #ec4899)',
                        borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '24px', margin: '0 auto 20px', boxShadow: '0 8px 20px rgba(168,85,247,0.4)'
                    }}>🚀</div>
                    <h1 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '8px', letterSpacing: '-0.03em' }}>
                        Create your account
                    </h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Start tracking jobs for free, no credit card needed</p>
                </div>

                <div style={{
                    background: 'var(--bg-card)', border: '1px solid var(--border-color)',
                    borderRadius: '20px', padding: '36px'
                }}>
                    {error && (
                        <div className="alert-error" style={{ marginBottom: '20px' }}>
                            <span>⚠️</span> {error}
                        </div>
                    )}

                    <form onSubmit={handleRegister}>
                        <div style={{ marginBottom: '20px' }}>
                            <label className="form-label">Full Name</label>
                            <input
                                type="text"
                                className="input-field"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                required
                                placeholder="John Doe"
                            />
                        </div>

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
                                placeholder="Minimum 6 characters"
                            />
                        </div>

                        <button type="submit" className="btn-primary" disabled={loading}
                            style={{ width: '100%', justifyContent: 'center', padding: '13px', fontSize: '0.9375rem' }}>
                            {loading ? <><span className="spinner" style={{ width: '16px', height: '16px' }} /> Creating account...</> : 'Create Account →'}
                        </button>
                    </form>

                    <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        Already have an account?{' '}
                        <Link to="/login" style={{ color: 'var(--accent)', fontWeight: 600, textDecoration: 'none' }}>
                            Sign in
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Register;

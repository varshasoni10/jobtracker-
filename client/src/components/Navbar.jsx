import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/');
        setMenuOpen(false);
    };

    const isActive = (path) => location.pathname === path || location.pathname.startsWith(path + '/');

    const navLinkStyle = (path) => ({
        color: isActive(path) ? 'var(--accent)' : 'var(--text-secondary)',
        textDecoration: 'none',
        fontSize: '0.875rem',
        fontWeight: 500,
        padding: '6px 12px',
        borderRadius: '8px',
        background: isActive(path) ? 'rgba(99,102,241,0.1)' : 'transparent',
        transition: 'all 0.2s ease',
        display: 'inline-block',
    });

    return (
        <nav className="navbar">
            <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px', height: '64px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                {/* Logo */}
                <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                        width: '34px', height: '34px', background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                        borderRadius: '9px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '18px', boxShadow: '0 4px 14px rgba(99,102,241,0.4)'
                    }}>
                        💼
                    </div>
                    <span style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--text-primary)', letterSpacing: '-0.02em' }}>
                        Track<span style={{ color: 'var(--accent)' }}>Hire</span>
                    </span>
                </Link>

                {/* Desktop nav */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    {user ? (
                        <>
                            <Link to="/dashboard" style={navLinkStyle('/dashboard')}>Dashboard</Link>
                            <Link to="/jobs" style={navLinkStyle('/jobs')}>My Jobs</Link>
                            <Link to="/profile" style={navLinkStyle('/profile')}>Profile</Link>
                            <div style={{ width: '1px', height: '20px', background: 'var(--border-color)', margin: '0 8px' }} />
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '0.875rem', fontWeight: 700, color: 'white'
                                }}>
                                    {user.name?.charAt(0).toUpperCase()}
                                </div>
                                <button onClick={handleLogout} className="btn-danger" style={{ padding: '6px 14px', fontSize: '0.8125rem' }}>
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" style={navLinkStyle('/login')}>Login</Link>
                            <Link to="/register" className="btn-primary" style={{ padding: '8px 16px' }}>
                                Get Started
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;

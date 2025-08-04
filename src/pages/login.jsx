import { useState } from 'react';
import {googleSignIn, login } from '../services/authService';
import { useNavigate } from 'react-router-dom';
import '../css/login.css'; // Make sure this path matches your file
import { ArrowArcRight, ArrowRight, GoogleLogo } from 'phosphor-react';

export const Login = () => {
  const[loading,setLoading] = useState(false)
  const[message,setMessage] = useState(false)

  const [form, setForm] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();
    try {
      const result = await login(form);
      if(result.success){
      navigate('/feed');
      }
      else{
        setMessage(result.error)
      }
    } catch (err) {
      setMessage(err)
      alert(err.error);
    }
    setLoading(false)
  };

  const handleGoogleLogin = async(e) => {
      e.preventDefault();
      const result = await googleSignIn();
      if(result.success){
          navigate('/feed')
      }
      else{
          setMessage(result.error)
      }
    };

  return (
    <div className="login-parent-container">
      <div className="login-container">
        <h3>Welcome back!</h3>
        <p>Sign in to your account to continue</p>
        <img className='login-image' src='lading-page-bg.jpg'/>

        <form className="login-card" onSubmit={handleSubmit}>
          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>
          {message && <p className="message-text">{message}</p>}
          <button type="submit">{loading ? 'Signing...':"Sign In"}{!loading && <ArrowRight/>}</button>
          
        </form>
        <hr />
        <button className="google-btn" onClick={handleGoogleLogin}>
        <GoogleLogo size={20} weight="fill" style={{ marginRight: '8px' }} />
        Sign in with Google
        </button>
        <p className="switch-auth">
          Don't have an account?{' '}
          <span className="link" onClick={() => navigate('/register')}>
            Register instead
          </span>
        </p>
      </div>
    </div>
  );
};

import React, { useState } from "react";
import axios from "axios";
import { Activity, Plus, Trash2, Shield, Mail, Lock, User } from "lucide-react";
import "./AuthPage.css"; // Link to our new styling

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [family, setFamily] = useState([{ name: "", email: "" }]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const addFamily = () => {
    setFamily([...family, { name: "", email: "" }]);
  };

  const removeFamily = (index) => {
    const updated = family.filter((_, i) => i !== index);
    setFamily(updated);
  };

  const handleFamilyChange = (index, field, value) => {
    const updated = [...family];
    updated[index][field] = value;
    setFamily(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if (!isLogin) {
        await axios.post("http://localhost:5000/auth/register", {
          ...form,
          familyContacts: family
        });
        alert("Registration complete. Please log in.");
        setIsLogin(true);
        return;
      }

      const res = await axios.post("http://localhost:5000/auth/login", {
        email: form.email,
        password: form.password
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userId", res.data.userId);
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        
        {/* --- BRANDING / LOGO SECTION --- */}
        {/* --- BRANDING / LOGO SECTION --- */}
        <div className="auth-header">
          <div className="auth-logo">
            {/* Custom SVG matching the exact CardioGuard pulse line */}
            <svg 
              width="44" 
              height="44" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="#3b82f6" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <polyline points="2 12 6 12 9 4 13 20 16 10 18 12 22 12"></polyline>
            </svg>
            <span className="logo-text">CardioGuard</span>
          </div>
          <p className="auth-subtitle">
            {isLogin ? "Authenticate to access the simulation core." : "Initialize your physiological profile."}
          </p>
        </div>

        {/* --- FORM SECTION --- */}
        <form className="auth-form" onSubmit={handleSubmit}>
          
          {!isLogin && (
            <div className="input-group">
              <User className="input-icon" size={18} />
              <input type="text" name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required className="auth-input" />
            </div>
          )}

          <div className="input-group">
            <Mail className="input-icon" size={18} />
            <input type="email" name="email" placeholder="Communication Link (Email)" value={form.email} onChange={handleChange} required className="auth-input" />
          </div>

          <div className="input-group">
            <Lock className="input-icon" size={18} />
            <input type="password" name="password" placeholder="Security Key (Password)" value={form.password} onChange={handleChange} required className="auth-input" />
          </div>

          {!isLogin && (
            <div className="family-section">
              <div className="family-header">
                <Shield size={16} /> Emergency Contacts
              </div>
              
              {family.map((member, index) => (
                <div key={index} className="family-block">
                  <div className="family-inputs">
                    <input type="text" placeholder="Contact Name" value={member.name} onChange={(e) => handleFamilyChange(index, "name", e.target.value)} required className="auth-input input-sm" />
                    <input type="email" placeholder="Contact Email" value={member.email} onChange={(e) => handleFamilyChange(index, "email", e.target.value)} required className="auth-input input-sm" />
                  </div>
                  {family.length > 1 && (
                    <button type="button" onClick={() => removeFamily(index)} className="icon-btn remove-btn"><Trash2 size={16} /></button>
                  )}
                </div>
              ))}

              <button type="button" className="btn-outline add-family-btn" onClick={addFamily}>
                <Plus size={14} /> Add Additional Contact
              </button>
            </div>
          )}

          <button type="submit" className="auth-submit-btn" disabled={loading}>
            {loading ? "PROCESSING..." : (isLogin ? "LOG IN" : "CREATE PROFILE")}
          </button>
        </form>

        <div className="auth-footer">
          {isLogin ? "No active profile? " : "Profile established? "}
          <span className="auth-toggle-link" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? "Register here" : "Login here"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Auth;
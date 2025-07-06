import React, { useState } from 'react';
import Header from '../Home/Header';
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import Footer2 from '../Home/Footer2';
import { useTranslation } from 'react-i18next';

const Login = () => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {


      const res = await fetch('https://backend-co2e-portal.vercel.app/api/login', {
        method: 'POST',
        credentials: 'include', // important for cookies
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {


        if (formData.email === "admin1234@gmail.com" && formData.password === "admin1234") {
          alert("Admin login successful!");
          localStorage.setItem("isAdmin", "true")
          navigate('/Articles');
        }else{
          localStorage.setItem("isAdmin", "false");
        alert('Login successful!');
        // redirect to dashboard or home
        navigate('/');
        }
      } else {
        alert(data.message || 'Login failed!');
      }

    } catch (err) {
      console.error(err);
      alert('Error logging in.');
    }
  };

  return (
    <>
      <div id="upperheader">
        <Header />
        <div id="uuy">
          <form id="form" onSubmit={handleLogin}>
          <h2>{t("login.title")}</h2>
            <div id="ineerf">
            <span>{t("login.email")} :</span>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div id="ineerf">
            <span>{t("login.password")} :</span>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <button type="submit">{t("login.submit")}</button>
          </form>
        </div>
      </div>
      <Footer2/>
    </>
  );
};

export default Login;

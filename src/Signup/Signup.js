import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import Header from '../Home/Header';
import Footer2 from '../Home/Footer2';

const Signup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://backend-co2e-portal.vercel.app/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Signup successful!');
        navigate('/login');
      } else {
        alert(data.message || 'Signup failed!');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Something went wrong!');
    }
  };

  return (
    <>
      <div id="upperheader">
        <Header />

        <div id="uuy">
          <form id="form" onSubmit={handleSubmit}>
            <h2>{t("signup.title")}</h2>

            <div id="ineerf">
              <span>{t("signup.first_name")} :</span>
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>

            <div id="ineerf">
              <span>{t("signup.last_name")} :</span>
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
            </div>

            <div id="ineerf">
              <span>{t("signup.email")} :</span>
              <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>

            <div id="ineerf">
              <span>{t("signup.password")} :</span>
              <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>

            <button type="submit">{t("signup.submit")}</button>
          </form>
        </div>
      </div>
      <Footer2 />
    </>
  );
};

export default Signup;

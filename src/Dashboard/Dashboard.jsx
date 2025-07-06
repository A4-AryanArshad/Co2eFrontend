import React, { useState, useEffect } from 'react';
import './Dashboard.css';
import Header from '../Home/Header2';
import Header2 from '../Home/Header2';
import Footer2 from '../Home/Footer2';

const Dashboard = () => {
  const [form, setForm] = useState({ 
    titleEn: '', titleFr: '', titleEs: '',
    descriptionEn: '', descriptionFr: '', descriptionEs: '',
    link: '' 
  });
  const [cards, setCards] = useState([]);
  const [search, setSearch] = useState('');

  const fetchCards = async () => {
    try {
      // Get the selected language from localStorage
      const selectedLanguage = localStorage.getItem('selectedLanguage') || 'en';
      const res = await fetch(`https://backend-co2e-portal.vercel.app/card/cards?lang=${selectedLanguage}`);
      const data = await res.json();
      setCards(data);
    } catch (err) {
      console.error('Failed to fetch cards', err);
    }
  };

  useEffect(() => {
    fetchCards();
    
    // Listen for language changes
    const handleLanguageChange = () => {
      fetchCards();
    };

    window.addEventListener('storage', handleLanguageChange);
    window.addEventListener('languageChanged', handleLanguageChange);

    return () => {
      window.removeEventListener('storage', handleLanguageChange);
      window.removeEventListener('languageChanged', handleLanguageChange);
    };
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5001/card/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form)
    });
    const data = await res.json();
    alert('Card added!');
    setForm({ 
      titleEn: '', titleFr: '', titleEs: '',
      descriptionEn: '', descriptionFr: '', descriptionEs: '',
      link: '' 
    });
    fetchCards();
  };

  const handleDelete = async (id) => {
    await fetch(`http://localhost:5001/card/cards/${id}`, {
      method: 'DELETE'
    });
    fetchCards();
  };

  const filteredCards = cards.filter(card =>
    card.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
    <div id="dashf">
<Header2/>
      <h2 id="dh">Add New Card</h2>
      <form id="formerd" onSubmit={handleSubmit}>
        <div id="color" className="language-group">
          <h3>Title</h3>
          <input type="text" name="titleEn" placeholder="Title (English)" value={form.titleEn} onChange={handleChange} required />
          <input type="text" name="titleFr" placeholder="Title (Français)" value={form.titleFr} onChange={handleChange} required />
          <input type="text" name="titleEs" placeholder="Title (Español)" value={form.titleEs} onChange={handleChange} required />
        </div>

        <div id="inputerc" className="language-group">
          <h3>Description</h3>
          <textarea id="inputerci"
            name="descriptionEn"
            placeholder="Description (English)"
            value={form.descriptionEn}
            onChange={handleChange}
            required
          ></textarea>
          <textarea  id="inputerci"
            name="descriptionFr"
            placeholder="Description (Français)"
            value={form.descriptionFr}
            onChange={handleChange}
            required
          ></textarea>
          <textarea  id="inputerci"
            name="descriptionEs"
            placeholder="Description (Español)"
            value={form.descriptionEs}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <input type="text" name="link" placeholder="Website URL" value={form.link} onChange={handleChange} required />
        <button type="submit">Add</button>
      </form>

      <h2 id="ttqa">Filter By Name</h2>
      <div id="inputerqad" className="filter-section">
        <input
          type="text"
          placeholder="Filter by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="card-list">
        {filteredCards.map((card) => (
          <div id="cced" key={card._id}>
            <div id="pppu" className="card-item">
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <a href={card.link} target="_blank" rel="noopener noreferrer">Visit Link</a>
              <button onClick={() => handleDelete(card._id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
<Footer2/>
    </>
  );
};

export default Dashboard;
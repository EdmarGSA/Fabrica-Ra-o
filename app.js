// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import './translations/i18n';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// src/supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// src/App.jsx
import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';
import { useTranslation } from 'react-i18next';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import './App.css';

function App() {
  const { t } = useTranslation();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const session = supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener?.subscription.unsubscribe();
  }, []);

  return (
    <div className="App">
      <Header />
      {user ? <Dashboard user={user} /> : <LoginPage />}
    </div>
  );
}

export default App;

// src/components/Header.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Header = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <header className="header">
      <h1>Fábrica de Ração</h1>
      <div>
        <button onClick={() => changeLanguage('pt')}>PT</button>
        <button onClick={() => changeLanguage('en')}>EN</button>
        <button onClick={() => changeLanguage('es')}>ES</button>
      </div>
    </header>
  );
};

export default Header;

// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import { supabase } from '../supabaseClient';
import { useTranslation } from 'react-i18next';

const LoginPage = () => {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    await supabase.auth.signInWithPassword({ email, password });
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder={t('email')} required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder={t('password')} required />
      <button type="submit">{t('login')}</button>
    </form>
  );
};

export default LoginPage;

// src/pages/Dashboard.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';

const Dashboard = ({ user }) => {
  const { t } = useTranslation();
  return <div>{t('welcome')}, {user.email}</div>;
};

export default Dashboard;

// src/translations/i18n.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './en.json';
import pt from './pt.json';
import es from './es.json';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    pt: { translation: pt },
    es: { translation: es },
  },
  lng: 'pt',
  fallbackLng: 'pt',
  interpolation: { escapeValue: false },
});

export default i18n;

// src/translations/pt.json
{
  "email": "E-mail",
  "password": "Senha",
  "login": "Entrar",
  "welcome": "Bem-vindo"
}

// src/translations/en.json
{
  "email": "Email",
  "password": "Password",
  "login": "Login",
  "welcome": "Welcome"
}

// src/translations/es.json
{
  "email": "Correo electrónico",
  "password": "Contraseña",
  "login": "Iniciar sesión",
  "welcome": "Bienvenido"
}

// .env.example
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=

// README.md
# Fábrica de Ração

Sistema React com Supabase e suporte multilíngue.

## Scripts
- `npm install`
- `npm run dev`

Configure `.env` com as chaves do Supabase.

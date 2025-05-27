// src/Home.tsx
import React from 'react';

const Home: React.FC = () => {
  return (
    <div className="container home-content">
      <div className="home-icon">⚽</div>
      <h1>Bienvenido al Gestor de Equipos y Presidentes</h1>
      <p>
        Administra tus equipos de fútbol y sus presidentes de manera sencilla.
        Crea, edita, lista y elimina información con esta aplicación.
      </p>
      <p>Navega usando el menú superior.</p>
    </div>
  );
};

export default Home;
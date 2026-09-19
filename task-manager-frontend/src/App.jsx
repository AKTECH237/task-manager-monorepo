import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:8080/api' });

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [isRegistering, setIsRegistering] = useState(false);
  const [username, setUsername] = useState('');
  const [name, setName] = useState(''); // Ajouté pour l'inscription (champ name requis)
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // Ajouté pour l'œil
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  
  // Nouveaux états pour la recherche et le filtre
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    if (token) fetchTasks();
  }, [token]);

  const fetchTasks = async () => {
    try {
      const res = await API.get('/tasks');
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) logout();
    }
  };

  const handleAuth = async (e) => {
    e.preventDefault();
    const endpoint = isRegistering ? '/auth/register' : '/auth/login';
    const payload = isRegistering ? { name, email: username, password } : { email: username, password };
    try {
      const res = await API.post(endpoint, payload);
      const jwt = res.data.token;
      localStorage.setItem('token', jwt);
      setToken(jwt);
      setUsername('');
      setName('');
      setPassword('');
    } catch (err) {
      alert('Erreur d’authentification, vérifie tes identifiants.');
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken('');
    setTasks([]);
  };

  const createTask = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    try {
      // Remplace 'PENDING' par 'TODO' (ou 'IN_PROGRESS' / 'DONE')
      await API.post('/tasks', { title, description, status: 'TODO' });
      setTitle('');
      setDescription('');
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTask = async (id) => {
    try {
      await API.delete(`/tasks/${id}`);
      fetchTasks();
    } catch (err) {
      console.error(err);
    }
  };

  // Logique de filtrage des tâches
  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          (task.description && task.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'ALL' || task.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // VUE AUTHENTIFICATION
  if (!token) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-blue-950 flex items-center justify-center p-4">
        <div className="bg-slate-900/90 backdrop-blur-md border border-blue-900/50 p-8 rounded-2xl shadow-2xl w-full max-w-md text-slate-100">
          <div className="text-center mb-8">
            <span className="bg-blue-600 text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full text-blue-100">Task Manager</span>
            <h1 className="text-3xl font-extrabold mt-3 tracking-tight text-white">
              {isRegistering ? 'Créer un compte' : 'Bon retour !'}
            </h1>
            <p className="text-slate-400 text-sm mt-1">Gère tes tâches efficacement</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            {isRegistering && (
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Nom</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  placeholder="Ton nom"
                  required={isRegistering}
                />
              </div>
            )}
            <div>
  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Adresse Email</label>
  <input
    type="email"
    value={username} // tu peux garder ta variable username, elle contiendra l'email
    onChange={(e) => setUsername(e.target.value)}
    className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
    placeholder="akt@example.com"
    required
  />
</div>
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-300 mb-2">Mot de passe</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 rounded-lg bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                  placeholder="••••••••"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white transition"
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-500 text-white font-semibold py-3 rounded-lg shadow-lg shadow-blue-600/30 transition duration-200"
            >
              {isRegistering ? "S'inscrire" : 'Se connecter'}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-slate-400">
            {isRegistering ? 'Déjà un compte ?' : "Pas encore de compte ?"}
            <button
              onClick={() => setIsRegistering(!isRegistering)}
              className="text-blue-400 hover:text-blue-300 font-medium ml-2 transition"
            >
              {isRegistering ? 'Se connecter' : "S'inscrire"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  // VUE DASHBOARD
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-10">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center bg-slate-900/80 border border-blue-950 backdrop-blur p-6 rounded-2xl shadow-xl mb-8">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-2">
              🚀 Tableau de bord
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">Pilote tes tâches quotidiennes</p>
          </div>
          <button
            onClick={logout}
            className="bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white px-4 py-2 rounded-xl text-sm font-semibold border border-rose-500/20 transition"
          >
            Déconnexion
          </button>
        </div>

        <form onSubmit={createTask} className="bg-slate-900/80 border border-blue-950 p-6 rounded-2xl shadow-xl mb-8 space-y-4">
          <h2 className="text-lg font-bold text-slate-200">✨ Nouvelle tâche</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Titre de la tâche..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
              required
            />
            <input
              type="text"
              placeholder="Description (optionnelle)"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="px-4 py-3 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
            />
          </div>
          <button
            type="submit"
            className="bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg shadow-emerald-600/20 transition"
          >
            + Ajouter la tâche
          </button>
        </form>

        {/* Barre de recherche et filtres par statut ajoutés ici */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Rechercher une tâche..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
          />
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-3 rounded-xl bg-slate-900/80 border border-slate-800 text-white focus:outline-none focus:border-blue-500 transition"
          >
            <option value="ALL">Tous les statuts</option>
            <option value="TODO">À faire (TODO)</option>
            <option value="COMPLETED">Terminées</option>
          </select>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-bold text-slate-200">📋 Mes Tâches</h2>
            <span className="bg-slate-900 border border-slate-800 text-slate-300 text-xs px-3 py-1 rounded-full font-medium">
              {filteredTasks.length} / {tasks.length} total
            </span>
          </div>

          {filteredTasks.length === 0 ? (
            <div className="bg-slate-900/40 border border-dashed border-slate-800 rounded-2xl p-12 text-center text-slate-500">
              Aucune tâche ne correspond à ta recherche.
            </div>
          ) : (
            <div className="grid gap-4">
              {filteredTasks.map((task) => (
                <div
                  key={task.id}
                  className="bg-slate-900/80 border border-slate-800 p-5 rounded-2xl flex justify-between items-center hover:border-slate-700 transition"
                >
                  <div className="space-y-1">
                    <h3 className="font-bold text-white text-lg">{task.title}</h3>
                    <p className="text-slate-400 text-sm">{task.description || "Aucune description"}</p>
                    <span className="inline-block mt-2 px-2.5 py-1 text-xs font-bold rounded-lg bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {task.status}
                    </span>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="bg-rose-500/10 hover:bg-rose-600 text-rose-400 hover:text-white px-4 py-2 rounded-xl text-sm font-semibold transition border border-rose-500/20"
                  >
                    Supprimer
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
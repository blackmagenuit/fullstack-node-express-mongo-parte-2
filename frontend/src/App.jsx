import { useEffect, useMemo, useState } from 'react';
import createDOMPurify from 'dompurify';
import { fetchUsers, loginUser, registerUser, fetchWordPressPosts } from './services/api';

const defaultFilters = { search: '', role: '', page: 1, limit: 10 };
const DOMPurify = createDOMPurify(window);

const safeHtml = (value) => DOMPurify.sanitize(String(value || ''), {
  ALLOWED_TAGS: ['b', 'strong', 'em', 'i', 'p', 'br', 'ul', 'ol', 'li', 'a'],
  ALLOWED_ATTR: ['href', 'target', 'rel'],
});

function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [authForm, setAuthForm] = useState({ name: '', email: 'admin@demo.com', password: '123456', role: 'admin' });
  const [filters, setFilters] = useState(defaultFilters);
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [meta, setMeta] = useState({ total: 0, page: 1, pageSize: 10, totalPages: 1 });

  useEffect(() => {
    if (!token) {
      setUsers([]);
      return;
    }
    const query = {
      search: filters.search,
      role: filters.role,
      page: filters.page,
      limit: filters.limit,
    };

    let cancelled = false;
    setLoading(true);
    setError('');

    fetchUsers(query)
      .then((data) => {
        if (!cancelled) {
          setUsers(data.users || []);
          setMeta({ total: data.total || 0, page: data.page || 1, pageSize: data.pageSize || filters.limit, totalPages: data.totalPages || 1 });
        }
      })
      .catch((err) => {
        if (!cancelled) {
          setError(err?.response?.data?.message || err.message || 'Error al cargar usuarios');
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [token, filters.search, filters.role, filters.page, filters.limit]);

  useEffect(() => {
    fetchWordPressPosts()
      .then((data) => setPosts(data || []))
      .catch(() => setPosts([]));
  }, []);

  const roleOptions = useMemo(() => ['admin', 'editor', 'viewer'], []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser({ email: authForm.email, password: authForm.password });
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setError('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Login inválido');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const data = await registerUser(authForm);
      localStorage.setItem('token', data.token);
      setToken(data.token);
      setError('');
    } catch (err) {
      setError(err?.response?.data?.message || 'Registro inválido');
    }
  };

  const clearSession = () => {
    localStorage.removeItem('token');
    setToken('');
    setUsers([]);
    setFilters(defaultFilters);
  };

  const updateFilter = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
      ...(key !== 'page' ? { page: 1 } : {}),
    }));
  };

  return (
    <div className="app">
      <div className="card">
        <h1>Panel Full Stack</h1>

        {!token ? (
          <form onSubmit={handleLogin}>
            <div className="toolbar">
              <div className="field">
                <label htmlFor="name">Nombre</label>
                <input id="name" value={authForm.name} onChange={(e) => setAuthForm({ ...authForm, name: e.target.value })} />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" value={authForm.email} onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })} />
              </div>
              <div className="field">
                <label htmlFor="password">Contraseña</label>
                <input id="password" type="password" value={authForm.password} onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })} />
              </div>
              <div className="field">
                <label htmlFor="role">Rol</label>
                <select id="role" value={authForm.role} onChange={(e) => setAuthForm({ ...authForm, role: e.target.value })}>
                  {roleOptions.map((role) => <option key={role} value={role}>{role}</option>)}
                </select>
              </div>
              <div className="actions">
                <button type="submit">Login</button>
                <button type="button" className="secondary" onClick={handleRegister}>Registro</button>
              </div>
            </div>
          </form>
        ) : (
          <div className="info-box">Sesión activa. Token guardado en almacenamiento local.</div>
        )}

        {error && <div className="error-box">{error}</div>}

        {token && (
          <>
            <div className="toolbar">
              <div className="field">
                <label htmlFor="search">Buscar por nombre o email</label>
                <input id="search" value={filters.search} onChange={(e) => updateFilter('search', e.target.value)} placeholder="Buscar..." />
              </div>
              <div className="field">
                <label htmlFor="roleFilter">Rol</label>
                <select id="roleFilter" value={filters.role} onChange={(e) => updateFilter('role', e.target.value)}>
                  <option value="">Todos</option>
                  {roleOptions.map((role) => <option key={role} value={role}>{role}</option>)}
                </select>
              </div>
              <div className="field">
                <label htmlFor="limit">Resultados por página</label>
                <select id="limit" value={filters.limit} onChange={(e) => updateFilter('limit', Number(e.target.value))}>
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                </select>
              </div>
              <div className="actions">
                <button type="button" className="secondary" onClick={clearSession}>Cerrar sesión</button>
              </div>
            </div>

            {loading && <div className="info-box">Cargando usuarios...</div>}

            {!loading && users.length === 0 && <div className="empty-state">No hay resultados.</div>}

            {!loading && users.length > 0 && (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Email</th>
                      <th>Rol</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((user) => (
                      <tr key={user._id || `${user.email}-${user.role}`}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            <div className="pagination">
              <div className="inline-group">
                <button type="button" onClick={() => setFilters((prev) => ({ ...prev, page: Math.max(1, prev.page - 1) }))} disabled={meta.page <= 1}>Anterior</button>
                <button type="button" onClick={() => setFilters((prev) => ({ ...prev, page: Math.min(meta.totalPages, prev.page + 1) }))} disabled={meta.page >= meta.totalPages}>Siguiente</button>
              </div>
              <div>
                Página {meta.page} / {meta.totalPages} · Total {meta.total}
              </div>
            </div>
          </>
        )}

        <div className="posts">
          <h2>Publicaciones WordPress</h2>
          {posts.length === 0 ? <div className="empty-state">Sin publicaciones.</div> : posts.map((post) => (
            <article key={post.id} className="post-card">
              <h3 dangerouslySetInnerHTML={{ __html: safeHtml(post.title?.rendered || 'Sin título') }} />
              <div dangerouslySetInnerHTML={{ __html: safeHtml(post.content?.rendered || '') }} />
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

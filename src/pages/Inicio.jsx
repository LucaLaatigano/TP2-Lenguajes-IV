import { useState, useEffect } from 'react'
import "../styles/Inicio.css"

function Inicio() {
  const [articulos, setArticulos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('https://dev.to/api/articles?tag=webdev&per_page=6')
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error('No se pudieron obtener los datos de la API')
        }
        return respuesta.json()
      })
      .then((datos) => {
        setArticulos(datos)
        setCargando(false)
      })
      .catch((err) => {
        setError(err.message)
        setCargando(false)
      })
  }, [])

  return (
    <div className="page">
      <header className="inicio-header">
        <h1>Página de Inicio</h1>
        <p>
          Bienvenido a nuestro sitio web. Esta es la página principal.{' '}
          <strong>Trabajo Práctico N2 - Lenguajes IV</strong>
        </p>
      </header>

      <section className="api-section">
        <h2>Últimas Tendencias en Tecnología (API Pública)</h2>

        {cargando && <p className="status-msg">Cargando datos desde la API...</p>}
        {error && <p className="status-msg error">Error: {error}</p>}

        {!cargando && !error && (
          <div className="api-grid">
            {articulos.map((item) => (
              <article key={item.id} className="api-card">
                <img
                  src={
                    item.cover_image ||
                    item.social_image ||
                    'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80'
                  }
                  alt={item.title}
                  className="api-card-img"
                  loading="lazy"
                />

                <div className="api-card-body">
                  <span className="api-tag">
                    #{item.tag_list?.[0] || 'tecnologia'}
                  </span>
                  <h3>{item.title}</h3>
                  <p className="api-desc">{item.description}</p>
                  <div className="api-meta">
                    <span>
                      <strong>Autor:</strong> {item.user.name}
                    </span>
                    <span>⏱️ {item.reading_time_minutes} min</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}

export default Inicio
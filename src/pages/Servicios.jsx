import "../styles/Servicios.css"

const SERVICIOS = [
  {
    id: 1,
    titulo: 'Desarrollo de APIs & Backend',
    descripcion: 'Construcción de arquitecturas RESTful robustas, autenticación segura y validación de datos para aplicaciones escalables.',
    tecnologias: 'Node.js, Express, Zod, JWT',
    imagen: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 2,
    titulo: 'Diseño UI/UX & Frontend Moderno',
    descripcion: 'Creación de interfaces interactivas, paneles de control dinámicos y animaciones fluidas centradas en el usuario.',
    tecnologias: 'React, Tailwind CSS, GSAP, Mantine UI',
    imagen: 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 3,
    titulo: 'Arquitectura de Bases de Datos',
    descripcion: 'Modelado relacional, optimización de consultas complejas y gestión de persistencia e integridad de datos.',
    tecnologias: 'MySQL, SQL Server, Docker, Prisma',
    imagen: 'https://images.unsplash.com/photo-1544383835-bda2bc66a55d?auto=format&fit=crop&w=800&q=80',
  },
]

function Servicios() {
  return (
    <section className="page-content">
      <h2>Servicios</h2>
      <p>Servicios y competencias técnicas del área de Tecnologías de la Información.</p>

      <div className="cards-grid">
        {SERVICIOS.map((item) => (
          <article key={item.id} className="card">
            <img
              src={item.imagen}
              alt={item.titulo}
              className="card-image"
            />
            <div className="card-body">
              <h3>{item.titulo}</h3>
              <p className="card-description">{item.descripcion}</p>
              <p className="card-tech">
                <strong>Tecnologías:</strong> {item.tecnologias}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export default Servicios
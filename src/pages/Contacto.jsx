import ContactForm from '../components/ContactForm.jsx'
import '../styles/Contacto.css'

function Contacto() {
  return (
    <div className="page">
      <div className="contacto-header">
        <h1>Página de Contacto</h1>
        <p>Ponete en contacto, completando el siguiente formulario.</p>
      </div>

      <div className="contact-layout">
        <div className="contact-card">
          <ContactForm />
        </div>

        <div className="map-card">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3623.951548224135!2d-65.39412792375325!3d-24.728540905506818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x941bc14f953f529f%3A0x600f9845c93a0540!2sUniversidad%20Cat%C3%B3lica%20de%20Salta!5e0!3m2!1ses-419!2sar!4v1710000000000!5m2!1ses-419!2sar"
            title="Ubicación en el mapa"
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </div>
  )
}

export default Contacto
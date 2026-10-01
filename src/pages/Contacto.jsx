import ContactForm from '../components/ContactForm.jsx'

function Contacto() {
  return (
    <div className="page">
      <h1>Página de Contacto</h1>
      <p>Ponete en contacto, completando el siguiente formulario.</p>
      <div className="contact-card">
        <ContactForm />
      </div>
    </div>
  )
}

export default Contacto

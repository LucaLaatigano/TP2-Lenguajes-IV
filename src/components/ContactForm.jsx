import { useState } from 'react'
import emailjs from '@emailjs/browser'

const EMAILJS_SERVICE_ID = 'service_4qtetln'
const EMAILJS_TEMPLATE_ID = 'template_i5p2uwc'
const EMAILJS_PUBLIC_KEY = 'I2_HcnKspAlhl6kuZ'


const MAX_MENSAJE = 300


const REGEX_NOMBRE = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/
const REGEX_EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const VALORES_INICIALES = { nombre: '', email: '', mensaje: '' }

function ContactForm() {
  const [valores, setValores] = useState(VALORES_INICIALES)
  const [errores, setErrores] = useState({})
  const [enviando, setEnviando] = useState(false)
  const [estado, setEstado] = useState(null)

  function validarCampo(nombreCampo, valor) {
    const v = valor.trim()

    switch (nombreCampo) {
      case 'nombre':
        if (!v) return 'El nombre y apellido es obligatorio.'
        if (v.length < 3) return 'Debe tener al menos 3 caracteres.'
        if (v.length > 60) return 'No puede superar los 60 caracteres.'
        if (!REGEX_NOMBRE.test(v)) return 'Solo se permiten letras y espacios.'
        return ''

      case 'email':
        if (!v) return 'El correo electrónico es obligatorio.'
        if (!REGEX_EMAIL.test(v)) return 'Ingresá un correo electrónico válido (ejemplo@dominio.com).'
        return ''

      case 'mensaje':
        if (!v) return 'El mensaje es obligatorio.'
        if (v.length < 10) return 'El mensaje debe tener al menos 10 caracteres.'
        if (v.length > MAX_MENSAJE) return `El mensaje no puede superar los ${MAX_MENSAJE} caracteres.`
        return ''

      default:
        return ''
    }
  }


  function validarFormulario() {
    const nuevosErrores = {}
    Object.keys(VALORES_INICIALES).forEach((campo) => {
      const error = validarCampo(campo, valores[campo])
      if (error) nuevosErrores[campo] = error
    })
    return nuevosErrores
  }

  function handleChange(e) {
    const { name, value } = e.target

    if (name === 'mensaje' && value.length > MAX_MENSAJE) return

    setValores((prev) => ({ ...prev, [name]: value }))

    if (errores[name]) {
      setErrores((prev) => ({ ...prev, [name]: validarCampo(name, value) }))
    }
  }

  function handleBlur(e) {
    const { name, value } = e.target
    setErrores((prev) => ({ ...prev, [name]: validarCampo(name, value) }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setEstado(null)

    const nuevosErrores = validarFormulario()
    setErrores(nuevosErrores)

    if (Object.keys(nuevosErrores).length > 0) {
      setEstado({ tipo: 'error', texto: 'Revisá los campos marcados antes de enviar.' })
      return
    }

    setEnviando(true)
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          nombre: valores.nombre.trim(),
          email: valores.email.trim(),
          mensaje: valores.mensaje.trim(),
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      )

      setEstado({ tipo: 'ok', texto: '¡Mensaje enviado con éxito! Te responderemos pronto.' })
      setValores(VALORES_INICIALES)
      setErrores({})
    } catch (error) {
      console.error('Error al enviar el correo:', error)
      setEstado({ tipo: 'error', texto: 'Ocurrió un error al enviar el mensaje. Intentá nuevamente.' })
    } finally {
      setEnviando(false)
    }
  }

  const caracteresRestantes = MAX_MENSAJE - valores.mensaje.length

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-group">
        <label htmlFor="nombre">Nombre y Apellido</label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={valores.nombre}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errores.nombre ? 'input-error' : ''}
          placeholder="Juan Pérez"
        />
        {errores.nombre && <span className="error-message">{errores.nombre}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Correo Electrónico</label>
        <input
          type="email"
          id="email"
          name="email"
          value={valores.email}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errores.email ? 'input-error' : ''}
          placeholder="ejemplo@dominio.com"
        />
        {errores.email && <span className="error-message">{errores.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="mensaje">Mensaje</label>
        <textarea
          id="mensaje"
          name="mensaje"
          rows="5"
          value={valores.mensaje}
          onChange={handleChange}
          onBlur={handleBlur}
          className={errores.mensaje ? 'input-error' : ''}
          placeholder="Escribí tu mensaje (máximo 300 caracteres)..."
        />
        <div className="form-footer-row">
          {errores.mensaje
            ? <span className="error-message">{errores.mensaje}</span>
            : <span />}
          <span className={`contador ${caracteresRestantes <= 20 ? 'contador-limite' : ''}`}>
            {caracteresRestantes} caracteres restantes
          </span>
        </div>
      </div>

      <button type="submit" className="btn-enviar" disabled={enviando}>
        {enviando ? 'Enviando...' : 'Enviar mensaje'}
      </button>

      {estado && (
        <p className={`estado-mensaje ${estado.tipo === 'ok' ? 'estado-ok' : 'estado-error'}`}>
          {estado.texto}
        </p>
      )}
    </form>
  )
}

export default ContactForm

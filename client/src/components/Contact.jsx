import { useState } from "react"
import "../main.css"

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      setSubmitStatus('success')
      setFormData({ name: '', email: '', subject: '', message: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactInfo = [
    {
      icon: "bi-geo-alt",
      title: "Locatie",
      content: (
          <>
            Zuidwal 94<br />
            2512 XP Den Haag
          </>
      ),
      action: () => window.open('https://maps.google.com/?q=Zuidwal+94,+2512+XP+Den+Haag', '_blank')
    },
    {
      icon: "bi-clock",
      title: "Openingstijden",
      content: (
          <>
            <span className="schedule-day">Ma-Zo: <strong>11:00 - 19:00</strong></span><br />
            <span className="schedule-day closed">Di: <strong>Gesloten</strong></span>
          </>
      )
    },
    {
      icon: "bi-telephone",
      title: "Bel ons",
      content: <a href="tel:+31685108263" className="contact-link">+31 6 8510 8263</a>,
      action: () => window.location.href = 'tel:+31685108263'
    },
    {
      icon: "bi-envelope",
      title: "Email",
      content: <a href="mailto:info@fatayertime.nl" className="contact-link">info@fatayertime.nl</a>,
      action: () => window.location.href = 'mailto:info@fatayertime.nl'
    }
  ]

  return (
      <section id="contact" className="contact section">
        {/* Floating Background Elements */}
        <div className="contact-bg-elements">
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
        </div>

        {/* Section Header */}
        <header className="container section-title" data-aos="fade-up">
          <h2>Contact</h2>
          <p className="section-subtitle">Laat van je horen</p>
        </header>

        {/* Location Map */}
        <div className="container">
          <div className="mb-5 map-wrapper" data-aos="fade-up" data-aos-delay="200">
            <div className="map-overlay">
              <div className="map-info">
                <h4>Bezoek ons restaurant</h4>
                <p>Zuidwal 94, Den Haag</p>
              </div>
            </div>
            <iframe
                title="Fatayer Time Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2462.141496816658!2d4.349883315763338!3d52.06927027972648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b72011bb2ce1%3A0x5c1a4d72e0ae01f3!2sZuidwal%2094%2C%202512%20XP%20Den%20Haag%2C%20Netherlands!5e0!3m2!1sen!2snl!4v1718090285566!5m2!1sen!2snl"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Google Maps location of Fatayer Time"
            />
          </div>
        </div>

        {/* Contact Information and Form */}
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            {/* Contact Details */}
            <div className="col-lg-5">
              <div className="contact-info-wrapper">
                <h3 className="info-section-title">Neem contact op</h3>
                <p className="info-section-subtitle">
                  We horen graag van je! Neem contact met ons op voor reserveringen,
                  vragen of gewoon om hallo te zeggen.
                </p>

                <div className="contact-info-grid">
                  {contactInfo.map((item, index) => (
                      <div
                          key={index}
                          className={`info-item ${item.action ? 'clickable' : ''}`}
                          data-aos="fade-up"
                          data-aos-delay={300 + (index * 100)}
                          onClick={item.action}
                          onKeyDown={(e) => {
                            if ((e.key === 'Enter' || e.key === ' ') && item.action) {
                              e.preventDefault();
                              item.action();
                            }
                          }}
                          role={item.action ? "button" : undefined}
                          tabIndex={item.action ? 0 : undefined}
                          aria-label={item.action ? `${item.title} - Click to ${item.title === 'Locatie' ? 'open map' : item.title === 'Bel ons' ? 'call' : 'send email'}` : undefined}
                      >
                        <div className="info-icon-wrapper">
                          <i className={`bi ${item.icon}`} aria-hidden="true"></i>
                          <div className="icon-ripple"></div>
                        </div>
                        <div className="info-content">
                          <h4>{item.title}</h4>
                          <div className="info-text">{item.content}</div>
                        </div>
                      </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="col-lg-7">
              <div className="contact-form-wrapper">
                <div className="form-header">
                  <h3>Stuur ons een bericht</h3>
                  <p>Vul het formulier in en we nemen zo snel mogelijk contact met je op.</p>
                </div>

                <form
                    onSubmit={handleSubmit}
                    className="modern-contact-form"
                    data-aos="fade-up"
                    data-aos-delay="300"
                >
                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        <i className="bi bi-person"></i>
                        Naam *
                      </label>
                      <input
                          type="text"
                          id="name"
                          name="name"
                          className="form-input"
                          value={formData.name}
                          onChange={handleInputChange}
                          placeholder="Jouw volledige naam"
                          required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="email" className="form-label">
                        <i className="bi bi-envelope"></i>
                        Email *
                      </label>
                      <input
                          type="email"
                          id="email"
                          name="email"
                          className="form-input"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="jouw@email.com"
                          required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label htmlFor="subject" className="form-label">
                      <i className="bi bi-chat-left-text"></i>
                      Onderwerp *
                    </label>
                    <input
                        type="text"
                        id="subject"
                        name="subject"
                        className="form-input"
                        value={formData.subject}
                        onChange={handleInputChange}
                        placeholder="Waar gaat je bericht over?"
                        required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message" className="form-label">
                      <i className="bi bi-textarea-resize"></i>
                      Bericht *
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        rows="6"
                        className="form-input form-textarea"
                        value={formData.message}
                        onChange={handleInputChange}
                        placeholder="Deel je bericht, vraag of opmerking met ons..."
                        required
                    ></textarea>
                  </div>

                  {submitStatus && (
                      <div className={`form-status ${submitStatus}`}>
                        {submitStatus === 'success' ? (
                            <>
                              <i className="bi bi-check-circle"></i>
                              Bedankt! Je bericht is verzonden. We nemen binnenkort contact op.
                            </>
                        ) : (
                            <>
                              <i className="bi bi-exclamation-triangle"></i>
                              Er ging iets mis. Probeer het opnieuw of bel ons direct.
                            </>
                        )}
                      </div>
                  )}

                  <div className="form-submit">
                    <button
                        type="submit"
                        className="btn-submit"
                        disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                          <>
                            <div className="btn-spinner"></div>
                            Verzenden...
                          </>
                      ) : (
                          <>
                            <i className="bi bi-send"></i>
                            Verzend bericht
                          </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default Contact

import { useState, useEffect } from "react"

const contactInfo = [
  {
    icon: "bi-geo-alt",
    title: "Locatie",
    content: (
        <>
          Kon. Julianalaan 274
          <br />
          2274 JR Voorburg
        </>
    ),
    action: () =>
        window.open(
            "https://www.google.com/maps/place/Fatayer+Time/@52.0765141,4.352726,17z/data=!4m15!1m8!3m7!1s0x47c5b79df86d7ddf:0xe2e7ae262040b6b9!2sFatayer+Time!8m2!3d52.0765011!4d4.3553044!10e1!16s%2Fg%2F11qqpbxst2!3m5!1s0x47c5b79df86d7ddf:0xe2e7ae262040b6b9!8m2!3d52.0765011!4d4.3553044!16s%2Fg%2F11qqpbxst2?hl=en-GB&entry=ttu&g_ep=EgoyMDI1MDcyMi4wIKXMDSoASAFQAw%3D%3D",
            "_blank",
        ),
  },
  {
    icon: "bi-clock",
    title: "Openingstijden",
    content: (
        <>
        <span className="schedule-day">
          Ma-Zo: <strong>11:00 - 19:00</strong>
        </span>
          <br />
          <span className="schedule-day closed">
          Di: <strong>Gesloten</strong>
        </span>
        </>
    ),
  },
  {
    icon: "bi-telephone",
    title: "Bel ons",
    content: (
        <a href="tel:+31685108263" className="contact-link">
          +31 6 8510 8263
        </a>
    ),
    action: () => (window.location.href = "tel:+31685108263"),
  },
  {
    icon: "bi-whatsapp",
    title: "WhatsApp",
    content: (
        <a href="https://wa.me/+31657122795" className="contact-link">
          +31 6 57122795
        </a>
    ),
    action: () => (window.location.href = "https://wa.me/+31657122795"),
  },
]

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    access_key: "5a6494c7-02ae-446e-8b25-3c1f4c073a66",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState(null)

  useEffect(() => {
    // Initialize AOS if available
    if (typeof window !== "undefined" && window.AOS) {
      window.AOS.init({
        duration: 600,
        easing: "ease-in-out",
        once: true,
        mirror: false,
      })
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.honeypot) {
      setSubmitStatus("error");
      return;
    }
    setIsSubmitting(true);
    setSubmitStatus(null);

    // Remove honeypot from the data being sent
    const { honeypot, ...formDataToSend } = formData;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formDataToSend),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          honeypot: "",
          access_key: "5a6494c7-02ae-446e-8b25-3c1f4c073a66",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
      <section id="contact" className="contact section">
        {/* Floating Background Elements */}
        <div className="contact-bg-elements">
          <div className="floating-element element-1"></div>
          <div className="floating-element element-2"></div>
          <div className="floating-element element-3"></div>
        </div>

        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>Contact</h2>
          <p>Laat van je horen</p>
        </div>

        {/* Location Map */}
        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="mb-5 map-wrapper">
            <div className="map-overlay">
              <div className="map-info">
                <h4>Bezoek ons restaurant</h4>
                <p>Kon. Julianalaan 274, Voorburg</p>
              </div>
            </div>
            <iframe
                title="Fatayer Time Location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2440.3020988092355!2d4.352726!3d52.0765141!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47c5b79df86d7ddf%3A0xe2e7ae262040b6b9!2sFatayer%20Time!5e0!3m2!1sen!2snl!4v1721901929469!5m2!1sen!2nl"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                aria-label="Google Maps location of Fatayer Time"
            />
          </div>
        </div>

        {/* Contact Information and Form */}
        <div className="container" data-aos="fade-up" data-aos-delay="200">
          <div className="row gy-4">
            {/* Contact Details */}
            <div className="col-lg-5">
              <div className="contact-info-wrapper">
                <h3 className="info-section-title">Neem contact op</h3>
                <p className="info-section-subtitle">
                  We horen graag van je! Neem contact met ons op voor reserveringen, vragen of gewoon om hallo te zeggen.
                </p>

                <div className="contact-info-grid">
                  {contactInfo.map((item, index) => (
                      <div
                          key={index}
                          className={`info-item ${item.action ? "clickable" : ""}`}
                          data-aos="fade-up"
                          data-aos-delay={300 + index * 100}
                          onClick={item.action}
                          onKeyDown={(e) => {
                            if ((e.key === "Enter" || e.key === " ") && item.action) {
                              e.preventDefault()
                              item.action()
                            }
                          }}
                          role={item.action ? "button" : undefined}
                          tabIndex={item.action ? 0 : undefined}
                          aria-label={
                            item.action
                                ? `${item.title} - Click to ${item.title === "Locatie" ? "open map" : item.title === "Bel ons" ? "call" : "send WhatsApp message"}`
                                : undefined
                          }
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

                <form onSubmit={handleSubmit} className="modern-contact-form" data-aos="fade-up" data-aos-delay="300">
                  <input type="hidden" name="access_key" value={formData.access_key} />
                  <div style={{ display: "none" }}>
                    <input type="text" name="honeypot" value={formData.honeypot} onChange={handleInputChange} />
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label htmlFor="name" className="form-label">
                        <i className="bi bi-person me-2"></i>
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
                        <i className="bi bi-envelope me-2"></i>
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
                      <i className="bi bi-chat-left-text me-2"></i>
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
                      <i className="bi bi-textarea-resize me-2"></i>
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
                        {submitStatus === "success" ? (
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
                    <button type="submit" className="btn-submit" disabled={isSubmitting}>
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

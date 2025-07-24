import "../main.css"

const whyUs = [
  {
    number: "01",
    title: "Takeaway",
    desc: "Order your favorite fatayer and pick it up fresh from our shop.",
    link: "#order",
  },
  {
    number: "02",
    title: "Delivery",
    desc: "Enjoy delicious food delivered hot to your doorstep in Den Haag.",
    link: "#delivery",
  },
  {
    number: "03",
    title: "Catering",
    desc: "Perfect for parties, office events, and special occasions.",
    link: "#catering",
  },
]

export default function Services() {
  return (
      <section id="why-us" className="why-us section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>WHY US</h2>
          <p>Why Choose Fatayer Time</p>
        </div>

        <div className="container">
          <div className="row gy-4">
            {whyUs.map((item, idx) => (
                <div className="col-lg-4" data-aos="fade-up" data-aos-delay={100 + 100 * idx} key={item.number}>
                  <div className="card-item">
                    <span>{item.number}</span>
                    <h4>
                      <a href={item.link} className="stretched-link">
                        {item.title}
                      </a>
                    </h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
            ))}
          </div>
        </div>
      </section>
  )
}

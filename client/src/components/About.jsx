"use client"

import React, { useEffect } from "react"
import "../main.css"
import fatayerImg from "../assets/img/fatayer.png"
import AOS from "aos"
import "aos/dist/aos.css"

function About() {
  useEffect(() => {
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    })
  }, [])

  return (
      <section id="about" className="about section">
        {/* Section Title */}
        <div className="container section-title" data-aos="fade-up">
          <h2>About Us</h2>
          <p>Learn More About Fatayer Time</p>
        </div>

        <div className="container" data-aos="fade-up" data-aos-delay="100">
          <div className="row gy-4">
            <div className="col-lg-6 order-1 order-lg-2">
              <img
                  src={fatayerImg || "/placeholder.svg"}
                  className="img-fluid about-img"
                  alt="Fatayer Time specialties"
              />
            </div>
            <div className="col-lg-6 order-2 order-lg-1 content">
              <h3>Authentic Middle Eastern Flavors</h3>
              <p className="fst-italic">
                Fatayer Time is a family-run bakery specializing in authentic Middle Eastern pies—handmade with love and
                fresh ingredients every day in The Hague.
              </p>
              <ul>
                <li>
                  <i className="bi bi-check2-all"></i>
                  <span>100% Handmade with fresh ingredients</span>
                </li>
                <li>
                  <i className="bi bi-check2-all"></i>
                  <span>Traditional flavors with a modern twist</span>
                </li>
                <li>
                  <i className="bi bi-check2-all"></i>
                  <span>50+ Happy customers and growing every week</span>
                </li>
              </ul>
              <p>
                Our signature fatayers are baked to perfection, blending authentic Middle Eastern taste with quality you
                can trust. Every bite tells a story of tradition, passion, and culinary excellence.
              </p>
            </div>
          </div>
        </div>
      </section>
  )
}

export default React.memo(About)

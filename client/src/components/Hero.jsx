import React from "react";
import bannerImg from "../assets/img/banner2.png";
import "../main.css";

const Hero = () => {
    return (
        <section id="hero" className="hero section dark-background">
            {/* Background Image */}
            <img src={bannerImg} alt="Fatayer Time Banner" data-aos="fade-in" />

            {/* Hero Content */}
            <div className="container" data-aos="zoom-in" data-aos-delay="100">
                <h2>
                    Welkom bij <span>Fatayer Time</span>
                </h2>
                <p>Authentieke Syrische Fatayer & Specialiteiten in Den Haag</p>

                <div className="d-flex justify-content-center mt-4" data-aos="fade-up" data-aos-delay="300">
                    <a
                        href="https://www.bistroo.nl/voorburg/restaurants/fatayer-time?utm_source=fatayer-time&utm_medium=bestelknop"
                        className="cta-btn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Online Bestellen
                    </a>
                    <a href="#services" className="cta-btn">
                        Afhalen
                    </a>
                </div>
            </div>
        </section>
    );
};

export default Hero;

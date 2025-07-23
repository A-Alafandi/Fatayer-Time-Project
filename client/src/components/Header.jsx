import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import logo from "../assets/img/logo.png";

const Header = () => {
    const [navOpen, setNavOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    const toggleNav = () => {
        setNavOpen((prev) => !prev);
    };

    const handleScroll = () => {
        setIsScrolled(window.scrollY > 30);
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Fixed: Add/remove class to body AND navmenu container
    useEffect(() => {
        if (navOpen) {
            document.body.classList.add("mobile-nav-active");
        } else {
            document.body.classList.remove("mobile-nav-active");
        }
    }, [navOpen]);

    const scrollLinkProps = {
        smooth: false, // Disabled smooth scroll for instant navigation
        offset: -80,
        onClick: () => setNavOpen(false),
    };

    // Custom smooth scroll function for better control
    const handleSmoothScroll = (target) => {
        const element = document.getElementById(target);
        if (element) {
            const yOffset = -80;
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;

            window.scrollTo({
                top: y,
                behavior: 'smooth'
            });
        }
        setNavOpen(false);
    };

    return (
        <header id="header" className={`header fixed-top ${isScrolled ? "scrolled" : ""}`}>
            <div className="branding d-flex align-items-center">
                <div className="container position-relative d-flex align-items-center justify-content-between">
                    <RouterLink to="/" className="logo d-flex align-items-center me-auto me-xl-0">
                        <img src={logo || "/placeholder.svg"} alt="Fatayer Time Logo" />
                        <h1 className="sitename">Fatayer Time</h1>
                    </RouterLink>

                    {/* Fixed: Add mobile-nav-active class conditionally to navmenu */}
                    <nav id="navmenu" className={`navmenu ${navOpen ? 'mobile-nav-active' : ''}`}>
                        <ul>
                            <li>
                                <button
                                    onClick={() => handleSmoothScroll('hero')}
                                    className="nav-link"
                                >
                                    Home
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleSmoothScroll('about')}
                                    className="nav-link"
                                >
                                    About
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleSmoothScroll('services')}
                                    className="nav-link"
                                >
                                    Services
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleSmoothScroll('menu')}
                                    className="nav-link"
                                >
                                    Menu
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleSmoothScroll('gallery')}
                                    className="nav-link"
                                >
                                    Gallery
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => handleSmoothScroll('contact')}
                                    className="nav-link"
                                >
                                    Contact
                                </button>
                            </li>
                        </ul>
                    </nav>

                    {/* Fixed: Improved mobile toggle button */}
                    <button
                        className={`mobile-nav-toggle d-xl-none bi ${navOpen ? "bi-x" : "bi-list"}`}
                        onClick={toggleNav}
                        aria-label="Toggle navigation"
                        aria-expanded={navOpen}
                        type="button"
                    />
                </div>
            </div>
        </header>
    );
};

export default Header;
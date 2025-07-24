"use client"

import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import "../../main.css"

function MenuNavbar() {
    const [navOpen, setNavOpen] = useState(false)

    const toggleNav = () => {
        setNavOpen((open) => !open)
        document.body.classList.toggle("mobile-nav-active")
    }

    // Handle scroll for 'scrolled' class
    useEffect(() => {
        const handleScroll = () => {
            const selectBody = document.querySelector("body")
            const selectHeader = document.querySelector("#header")
            if (selectHeader) {
                window.scrollY > 100 ? selectBody.classList.add("scrolled") : selectBody.classList.remove("scrolled")
            }
        }

        document.addEventListener("scroll", handleScroll)
        window.addEventListener("load", handleScroll)

        return () => {
            document.removeEventListener("scroll", handleScroll)
            window.removeEventListener("load", handleScroll)
        }
    }, [])

    return (
        <header id="header" className="header fixed-top">
            <div className="branding d-flex align-items-center">
                <div className="container position-relative d-flex align-items-center justify-content-between">
                    <Link to="/" className="logo d-flex align-items-center me-auto me-xl-0">
                        <h1 className="sitename">Fatayer Time</h1>
                    </Link>

                    <nav id="navmenu" className="navmenu">
                        <ul>
                            <li>
                                <Link to="/">Home</Link>
                            </li>
                            <li>
                                <Link to="/about">About</Link>
                            </li>
                            <li>
                                <Link to="/menu" className="active">
                                    Menu
                                </Link>
                            </li>
                            <li>
                                <Link to="/services">Services</Link>
                            </li>
                            <li>
                                <Link to="/contact">Contact</Link>
                            </li>
                        </ul>
                        {/*<i className={`mobile-nav-toggle d-xl-none bi ${navOpen ? "bi-x" : "bi-list"}`} onClick={toggleNav}></i>*/}
                    </nav>

                    <a
                        href="https://www.bistroo.nl/voorburg/restaurants/fatayer-time?utm_source=fatayer-time&utm_medium=bestelknop"
                        className="btn-book-a-table d-none d-xl-block"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Order Online
                    </a>
                </div>
            </div>
        </header>
    )
}

export default MenuNavbar

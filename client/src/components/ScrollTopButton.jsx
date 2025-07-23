
import { useState, useEffect } from "react"
import "../main.css"

function ScrollTopButton() {
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const toggleScrollTop = () => {
            setVisible(window.scrollY > 100)
        }

        window.addEventListener("scroll", toggleScrollTop)
        window.addEventListener("load", toggleScrollTop)

        return () => {
            window.removeEventListener("scroll", toggleScrollTop)
            window.removeEventListener("load", toggleScrollTop)
        }
    }, [])

    const scrollToTop = (e) => {
        e.preventDefault()
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    }

    return (
        <a
            href="/HomePage"
            id="scroll-top"
            className={`scroll-top d-flex align-items-center justify-content-center ${visible ? "active" : ""}`}
            onClick={scrollToTop}
            aria-label="Scroll to top"
        >
            <i className="bi bi-arrow-up-short"></i>
        </a>
    )
}

export default ScrollTopButton

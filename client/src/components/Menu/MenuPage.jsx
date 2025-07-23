"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import "../../main.css"
import Spinner from "../spinner/Spinner"
import ItemDetailsModal from "./ItemDetailsModal"

const MAX_RETRIES = 3
const RETRY_DELAY = 1000

function MenuPage() {
    const [menu, setMenu] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState("")
    const [selectedItem, setSelectedItem] = useState(null)
    const [retryCount, setRetryCount] = useState(0)
    const [isRetrying, setIsRetrying] = useState(false)
    const [activeFilter, setActiveFilter] = useState("*")

    const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8080"

    const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

    const getMenuData = useCallback(
        async (attemptNumber = 0) => {
            try {
                const response = await fetch(`${API_BASE_URL}/api/menu`, {
                    method: "GET",
                    headers: { "Content-Type": "application/json" },
                })
                if (!response.ok) {
                    const error = await response.json().catch(() => ({ message: "Network error" }))
                    throw new Error(error.message || `HTTP ${response.status}`)
                }
                return await response.json()
            } catch (error) {
                if (attemptNumber < MAX_RETRIES - 1) {
                    await sleep(RETRY_DELAY * (attemptNumber + 1))
                    return getMenuData(attemptNumber + 1)
                }
                throw error
            }
        },
        [API_BASE_URL],
    )

    const handleRetry = useCallback(async () => {
        if (retryCount >= MAX_RETRIES) return
        setIsRetrying(true)
        setError("")
        setRetryCount((prev) => prev + 1)
        try {
            const data = await getMenuData()
            setMenu(data || [])
            setRetryCount(0)
        } catch (err) {
            setError(getErrorMessage(err))
        } finally {
            setIsRetrying(false)
        }
    }, [getMenuData, retryCount])

    const getErrorMessage = (error) => {
        if (error.name === "TypeError" && error.message.includes("fetch")) {
            return "Network error. Please check your connection and try again."
        }
        return error.message || "Failed to load menu. Please try again later."
    }

    useEffect(() => {
        let active = true
        async function fetchMenu() {
            setIsLoading(true)
            setError("")
            setRetryCount(0)
            try {
                const data = await getMenuData()
                if (active) setMenu(data || [])
            } catch (err) {
                if (active) setError(getErrorMessage(err))
            } finally {
                if (active) setIsLoading(false)
            }
        }
        fetchMenu()
        return () => {
            active = false
        }
    }, [getMenuData])

    const groupedCategories = useMemo(() => {
        const categories = {}
        menu.forEach((item) => {
            if (!item.category) return
            const category = item.category.trim()
            if (!categories[category]) categories[category] = []
            categories[category].push(item)
        })
        return categories
    }, [menu])

    const filteredItems = useMemo(() => {
        if (activeFilter === "*") return menu
        return menu.filter((item) => item.category?.toLowerCase() === activeFilter.toLowerCase())
    }, [menu, activeFilter])

    const availableCategories = useMemo(() => {
        const categories = [...new Set(menu.map((item) => item.category).filter(Boolean))]
        return categories
    }, [menu])

    const renderError = () => (
        <div className="menu-alert-error">
            <p className="mb-3">{error}</p>
            {retryCount < MAX_RETRIES && (
                <button className="menu-btn-retry" onClick={handleRetry} disabled={isRetrying}>
                    {isRetrying ? "⏳ Retrying..." : `Retry (${retryCount}/${MAX_RETRIES})`}
                </button>
            )}
            {retryCount >= MAX_RETRIES && (
                <p className="mt-3" style={{ color: "var(--accent-color)" }}>
                    Maximum retry attempts reached.
                    <br />
                    Please refresh or try again later.
                </p>
            )}
        </div>
    )

    const handleItemClick = (item) => {
        setSelectedItem(item)
    }

    const renderBadges = (item) => {
        const badges = []
        if (item.isVegetarian) {
            badges.push(
                <span key="veg" className="menu-badge badge-veg">
                    🥗 Vegetarian
                </span>
            )
        }
        if (item.isSpicy) {
            badges.push(
                <span key="spicy" className="menu-badge badge-spicy">
                    🌶️ Spicy
                </span>
            )
        }
        return badges
    }

    return (
        <>
            {/*<MenuNavbar />*/}
            {/*<MenuHero />*/}
            <section id="menu" className="menu section">
                {/* Section Title */}
                <div className="container section-title" data-aos="fade-up">
                    <h2>Menu</h2>
                    <p>Check Our Tasty Menu</p>
                </div>

                <div
                    className="container isotope-layout"
                    data-default-filter="*"
                    data-layout="masonry"
                    data-sort="original-order"
                >
                    <div className="row isotope-container" data-aos="fade-up" data-aos-delay="200">
                        {isLoading && (
                            <div className="col-12">
                                <div className="menu-loading">
                                    <Spinner size="large" />
                                    <p className="menu-loading-text">Loading menu...</p>
                                </div>
                            </div>
                        )}

                        {error && <div className="col-12">{renderError()}</div>}

                        {!isLoading && !error && menu.length === 0 && (
                            <div className="col-12">
                                <div className="menu-alert-warning">No menu items found. Please check back later.</div>
                            </div>
                        )}

                        {!isLoading &&
                            !error &&
                            filteredItems.length > 0 &&
                            filteredItems.map((item) => (
                                <div
                                    key={item.id}
                                    className={`col-lg-6 menu-item isotope-item filter-${item.category?.toLowerCase() || "other"}`}
                                >
                                    <div className="menu-img-container">
                                        <img
                                            src={item.imageUrl || "/placeholder.svg?height=80&width=80"}
                                            className="menu-img"
                                            alt={item.name}
                                        />
                                        <div className="menu-img-overlay">
                                            <span className="menu-img-icon">👁️</span>
                                        </div>
                                    </div>
                                    <div className="menu-content">
                                        <button
                                            type="button"
                                            onClick={() => handleItemClick(item)}
                                            className="menu-item-button"
                                            style={{
                                                background: "none",
                                                border: "none",
                                                color: "var(--heading-color)",
                                                fontWeight: "700",
                                                cursor: "pointer",
                                                padding: 0,
                                                textAlign: "left",
                                                fontSize: "inherit",
                                                fontFamily: "inherit",
                                            }}
                                        >
                                            {item.name}
                                        </button>
                                        <span>€{typeof item.price === "number" ? item.price.toFixed(2) : "-"}</span>
                                    </div>
                                    <div className="menu-ingredients">
                                        {Array.isArray(item.ingredients) && item.ingredients.length > 0
                                            ? item.ingredients.join(", ")
                                            : item.description || "Delicious and fresh"}
                                    </div>
                                    {(item.isVegetarian || item.isSpicy) && (
                                        <div className="menu-badges">
                                            {renderBadges(item)}
                                        </div>
                                    )}
                                </div>
                            ))}
                    </div>
                </div>

                {selectedItem && <ItemDetailsModal item={selectedItem} onClose={() => setSelectedItem(null)} />}
            </section>
            {/*<Footer />*/}
        </>
    )
}

export default MenuPage
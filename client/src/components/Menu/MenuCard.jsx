"use client"

import PropTypes from "prop-types"
import "../../main.css"

function MenuCard({ item, onClick }) {
    const handleKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            onClick(item)
        }
    }

    const handleClick = (e) => {
        e.stopPropagation()
        onClick(item)
    }

    return (
        <div
            className="menu-card"
            tabIndex={0}
            role="button"
            aria-label={`View details for ${item.name}`}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
        >
            <img src={item.imageUrl || "/placeholder.svg?height=200&width=300"} alt={item.name} className="menu-card-image" />
            <div className="menu-card-content">
                <h5 className="menu-card-title">{item.name}</h5>
                <p className="menu-card-category">{item.category}</p>
                <p className="menu-card-description">{item.description}</p>
                <div className="menu-card-footer">
                    <span className="menu-card-price">€{typeof item.price === "number" ? item.price.toFixed(2) : "-"}</span>
                    <div>
                        {item.isVegetarian && <span className="menu-badge badge-veg">V</span>}
                        {item.isSpicy && <span className="menu-badge badge-spicy">🌶️</span>}
                    </div>
                </div>
            </div>
        </div>
    )
}

MenuCard.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        name: PropTypes.string.isRequired,
        imageUrl: PropTypes.string,
        category: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        isVegetarian: PropTypes.bool,
        isSpicy: PropTypes.bool,
    }).isRequired,
    onClick: PropTypes.func.isRequired,
}

export default MenuCard

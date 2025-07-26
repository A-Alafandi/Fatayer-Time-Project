import React, { useEffect } from "react";
import PropTypes from "prop-types";
import "../../main.css";

function ItemDetailsModal({ item, onClose }) {
    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === "Escape") onClose();
        };
        document.addEventListener("keydown", onKeyDown);
        document.body.style.overflow = "hidden";
        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.body.style.overflow = "unset";
        };
    }, [onClose]);

    if (!item) return null;

    const ingredientsDisplay =
        Array.isArray(item.ingredients) && item.ingredients.length > 0
            ? item.ingredients.join(", ")
            : null;

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) onClose();
    };

    const handleBackdropKeyDown = (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClose();
        }
    };

    return (
        // eslint-disable-next-line jsx-a11y/role-supports-aria-props
        <div
            className="menu-modal-backdrop"
            onClick={handleBackdropClick}
            onKeyDown={handleBackdropKeyDown}
            tabIndex={0}
            role="button"
            aria-modal="true"
            aria-labelledby="modal-title"
        >
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions */}
            <div className="menu-modal" onClick={e => e.stopPropagation()}>
                <div className="modal-header d-flex justify-content-between align-items-center">
                    <h2 id="modal-title" className="modal-title">
                        {item.name}
                    </h2>
                    <button type="button" className="btn-close" aria-label="Close" onClick={onClose}>
                        ×
                    </button>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className="col-md-5 d-flex align-items-center justify-content-center mb-3 mb-md-0">
                            <img
                                src={item.imageUrl || "/placeholder.svg?height=200&width=200"}
                                alt={item.name}
                                className="modal-image"
                            />
                        </div>
                        <div className="col-md-7">
                            <div className="modal-info">
                                {/*<div className="mb-3">*/}
                                {/*    <strong>Category:</strong> {item.category || "-"}*/}
                                {/*</div>*/}
                                <div className="mb-3">
                                    <strong>Description:</strong><br/> {item.description || "-"}
                                </div>
                                {ingredientsDisplay && (
                                    <div className="mb-3">
                                        <strong>Ingredients:</strong> <br/> {ingredientsDisplay}
                                    </div>
                                )}
                                <div className="mb-3">
                                    <div className="modal-price">
                                        €{typeof item.price === "number" ? item.price.toFixed(2) : "-"}
                                    </div>
                                </div>
                                <div className="d-flex gap-2">
                                    {item.isVegetarian && <span className="badge bg-success">🥗 Vegetarian</span>}
                                    {item.isSpicy && <span className="badge bg-danger">🌶️ Spicy</span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

ItemDetailsModal.propTypes = {
    item: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        name: PropTypes.string,
        imageUrl: PropTypes.string,
        category: PropTypes.string,
        description: PropTypes.string,
        price: PropTypes.number,
        isVegetarian: PropTypes.bool,
        isSpicy: PropTypes.bool,
        ingredients: PropTypes.arrayOf(PropTypes.string),
    }),
    onClose: PropTypes.func.isRequired,
};

export default ItemDetailsModal;

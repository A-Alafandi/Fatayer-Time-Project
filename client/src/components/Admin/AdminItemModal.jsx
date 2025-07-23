import { useState, useEffect } from "react"
import PropTypes from "prop-types"
import "../../main.css"
import Spinner from "../spinner/Spinner"

function AdminItemModal({ show, selectedItem, onSave, onClose, saving }) {
    const [formData, setFormData] = useState({
        name: "",
        category: "",
        description: "",
        price: "",
        imageUrl: "",
        ingredients: [""],
        isVegetarian: false,
        isSpicy: false,
        popular: false,
    })
    const [errors, setErrors] = useState({})

    useEffect(() => {
        if (show) {
            if (selectedItem) {
                // Edit mode - populate form with existing item data
                setFormData({
                    name: selectedItem.name || "",
                    category: selectedItem.category || "",
                    description: selectedItem.description || "",
                    price: selectedItem.price?.toString() || "",
                    imageUrl: selectedItem.imageUrl || "",
                    ingredients: Array.isArray(selectedItem.ingredients) && selectedItem.ingredients.length > 0
                        ? selectedItem.ingredients.filter(ing => ing.trim() !== "")
                        : [""],
                    isVegetarian: Boolean(selectedItem.isVegetarian),
                    isSpicy: Boolean(selectedItem.isSpicy),
                    popular: Boolean(selectedItem.popular),
                })
            } else {
                // Add mode - reset form
                setFormData({
                    name: "",
                    category: "",
                    description: "",
                    price: "",
                    imageUrl: "",
                    ingredients: [""],
                    isVegetarian: false,
                    isSpicy: false,
                    popular: false,
                })
            }
            setErrors({})
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }

        return () => {
            document.body.style.overflow = "unset"
        }
    }, [show, selectedItem])

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape" && show) {
                onClose()
            }
        }

        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [show, onClose])

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }))
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors((prev) => ({ ...prev, [name]: "" }))
        }
    }

    const handleIngredientChange = (index, value) => {
        const newIngredients = [...formData.ingredients]
        newIngredients[index] = value
        setFormData((prev) => ({
            ...prev,
            ingredients: newIngredients,
        }))
    }

    const addIngredient = () => {
        setFormData((prev) => ({
            ...prev,
            ingredients: [...prev.ingredients, ""],
        }))
    }

    const removeIngredient = (index) => {
        if (formData.ingredients.length > 1) {
            const newIngredients = formData.ingredients.filter((_, i) => i !== index)
            setFormData((prev) => ({
                ...prev,
                ingredients: newIngredients,
            }))
        }
    }

    const validateForm = () => {
        const newErrors = {}

        if (!formData.name.trim()) {
            newErrors.name = "Name is required"
        }

        if (!formData.category.trim()) {
            newErrors.category = "Category is required"
        }

        if (!formData.description.trim()) {
            newErrors.description = "Description is required"
        }

        if (!formData.price.trim()) {
            newErrors.price = "Price is required"
        } else if (isNaN(Number.parseFloat(formData.price)) || Number.parseFloat(formData.price) <= 0) {
            newErrors.price = "Price must be a valid positive number"
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if (!validateForm()) {
            return
        }

        const submitData = {
            ...formData,
            price: Number.parseFloat(formData.price),
            ingredients: formData.ingredients
                .map((ing) => ing.trim())
                .filter((ing) => ing !== ""),
            // Explicitly ensure boolean values
            isVegetarian: Boolean(formData.isVegetarian),
            isSpicy: Boolean(formData.isSpicy),
            popular: Boolean(formData.popular),
        }

        // Debug: Log the data being sent
        console.log('Submitting data:', submitData)
        console.log('Boolean values:', {
            isVegetarian: submitData.isVegetarian,
            isSpicy: submitData.isSpicy,
            popular: submitData.popular
        })

        onSave(submitData)
    }

    const handleBackdropClick = (e) => {
        // Only close if clicking directly on the backdrop, not on modal content
        if (e.target === e.currentTarget) {
            onClose()
        }
    }

    if (!show) return null

    return (
        <div
            className="menu-modal-backdrop"
            role="presentation"
            onClick={handleBackdropClick}
        >
            <div
                className="menu-modal admin-item-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="modal-title"
            >
                <div className="modal-header">
                    <h2 id="modal-title" className="modal-title">
                        {selectedItem ? "Edit Menu Item" : "Add New Menu Item"}
                    </h2>
                </div>

                <div className="modal-body">
                    <form onSubmit={handleSubmit} className="admin-item-form">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="name">
                                        Name <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className={errors.name ? "input-error" : ""}
                                        disabled={saving}
                                        placeholder="Enter item name"
                                    />
                                    {errors.name && <div className="field-error">{errors.name}</div>}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="category">
                                        Category <span className="required">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        id="category"
                                        name="category"
                                        value={formData.category}
                                        onChange={handleChange}
                                        className={errors.category ? "input-error" : ""}
                                        disabled={saving}
                                        placeholder="e.g., Fatayer, Drinks, Desserts"
                                    />
                                    {errors.category && <div className="field-error">{errors.category}</div>}
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="price">
                                        Price (€) <span className="required">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        id="price"
                                        name="price"
                                        value={formData.price}
                                        onChange={handleChange}
                                        className={errors.price ? "input-error" : ""}
                                        disabled={saving}
                                        placeholder="0.00"
                                        step="0.01"
                                        min="0"
                                    />
                                    {errors.price && <div className="field-error">{errors.price}</div>}
                                </div>
                            </div>

                            <div className="col-md-6">
                                <div className="form-group">
                                    <label htmlFor="imageUrl">Image URL</label>
                                    <input
                                        type="url"
                                        id="imageUrl"
                                        name="imageUrl"
                                        value={formData.imageUrl}
                                        onChange={handleChange}
                                        disabled={saving}
                                        placeholder="https://example.com/image.jpg"
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">
                                Description <span className="required">*</span>
                            </label>
                            <textarea
                                id="description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className={errors.description ? "input-error" : ""}
                                disabled={saving}
                                placeholder="Describe the menu item..."
                                rows="3"
                            />
                            {errors.description && <div className="field-error">{errors.description}</div>}
                        </div>

                        <div className="form-group">
                            <label htmlFor="ingredients-section">Ingredients</label>
                            <div className="ingredients-container" id="ingredients-section">
                                {formData.ingredients.map((ingredient, index) => (
                                    <div key={index} className="ingredient-row">
                                        <input
                                            type="text"
                                            value={ingredient}
                                            onChange={(e) => handleIngredientChange(index, e.target.value)}
                                            placeholder={`Ingredient ${index + 1}`}
                                            disabled={saving}
                                            className="ingredient-input"
                                        />
                                        {formData.ingredients.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeIngredient(index)}
                                                className="ingredient-remove-btn"
                                                disabled={saving}
                                                title="Remove ingredient"
                                            >
                                                ×
                                            </button>
                                        )}
                                        {index === formData.ingredients.length - 1 && (
                                            <button
                                                type="button"
                                                onClick={addIngredient}
                                                className="ingredient-add-btn"
                                                disabled={saving}
                                                title="Add ingredient"
                                            >
                                                +
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="form-group">
                            <div className="checkbox-group">
                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="isVegetarian"
                                        checked={formData.isVegetarian}
                                        onChange={handleChange}
                                        disabled={saving}
                                    />
                                    <span className="checkmark"></span>🥗 Vegetarian
                                </label>

                                <label className="checkbox-label">
                                    <input
                                        type="checkbox"
                                        name="isSpicy"
                                        checked={formData.isSpicy}
                                        onChange={handleChange}
                                        disabled={saving}
                                    />
                                    <span className="checkmark"></span>
                                    🌶️ Spicy
                                </label>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button type="button" onClick={onClose} className="btn-cancel" disabled={saving}>
                                Cancel
                            </button>
                            <button type="submit" className="btn-save" disabled={saving}>
                                {saving ? (
                                    <>
                                        <Spinner size="small" variant="secondary" />
                                        <span>Saving...</span>
                                    </>
                                ) : (
                                    <span>{selectedItem ? "Update Item" : "Add Item"}</span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

AdminItemModal.propTypes = {
    show: PropTypes.bool.isRequired,
    selectedItem: PropTypes.object,
    onSave: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    saving: PropTypes.bool,
}

export default AdminItemModal
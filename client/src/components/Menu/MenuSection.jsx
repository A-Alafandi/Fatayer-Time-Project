import PropTypes from "prop-types"
import MenuCard from "./MenuCard"
import "../../styles/main.css"

function MenuSection({ category, items, onItemClick }) {
    return (
        <section className="menu-section">
            <div className="container section-title" data-aos="fade-up">
                <h2>{category.toUpperCase()}</h2>
                <p>{category} Selection</p>
            </div>
            <div className="container">
                <div className="row gy-4">
                    {items.map((item) => (
                        <div className="col-lg-4 col-md-6" key={item.id}>
                            <MenuCard item={item} onClick={onItemClick} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

MenuSection.propTypes = {
    category: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        }),
    ).isRequired,
    onItemClick: PropTypes.func.isRequired,
}

export default MenuSection
on;
import { useState } from "react";
import "swiper/css";
import "swiper/css/pagination";
import "../main.css";
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

// Import local images if they are in src/assets
import gallery1 from "../assets/img/gallery/gallery-1.jpg";
import gallery2 from "../assets/img/gallery/gallery-2.jpg";
import gallery3 from "../assets/img/gallery/gallery-2.jpg";
import gallery4 from "../assets/img/gallery/gallery-4.jpg";
import gallery5 from "../assets/img/gallery/gallery-5.jpg";
import gallery6 from "../assets/img/gallery/gallery-6.jpg";
import gallery7 from "../assets/img/gallery/gallery-7.jpg";
import gallery8 from "../assets/img/gallery/gallery-8.jpg";
const galleryImages = [
    { src: gallery1, alt: "Delicious Fatayer 1/400x300?text=Ingredients" },
    // Replace placeholders with actual images or valid placeholders
    { src: gallery2, alt: "Fresh Ingredients 2" },
    { src: gallery3, alt: "Delicious Fatayer 1" },
    { src: gallery5, alt: "Specialty Dishes 4" },
    { src: gallery6, alt: "Happy Customers 5" },
    { src: gallery7, alt: "Restaurant Interior 6" },
    { src: gallery4, alt: "Food Preparation 7" },
    { src: gallery8, alt: "Traditional Recipes 8" },
];

export default function Gallery() {
    const [isOpen, setIsOpen] = useState(false);
    const [photoIndex, setPhotoIndex] = useState(0);

    return (
        <section id="gallery" className="gallery section">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
                <h2>Gallery</h2>
                <p>Some photos from Our Restaurant</p>
            </div>

            <div className="container-fluid" data-aos="fade-up" data-aos-delay="100">
                <div className="row g-0">
                    {galleryImages.map((img, idx) => (
                        <div className="col-lg-3 col-md-4" key={idx}>
                            <div className="gallery-item">
                                <a
                                    href="#!"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setPhotoIndex(idx);
                                        setIsOpen(true);
                                    }}
                                    className="glightbox"
                                    data-gallery="images-gallery"
                                >
                                    <img src={img.src || "/placeholder.svg"} alt={img.alt} className="img-fluid" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Lightbox for image viewing */}
                {isOpen && (
                    <Lightbox
                        open={isOpen}
                        close={() => setIsOpen(false)}
                        slides={galleryImages}
                        index={photoIndex}
                        on={{
                            view: ({ index }) => setPhotoIndex(index),
                        }}
                    />
                )}
            </div>
        </section>
    );
}
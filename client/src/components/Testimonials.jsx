import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/pagination"
import "bootstrap-icons/font/bootstrap-icons.css"
import "../main.css"

import img1 from '../assets/img/testimonials/testimonials-1.jpg'
import img2 from '../assets/img/testimonials/testimonials-2.jpg'
import img3 from '../assets/img/testimonials/testimonials-3.jpg'
import img4 from '../assets/img/testimonials/testimonials-4.jpg'

const testimonials = [
    {
        name: "Ahmed Hassan",
        role: "Regular Customer",
        text: "The best fatayer in Den Haag! Fresh ingredients, authentic taste, and excellent service. I order from Fatayer Time every week.",
        image: img1,
        stars: 5,
    },
    {
        name: "Sara Wilsson",
        role: "Food Blogger",
        text: "Fatayer Time brings authentic Middle Eastern flavors to the Netherlands. Their spinach fatayer is absolutely delicious!",
        image: img2,
        stars: 5,
    },
    {
        name: "Mohammed Ali",
        role: "Local Resident",
        text: "Amazing food quality and fast delivery. The cheese fatayer reminds me of home. Highly recommended!",
        image: img3,
        stars: 5,
    },
    {
        name: "Lisa van der Berg",
        role: "Office Manager",
        text: "Perfect for office catering! Everyone loved the variety of fatayers. Great service and reasonable prices.",
        image: img4,
        stars: 5,
    },
]

export default function Testimonials() {
    return (
        <section id="testimonials" className="testimonials section">
            {/* Section Title */}
            <div className="container section-title" data-aos="fade-up">
                <h2>Testimonials</h2>
                <p>What they are saying about us</p>
            </div>

            <div className="container" data-aos="fade-up" data-aos-delay="100">
                <Swiper
                    modules={[Pagination, Autoplay]}
                    loop={true}
                    speed={600}
                    autoplay={{ delay: 5000, disableOnInteraction: false }}
                    slidesPerView="auto"
                    pagination={{ el: ".swiper-pagination", type: "bullets", clickable: true }}
                    breakpoints={{
                        320: { slidesPerView: 1, spaceBetween: 40 },
                        1200: { slidesPerView: 3, spaceBetween: 20 },
                    }}
                    className="init-swiper"
                >
                    {testimonials.map((testimonial, idx) => (
                        <SwiperSlide key={idx}>
                            <div className="testimonial-item">
                                <p>
                                    <i className="bi bi-quote quote-icon-left"></i>
                                    <span>{testimonial.text}</span>
                                    <i className="bi bi-quote quote-icon-right"></i>
                                </p>
                                <img src={testimonial.image || "/placeholder.svg"} className="testimonial-img" alt={testimonial.name} />
                                <h3>{testimonial.name}</h3>
                                <h4>{testimonial.role}</h4>
                            </div>
                        </SwiperSlide>
                    ))}
                    <div className="swiper-pagination"></div>
                </Swiper>
            </div>
        </section>
    )
}

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
        name: "A Merii",
        role: "Regular Customer",
        text: "Very delicious food! Excellent hospitality and service. We felt at home. I didn’t expect to find such a place in the Netherlands! It was a very pleasant surprise. Everything we tried was delicious especially the Toshka! Thank you Abou Omar for this pleasant experience",
        image: img1,
        stars: 5,
    },
    {
        name: "Yasmin",
        role: "Food Blogger",
        text: "The best so far in the Netherlands that tastes like home! I tried their spinach that is just perfect, the white cheese, the green olives and muhammara with cheese. All were delicious. I went again and tried pastarmy and mayo and both were recommended",
        image: img2,
        stars: 5,
    },
    {
        name: "Noor Alqaisi",
        role: "Local Resident",
        text: "Fatayer Time is a hidden gem for anyone who loves delicious Middle Eastern pastries. Their fatayer selection is outstanding, with options like cheese, beef, thyme, and mortadella—each one fresh, flavorful, and perfectly baked. The atmosphere is calm and relaxing, making it a great spot to enjoy a meal. The staff is warm and welcoming, and the prices are very reasonable for the quality. Highly recommend for anyone craving authentic flavors in a quiet, friendly setting!",
        image: img3,
        stars: 5,
    },
    {
        name: "christy foster",
        role: "Regular Customer",
        text: "Super lekker eten voor een geweldige prijs! Soort mini pizzas in veel verschillende smaken! En gratis thee, ontzettend gast vrije eigenaren. Een aanrader voor exotische lunch en genieten.",
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

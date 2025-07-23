import "../../main.css"

function MenuHero() {
    return (
        <section id="hero" className="hero section dark-background menu-hero">
            <img src="/src/assets/img/banner2.png?height=600&width=1200" alt="Fatayer Time Menu" data-aos="fade-in" />

            <div className="container">
                <div className="row">
                    <div className="col-lg-8 d-flex flex-column align-items-center align-items-lg-start">
                        <h2 data-aos="fade-up" data-aos-delay="100" className="hero-title">
                            Onze <span>Specialiteiten</span>
                        </h2>
                        <p data-aos="fade-up" data-aos-delay="200" className="lead">
                            Ontdek onze authentieke Syrische Fatayer, baklava, en meer. Alles dagelijks vers gemaakt!
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default MenuHero

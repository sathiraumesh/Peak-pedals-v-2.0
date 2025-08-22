import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { MapPin, Clock, Users, Star, Leaf, Camera, Mountain, Coffee, ChevronLeft, ChevronRight } from 'lucide-react';

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Animation on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Auto-scroll carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, []);

  const heroSlides = [
    {
      id: 1,
      image: "/assets/images/cover_images/home1.JPG",
      mainHeading: "UNFORGETTABLE E-BIKE ADVENTURES",
      subHeading: "in Sri Lanka's Highlands",
      subtitle: "Scenic Trails - Hidden Gems - Picnic-Style Experiences",
      buttonText: "Book a Picnic",
      buttonLink: "/tours"
    },
    {
      id: 2,
      image: "/assets/images/cover_images/home2.jpg",
      mainHeading: "DISCOVER FANTASTIC PLACES",
      subHeading: "Experience the Best of Hill Country",
      subtitle: "We offer a variety of services and options",
      buttonText: "Read More",
      buttonLink: "/about"
    },
    {
      id: 3,
      image: "/assets/images/cover_images/home3.jpg",
      mainHeading: "ENJOY A LOVELY TOUR",
      subHeading: "Through Breathtaking Landscapes",
      subtitle: "Scenic Trails - Hidden Gems - Picnic-Style Experiences",
      buttonText: "Explore",
      buttonLink: "/tours"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const features = [
    {
      icon: <Coffee className="feature-icon-svg" />,
      title: "Unforgettable Picnic Tours",
      description: "Savor a thoughtfully prepared picnic lunch on your e-bike journey. Pause at stunning hilltop spots for a meal with a view — a dreamy experience you've never had or even imagined."
    },
    {
      icon: <Leaf className="feature-icon-svg" />,
      title: "Eco-Friendly Exploration",
      description: "Glide through Sri Lanka's lush hill country on our zero-emission electric bikes — a greener way to travel and connect with nature."
    },
    {
      icon: <Mountain className="feature-icon-svg" />,
      title: "Scenic Mountain Trails",
      description: "Ride along handpicked mountain paths that lead you to panoramic viewpoints, hidden waterfalls, and serene tea landscapes."
    },
    {
      icon: <Camera className="feature-icon-svg" />,
      title: "Authentic Tea Plantation Visits",
      description: "Step into the world of Ceylon tea with guided tours of live tea estates and factories. Learn the craft, taste the freshness, and witness local traditions."
    }
  ];

  const picnics = [
    {
      id: 1,
      name: "Idalgashinna",
      duration: "1 day",
      difficulty: "Easy",
      price: "$100",
      image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      rating: 5,
      reviews: 89,
      description: "Ride through misty forests and mountain ridges on an unforgettable eco-bike journey to scenic Idalgashinna.",
      highlights: ["Mountain railway views", "Scenic picnic spot", "Tea plantation trails", "Historic railway bridge"]
    },
    {
      id: 2,
      name: "Bambaragala Pathana",
      duration: "1 day",
      difficulty: "Moderate",
      price: "$100",
      image: "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      rating: 5,
      reviews: 124,
      description: "Pedal through grassy plains and wide-open skies — Bambaragala Pathana offers raw beauty and peaceful escapes.",
      highlights: ["Grassy plains", "Open sky views", "Peaceful landscapes", "Photography spots"]
    },
    {
      id: 3,
      name: "Lipton's Seat",
      duration: "1 day",
      difficulty: "Easy",
      price: "$100",
      image: "https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
      rating: 5,
      reviews: 156,
      description: "Cycle the legendary trail Sir Lipton once walked — now with pedal-assist ease and panoramic tea estate views.",
      highlights: ["360° mountain views", "Tea estate picnic", "Historic significance", "Panoramic views"]
    }
  ];

  const testimonials = [
    {
      name: "ride2wheelsadv",
      date: "02 January 2025",
      rating: 5,
      text: "I love that Peak Pedals is all about sustainable travel. The e-bike was a game changer, and the fresh local lunch was such a nice touch. Highly recommend for anyone visiting Ella!",
      image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      name: "Samia12",
      date: "October 2024",
      rating: 5,
      text: "From eco-friendly bikes to knowledgeable guides, Peak Pedals made our tour the highlight of our trip.",
      image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    },
    {
      name: "Prabhath",
      date: "12 February 2025",
      rating: 5,
      text: "Cycling up to Lipton's Seat with Peak Pedals was the highlight of my Sri Lanka trip. The views were unreal, the tea fields magical, and the e-bike made the climb smooth and fun.",
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop"
    }
  ];

  return (
    <div>
      {/* Hero Carousel Section */}
      <section className="hero-carousel">
        <div className="carousel-container">
          {heroSlides.map((slide, index) => (
            <div
              key={slide.id}
              className={`carousel-slide ${index === currentSlide ? 'active' : ''}`}
              style={{
                backgroundImage: `url(${slide.image})`
              }}
            >
              <div className="hero-content">
                <h1 className="carousel-main-heading fade-in">{slide.mainHeading}</h1>
                <h2 className="carousel-sub-heading fade-in">{slide.subHeading}</h2>
                <p className="carousel-subtitle fade-in">{slide.subtitle}</p>
                <div className="cta-buttons fade-in">
                  <Link to={slide.buttonLink} className="btn btn-primary btn-large">
                    {slide.buttonText}
                  </Link>
                </div>
              </div>
            </div>
          ))}
          
          {/* Navigation Arrows */}
          <button className="carousel-nav carousel-prev" onClick={prevSlide}>
            <ChevronLeft size={24} />
          </button>
          <button className="carousel-nav carousel-next" onClick={nextSlide}>
            <ChevronRight size={24} />
          </button>
          
          {/* Dots Indicator */}
          <div className="carousel-dots">
            {heroSlides.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentSlide ? 'active' : ''}`}
                onClick={() => goToSlide(index)}
              />
            ))}
          </div>
        </div>
        
        {/* Stats Section */}
        <div className="hero-stats fade-in">
          <div className="stat">
            <span className="stat-number">500+</span>
            <span className="stat-label">Happy Travelers</span>
          </div>
          <div className="stat">
            <span className="stat-number">15+</span>
            <span className="stat-label">Scenic Routes</span>
          </div>
          <div className="stat">
            <span className="stat-number">5★</span>
            <span className="stat-label">Average Rating</span>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section features">
        <div className="container">
          <div className="section-title">
            <h2 className="fade-in">Why Choose Peak Pedals?</h2>
            <p className="fade-in">
              A mindful way to explore nature, heritage, and the heart of the hills.
            </p>
          </div>
          
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card fade-in">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* E-Bike Picnics Section */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2 className="fade-in">Our All Inclusive E Bike Picnics</h2>
            <p className="fade-in">
              From misty mountains to lush tea estates, explore the highlands like never before on our guided picnics.
            </p>
          </div>
          
          <div className="tours-grid">
            {picnics.map((picnic, index) => (
              <div key={picnic.id} className="tour-card fade-in">
                <div className="tour-image">
                  <img src={picnic.image} alt={picnic.name} />
                  <div className="tour-badge">{picnic.difficulty}</div>
                </div>
                
                <div className="tour-info">
                  <h3>{picnic.name}</h3>
                  <p className="tour-description">{picnic.description}</p>
                  
                  <div className="tour-meta">
                    <div className="tour-rating">
                      <div className="stars">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={16}
                            className={`star ${i < picnic.rating ? 'filled' : ''}`}
                          />
                        ))}
                      </div>
                      <span className="rating-text">({picnic.reviews} reviews)</span>
                    </div>
                    
                    <div className="tour-details">
                      <div className="detail">
                        <Clock size={16} />
                        <span>{picnic.duration}</span>
                      </div>
                      <div className="detail">
                        <Users size={16} />
                        <span>Max 8 people</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="tour-highlights">
                    {picnic.highlights.map((highlight, i) => (
                      <span key={i} className="highlight-tag">
                        {highlight}
                      </span>
                    ))}
                  </div>
                  
                  <div className="tour-footer">
                    <div className="tour-price">
                      <span className="price">{picnic.price}</span>
                      <span className="price-label">per person</span>
                    </div>
                    <Link to={`/tour/${picnic.id}`} className="btn btn-primary">
                      Book Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="section-cta">
            <Link to="/tours" className="btn btn-primary btn-large">
              View All Escapes
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="section testimonials">
        <div className="container">
          <div className="section-title">
            <h2 className="fade-in">What Our Travelers Say</h2>
            <p className="fade-in">
              Real experiences from adventurers who've explored the hill country with us
            </p>
          </div>
          
          <div className="testimonials-grid">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="testimonial-card fade-in">
                <div className="testimonial-rating">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16}
                      className="star filled"
                    />
                  ))}
                </div>
                <p className="testimonial-text">"{testimonial.text}"</p>
                <div className="testimonial-author">
                  <img src={testimonial.image} alt={testimonial.name} />
                  <div>
                    <h4>{testimonial.name}</h4>
                    <span>{testimonial.date}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content fade-in">
            <h2>Ready for Your Hill Country Escape?</h2>
            <p>
              Join us for an unforgettable journey through Sri Lanka's most beautiful landscapes. 
              Book your e-bike tour today and create memories that will last a lifetime.
            </p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary btn-large">
                Book Your Escape
              </Link>
              <Link to="/tours" className="btn btn-secondary btn-large">
                View All Escapes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
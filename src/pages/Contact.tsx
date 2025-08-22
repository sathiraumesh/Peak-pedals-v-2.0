import React, { useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, MessageCircle } from 'lucide-react';

const Contact: React.FC = () => {
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

  const contactInfo = [
    {
      icon: <MapPin className="contact-icon" />,
      title: "Visit Us",
      details: [
        "Bandarawela Town Center",
        "Badulla District, Uva Province",
        "Sri Lanka"
      ]
    },
    {
      icon: <Phone className="contact-icon" />,
      title: "Call Us",
      details: [
        "+94 77 123 4567",
        "+94 71 987 6543",
        "WhatsApp Available"
      ]
    },
    {
      icon: <Mail className="contact-icon" />,
      title: "Email Us",
      details: [
        "info@hillcountryebikes.lk",
        "bookings@hillcountryebikes.lk",
        "support@hillcountryebikes.lk"
      ]
    },
    {
      icon: <Clock className="contact-icon" />,
      title: "Operating Hours",
      details: [
        "Daily: 6:00 AM - 7:00 PM",
        "Tours start: 6:30 AM & 2:00 PM",
        "Booking office: 8:00 AM - 6:00 PM"
      ]
    }
  ];

  return (
    <div>
      <div className="cover-image" style={{ width: '100%', height: '250px', background: `url('/assets/images/cover_images/contact.jpg') center/cover no-repeat` }} />
      {/* Hero Section */}
      <section className="hero" style={{ height: '50vh' }}>
        <div className="hero-content">
          <h1 className="fade-in">Contact Us</h1>
          <p className="fade-in">
            Ready for your hill country adventure? Get in touch and let's plan 
            your perfect e-bike tour experience
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="section features">
        <div className="container">
          <div className="contact-info-grid">
            {contactInfo.map((info, index) => (
              <div key={index} className="contact-info-card fade-in">
                <div className="contact-icon-container">
                  {info.icon}
                </div>
                <h3>{info.title}</h3>
                <div className="contact-details">
                  {info.details.map((detail, i) => (
                    <p key={i}>{detail}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="section">
        <div className="container">
          <div className="contact-content">
            {/* Contact Information */}
            <div className="contact-additional-info slide-in-left">
              <h2>Why Book With Us?</h2>
              
              <div className="info-card">
                <h3>🌟 Personalized Service</h3>
                <p>Every tour is tailored to your interests, fitness level, and preferences. We ensure you have the perfect hill country experience.</p>
              </div>
              
              <div className="info-card">
                <h3>🚴‍♂️ Premium Equipment</h3>
                <p>High-quality electric bikes, safety gear, and professional maintenance ensure a safe and comfortable ride.</p>
              </div>
              
              <div className="info-card">
                <h3>🏔️ Local Expertise</h3>
                <p>Our guides are born and raised in the hill country, offering insider knowledge and authentic experiences.</p>
              </div>
              
              <div className="info-card">
                <h3>🌱 Eco-Friendly</h3>
                <p>Sustainable tourism practices that protect the environment and support local communities.</p>
              </div>
              
              <div className="info-card">
                <h3>📞 24/7 Support</h3>
                <p>Emergency support during tours and responsive customer service for all your needs.</p>
              </div>
              
              <div className="whatsapp-contact">
                <MessageCircle className="whatsapp-icon" />
                <div>
                  <h4>Quick Response via WhatsApp</h4>
                  <p>For immediate assistance, message us on WhatsApp at <strong>+94 77 123 4567</strong></p>
                </div>
              </div>
            </div>

            {/* General Contact Information */}
            <div className="contact-form-section slide-in-right">
              <h2>Get In Touch</h2>
              <p>We'd love to hear from you! Whether you have questions about our tours, need help planning your adventure, or want to make a booking, we're here to help.</p>
              
              <div className="info-card">
                <h3>📧 General Inquiries</h3>
                <p>For general questions about our services, availability, or the hill country area, email us at <strong>info@hillcountryebikes.lk</strong></p>
              </div>
              
              <div className="info-card">
                <h3>📅 Booking & Reservations</h3>
                <p>Ready to book your adventure? Contact our booking team at <strong>bookings@hillcountryebikes.lk</strong> or call <strong>+94 77 123 4567</strong></p>
              </div>
              
              <div className="info-card">
                <h3>🆘 Support & Assistance</h3>
                <p>Need help during your tour or have concerns? Our support team is available at <strong>support@hillcountryebikes.lk</strong></p>
              </div>
              
              <div className="info-card">
                <h3>💬 Live Chat</h3>
                <p>For instant responses, use our WhatsApp chat service. We typically respond within minutes during business hours.</p>
              </div>
              
              <div className="info-card">
                <h3>🏢 Office Visits</h3>
                <p>Visit our office in Bandarawela town center. We're open daily from 8:00 AM to 6:00 PM. Walk-ins welcome!</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section features">
        <div className="container">
          <div className="section-title">
            <h2 className="fade-in">Find Us in Bandarawela</h2>
            <p className="fade-in">Located in the heart of Sri Lanka's hill country</p>
          </div>
          
          <div className="map-container fade-in">
            <div className="map-placeholder">
              <MapPin size={48} />
              <h3>Bandarawela, Sri Lanka</h3>
              <p>Hill Country E-Bikes Base</p>
              <p>Coordinates: 6.8329° N, 80.9848° E</p>
            </div>
          </div>
          
          <div className="location-info">
            <div className="location-card fade-in">
              <h3>Getting to Bandarawela</h3>
              <ul>
                <li><strong>By Train:</strong> Take the scenic hill country train from Colombo (5-6 hours)</li>
                <li><strong>By Car:</strong> Drive via A4 highway through Ratnapura (3.5-4 hours from Colombo)</li>
                <li><strong>By Bus:</strong> Regular bus services from major cities</li>
                <li><strong>Nearest Airport:</strong> Bandaranaike International Airport (4 hours drive)</li>
              </ul>
            </div>
            
            <div className="location-card fade-in">
              <h3>Accommodation Nearby</h3>
              <ul>
                <li>Bandarawela Hotel (5 minutes walk)</li>
                <li>Orient Hotel (3 minutes walk)</li>
                <li>Hill Country Resort (10 minutes walk)</li>
                <li>Various guesthouses and homestays</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
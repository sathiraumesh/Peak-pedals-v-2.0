import React from 'react';
import { Link } from 'react-router-dom';
import { Mountain, Phone, Mail, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
	return (
		<footer className="footer">
			<div className="container">
				<div className="footer-content">
					{/* Company Info */}
					<div className="footer-section">
						<div className="footer-logo">
							<Mountain className="logo-icon" />
							<h3>Peak Pedals</h3>
						</div>
						<p>
							Experience the breathtaking beauty of Sri Lanka's hill country through our
							eco-friendly electric bike tours and scenic picnic adventures around Haputale.
						</p>
						<div className="social-links">
							<a href="#" aria-label="Facebook">
								<Facebook size={20} />
							</a>
							<a href="#" aria-label="Instagram">
								<Instagram size={20} />
							</a>
							<a href="#" aria-label="Twitter">
								<Twitter size={20} />
							</a>
						</div>
					</div>

					{/* Quick Links */}
					<div className="footer-section">
						<h3>Quick Links</h3>
						<div className="footer-links">
							<Link to="/">Home</Link>
							<Link to="/tours">Our Escapes</Link>
							<Link to="/about">About Us</Link>
							<Link to="/faq">FAQ</Link>
							<Link to="/contact">Contact</Link>
						</div>
					</div>

					{/* Tours */}
					<div className="footer-section">
						<h3>Popular Escapes</h3>
						<div className="footer-links">
							<a href="#idalgashinna">Idalgashinna</a>
							<a href="#bambaragala">Bambaragala Pathana</a>
							<a href="#liptons-seat">Lipton's Seat</a>
							<a href="#tea-plantation">Tea Plantation Adventure</a>
							<a href="#picnic-tour">Scenic Picnic Tours</a>
						</div>
					</div>

					{/* Contact Info */}
					<div className="footer-section">
						<h3>Contact Info</h3>
						<div className="contact-info">
							<div className="contact-item">
								<MapPin size={16} />
								<span>Haputale, Badulla District, Sri Lanka</span>
							</div>
							<div className="contact-item">
								<Phone size={16} />
								<span>+94 77 123 4567</span>
							</div>
							<div className="contact-item">
								<Mail size={16} />
								<span>info@peakpedals.lk</span>
							</div>
						</div>
					</div>
				</div>

				<div className="footer-bottom">
					<p>&copy; 2024 Peak Pedals. All rights reserved. | Explore Sri Lanka's Hill Country Responsibly</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
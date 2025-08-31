import React, { useEffect } from 'react';
import { Award, Users, Leaf, Heart, Mountain, Shield } from 'lucide-react';

const About: React.FC = () => {
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

	const values = [
		{
			icon: <Leaf className="value-icon" />,
			title: "Sustainability",
			description: "We're committed to eco-friendly tourism that preserves Sri Lanka's natural beauty for future generations."
		},
		{
			icon: <Heart className="value-icon" />,
			title: "Authentic Experiences",
			description: "We create genuine connections between travelers and local communities, sharing real Sri Lankan culture."
		},
		{
			icon: <Shield className="value-icon" />,
			title: "Safety First",
			description: "Your safety is our priority. All tours include professional guides, safety equipment, and emergency support."
		},
		{
			icon: <Mountain className="value-icon" />,
			title: "Local Expertise",
			description: "Our guides are born and raised in the hill country, offering insider knowledge and hidden gems."
		}
	];

	const team = [
		{
			name: "Kasun Perera",
			position: "Founder & Lead Guide",
			image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
			bio: "Born in Haputale, Kasun has been exploring these mountains for over 20 years. His passion for sustainable tourism led him to start Hill Country E-Bikes.",
			experience: "20+ years"
		},
		{
			name: "Nimali Fernando",
			position: "Cultural Experience Coordinator",
			image: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
			bio: "Nimali specializes in connecting visitors with local communities and authentic cultural experiences throughout the hill country.",
			experience: "15+ years"
		},
		{
			name: "Rohan Silva",
			position: "Adventure Tour Specialist",
			image: "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop",
			bio: "A certified mountain guide and e-bike technician, Rohan ensures all our equipment is in perfect condition and our routes are safe.",
			experience: "12+ years"
		}
	];

	const stats = [
		{ number: "500+", label: "Happy Travelers" },
		{ number: "15+", label: "Scenic Routes" },
		{ number: "5", label: "Years Experience" },
		{ number: "100%", label: "Safety Record" }
	];

	return (
		<div style={{ paddingTop: '80px' }}>
			{/* Hero Section */}
			<section className="hero" style={{ height: '60vh' }}>
				<div className="hero-content">
					<h1 className="fade-in">About Hill Country E-Bikes</h1>
					<p className="fade-in">
						Passionate about sharing the beauty of Sri Lanka's hill country through
						sustainable and authentic e-bike adventures
					</p>
				</div>
			</section>

			{/* Stats Section */}
			<section className="section features" style={{ padding: '60px 0' }}>
				<div className="container">
					<div className="stats-grid">
						{stats.map((stat, index) => (
							<div key={index} className="stat-card fade-in">
								<div className="stat-number">{stat.number}</div>
								<div className="stat-label">{stat.label}</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Story Section */}
			<section className="section">
				<div className="container">
					<div className="about-content">
						<div className="about-text slide-in-left">
							<h2>Our Story</h2>
							<p>
								Hill Country E-Bikes was born from a deep love for Sri Lanka's breathtaking
								hill country and a desire to share its beauty with the world. Founded in 2019
								by local guide Kasun Perera, our company started with a simple vision: to offer
								sustainable, authentic, and unforgettable adventures through the misty mountains
								and tea plantations around Haputale.
							</p>
							<p>
								Growing up in these hills, Kasun witnessed the incredible natural beauty and
								rich cultural heritage that makes this region so special. He also saw the
								potential for tourism to support local communities while preserving the
								environment. Electric bikes provided the perfect solution – allowing visitors
								to explore further and higher with minimal environmental impact.
							</p>
							<p>
								Today, we're proud to be one of Sri Lanka's leading eco-tourism operators,
								offering carefully crafted experiences that showcase the best of hill country
								culture, nature, and hospitality. Every tour we offer is designed to create
								lasting memories while supporting local communities and protecting the
								environment we all love.
							</p>
						</div>
						<div className="about-image slide-in-right">
							<img
								src="https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
								alt="Our Story"
							/>
						</div>
					</div>
				</div>
			</section>

			{/* Values Section */}
			<section className="section features">
				<div className="container">
					<div className="section-title">
						<h2 className="fade-in">Our Values</h2>
						<p className="fade-in">
							These core principles guide everything we do and shape our commitment to travelers and communities
						</p>
					</div>

					<div className="values-grid">
						{values.map((value, index) => (
							<div key={index} className="value-card fade-in">
								<div className="value-icon-container">
									{value.icon}
								</div>
								<h3>{value.title}</h3>
								<p>{value.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Team Section */}
			<section className="section">
				<div className="container">
					<div className="section-title">
						<h2 className="fade-in">Meet Our Team</h2>
						<p className="fade-in">
							Local experts passionate about sharing the beauty and culture of Sri Lanka's hill country
						</p>
					</div>

					<div className="team-grid">
						{team.map((member, index) => (
							<div key={index} className="team-card fade-in">
								<div className="team-image">
									<img
										src={member.image}
										alt={member.name}
									/>
									<div className="experience-badge">{member.experience}</div>
								</div>
								<div className="team-info">
									<h3>{member.name}</h3>
									<p className="team-position">{member.position}</p>
									<p className="team-bio">{member.bio}</p>
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Mission Section */}
			<section className="section cta-section">
				<div className="container">
					<div className="mission-content fade-in">
						<h2>Our Mission</h2>
						<p>
							To provide authentic, sustainable, and transformative travel experiences that
							connect visitors with the natural beauty and rich culture of Sri Lanka's hill
							country, while supporting local communities and preserving the environment
							for future generations.
						</p>
						<p>
							We believe that travel should be more than just sightseeing – it should be
							about creating meaningful connections, understanding different cultures, and
							leaving a positive impact on the places we visit.
						</p>
					</div>
				</div>
			</section>

			{/* Certifications Section */}
			<section className="section features">
				<div className="container">
					<div className="section-title">
						<h2 className="fade-in">Certifications & Partnerships</h2>
					</div>

					<div className="certifications-grid">
						<div className="cert-card fade-in">
							<Award className="cert-icon" />
							<h3>Sri Lanka Tourism Board</h3>
							<p>Licensed tour operator</p>
						</div>
						<div className="cert-card fade-in">
							<Shield className="cert-icon" />
							<h3>Safety Certified</h3>
							<p>First aid & emergency response trained</p>
						</div>
						<div className="cert-card fade-in">
							<Leaf className="cert-icon" />
							<h3>Eco Tourism Certified</h3>
							<p>Sustainable tourism practices</p>
						</div>
						<div className="cert-card fade-in">
							<Users className="cert-icon" />
							<h3>Community Partner</h3>
							<p>Supporting local communities</p>
						</div>
					</div>
				</div>
			</section>
		</div>
	);
};

export default About;
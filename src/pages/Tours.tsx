import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Camera, Mountain } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPersonBiking } from '@fortawesome/free-solid-svg-icons';

interface Tour {
	id: string;
	name: string;
	category: string;
	duration: string;
	difficulty: string;
	price: string;
	originalPrice?: string;
	image: string;
	gallery?: string;
	rating?: number;
	reviews?: number;
	maxPeople?: number;
	location: string;
	description: string;
	highlights?: string;
	includes?: string;
	itinerary?: string;
	whatToBring?: string;
	difficulty_details?: string;
}
const Tours: React.FC = () => {
	const [shortTours, setShortTours] = useState<Tour[]>([]);
	const [picnicTours, setPicnicTours] = useState<Tour[]>([]);
  const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Animation on scroll
		const observerOptions = {
			threshold: 0.1,
			rootMargin: '0px 0px -50px 0px'
		};

		fetch('https://script.google.com/macros/s/AKfycbw6k_STSNcKQSsNFEe38OjV_rI72PfTs6cECGbdNwV1sXCDTJJqZ31dxi3x5xtkxe4T/exec')
			.then(res => res.json())
			.then(data => {
				console.log("Tours:", data);

				data.forEach((tour: any, i: number) => {
					console.log(`Tour ${i}:`, {
						id: tour.id,
						name: tour.name,
						category: tour.category
					});
				});
				const short = data.filter((tour: any) => tour.category === "short");
				const picnic = data.filter((tour: any) => tour.category === "picnic" || tour.category === "picnics");


				console.log("Short tours (filtered):", short);
				console.log("Picnic tours (filtered):", picnic);

				setShortTours(short);
				setPicnicTours(picnic);
				 setLoading(false);
   
			})
			.catch(err => {
				console.error(err);
setLoading(false);


			}
		
		
		);
			
	}, []);

	useEffect(() => {
		// runs after cards render
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
	}, [shortTours.length, picnicTours.length]);


	const TourList: React.FC<{ tours: Tour[] }> = ({ tours }) => (
		<div>
			{tours.map((tour) => (
				<div key={tour.id}>
					<h3>{tour.name}</h3>
					<p>{tour.description}</p>
				</div>
			))}
		</div>
	);
	return (
  <>
    {loading ? (
      // Full-page spinner
      <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        position: "fixed",
        top: 0,
        left: 0,
        backgroundColor: "#fff", // optional: can use rgba(0,0,0,0.1) for overlay effect
        zIndex: 9999,
      }}>
	<FontAwesomeIcon icon={faPersonBiking} size="4x" className="loading-icon"/>
        {/* <FontAwesomeIcon icon={faSpinner} spin size="4x" /> */}
      </div>
    ) : (




		
		<>

			<div
				className="cover-image"
				style={{
					width: '100%',
					height: '100vh',
					backgroundImage: `url('/assets/images/cover_images/tours.jpeg')`,
					backgroundPosition: 'center',
					backgroundSize: 'cover',
					backgroundRepeat: 'no-repeat',
					position: 'relative',
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
					
				}}
			>
				<div style={{
					background: 'rgba(0,0,0,0.4)',
					color: 'white',
					padding: '2rem 3rem',
					borderRadius: '1rem',
					textAlign: 'center',
					maxWidth: '90%',
					fontSize: '1.5rem',
					fontWeight: 500
				}}>
					Choose from our carefully curated collection of electric bike adventures<br />
					through Sri Lanka's stunning hill country
				</div>
			</div>
		
   

			{/* E-bike ytour Section new */}

			<section className="section">
				<div className="container">
					<div className="section-title">
						<h2 className="fade-in">Short Escapes</h2>
						<p className="fade-in">
							Quick adventures for those short on time. Explore our short
							escapes!
						</p>
					</div>
					<div className="tours-grid">
					
						{
// 						loading ? (
//   <div style={{ display: "flex", justifyContent: "center", marginTop: "50px" }}>
//         <FontAwesomeIcon icon={faSpinner} spin size="3x" />
//       </div>
// ) :
						
						
					
						(
							shortTours.map((tour) => (
								<Link
									key={tour.id}
									to={`/tour/${tour.id}`}
									style={{ textDecoration: "none", color: "inherit" }}
								>
									<div className="tour-card fade-in">
										<div className="tour-image">
											<img src={tour.image || "https://via.placeholder.com/300"} alt={tour.name} />
											<div className="tour-badge">{tour.difficulty}</div>
										</div>
										<div className="tour-info">
											<h3>{tour.name}</h3>
											<p className="tour-description">{tour.description}</p>
										</div>
									</div>
								</Link>
							)))}
					</div>
				</div>
			</section>

			{/* E-bike Picnics Section */}
			<section className="section">
				<div className="container">
					<div className="section-title">
						<h2 className="fade-in">All Inclusive E-bike Picnics</h2>
						<p className="fade-in">
							Enjoy a gourmet picnic and scenic ride. Discover our exclusive
							e-bike picnic tours!
						</p>
					</div>
					<div className="tours-grid">
						{
							picnicTours.length === 0 ? (
								<p>No picnics found</p>
							) : (
								picnicTours.map((tour) => (
									<Link
										key={tour.id}
										to={`/tour/${tour.id}`}
										style={{ textDecoration: "none", color: "inherit" }}
									>
										<div className="tour-card fade-in">
											<div className="tour-image">
												<img src={tour.image || "https://via.placeholder.com/300"} alt={tour.name} />
												<div className="tour-badge">{tour.difficulty}</div>
											</div>
											<div className="tour-info">
												<h3>{tour.name}</h3>
												<p className="tour-description">{tour.description}</p>
											</div>
										</div>
									</Link>
								)))}
					</div>
				</div>
			</section>

			{/* Booking Info Section */}
			<section className="section features">
				<div className="container">
					<div className="section-title">
						<h2 className="fade-in">Booking Information</h2>
					</div>

					<div className="booking-info-grid">
						<div className="info-card fade-in">
							<Leaf className="info-icon" />
							<h3>What's Included</h3>
							<ul>
								<li>Premium electric bike rental</li>
								<li>Safety helmet and protective gear</li>
								<li>Professional English-speaking guide</li>
								<li>Refreshments and meals as specified</li>
								<li>Photography assistance</li>
								<li>First aid kit and emergency support</li>
							</ul>
						</div>

						<div className="info-card fade-in">
							<Mountain className="info-icon" />
							<h3>What to Bring</h3>
							<ul>
								<li>Comfortable clothing and closed shoes</li>
								<li>Sunscreen and sunglasses</li>
								<li>Camera or smartphone</li>
								<li>Water bottle (we provide refills)</li>
								<li>Light jacket for early morning tours</li>
								<li>Personal medications if needed</li>
							</ul>
						</div>

						<div className="info-card fade-in">
							<Camera className="info-icon" />
							<h3>Booking Policy</h3>
							<ul>
								<li>Advance booking recommended</li>
								<li>Minimum age: 12 years</li>
								<li>Maximum weight limit: 120kg</li>
								<li>Free cancellation 24 hours before</li>
								<li>Weather-dependent tours</li>
								<li>Group discounts available</li>
							</ul>
						</div>
					</div>
				</div>
			</section>
			</>
			  )}
		</>
	);
};

export default Tours;
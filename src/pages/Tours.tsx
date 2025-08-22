import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Camera, Mountain } from 'lucide-react';
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

        // setShortTours(data.filter((tour: any) => tour.category === "short"));
        // setPicnicTours(data.filter((tour: any) => tour.category === "picnics"));
 
      })
    .catch(err => console.error(err));

    return () => observer.disconnect();
  }, []);


  // All inclusive e-bike picnics (3 tours)
  // const picnicTours = [
  //   {
  //     id: 1,
  //     name: "Idalgashinna",
  //     category: "picnics",
  //     difficulty: "easy",
  //     duration: "1 day",
  //     price: "$100",
  //     image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  //     rating: 5,
  //     reviews: 89,
  //     maxPeople: 4,
  //     highlights: ["Mountain railway views", "Scenic picnic spot", "Tea plantation trails", "Historic railway bridge"],
  //     description: "Ride through misty forests and mountain ridges on an unforgettable eco-bike journey to scenic Idalgashinna.",
  //     includes: ["E-bike rental", "Helmet & safety gear", "Professional guide", "Gourmet picnic lunch", "Photography assistance"]
  //   },
  //   {
  //     id: 2,
  //     name: "Bambaragala Pathana",
  //     category: "picnics",
  //     difficulty: "moderate",
  //     duration: "1 day",
  //     price: "$100",
  //     image: "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  //     rating: 5,
  //     reviews: 124,
  //     maxPeople: 4,
  //     highlights: ["Grassy plains", "Open sky views", "Peaceful landscapes", "Photography spots"],
  //     description: "Pedal through grassy plains and wide-open skies — Bambaragala Pathana offers raw beauty and peaceful escapes.",
  //     includes: ["E-bike rental", "Helmet & safety gear", "Professional guide", "Gourmet picnic lunch", "Waterproof bags"]
  //   },
  //   {
  //     id: 3,
  //     name: "Lipton's Seat",
  //     category: "picnics",
  //     difficulty: "easy",
  //     duration: "1 day",
  //     price: "$100",
  //     image: "https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  //     rating: 5,
  //     reviews: 156,
  //     maxPeople: 4,
  //     highlights: ["360° mountain views", "Tea estate picnic", "Historic significance", "Panoramic views"],
  //     description: "Cycle the legendary trail Sir Lipton once walked — now with pedal-assist ease and panoramic tea estate views.",
  //     includes: ["E-bike rental", "Helmet & safety gear", "Professional guide", "Tea tasting", "Factory tour"]
  //   }
  // ];

  // Short escapes (6 tours)
  // const shortTours = [
  //   {
  //     id: 4,
  //     name: "Haputale",
  //     category: "short",
  //     difficulty: "easy",
  //     duration: "2 Hours",
  //     price: "$20",
  //     image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  //     rating: 4,
  //     reviews: 45,
  //     maxPeople: 4,
  //     highlights: ["Town exploration", "Local markets", "Quick adventure"],
  //     description: "A quick exploration of Haputale town and surrounding areas.",
  //     includes: ["E-bike rental", "Helmet", "Guide"]
  //   },
  //   {
  //     id: 5,
  //     name: "Ohiya",
  //     category: "short",
  //     difficulty: "moderate",
  //     duration: "3hr",
  //     price: "$25",
  //     image: "https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  //     rating: 4,
  //     reviews: 32,
  //     maxPeople: 4,
  //     highlights: ["Mountain views", "Fresh air", "Scenic trails"],
  //     description: "Explore the beautiful Ohiya area with stunning mountain vistas.",
  //     includes: ["E-bike rental", "Helmet", "Guide", "Refreshments"]
  //   },
  //   {
  //     id: 6,
  //     name: "Ravana Ella",
  //     category: "short",
  //     difficulty: "easy",
  //     duration: "1hr",
  //     price: "$15",
  //     image: "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  //     rating: 5,
  //     reviews: 67,
  //     maxPeople: 4,
  //     highlights: ["Waterfall views", "Quick escape", "Easy ride"],
  //     description: "A short and sweet ride to the famous Ravana Ella waterfall.",
  //     includes: ["E-bike rental", "Helmet", "Guide"]
  //   },
  //   {
  //     id: 7,
  //     name: "Nildiya Pokuna Ride and Visit",
  //     category: "short",
  //     difficulty: "moderate",
  //     duration: "4hr 35min",
  //     price: "$28",
  //     image: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  //     rating: 4,
  //     reviews: 28,
  //     maxPeople: 4,
  //     highlights: ["Natural pool", "Swimming", "Nature exploration"],
  //     description: "Visit the beautiful Nildiya Pokuna natural pool with swimming opportunities.",
  //     includes: ["E-bike rental", "Helmet", "Guide", "Light snacks"],
  //     isSpecialOffer: true
  //   },
  //   {
  //     id: 8,
  //     name: "Diyaluma Waterfall",
  //     category: "short",
  //     difficulty: "moderate",
  //     duration: "2hr 20min",
  //     price: "$26",
  //     originalPrice: "$30",
  //     image: "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  //     rating: 5,
  //     reviews: 89,
  //     maxPeople: 4,
  //     highlights: ["Tallest waterfall", "Swimming pools", "Adventure"],
  //     description: "Experience Sri Lanka's second tallest waterfall with natural swimming pools.",
  //     includes: ["E-bike rental", "Helmet", "Guide", "Refreshments"],
  //     isSpecialOffer: true
  //   },
  //   {
  //     id: 9,
  //     name: "Tea Factory and Dova Temple",
  //     category: "short",
  //     difficulty: "easy",
  //     duration: "2hr 20min",
  //     price: "$19",
  //     originalPrice: "$23",
  //     image: "https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
  //     rating: 4,
  //     reviews: 54,
  //     maxPeople: 4,
  //     highlights: ["Tea factory tour", "Temple visit", "Cultural experience"],
  //     description: "Combine tea culture with spiritual heritage in this cultural short escape.",
  //     includes: ["E-bike rental", "Helmet", "Guide", "Tea tasting"],
  //     isSpecialOffer: true
  //   }
  // ];
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
       {/* <div>
      <h2>Short Tours</h2>
      <TourList tours={shortTours} />

      <h2>Picnic Tours</h2>
      <TourList tours={picnicTours} />
    </div> */}
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
          justifyContent: 'center'
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
      {/* Filters Section */}
        {/*
      <section className="section features" style={{ padding: '40px 0' }}>
        <div className="container">
          <div className="filters-container">
            <div className="filter-group">
              <label>Tour Type:</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="filter-select"
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            <div className="filter-group">
              <label>Difficulty:</label>
              <select 
                value={selectedDifficulty}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
                className="filter-select"
              >
                {difficulties.map(difficulty => (
                  <option key={difficulty.id} value={difficulty.id}>{difficulty.name}</option>
                ))}
              </select>
            </div>
            <div className="results-count">
              Showing {getDisplayCount()}
            </div>
          </div>
        </div>
      </section>
      */}

      {/* Short Escapes Section */}
      {/* <section className="section">
        <div className="container">
          <div className="section-title">
            <h2 className="fade-in">Short Escapes</h2>
            <p className="fade-in">Quick adventures for those short on time. Explore our 6 short escapes!</p>
          </div>
          <div className="tours-grid">
            {shortTours.map((tour) => (
              <Link key={tour.id} to={`/tour/${tour.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="tour-card fade-in">
                  <div className="tour-image">
                    <img src={tour.image} alt={tour.name} />
                    <div className="tour-badge">{tour.difficulty}</div>
                  </div>
                  <div className="tour-info">
                    <h3>{tour.name}</h3>
                    <p className="tour-description">{tour.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section> */}

      {/* E-bike Picnics Section */}
      {/* <section className="section">
        <div className="container">
          <div className="section-title">
            <h2 className="fade-in">All Inclusive E-bike Picnics</h2>
            <p className="fade-in">Enjoy a gourmet picnic and scenic ride. Discover our 3 exclusive e-bike picnic tours!</p>
          </div>
          <div className="tours-grid">
            {picnicTours.map((tour) => (
              <Link key={tour.id} to={`/tour/${tour.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="tour-card fade-in">
                  <div className="tour-image">
                    <img src={tour.image} alt={tour.name} />
                    <div className="tour-badge">{tour.difficulty}</div>
                  </div>
                  <div className="tour-info">
                    <h3>{tour.name}</h3>
                    <p className="tour-description">{tour.description}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section> */}


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
            {shortTours.length === 0 ? (
    <p>No short tours found</p>
  ) : (
            shortTours.map((tour) => (
              <Link
                key={tour.id}
                to={`/tour/${tour.id}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div className="tour-card fade-in">
                  <div className="tour-image">
                    <img src={tour.image  || "https://via.placeholder.com/300"} alt={tour.name} />
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
                    <img src={tour.image || "https://via.placeholder.com/300" } alt={tour.name} />
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
  );
};

export default Tours;
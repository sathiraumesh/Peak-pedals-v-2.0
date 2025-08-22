import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Clock, Users, Star, MapPin, Calendar, Shield, Camera, 
  Coffee, Leaf, Mountain, ArrowLeft, Check, Phone, Mail, Send 
} from 'lucide-react';

const TourDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    groupSize: '',
    preferredDate: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  // Country data with phone codes
  const countries = [
    { name: 'Sri Lanka', code: 'LK', phone: '+94' },
    { name: 'United States', code: 'US', phone: '+1' },
    { name: 'United Kingdom', code: 'GB', phone: '+44' },
    { name: 'Canada', code: 'CA', phone: '+1' },
    { name: 'Australia', code: 'AU', phone: '+61' },
    { name: 'Germany', code: 'DE', phone: '+49' },
    { name: 'France', code: 'FR', phone: '+33' },
    { name: 'India', code: 'IN', phone: '+91' },
    { name: 'Japan', code: 'JP', phone: '+81' },
    { name: 'China', code: 'CN', phone: '+86' },
    { name: 'Singapore', code: 'SG', phone: '+65' },
    { name: 'Malaysia', code: 'MY', phone: '+60' },
    { name: 'Thailand', code: 'TH', phone: '+66' },
    { name: 'Netherlands', code: 'NL', phone: '+31' },
    { name: 'Italy', code: 'IT', phone: '+39' },
    { name: 'Spain', code: 'ES', phone: '+34' },
    { name: 'Brazil', code: 'BR', phone: '+55' },
    { name: 'South Africa', code: 'ZA', phone: '+27' },
    { name: 'New Zealand', code: 'NZ', phone: '+64' },
    { name: 'Switzerland', code: 'CH', phone: '+41' }
  ];

  useEffect(() => {
    // Scroll to top when component mounts or tour ID changes
    window.scrollTo(0, 0);
    
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
  }, [id]); // Add id as dependency to scroll to top when tour changes

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Auto-populate phone code when country changes
    if (name === 'country') {
      const selectedCountry = countries.find(country => country.name === value);
      if (selectedCountry && !formData.phone.startsWith('+')) {
        setFormData(prev => ({
          ...prev,
          phone: selectedCountry.phone + ' '
        }));
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Calculate pricing info for submission
      const pricingInfo = formData.groupSize ? calculateTotalCost(tour?.price || '$0', formData.groupSize) : null;
      
      // Prepare data for Google Sheets
      const submissionData = {
        timestamp: new Date().toISOString(),
        name: formData.name,
        email: formData.email,
        phone: formData.phone || 'Not provided',
        country: formData.country || 'Not specified',
        tourName: tour?.name || 'Unknown Tour',
        groupSize: formData.groupSize || 'Not specified',
        preferredDate: formData.preferredDate || 'Not specified',
        message: formData.message || 'No additional message',
        totalCost: pricingInfo ? `$${pricingInfo.discountedTotal.toFixed(0)}` : 'Not calculated',
        discount: pricingInfo && pricingInfo.discount > 0 ? `${pricingInfo.discount}%` : 'No discount',
        pricePerPerson: pricingInfo ? `$${pricingInfo.pricePerPerson.toFixed(0)}` : tour?.price || 'Unknown'
      };

      // Replace this URL with your Google Apps Script web app URL
      const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbw6k_STSNcKQSsNFEe38OjV_rI72PfTs6cECGbdNwV1sXCDTJJqZ31dxi3x5xtkxe4T/exec';
      
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(submissionData)
      });

      // Since we're using no-cors mode, we can't read the response
      // We'll assume success if no error is thrown
      setSubmitStatus('success');
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        country: '',
        groupSize: '',
        preferredDate: '',
        message: ''
      });

    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToBookingForm = () => {
    const bookingForm = document.getElementById('booking-form');
    if (bookingForm) {
      bookingForm.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  // Calculate total cost based on group size and discount
  const calculateTotalCost = (basePrice: string, groupSize: string) => {
    const price = parseInt(basePrice.replace('$', ''));
    let numPeople = 0;
    let discount = 0;

    switch (groupSize) {
      case '1':
        numPeople = 1;
        discount = 0;
        break;
      case '2':
        numPeople = 2;
        discount = 5; // 5% for 2 people
        break;
      case '3':
        numPeople = 3;
        discount = 10; // 10% for 3 people
        break;
      case '4':
        numPeople = 4;
        discount = 15; // 15% for 4 people
        break;
      default:
        return null;
    }

    const discountedPrice = price * (1 - discount / 100);
    const totalCost = discountedPrice * numPeople;
    
    return {
      originalTotal: price * numPeople,
      discountedTotal: totalCost,
      discount: discount,
      pricePerPerson: discountedPrice,
      numPeople: numPeople
    };
  };

  // Complete tour data for all tours
  const tours = {
    '1': {
      id: 1,
      name: "Idalgashinna",
      duration: "1 day",
      difficulty: "Easy",
      price: "$100",
      originalPrice: "$120",
      image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
      gallery: [
        "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        "https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
      ],
      rating: 5,
      reviews: 89,
      maxPeople: 4,
      location: "Idalgashinna, Haputale",
      description: "Ride through misty forests and mountain ridges on an unforgettable eco-bike journey to scenic Idalgashinna. This full-day adventure takes you through some of Sri Lanka's most pristine hill country landscapes, combining the thrill of e-biking with the serenity of mountain picnicking.",
      highlights: [
        "Mountain railway views",
        "Scenic picnic spot",
        "Tea plantation trails",
        "Historic railway bridge",
        "Misty forest paths",
        "Panoramic valley views"
      ],
      includes: [
        "Premium e-bike rental",
        "Safety helmet and gear",
        "Professional English-speaking guide",
        "Gourmet picnic lunch",
        "Refreshments and snacks",
        "Photography assistance",
        "First aid kit and emergency support",
        "Waterproof bags for belongings"
      ],
      itinerary: [
        {
          time: "7:00 AM",
          activity: "Meet at Peak Pedals base",
          description: "Safety briefing and bike fitting"
        },
        {
          time: "7:30 AM",
          activity: "Start journey to Idalgashinna",
          description: "Ride through misty mountain paths"
        },
        {
          time: "10:00 AM",
          activity: "Tea plantation visit",
          description: "Learn about Ceylon tea production"
        },
        {
          time: "12:30 PM",
          activity: "Scenic picnic lunch",
          description: "Gourmet meal with mountain views"
        },
        {
          time: "2:00 PM",
          activity: "Historic railway bridge",
          description: "Photography and exploration"
        },
        {
          time: "4:00 PM",
          activity: "Return journey",
          description: "Different route back through forests"
        },
        {
          time: "6:00 PM",
          activity: "Tour ends",
          description: "Return to base with memories"
        }
      ],
      whatToBring: [
        "Comfortable clothing and closed shoes",
        "Sunscreen and sunglasses",
        "Camera or smartphone",
        "Light jacket for mountain weather",
        "Personal medications if needed"
      ],
      difficulty_details: {
        level: "Easy",
        fitness: "Basic fitness required",
        terrain: "Mixed mountain paths and roads",
        elevation: "Moderate climbs with e-bike assistance"
      }
    },
    '2': {
      id: 2,
      name: "Bambaragala Pathana",
      duration: "1 day",
      difficulty: "Moderate",
      price: "$100",
      image: "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
      gallery: [
        "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
      ],
      rating: 5,
      reviews: 124,
      maxPeople: 4,
      location: "Bambaragala Pathana, Haputale",
      description: "Pedal through grassy plains and wide-open skies — Bambaragala Pathana offers raw beauty and peaceful escapes. This unique tour takes you to one of Sri Lanka's most distinctive landscapes, where rolling grasslands meet endless horizons.",
      highlights: [
        "Grassy plains exploration",
        "Open sky panoramas",
        "Peaceful landscapes",
        "Photography opportunities",
        "Wildlife spotting",
        "Sunset viewing point"
      ],
      includes: [
        "Premium e-bike rental",
        "Safety helmet and gear",
        "Professional English-speaking guide",
        "Gourmet picnic lunch",
        "Refreshments and snacks",
        "Photography assistance",
        "First aid kit and emergency support",
        "Binoculars for wildlife viewing"
      ],
      itinerary: [
        {
          time: "7:00 AM",
          activity: "Meet at Peak Pedals base",
          description: "Safety briefing and bike fitting"
        },
        {
          time: "7:30 AM",
          activity: "Journey to Bambaragala",
          description: "Scenic ride through hill country"
        },
        {
          time: "9:30 AM",
          activity: "Enter the grasslands",
          description: "Experience the unique landscape"
        },
        {
          time: "12:00 PM",
          activity: "Picnic in the plains",
          description: "Lunch with 360° views"
        },
        {
          time: "2:00 PM",
          activity: "Wildlife observation",
          description: "Spot endemic birds and animals"
        },
        {
          time: "4:30 PM",
          activity: "Sunset viewpoint",
          description: "Photography and relaxation"
        },
        {
          time: "6:30 PM",
          activity: "Return journey",
          description: "Evening ride back to base"
        }
      ],
      whatToBring: [
        "Comfortable clothing and closed shoes",
        "Sunscreen and hat",
        "Camera with extra batteries",
        "Light jacket for evening",
        "Personal medications if needed"
      ],
      difficulty_details: {
        level: "Moderate",
        fitness: "Good fitness recommended",
        terrain: "Grassland paths and some rocky sections",
        elevation: "Some challenging climbs"
      }
    },
    '3': {
      id: 3,
      name: "Lipton's Seat",
      duration: "1 day",
      difficulty: "Easy",
      price: "$100",
      image: "https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
      gallery: [
        "https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
      ],
      rating: 5,
      reviews: 156,
      maxPeople: 4,
      location: "Lipton's Seat, Haputale",
      description: "Cycle the legendary trail Sir Lipton once walked — now with pedal-assist ease and panoramic tea estate views. This historic route offers breathtaking 360-degree views and takes you through the heart of Ceylon tea country.",
      highlights: [
        "360° mountain views",
        "Tea estate exploration",
        "Historic significance",
        "Panoramic viewpoints",
        "Tea factory visit",
        "Sir Lipton's legacy"
      ],
      includes: [
        "Premium e-bike rental",
        "Safety helmet and gear",
        "Professional English-speaking guide",
        "Gourmet picnic lunch",
        "Tea tasting session",
        "Photography assistance",
        "First aid kit and emergency support",
        "Historical commentary"
      ],
      itinerary: [
        {
          time: "6:30 AM",
          activity: "Early start from base",
          description: "Catch the best morning light"
        },
        {
          time: "7:00 AM",
          activity: "Ride to Lipton's Seat",
          description: "Scenic route through tea estates"
        },
        {
          time: "9:00 AM",
          activity: "Reach Lipton's Seat",
          description: "360° panoramic views"
        },
        {
          time: "11:00 AM",
          activity: "Tea estate tour",
          description: "Learn about tea production"
        },
        {
          time: "1:00 PM",
          activity: "Picnic with a view",
          description: "Lunch overlooking tea valleys"
        },
        {
          time: "3:00 PM",
          activity: "Tea factory visit",
          description: "See tea processing in action"
        },
        {
          time: "4:30 PM",
          activity: "Return journey",
          description: "Different route back"
        },
        {
          time: "6:00 PM",
          activity: "Tour completion",
          description: "Return to base"
        }
      ],
      whatToBring: [
        "Comfortable clothing and closed shoes",
        "Sunscreen and sunglasses",
        "Camera for panoramic shots",
        "Light jacket for mountain weather",
        "Personal medications if needed"
      ],
      difficulty_details: {
        level: "Easy",
        fitness: "Basic fitness sufficient",
        terrain: "Well-maintained paths and roads",
        elevation: "Gentle climbs with e-bike assistance"
      }
    },
    // Short tours data
    '4': {
      id: 4,
      name: "Haputale",
      duration: "2 Hours",
      difficulty: "Easy",
      price: "$20",
      image: "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
      gallery: [
        "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        "https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
      ],
      rating: 4,
      reviews: 45,
      maxPeople: 4,
      location: "Haputale Town",
      description: "A quick exploration of Haputale town and surrounding areas. Perfect for those who want to get a taste of hill country life and local culture.",
      highlights: ["Town exploration", "Local markets", "Quick adventure", "Cultural insights"],
      includes: ["E-bike rental", "Helmet", "Guide"],
      itinerary: [
        {
          time: "9:00 AM",
          activity: "Meet at base",
          description: "Quick briefing and bike setup"
        },
        {
          time: "9:15 AM",
          activity: "Town exploration",
          description: "Ride through Haputale streets"
        },
        {
          time: "10:00 AM",
          activity: "Local market visit",
          description: "Experience local culture"
        },
        {
          time: "10:45 AM",
          activity: "Scenic viewpoint",
          description: "Quick photo stop"
        },
        {
          time: "11:00 AM",
          activity: "Return to base",
          description: "End of short escape"
        }
      ],
      whatToBring: ["Comfortable clothes", "Camera", "Water bottle"],
      difficulty_details: {
        level: "Easy",
        fitness: "Minimal fitness required",
        terrain: "Town roads and paths",
        elevation: "Flat terrain mostly"
      }
    },
    '5': {
      id: 5,
      name: "Ohiya",
      duration: "3hr",
      difficulty: "Moderate",
      price: "$25",
      image: "https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
      gallery: [
        "https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
      ],
      rating: 4,
      reviews: 32,
      maxPeople: 4,
      location: "Ohiya",
      description: "Explore the beautiful Ohiya area with stunning mountain vistas and fresh mountain air.",
      highlights: ["Mountain views", "Fresh air", "Scenic trails", "Nature photography"],
      includes: ["E-bike rental", "Helmet", "Guide", "Refreshments"],
      itinerary: [
        {
          time: "8:00 AM",
          activity: "Departure to Ohiya",
          description: "Scenic ride to starting point"
        },
        {
          time: "9:00 AM",
          activity: "Mountain trail exploration",
          description: "Ride through scenic paths"
        },
        {
          time: "10:30 AM",
          activity: "Refreshment break",
          description: "Enjoy snacks with views"
        },
        {
          time: "11:00 AM",
          activity: "Return journey",
          description: "Back to base"
        }
      ],
      whatToBring: ["Warm clothes", "Camera", "Sunglasses"],
      difficulty_details: {
        level: "Moderate",
        fitness: "Basic fitness needed",
        terrain: "Mountain trails",
        elevation: "Some uphill sections"
      }
    },
    '6': {
      id: 6,
      name: "Ravana Ella",
      duration: "1hr",
      difficulty: "Easy",
      price: "$15",
      image: "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
      gallery: [
        "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
      ],
      rating: 5,
      reviews: 67,
      maxPeople: 4,
      location: "Ravana Ella",
      description: "A short and sweet ride to the famous Ravana Ella waterfall. Perfect for a quick nature escape.",
      highlights: ["Waterfall views", "Quick escape", "Easy ride", "Photo opportunities"],
      includes: ["E-bike rental", "Helmet", "Guide"],
      itinerary: [
        {
          time: "10:00 AM",
          activity: "Quick ride to waterfall",
          description: "Short scenic journey"
        },
        {
          time: "10:30 AM",
          activity: "Waterfall viewing",
          description: "Photography and relaxation"
        },
        {
          time: "11:00 AM",
          activity: "Return to base",
          description: "End of quick escape"
        }
      ],
      whatToBring: ["Camera", "Comfortable shoes"],
      difficulty_details: {
        level: "Easy",
        fitness: "Very basic fitness",
        terrain: "Easy paths",
        elevation: "Minimal elevation"
      }
    },
    '7': {
      id: 7,
      name: "Nildiya Pokuna Ride and Visit",
      duration: "4hr 35min",
      difficulty: "Moderate",
      price: "$28",
      image: "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
      gallery: [
        "https://images.pexels.com/photos/1271619/pexels-photo-1271619.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
      ],
      rating: 4,
      reviews: 28,
      maxPeople: 4,
      location: "Nildiya Pokuna",
      description: "Visit the beautiful Nildiya Pokuna natural pool with swimming opportunities and nature exploration.",
      highlights: ["Natural pool", "Swimming", "Nature exploration", "Peaceful environment"],
      includes: ["E-bike rental", "Helmet", "Guide", "Light snacks"],
      itinerary: [
        {
          time: "8:00 AM",
          activity: "Journey to Nildiya Pokuna",
          description: "Scenic ride through nature"
        },
        {
          time: "10:00 AM",
          activity: "Natural pool visit",
          description: "Swimming and relaxation"
        },
        {
          time: "11:30 AM",
          activity: "Light snacks",
          description: "Refreshments by the pool"
        },
        {
          time: "12:30 PM",
          activity: "Return journey",
          description: "Back to base"
        }
      ],
      whatToBring: ["Swimming clothes", "Towel", "Sunscreen", "Camera"],
      difficulty_details: {
        level: "Moderate",
        fitness: "Good fitness recommended",
        terrain: "Mixed terrain with some challenges",
        elevation: "Moderate climbs"
      }
    },
    '8': {
      id: 8,
      name: "Diyaluma Waterfall",
      duration: "2hr 20min",
      difficulty: "Moderate",
      price: "$26",
      originalPrice: "$30",
      image: "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
      gallery: [
        "https://images.pexels.com/photos/1029604/pexels-photo-1029604.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
      ],
      rating: 5,
      reviews: 89,
      maxPeople: 4,
      location: "Diyaluma Falls",
      description: "Experience Sri Lanka's second tallest waterfall with natural swimming pools and adventure opportunities.",
      highlights: ["Tallest waterfall", "Swimming pools", "Adventure", "Spectacular views"],
      includes: ["E-bike rental", "Helmet", "Guide", "Refreshments"],
      itinerary: [
        {
          time: "9:00 AM",
          activity: "Ride to Diyaluma",
          description: "Journey to the waterfall"
        },
        {
          time: "10:00 AM",
          activity: "Waterfall exploration",
          description: "Swimming and photography"
        },
        {
          time: "11:00 AM",
          activity: "Refreshment break",
          description: "Snacks with waterfall views"
        },
        {
          time: "11:20 AM",
          activity: "Return journey",
          description: "Back to base"
        }
      ],
      whatToBring: ["Swimming gear", "Towel", "Camera", "Grip shoes"],
      difficulty_details: {
        level: "Moderate",
        fitness: "Good fitness needed",
        terrain: "Rocky and challenging paths",
        elevation: "Significant climbs"
      }
    },
    '9': {
      id: 9,
      name: "Tea Factory and Dova Temple",
      duration: "2hr 20min",
      difficulty: "Easy",
      price: "$19",
      originalPrice: "$23",
      image: "https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&fit=crop",
      gallery: [
        "https://images.pexels.com/photos/1793035/pexels-photo-1793035.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop",
        "https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop"
      ],
      rating: 4,
      reviews: 54,
      maxPeople: 4,
      location: "Tea Factory & Dova Temple",
      description: "Combine tea culture with spiritual heritage in this cultural short escape that showcases both industrial and religious aspects of hill country life.",
      highlights: ["Tea factory tour", "Temple visit", "Cultural experience", "Tea tasting"],
      includes: ["E-bike rental", "Helmet", "Guide", "Tea tasting"],
      itinerary: [
        {
          time: "9:00 AM",
          activity: "Tea factory visit",
          description: "Learn about tea processing"
        },
        {
          time: "10:00 AM",
          activity: "Tea tasting session",
          description: "Sample different tea varieties"
        },
        {
          time: "10:30 AM",
          activity: "Dova Temple visit",
          description: "Explore spiritual heritage"
        },
        {
          time: "11:20 AM",
          activity: "Return to base",
          description: "End of cultural tour"
        }
      ],
      whatToBring: ["Respectful clothing for temple", "Camera", "Comfortable shoes"],
      difficulty_details: {
        level: "Easy",
        fitness: "Basic fitness sufficient",
        terrain: "Easy roads and paths",
        elevation: "Minimal elevation changes"
      }
    }
  };

  const tour = tours[id as keyof typeof tours];

  if (!tour) {
    return (
      <div style={{ paddingTop: '80px', textAlign: 'center', padding: '4rem 2rem' }}>
        <h1>Tour Not Found</h1>
        <p>The tour you're looking for doesn't exist.</p>
        <Link to="/tours" className="btn btn-primary">
          View All Tours
        </Link>
      </div>
    );
  }

  // Calculate pricing based on selected group size
  const pricingInfo = formData.groupSize ? calculateTotalCost(tour.price, formData.groupSize) : null;

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <section 
        className="hero" 
        style={{ 
          height: '70vh',
          backgroundImage: `linear-gradient(135deg, rgba(45, 80, 22, 0.7), rgba(74, 124, 42, 0.5)), url(${tour.image})`
        }}
      >
        <div className="hero-content">
          <Link to="/tours" className="btn btn-secondary" style={{ marginBottom: '2rem' }}>
            <ArrowLeft size={20} />
            Back to Escapes
          </Link>
          <h1 className="fade-in">{tour.name}</h1>
          <p className="fade-in" style={{ marginBottom: '3rem' }}>{tour.description}</p>
          <div 
            className="hero-stats fade-in" 
            style={{ 
              position: 'relative',
              bottom: 'auto',
              left: 'auto',
              transform: 'none',
              display: 'flex',
              gap: '2rem',
              justifyContent: 'center',
              flexWrap: 'wrap',
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              padding: '1.5rem 2rem',
              borderRadius: '15px',
              border: '1px solid rgba(255, 255, 255, 0.2)'
            }}
          >
            <div className="stat" style={{ textAlign: 'center' }}>
              <Clock size={20} style={{ marginBottom: '0.5rem' }} />
              <span className="stat-label" style={{ display: 'block', fontSize: '1rem' }}>{tour.duration}</span>
            </div>
            <div className="stat" style={{ textAlign: 'center' }}>
              <Users size={20} style={{ marginBottom: '0.5rem' }} />
              <span className="stat-label" style={{ display: 'block', fontSize: '1rem' }}>Max 4 people</span>
            </div>
            <div className="stat" style={{ textAlign: 'center' }}>
              <MapPin size={20} style={{ marginBottom: '0.5rem' }} />
              <span className="stat-label" style={{ display: 'block', fontSize: '1rem' }}>{tour.location}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Tour Overview */}
      <section className="section">
        <div className="container">
          <div className="contact-content">
            {/* Left Column - Tour Details */}
            <div className="slide-in-left">
              <div className="tour-overview">
                <h2>Tour Overview</h2>
                
                <div className="tour-meta" style={{ marginBottom: '2rem' }}>
                  <div className="tour-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          size={20}
                          className={`star ${i < tour.rating ? 'filled' : ''}`}
                        />
                      ))}
                    </div>
                    <span className="rating-text">({tour.reviews} reviews)</span>
                  </div>
                </div>

                <div className="info-card">
                  <h3>Difficulty Level</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    <span className="tour-badge">{tour.difficulty_details.level}</span>
                    <span>{tour.difficulty_details.fitness}</span>
                  </div>
                  <p><strong>Terrain:</strong> {tour.difficulty_details.terrain}</p>
                  <p><strong>Elevation:</strong> {tour.difficulty_details.elevation}</p>
                </div>

                <div className="info-card">
                  <h3>Highlights</h3>
                  <div className="tour-highlights">
                    {tour.highlights.map((highlight, i) => (
                      <span key={i} className="highlight-tag">
                        {highlight}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="info-card">
                  <h3>What's Included</h3>
                  <ul>
                    {tour.includes.map((item, i) => (
                      <li key={i}>
                        <Check size={16} style={{ color: 'var(--primary-color)', marginRight: '0.5rem' }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="info-card">
                  <h3>What to Bring</h3>
                  <ul>
                    {tour.whatToBring.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </div>

                {/* Itinerary */}
                <div className="info-card">
                  <h3>Daily Itinerary</h3>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {tour.itinerary.map((item, i) => (
                      <div key={i} style={{ 
                        display: 'flex', 
                        gap: '1rem', 
                        padding: '1rem', 
                        background: 'var(--light-color)', 
                        borderRadius: '10px' 
                      }}>
                        <div style={{ 
                          minWidth: '80px', 
                          fontWeight: '600', 
                          color: 'var(--primary-color)' 
                        }}>
                          {item.time}
                        </div>
                        <div>
                          <h4 style={{ marginBottom: '0.5rem' }}>{item.activity}</h4>
                          <p style={{ margin: 0, color: 'var(--gray)' }}>{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Booking Form */}
            <div className="slide-in-right">
              {/* Price Card */}
              <div className="info-card" style={{ marginBottom: '2rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <div>
                    <span className="price" style={{ fontSize: '2rem' }}>{tour.price}</span>
                    {tour.originalPrice && (
                      <span className="original-price" style={{ textDecoration: 'line-through', marginLeft: '0.5rem' }}>
                        {tour.originalPrice}
                      </span>
                    )}
                    <div className="price-label">per person</div>
                    <div style={{ 
                      fontSize: '0.9rem', 
                      color: 'var(--primary-color)', 
                      fontWeight: '600',
                      marginTop: '0.5rem'
                    }}>
                      Bring more friends, save more — up to 15% off when 4 ride together!
                    </div>
                  </div>
                  <div className="tour-badge">
                    {tour.difficulty}
                  </div>
                </div>
              </div>

              {/* Highlighted Booking Form */}
              <div 
                className="info-card" 
                id="booking-form"
                style={{
                  background: 'linear-gradient(135deg, rgba(45, 80, 22, 0.05), rgba(74, 124, 42, 0.03))',
                  border: '3px solid var(--primary-color)',
                  boxShadow: '0 15px 40px rgba(45, 80, 22, 0.15)',
                  position: 'relative'
                }}
              >
                {/* Highlight Badge */}
                <div style={{
                  position: 'absolute',
                  top: '-15px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--primary-color)',
                  color: 'white',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '20px',
                  fontSize: '0.9rem',
                  fontWeight: '600',
                  boxShadow: '0 4px 15px rgba(45, 80, 22, 0.3)'
                }}>
                  🎯 Book Your Adventure
                </div>

                <h3 style={{ marginTop: '1rem', textAlign: 'center', color: 'var(--primary-color)' }}>
                  Reserve Your {tour.name} Escape
                </h3>
                <p style={{ marginBottom: '1.5rem', color: 'var(--gray)', textAlign: 'center' }}>
                  Fill out the form below and we'll get back to you with a customized tour proposal.
                </p>
                
                {/* Success/Error Messages */}
                {submitStatus === 'success' && (
                  <div style={{ 
                    background: 'var(--success)', 
                    color: 'white', 
                    padding: '1rem', 
                    borderRadius: '8px', 
                    marginBottom: '1rem' 
                  }}>
                    ✅ Thank you! Your booking inquiry has been submitted successfully. We'll get back to you within 24 hours.
                  </div>
                )}
                
                {submitStatus === 'error' && (
                  <div style={{ 
                    background: 'var(--error)', 
                    color: 'white', 
                    padding: '1rem', 
                    borderRadius: '8px', 
                    marginBottom: '1rem' 
                  }}>
                    ❌ There was an error submitting your inquiry. Please try again or contact us directly.
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="contact-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="Your full name"
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        placeholder="your.email@example.com"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Country</label>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      >
                        <option value="">Select your country</option>
                        {countries.map(country => (
                          <option key={country.code} value={country.name}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+94 77 123 4567"
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Group Size</label>
                      <select
                        name="groupSize"
                        value={formData.groupSize}
                        onChange={handleInputChange}
                        disabled={isSubmitting}
                      >
                        <option value="">Select group size</option>
                        <option value="1">1 person</option>
                        <option value="2">2 people (5% discount)</option>
                        <option value="3">3 people (10% discount)</option>
                        <option value="4">4 people (15% discount)</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>Preferred Date</label>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        min={new Date().toISOString().split('T')[0]}
                        disabled={isSubmitting}
                      />
                    </div>
                  </div>
                  
                  {/* Display total cost if group size is selected */}
                  {pricingInfo && (
                    <div style={{ 
                      background: 'var(--light-color)', 
                      padding: '1rem', 
                      borderRadius: '10px', 
                      marginBottom: '1rem',
                      border: '2px solid var(--primary-color)'
                    }}>
                      <h4 style={{ marginBottom: '0.5rem', color: 'var(--primary-color)' }}>
                        Group Pricing ({formData.groupSize} {formData.groupSize === '1' ? 'person' : 'people'})
                      </h4>
                      {pricingInfo.discount > 0 && (
                        <>
                          <p style={{ margin: '0.25rem 0', textDecoration: 'line-through', color: 'var(--gray)' }}>
                            Original Total: ${pricingInfo.originalTotal}
                          </p>
                          <p style={{ margin: '0.25rem 0', color: 'var(--primary-color)', fontWeight: '600' }}>
                            {pricingInfo.discount}% Group Discount Applied!
                          </p>
                          <p style={{ margin: '0.25rem 0' }}>
                            Discounted Price: ${pricingInfo.pricePerPerson.toFixed(0)} per person
                          </p>
                        </>
                      )}
                      <p style={{ margin: '0.25rem 0', fontSize: '1.2rem', fontWeight: '700', color: 'var(--primary-color)' }}>
                        Total Cost: ${pricingInfo.discountedTotal.toFixed(0)}
                      </p>
                    </div>
                  )}
                  
                  <div className="form-group">
                    <label>Message</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={4}
                      placeholder="Tell us about your interests, fitness level, any special requirements, or questions you have..."
                      disabled={isSubmitting}
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary btn-large" 
                    style={{ 
                      width: '100%', 
                      marginBottom: '1rem',
                      background: 'linear-gradient(135deg, var(--primary-color), var(--primary-light))',
                      boxShadow: '0 8px 25px rgba(45, 80, 22, 0.4)',
                      fontSize: '1.1rem',
                      fontWeight: '700'
                    }}
                    disabled={isSubmitting}
                  >
                    <Send size={20} />
                    {isSubmitting ? 'Sending Your Request...' : 'Send Booking Inquiry'}
                  </button>
                  
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <a href="tel:+94771234567" className="btn btn-secondary" style={{ flex: 1 }}>
                      <Phone size={16} />
                      Call
                    </a>
                    <a href="mailto:info@peakpedals.lk" className="btn btn-secondary" style={{ flex: 1 }}>
                      <Mail size={16} />
                      Email
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      {tour.gallery && tour.gallery.length > 0 && (
        <section className="section features">
          <div className="container">
            <div className="section-title">
              <h2 className="fade-in">Tour Gallery</h2>
            </div>
            
            <div className="gallery-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))' }}>
              {tour.gallery.map((image, index) => (
                <div key={index} className="gallery-item fade-in">
                  <img src={image} alt={`${tour.name} ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content fade-in">
            <h2>Ready to Book Your {tour.name} Escape?</h2>
            <p>
              Join us for this unforgettable e-bike experience. Contact us today 
              to secure your spot and create memories that will last a lifetime.
            </p>
            <div className="cta-buttons">
              <button 
                onClick={scrollToBookingForm}
                className="btn btn-primary btn-large"
              >
                Book Now - {tour.price}
              </button>
              <Link to="/tours" className="btn btn-secondary btn-large">
                View Other Escapes
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TourDetails;
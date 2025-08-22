import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronUp, HelpCircle, Clock, Users, MapPin, Shield, Leaf, Camera } from 'lucide-react';

const FAQ: React.FC = () => {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null);

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

    const animatedElements = document.querySelectorAll('.fade-in');
    animatedElements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  const faqCategories = [
    {
      title: "Booking & Reservations",
      icon: <Clock className="category-icon" />,
      faqs: [
        {
          question: "How far in advance should I book my tour?",
          answer: "We recommend booking at least 24-48 hours in advance, especially during peak season (December to March). However, we can sometimes accommodate same-day bookings if bikes are available."
        },
        {
          question: "What is your cancellation policy?",
          answer: "Free cancellation up to 24 hours before your tour. Cancellations within 24 hours are subject to a 50% charge. No-shows will be charged the full amount. Weather-related cancellations are fully refundable."
        },
        {
          question: "Can I modify my booking after confirmation?",
          answer: "Yes, you can modify your booking up to 12 hours before the tour start time, subject to availability. Changes to group size or tour type may affect pricing."
        },
        {
          question: "Do you offer group discounts?",
          answer: "Yes! Groups of 6 or more receive a 10% discount. Groups of 10+ receive a 15% discount. Corporate and educational groups may qualify for additional discounts."
        }
      ]
    },
    {
      title: "Tour Details",
      icon: <MapPin className="category-icon" />,
      faqs: [
        {
          question: "What is included in the tour price?",
          answer: "All tours include premium e-bike rental, safety helmet, professional guide, refreshments/meals as specified, photography assistance, and emergency support. Specific inclusions vary by tour - check individual tour descriptions."
        },
        {
          question: "How difficult are the tours?",
          answer: "We offer tours for all fitness levels. Easy tours are suitable for beginners and families. Moderate tours require basic fitness. Challenging tours are for experienced riders. Our e-bikes make hills much easier!"
        },
        {
          question: "What happens if it rains?",
          answer: "Tours may be postponed or cancelled for safety during heavy rain. Light rain doesn't usually stop us - we provide rain gear! We'll contact you if weather conditions are unsuitable and offer rescheduling or full refund."
        },
        {
          question: "Can children participate in the tours?",
          answer: "Children 12+ can participate with adult supervision. We have smaller bikes available. Children under 16 must be accompanied by a parent/guardian. Some challenging tours have age restrictions for safety."
        }
      ]
    },
    {
      title: "Equipment & Safety",
      icon: <Shield className="category-icon" />,
      faqs: [
        {
          question: "Are the e-bikes safe and well-maintained?",
          answer: "Absolutely! Our premium e-bikes are serviced daily and undergo comprehensive maintenance weekly. All bikes are equipped with quality brakes, lights, and safety features. We provide full safety briefings before each tour."
        },
        {
          question: "What safety equipment is provided?",
          answer: "We provide certified helmets, reflective vests, first aid kits, and emergency communication devices. Our guides are trained in first aid and emergency procedures."
        },
        {
          question: "Do I need cycling experience?",
          answer: "Basic cycling ability is required, but e-bikes are very user-friendly. We provide a practice session before starting. Our guides adjust the pace to match the group's comfort level."
        },
        {
          question: "What are the weight and age limits?",
          answer: "Maximum weight limit is 120kg (265 lbs). Minimum age is 12 years. Riders must be able to safely operate a bicycle and follow safety instructions."
        }
      ]
    },
    {
      title: "What to Bring",
      icon: <Camera className="category-icon" />,
      faqs: [
        {
          question: "What should I wear for the tour?",
          answer: "Comfortable, weather-appropriate clothing and closed-toe shoes (sneakers or hiking shoes). Avoid loose clothing that might catch in bike parts. We recommend layers for changing mountain weather."
        },
        {
          question: "What should I bring?",
          answer: "Bring sunscreen, sunglasses, camera/phone, water bottle (we provide refills), and any personal medications. Light jacket for early morning tours. We provide waterproof bags for your belongings."
        },
        {
          question: "Can I bring my own camera equipment?",
          answer: "Yes! We encourage photography and provide secure storage. Our guides are happy to help with photos and know the best spots. Professional photographers can bring equipment - we have special secure carriers."
        },
        {
          question: "Is food provided on tours?",
          answer: "Depends on the tour. Breakfast tours include traditional Sri Lankan breakfast. Full-day tours include lunch. Picnic tours feature gourmet outdoor dining. Snacks and refreshments are provided on all tours."
        }
      ]
    },
    {
      title: "Location & Transportation",
      icon: <Users className="category-icon" />,
      faqs: [
        {
          question: "Where do tours start and end?",
          answer: "All tours start and end at our base in Haputale town center. We're easily accessible from major hotels and guesthouses. Exact meeting point details are provided with booking confirmation."
        },
        {
          question: "Do you provide transportation to the starting point?",
          answer: "We can arrange pickup from accommodations in Haputale town for a small fee. For guests staying further away, we can recommend reliable transport options or arrange transfers."
        },
        {
          question: "How do I get to Haputale?",
          answer: "Haputale is accessible by train (scenic hill country railway), bus, or car. The nearest airport is Colombo (4.5 hours drive). We can provide detailed directions and transport recommendations."
        },
        {
          question: "Is parking available?",
          answer: "Yes, free secure parking is available at our base for guests arriving by car or motorbike."
        }
      ]
    },
    {
      title: "Special Requirements",
      icon: <Leaf className="category-icon" />,
      faqs: [
        {
          question: "Can you accommodate dietary restrictions?",
          answer: "Yes! We can accommodate vegetarian, vegan, gluten-free, and other dietary requirements. Please inform us when booking so we can prepare appropriate meals and snacks."
        },
        {
          question: "Do you offer private tours?",
          answer: "Yes! Private tours are available for couples, families, or groups who prefer a personalized experience. Private tours can be customized to your interests and fitness level."
        },
        {
          question: "Can tours be customized?",
          answer: "Absolutely! We love creating unique experiences. Tell us your interests - photography, culture, nature, adventure - and we'll design a tour just for you. Custom tours require advance notice."
        },
        {
          question: "Are tours suitable for people with disabilities?",
          answer: "We strive to be inclusive. Some of our easier routes may be suitable depending on the specific disability. Please contact us to discuss your needs and we'll work together to find the best options."
        }
      ]
    }
  ];

  return (
    <div>
      <div className="cover-image" style={{ width: '100%', height: '250px', background: `url('/assets/images/faq-cover.jpg') center/cover no-repeat` }} />
      {/* Hero Section */}
      <section className="hero" style={{ height: '50vh' }}>
        <div className="hero-content">
          <h1 className="fade-in">Frequently Asked Questions</h1>
          <p className="fade-in">
            Everything you need to know about our e-bike tours and picnic adventures 
            in Sri Lanka's beautiful hill country
          </p>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="section">
        <div className="container">
          <div className="section-title">
            <h2 className="fade-in">Find Your Answers</h2>
            <p className="fade-in">
              Browse through our comprehensive FAQ sections or contact us directly for personalized assistance
            </p>
          </div>

          <div className="faq-categories">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex} className="faq-category fade-in">
                <div className="category-header">
                  {category.icon}
                  <h3>{category.title}</h3>
                </div>
                
                <div className="faq-list">
                  {category.faqs.map((faq, faqIndex) => {
                    const globalIndex = categoryIndex * 10 + faqIndex;
                    return (
                      <div key={faqIndex} className="faq-item">
                        <button
                          className="faq-question"
                          onClick={() => toggleFAQ(globalIndex)}
                        >
                          <span>{faq.question}</span>
                          {openFAQ === globalIndex ? (
                            <ChevronUp size={20} />
                          ) : (
                            <ChevronDown size={20} />
                          )}
                        </button>
                        
                        <div className={`faq-answer ${openFAQ === globalIndex ? 'open' : ''}`}>
                          <p>{faq.answer}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="section cta-section">
        <div className="container">
          <div className="cta-content fade-in">
            <HelpCircle size={48} style={{ marginBottom: '1rem', opacity: 0.8 }} />
            <h2>Still Have Questions?</h2>
            <p>
              Can't find what you're looking for? Our friendly team is here to help! 
              Contact us directly and we'll get back to you within a few hours.
            </p>
            <div className="cta-buttons">
              <a href="/contact" className="btn btn-primary btn-large">
                Contact Us
              </a>
              <a href="https://wa.me/94771234567" className="btn btn-secondary btn-large">
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FAQ;
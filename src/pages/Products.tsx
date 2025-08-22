import React, { useState, useEffect } from 'react';

const Products: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState('all');

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

  const categories = [
    { id: 'all', name: 'All Bikes' },
    { id: 'mountain', name: 'Mountain Bikes' },
    { id: 'road', name: 'Road Bikes' },
    { id: 'hybrid', name: 'Hybrid Bikes' },
    { id: 'electric', name: 'Electric Bikes' }
  ];

  const priceRanges = [
    { id: 'all', name: 'All Prices' },
    { id: 'under500', name: 'Under $500' },
    { id: '500-1000', name: '$500 - $1000' },
    { id: '1000-2000', name: '$1000 - $2000' },
    { id: 'over2000', name: 'Over $2000' }
  ];

  const products = [
    {
      id: 1,
      name: "Mountain Explorer Pro",
      category: "mountain",
      price: 899,
      originalPrice: 999,
      rating: 5,
      reviews: 124,
      image: "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      features: ["21-Speed", "Aluminum Frame", "Front Suspension"],
      isOnSale: true
    },
    {
      id: 2,
      name: "Speed Demon Road",
      category: "road",
      price: 1299,
      rating: 5,
      reviews: 89,
      image: "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      features: ["Carbon Frame", "16-Speed", "Lightweight"],
      isOnSale: false
    },
    {
      id: 3,
      name: "Urban Cruiser",
      category: "hybrid",
      price: 649,
      rating: 4,
      reviews: 156,
      image: "https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      features: ["Comfort Seat", "7-Speed", "City Ready"],
      isOnSale: false
    },
    {
      id: 4,
      name: "Electric Power Bike",
      category: "electric",
      price: 1899,
      originalPrice: 2199,
      rating: 5,
      reviews: 67,
      image: "https://images.pexels.com/photos/1149601/pexels-photo-1149601.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      features: ["Electric Motor", "50km Range", "LCD Display"],
      isOnSale: true
    },
    {
      id: 5,
      name: "Trail Master",
      category: "mountain",
      price: 1199,
      rating: 5,
      reviews: 93,
      image: "https://images.pexels.com/photos/100582/pexels-photo-100582.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      features: ["Full Suspension", "24-Speed", "All-Terrain"],
      isOnSale: false
    },
    {
      id: 6,
      name: "City Commuter",
      category: "hybrid",
      price: 549,
      rating: 4,
      reviews: 201,
      image: "https://images.pexels.com/photos/544966/pexels-photo-544966.jpeg?auto=compress&cs=tinysrgb&w=400&h=300&fit=crop",
      features: ["Basket Included", "8-Speed", "Puncture Resistant"],
      isOnSale: false
    }
  ];

  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory;
    
    let priceMatch = true;
    if (priceRange === 'under500') priceMatch = product.price < 500;
    else if (priceRange === '500-1000') priceMatch = product.price >= 500 && product.price <= 1000;
    else if (priceRange === '1000-2000') priceMatch = product.price >= 1000 && product.price <= 2000;
    else if (priceRange === 'over2000') priceMatch = product.price > 2000;
    
    return categoryMatch && priceMatch;
  });

  return (
    <div style={{ paddingTop: '80px' }}>
      {/* Hero Section */}
      <section className="hero" style={{ height: '50vh' }}>
        <div className="hero-content">
          <h1 className="fade-in">Our Products</h1>
          <p className="fade-in">
            Discover our extensive collection of premium bicycles
          </p>
        </div>
      </section>

      {/* Filters Section */}
      <section className="section features" style={{ padding: '40px 0' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            gap: '2rem', 
            justifyContent: 'center', 
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '2rem'
          }}>
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Category:</label>
              <select 
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{
                  padding: '10px 15px',
                  border: '2px solid var(--light-gray)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  minWidth: '150px'
                }}
              >
                {categories.map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>Price Range:</label>
              <select 
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                style={{
                  padding: '10px 15px',
                  border: '2px solid var(--light-gray)',
                  borderRadius: '8px',
                  fontSize: '1rem',
                  minWidth: '150px'
                }}
              >
                {priceRanges.map(range => (
                  <option key={range.id} value={range.id}>{range.name}</option>
                ))}
              </select>
            </div>
            
            <div style={{ color: 'var(--gray)', fontSize: '1rem' }}>
              Showing {filteredProducts.length} of {products.length} products
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="section">
        <div className="container">
          <div className="products-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card fade-in">
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  {product.isOnSale && (
                    <div className="sale-badge">Sale</div>
                  )}
                </div>
                
                <div className="product-info">
                  <h3>{product.name}</h3>
                  
                  <div className="product-rating">
                    <div className="stars">
                      {[...Array(5)].map((_, i) => (
                        <span 
                          key={i} 
                          className={`star ${i < product.rating ? 'filled' : ''}`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="rating-text">({product.reviews} reviews)</span>
                  </div>
                  
                  <div style={{ marginBottom: '1rem' }}>
                    {product.features.map((feature, index) => (
                      <span 
                        key={index}
                        style={{
                          display: 'inline-block',
                          background: 'var(--light-color)',
                          color: 'var(--gray)',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '0.8rem',
                          margin: '2px',
                          marginRight: '6px'
                        }}
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                  
                  <div className="product-price">
                    <div>
                      <span className="price">${product.price}</span>
                      {product.originalPrice && (
                        <span className="original-price">${product.originalPrice}</span>
                      )}
                    </div>
                    <button className="btn btn-primary">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <p style={{ fontSize: '1.2rem', color: 'var(--gray)', marginBottom: '2rem' }}>
                No products found matching your criteria.
              </p>
              <button 
                onClick={() => {
                  setSelectedCategory('all');
                  setPriceRange('all');
                }}
                className="btn btn-primary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="section features">
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ marginBottom: '1rem' }}>Stay Updated</h2>
          <p style={{ marginBottom: '2rem', color: 'var(--gray)' }}>
            Subscribe to our newsletter for new arrivals and special offers
          </p>
          <div style={{ 
            display: 'flex', 
            gap: '1rem', 
            justifyContent: 'center', 
            maxWidth: '400px', 
            margin: '0 auto',
            flexWrap: 'wrap'
          }}>
            <input 
              type="email" 
              placeholder="Enter your email"
              style={{
                flex: '1',
                padding: '12px 16px',
                border: '2px solid var(--light-gray)',
                borderRadius: '8px',
                fontSize: '1rem',
                minWidth: '200px'
              }}
            />
            <button className="btn btn-primary">Subscribe</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Products;
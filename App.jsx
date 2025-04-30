import React, { useMemo, useState } from 'react'; 
import PropTypes from 'prop-types';
import './App.css';

// ProductList component
const ProductList = ({ products, filterText, sortBy }) => {
  const processedProducts = useMemo(() => {
    console.log('Processing products...');

    const filtered = products.filter(product =>
      product.name?.toLowerCase().includes(filterText.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      if (sortBy === 'price') return a.price - b.price;
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0;
    });
  }, [products, filterText, sortBy]);

  return (
    <div className="product-list">
      <h2>Showing {processedProducts.length} products</h2>
      {processedProducts.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {processedProducts.map(product => (
            <li key={product.id}>
              <span>{product.name}</span>
              <span>${product.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
    })
  ).isRequired,
  filterText: PropTypes.string.isRequired,
  sortBy: PropTypes.oneOf(['price', 'name']),
};

ProductList.defaultProps = {
  sortBy: 'price',
};

// Main App component
const App = () => {
  const [filter, setFilter] = useState('');
  const [sortOption, setSortOption] = useState('price');

  const mockProducts = Array.from({ length: 50 }, (_, i) => ({
    id: i + 1,
    name: `Product ${i + 1}`, // * THIS IS NOW FIXED
    price: Math.floor(Math.random() * 1000),
  }));

  const handleReset = () => {
    setFilter('');
    setSortOption('price');
  };

  return (
    <div className="container">
      <h1>Product Catalog</h1>
      <div className="controls">
        <input
          type="text"
          placeholder="Filter products..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <select 
          value={sortOption} 
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="price">Sort by Price</option>
          <option value="name">Sort by Name</option>
        </select>
        <button onClick={handleReset}>Reset</button>
      </div>
      
      <ProductList 
        products={mockProducts} 
        filterText={filter} 
        sortBy={sortOption} 
      />
    </div>
  );
};

export default App;

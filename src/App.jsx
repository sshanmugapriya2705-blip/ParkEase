import { useState } from 'react';
import './App.css';

function App() {
const [location, setLocation] = useState('');
const [searchedLocation, setSearchedLocation] = useState('');
const [showResults, setShowResults] = useState(false);

const [selectedSpot, setSelectedSpot] = useState(null);
const [customerName, setCustomerName] = useState('');
const [vehicleNumber, setVehicleNumber] = useState('');
const [duration, setDuration] = useState(1);
const [bookingConfirmed, setBookingConfirmed] = useState(false);

const parkingSpots = [
{
id: 1,
name: 'City Center Parking',
location: 'City Center',
price: 40,
available: 12,
},
{
id: 2,
name: 'Mall Parking Zone',
location: 'Shopping Mall',
price: 50,
available: 8,
},
{
id: 3,
name: 'QuickPark Station',
location: 'Railway Station',
price: 30,
available: 15,
},
];

function handleSearch(event) {
event.preventDefault();

if (location.trim() === '') {
  alert('Please enter a location!');
  return;
}

setSearchedLocation(location.trim());
setShowResults(true);
setSelectedSpot(null);
setBookingConfirmed(false);

}

function handleBooking(event) {
event.preventDefault();
setBookingConfirmed(true);
}

function handleSelectSpot(spot) {
setSelectedSpot(spot);
setCustomerName('');
setVehicleNumber('');
setDuration(1);
setBookingConfirmed(false);
}

function handleCancelBooking() {
setSelectedSpot(null);
setBookingConfirmed(false);
}

return (
<div className="app">

  {/* Navigation Bar */}
  <nav className="navbar">
    <h1 className="logo">
      ParkEase<span>.</span>
    </h1>

    <div className="nav-links">
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#parking">Find Parking</a>
      <a href="#contact">Contact</a>
    </div>

    <a className="nav-button" href="#parking">
      Get Started
    </a>
  </nav>

  {/* Home Section */}
  <section className="hero" id="home">
    <div className="hero-content">
      <p className="hero-tag">
        SMART PARKING, MADE SIMPLE
      </p>

      <h1>
        Find Your Perfect
        <br />
        <span>Parking Spot.</span>
      </h1>

      <p className="hero-description">
        Say goodbye to parking stress. Discover convenient
        parking spaces and make every journey easier with ParkEase.
      </p>

      <a className="hero-button" href="#parking">
        Find Parking →
      </a>
    </div>

    <div className="hero-card">
      <div className="parking-icon">🅿️</div>

      <h2>Parking Made Easy</h2>

      <p>Your spot is just a few clicks away.</p>

      <div className="parking-details">
        <div>
          <span>Booking</span>
          <strong>Quick & Easy</strong>
        </div>

        <div>
          <span>Experience</span>
          <strong>Stress-Free</strong>
        </div>
      </div>
    </div>
  </section>

  {/* About Section */}
  <section className="about" id="about">
    <p className="section-tag">WHY PARKEASE?</p>

    <h2>
      Parking should be the easiest part of your journey.
    </h2>

    <p>
      ParkEase helps drivers discover parking spaces with a simple
      and user-friendly booking experience.
    </p>
  </section>

  {/* Find Parking Section */}
  <section className="parking-section" id="parking">
    <p className="section-tag">FIND YOUR SPOT</p>

    <h2>Where would you like to park?</h2>

    <form className="search-box" onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter your location"
        value={location}
        onChange={(event) => setLocation(event.target.value)}
      />

      <button type="submit">
        Search Parking
      </button>
    </form>

    {/* Parking Search Results */}
    {showResults && (
      <div className="parking-results">
        <h2>
          Parking Spots Near "{searchedLocation}"
        </h2>

        <p className="results-note">
          Demo results — these are sample parking spaces,
          not live listings.
        </p>

        <div className="parking-grid">
          {parkingSpots.map((spot) => (
            <div className="spot-card" key={spot.id}>
              <div className="spot-icon">🅿️</div>

              <h3>{spot.name}</h3>

              <p className="spot-location">
                📍 {spot.location}
              </p>

              <p>
                Available spaces: {spot.available}
              </p>

              <div className="spot-bottom">
                <p>
                  <strong>₹{spot.price}</strong> / hour
                </p>

                <button
                  type="button"
                  onClick={() => handleSelectSpot(spot)}
                >
                  Book Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )}
  </section>

  {/* Booking Section */}
  {selectedSpot && (
    <section className="booking-section" id="booking">
      <div className="booking-container">

        {!bookingConfirmed ? (
          <>
            <p className="section-tag">
              RESERVE YOUR SPOT
            </p>

            <h2>Complete Your Booking</h2>

            <p className="booking-description">
              You selected {selectedSpot.name}.
            </p>

            <form
              className="booking-form"
              onSubmit={handleBooking}
            >
              <label htmlFor="customerName">
                Full Name
              </label>

              <input
                id="customerName"
                type="text"
                placeholder="Enter your full name"
                value={customerName}
                onChange={(event) =>
                  setCustomerName(event.target.value)
                }
                required
              />

              <label htmlFor="vehicleNumber">
                Vehicle Registration Number
              </label>

              <input
                id="vehicleNumber"
                type="text"
                placeholder="Enter vehicle number"
                value={vehicleNumber}
                onChange={(event) =>
                  setVehicleNumber(event.target.value)
                }
                required
              />

              <label htmlFor="duration">
                Parking Duration
              </label>

              <select
                id="duration"
                value={duration}
                onChange={(event) =>
                  setDuration(Number(event.target.value))
                }
              >
                <option value={1}>1 Hour</option>
                <option value={2}>2 Hours</option>
                <option value={3}>3 Hours</option>
                <option value={4}>4 Hours</option>
                <option value={5}>5 Hours</option>
              </select>

              <div className="booking-total">
                <span>Total Amount</span>

                <strong>
                  ₹{selectedSpot.price * duration}
                </strong>
              </div>

              <button
                type="submit"
                className="confirm-button"
              >
                Confirm Booking
              </button>

              <button
                type="button"
                className="cancel-button"
                onClick={handleCancelBooking}
              >
                Cancel
              </button>
            </form>
          </>
        ) : (
          <div className="confirmation">
            <div className="confirmation-icon">✓</div>

            <h2>Booking Request Confirmed!</h2>

            <p className="booking-description">
              Your demo booking details are below.
            </p>

            <div className="confirmation-details">
              <p>
                <span>Customer</span>
                <strong>{customerName}</strong>
              </p>

              <p>
                <span>Vehicle</span>
                <strong>{vehicleNumber}</strong>
              </p>

              <p>
                <span>Parking Spot</span>
                <strong>{selectedSpot.name}</strong>
              </p>

              <p>
                <span>Duration</span>
                <strong>{duration} hour(s)</strong>
              </p>

              <p>
                <span>Total Amount</span>
                <strong>
                  ₹{selectedSpot.price * duration}
                </strong>
              </p>
            </div>

            <p className="demo-notice">
              This is a demo confirmation. No real parking
              space has been reserved.
            </p>

            <button
              type="button"
              className="confirm-button"
              onClick={handleCancelBooking}
            >
              Done
            </button>
          </div>
        )}

      </div>
    </section>
  )}

  {/* Contact Section */}
  <section className="contact" id="contact">
    <h2>Let's make parking easier.</h2>

    <p>
      Have questions? We'd love to hear from you.
    </p>

    <a href="mailto:parkease@example.com">
      Contact Us
    </a>
  </section>

  {/* Footer */}
  <footer className="footer">
    <h2>
      ParkEase<span>.</span>
    </h2>

    <p>Less searching. More moving.</p>

    <p>© 2026 ParkEase. All rights reserved.</p>
  </footer>

</div>

);
}

export default App;
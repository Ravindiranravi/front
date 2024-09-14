import React from 'react';
import './AboutPage.css'; // Import the external CSS

const AboutPage = () => {
  return (
    <div className="srm-container">

      <div className="srm-main-content">
        <div className="srm-image-container">
          <img 
            className="srm-main-image" 
            src="dec1.jpg" 
            alt="SRM Campus"
          />
        </div>
        <div className="srm-text-container">
          <h1>SRM In Focus</h1>
          <p>
            SRM Institute of Science and Technology is one of the top-ranking universities in India with over 52,000 full-time students and more than 3200 faculty across all the campuses – Kattankulathur, Ramapuram, Vadapalani Campus – all in and around Chennai, Tiruchirappalli (in TN), Modinagar (in UP) & Sonepat (in Haryana) – both of which are located near Delhi NCR, Amaravati (in AP), Gangtok (in Sikkim).
          </p>
          <p>
            Offering a wide range of undergraduate, postgraduate, and doctoral programs in six Faculties – Engineering & Technology, Management, Medicine & Health Sciences, Science & Humanities, Law, and Agricultural Sciences.
          </p>
        </div>
      </div>

     
    </div>
  );
};

export default AboutPage;

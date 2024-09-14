import React from 'react'

const footer = () => {
    return (
      <footer className="Footer">
        <div className="Footer-logos">
          <img src="logo1.png" alt="Logo 1" className="Footer-logo" />
          <img src="logo2.png" alt="Logo 2" className="Footer-logo" />
          <img src="logo3.png" alt="Logo 3" className="Footer-logo" />
          <img src="logo4.png" alt="Logo 4" className="Footer-logo" />
        </div>
        <div className="Footer-contact">
          <p>Contact us at: <a href="mailto:info@example.com">info@example.com</a></p>
        </div>
      </footer>
    );
  };
export default footer
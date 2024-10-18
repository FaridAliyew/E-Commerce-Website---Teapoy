import React, { useState, useEffect } from 'react';
import { FaChevronUp } from 'react-icons/fa'; // Font Awesome ikonunu istifadə et
import '../style/scrollTo.css'

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) { // Səhifənin 300px aşağısına düşdükdə ikonu göstər
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
      {isVisible && (
        <div className="scroll-to-top" onClick={scrollToTop}>
          <FaChevronUp size={30} />
        </div>
      )}
    </div>
  );
};

export default ScrollToTopButton;

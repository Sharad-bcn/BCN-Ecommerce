import React, { useState, useEffect, useRef } from 'react';
import './Home.scss';

const App = () => {
  const [sliderItems, setSliderItems] = useState([
    { id: 1, image: 'https://images.pexels.com/photos/219906/pexels-photo-219906.jpeg?auto=compress&cs=tinysrgb&w=600', author: 'LUNDEV', title: 'DESIGN SLIDER', topic: 'ANIMAL', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi...' },
    { id: 2, image: 'https://images.pexels.com/photos/2295744/pexels-photo-2295744.jpeg?auto=compress&cs=tinysrgb&w=600', author: 'LUNDEV', title: 'DESIGN SLIDER', topic: 'ANIMAL', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi...' },
    { id: 3, image: 'https://images.pexels.com/photos/53125/elephant-tusk-ivory-animal-53125.jpeg?auto=compress&cs=tinysrgb&w=600', author: 'LUNDEV', title: 'DESIGN SLIDER', topic: 'ANIMAL', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi...' },
    { id: 4, image: 'https://images.pexels.com/photos/2877854/pexels-photo-2877854.jpeg?auto=compress&cs=tinysrgb&w=600', author: 'LUNDEV', title: 'DESIGN SLIDER', topic: 'ANIMAL', description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut sequi...' }
  ]);

  const [thumbnails, setThumbnails] = useState([...sliderItems]);
  const carouselRef = useRef(null);
  const timeRunning = 3000;
  const timeAutoNext = 7000;
  const timeoutRef = useRef(null);
  const autoNextRef = useRef(null);

  useEffect(() => {
    autoNextRef.current = setTimeout(() => handleNext(), timeAutoNext);
    return () => clearTimeout(autoNextRef.current);
  }, []);

  const handleNext = () => {
    const updatedSlider = [...sliderItems];
    updatedSlider.push(updatedSlider.shift());
    setSliderItems(updatedSlider);

    const updatedThumbnails = [...thumbnails];
    updatedThumbnails.push(updatedThumbnails.shift());
    setThumbnails(updatedThumbnails);

    resetAutoNext();
    triggerAnimation('next');
  };

  const handlePrev = () => {
    const updatedSlider = [...sliderItems];
    updatedSlider.unshift(updatedSlider.pop());
    setSliderItems(updatedSlider);

    const updatedThumbnails = [...thumbnails];
    updatedThumbnails.unshift(updatedThumbnails.pop());
    setThumbnails(updatedThumbnails);

    resetAutoNext();
    triggerAnimation('prev');
  };

  const triggerAnimation = (direction) => {
    if (carouselRef.current) {
      carouselRef.current.classList.add(direction);
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        carouselRef.current.classList.remove(direction);
      }, timeRunning);
    }
  };

  const resetAutoNext = () => {
    clearTimeout(autoNextRef.current);
    autoNextRef.current = setTimeout(() => handleNext(), timeAutoNext);
  };

  return (
    <div className="carousel" ref={carouselRef}>
      {/* Slider Items */}
      <div className="list">
        {sliderItems.map((item, index) => (
          <div className="item" key={index}>
            <img src={item.image} alt={item.title} />
            <div className="content">
              <div className="author">{item.author}</div>
              <div className="title">{item.title}</div>
              <div className="topic">{item.topic}</div>
              <div className="des">{item.description}</div>
              <div className="buttons">
                <button>SEE MORE</button>
                <button>SUBSCRIBE</button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Thumbnails */}
      <div className="thumbnail">
        {thumbnails.map((item, index) => (
          <div className="item" key={index}>
            <img src={item.image} alt={item.title} />
            <div className="content">
              <div className="title">Name Slider</div>
              <div className="description">Description</div>
            </div>
          </div>
        ))}
      </div>

      {/* Arrows */}
      <div className="arrows">
        <button id="prev" onClick={handlePrev}>&lt;</button>
        <button id="next" onClick={handleNext}>&gt;</button>
      </div>

      {/* Time Indicator */}
      <div className="time"></div>
    </div>
  );
};

export default App;

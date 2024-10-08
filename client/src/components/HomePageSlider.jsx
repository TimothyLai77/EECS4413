import React from 'react'
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import '../assets/styles/HomePage.css';
import image1 from '../assets/images/homePage-1.png';
import image2 from '../assets/images/homePage-2.png';
import image3 from '../assets/images/homePage-3.png';
import image4 from '../assets/images/homePage-4.png';
import image5 from '../assets/images/homePage-5.png';
function HomePageSlider() {
    return (
        <Carousel>

          <Carousel.Item interval={1000}>
            <Image fluid src={image1} alt="image 1"  />
            <Carousel.Caption>
              <h3>Check out our Catalog</h3>
              <p>Happy to have you here!!</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item interval={500}>
          <Image fluid src={image2} alt="image 2"  />
            <Carousel.Caption>
            <h3>Check out our Catalog</h3>
            <p>Happy to have you here!!</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
          <Image fluid src={image3} alt="image 3"  />
            <Carousel.Caption>
            <h3>Check out our Catalog</h3>
            <p>Happy to have you here!!</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
          <Image fluid src={image4} alt="image 4"  />
            <Carousel.Caption>
            <h3>Check out our Catalog</h3>
            <p>Happy to have you here!!</p>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
          <Image fluid src={image5} alt="image 5"  />
            <Carousel.Caption>
            <h3>Check out our Catalog</h3>
            <p>Happy to have you here!!</p>
            </Carousel.Caption>
          </Carousel.Item>

        </Carousel>
        
        
      );
}
//
export default HomePageSlider;
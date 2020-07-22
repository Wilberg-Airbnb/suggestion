import React from 'react';
import styled from 'styled-components';


const ImageSlide = ({ url }) => {
    const styles = {
        backgroundImage: `url(${url})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center'
    };
    
    return (
        <div className="image-slide" style={styles}></div>
    );
}

  export default ImageSlide;
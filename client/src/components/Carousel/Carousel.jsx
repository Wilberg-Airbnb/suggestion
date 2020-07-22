import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import $ from 'jquery';


import './Carousel.css';


import Arrow from '../Arrow/Arrow.jsx';
import ImageSlide from '../ImageSlide/ImageSlide.jsx';

const imgUrls = [
    "https://cmeimg-a.akamaihd.net/640/clsd/getty/c64f76dc20c246ca88ee180fe4b4b781", 
    "https://lh3.googleusercontent.com/oxPeODS2m6rYIVbhcQChRtOWEYeGDwbeeeB1cDU2o_WYAVPU61VIgx-_6BAh5gSL8Sw=h900",
    "https://i0.wp.com/www.universodegatos.com/wp-content/uploads/2017/04/fivfelv7.jpg?resize=582%2C328",
    "https://i.pinimg.com/736x/07/c3/45/07c345d0eca11d0bc97c894751ba1b46.jpg",
    "https://ehealthforum.com/health/images/avatars/11699147425707699031013.jpeg"
];

class Carousel extends React.Component {
    constructor (props) {
        super(props);

        this.requestedId = JSON.parse(window.location.href.split('/')[3]);
        
        this.state ={
            listingId : this.requestedId,
            suggestions:[],
            currentPage:1,
            todosPerPage:4,
            currentImageIndex: 0
          }
        
        this.nextSlide = this.nextSlide.bind(this);
        this.previousSlide = this.previousSlide.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    componentDidMount(){
        axios.get(`http://localhost:8081/api/suggestions/${this.state.listingId}`)
          .then(res =>{
          this.setState({
            suggestions: res.data
          })
          })
          .catch(err =>{
          console.log(err);
        })
      }
    
    previousSlide () {
        const lastIndex = imgUrls.length - 1;
        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === 0;
        const index =  shouldResetIndex ? lastIndex : currentImageIndex - 1;
        
        this.setState({
            currentImageIndex: index
        });
    }
    
    nextSlide () {
        const lastIndex = imgUrls.length - 1;
        const { currentImageIndex } = this.state;
        const shouldResetIndex = currentImageIndex === lastIndex;
        const index =  shouldResetIndex ? 0 : currentImageIndex + 1;

        this.setState({
            currentImageIndex: index
        });
    }

    handleClick(direction){
        if(direction ==="left"){
          this.setState(prevState =>({
            currentPage: prevState.currentPage -1
          }))
        }else{
          this.setState(prevState =>({
            currentPage: prevState.currentPage +1
          }))
        }
        
      }
    
    render () {
        return (
            <div className="carousel">
                <Arrow direction="left" clickFunction={ this.previousSlide } glyph="&#9664;" />
                <ImageSlide url={ imgUrls[this.state.currentImageIndex] } />
                <Arrow direction="right" clickFunction={ this.nextSlide } glyph="&#9654;" />
            </div>
        );
    }
}





export default Carousel


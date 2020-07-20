import React from 'react';
import styled from 'styled-components';

import axios from 'axios';


const ImageBox = styled.div`

}

`;

const Superhost = styled.span`
    background:white;
    border-style:solid;
    border-color:black;
    width:20px;
    height:8px;
    padding:3px;
    border-radius:5px;
    border-width: thin;
`;

const Image = styled.img`
    max-width:100%;
`;


const SuggestionContainer = styled.div`
    margin-right: ${({index}) =>  index!==0 && index%3 === 0? '0rem': '1.5rem'};
    grid-template-columns: auto auto auto auto;
    justifycontent: space-between;
    width:100%;
    max-width:100%
`;

const RoomType = styled.div`
    display:flex;
    justify-content:space-between;
    margin-top:1.5rem;
`;

const RoomName=styled.div`
    margin-top:1rem;
`;

const RoomPrice = styled.div`
    margin-top:1rem;
`;

const Reviews = styled.div``;

const RoomDescription= styled.div``;

const Star = styled.div`
  background: #FF385C;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  display: inline-block;
  height: 15px;
  width: 15px;
  margin-right:4px;
}
`;


class Suggestion extends React.Component {
    constructor(props){
        super(props)
    

        this.state={
            reviews:[],
            average:0
        }

        this.getAverage = this.getAverage.bind(this);
    }


    componentDidMount(){
        
        axios.get(`http://ec2-3-129-19-151.us-east-2.compute.amazonaws.com:8080/api/reviews/${this.props.suggestion.listingId}`)
            .then(res =>{
                console.log(res);
                this.setState({
                    reviews:res.data
                },() =>{this.getAverage()
                })
            }).catch(err =>{
                console.log(err);
                console.log('could not retrieve reviews data')
            })
    }


    getAverage(){
        axios.get(`http://ec2-3-129-19-151.us-east-2.compute.amazonaws.com:8080/api/reviews/${this.props.suggestion.listingId}?type=review`)
            .then(res =>{
                this.setState({
                    average:res.data
                })
            }).catch(err =>{
                console.log(err);
                console.log(`could dnot retrieve average review score for ${this.props.suggestion.listingId}`)
            })
    }

    render(){
        const {suggestion,index} = this.props;
        console.log(suggestion.superhost)
        return (
            <SuggestionContainer index = {index}>

                <ImageBox><Image src={suggestion.pictureURL} alt="picture"></Image></ImageBox>
                <RoomType> 
                    <RoomDescription>
                    {suggestion.superhost === 1?<Superhost>SUPERHOST</Superhost>: null}
                    </RoomDescription>
                    <Reviews><Star></Star>{this.state.average} ({this.state.reviews.length})</Reviews>
                </RoomType>
                <RoomName>{suggestion.placeName}</RoomName>
                <RoomPrice>${Math.floor(suggestion.price)} / night</RoomPrice>

                
            </SuggestionContainer>
        )
    }
}





export default Suggestion;


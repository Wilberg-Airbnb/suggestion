import React from 'react';
import styled from 'styled-components';

import axios from 'axios';


const ImageBox = styled.div`

}

`;

const Superhost = styled.div`
    background:white;
    border-style:solid;
    border-color:black;
    width:20px;
    height:8px;
    padding:3px;
    border-radius:5px;
    border-width: thin;
    font-size:0.7em;
`;

const Image = styled.img`
    width:100%;
`;


const SuggestionContainer = styled.div`
    padding-right: ${({index}) =>  index === 3? '0px': '1.5rem'};
`;

const RoomType = styled.div`
    display:flex;
    justify-content:space-between;
    margin-top:0.7rem;
    width:auto
`;

const RoomName=styled.div`
    margin-top:0.7rem;
    overflow:hidden;
    text-overflow:ellipsis;
`;

const RoomPrice = styled.div`
    margin-top:0.7rem;
`;

const Reviews = styled.div``;

const RoomDescription= styled.div`
    display:flex;
    justify-content:flex-start;
    width:70%;
`;

const Star = styled.div`
  background: #FF385C;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  display: inline-block;
  height: 15px;
  width: 15px;
  margin-right:4px;
}
`;

const RoomInfo = styled.div`
    text-overflow:ellipsis
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
                })
            }).catch(err =>{
                console.log(err);
                console.log('could not retrieve reviews data')
            });
            this.getAverage()
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
        return (
            <SuggestionContainer index = {index}>

                <ImageBox><Image src={suggestion.pictureURL} alt="picture"></Image></ImageBox>
                <RoomType> 
                    {/* <RoomDescription>

                            {suggestion.superhost === 1?<Superhost>SUPERHOST</Superhost>: null}
                            <RoomInfo>{suggestion.roomtype} • {suggestion.numbOfBedrooms}</RoomInfo>

                    </RoomDescription> */}

                    {suggestion.superhost === 1?
                    <RoomDescription>
                        <Superhost>SUPERHOST</Superhost>
                        <RoomInfo>{suggestion.roomtype} • {suggestion.numbOfBedrooms}</RoomInfo>
                    </RoomDescription>
                    :
                    <RoomDescription>
                        <RoomInfo>{suggestion.roomtype} • {suggestion.numbOfBedrooms}</RoomInfo>
                    </RoomDescription>
                    }

                    

                    <Reviews><Star></Star>{this.state.average} ({this.state.reviews.length})</Reviews>
                    
                </RoomType>
                <RoomName>{suggestion.placeName}</RoomName>
                <RoomPrice>${Math.floor(suggestion.price)} / night</RoomPrice>

                
            </SuggestionContainer>
        )
    }
}





export default Suggestion;


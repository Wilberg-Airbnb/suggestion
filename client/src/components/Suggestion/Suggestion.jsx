import React from 'react';
import styled from 'styled-components';

import axios from 'axios';


const ImageBox = styled.div`
    height:300px;

}

`;

const Superhost = styled.div`
    background:white;
    border-style:solid;
    border-color:black;
    padding:3px;
    border-radius:5px;
    border-width: thin;
    font-size:0.7em;
    margin-right:4px;
`;

const Image = styled.img`
    width:100%;
    height:100%;
`;


const SuggestionContainer = styled.div`
    // padding-right: ${({index}) =>  index === 3? '0px': '1.5rem'};

    &:hover{
        cursor:pointer;
    }
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
    overflow:hidden;
    text-overflow:ellipsis;
    width:${({superhost})=>superhost? `180px`: `240px`};
    white-space:nowrap;
    font-size:0.9rem;
    color:#A0A0A0;
`;


class Suggestion extends React.Component {
    constructor(props){
        super(props)
    

        this.state={
            reviews:[],
            average:0,
            price:0,
            placeName:'',
            numbOfBedrooms:0,
            hostAndRooms:{},
            superhost:null
        }

        this.getAverage = this.getAverage.bind(this);
    }


    componentDidMount(){
        
        
        axios.get(`http://ec2-3-129-14-177.us-east-2.compute.amazonaws.com:8080/api/reviews/${this.props.suggestion.listingId}`)
            .then(res =>{
                this.setState({
                    reviews:res.data
                })
            }).catch(err =>{
                console.log(err);
                console.log('could not retrieve reviews data')
            });
        this.getAverage();

        axios.get(`http://ec2-52-14-154-112.us-east-2.compute.amazonaws.com/api/reservation/${this.props.suggestion.listingId}`)
            .then(res =>{
                this.setState({
                    price:res.data.standardPrice
                })
            }).catch(err =>{
                console.log(err);
                console.log('could not retrieve price data');
            })
        
        axios.get(`http://ec2-3-15-150-168.us-east-2.compute.amazonaws.com:4000/api/description/${this.props.suggestion.listingId}`)
            .then(res =>{
                this.setState({
                    placeName:res.data.nameOfListing,
                    numbOfBedrooms:res.data.sleepingArrangements.length,
                    hostAndRooms:res.data.hostAndRooms[0]
                })
                
            }).catch(err =>{
                console.log(err);
                console.log('could not retrieve reviews data')
            });

        axios.get(`http://ec2-3-12-169-208.us-east-2.compute.amazonaws.com:2000/api/host/${this.props.suggestion.listingId}`)
            .then(res =>{
                this.setState({
                    superhost:JSON.parse(res.data.superhost)
                })
            }).catch(err =>{
                console.log(err);
                console.log('could not retrieve superhost data')
            })

    }


    getAverage(){
        axios.get(`http://ec2-3-129-14-177.us-east-2.compute.amazonaws.com:8080/api/reviews/${this.props.suggestion.listingId}?type=review`)
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

                    {this.state.superhost?
                    <RoomDescription>
                        <Superhost>SUPERHOST</Superhost>
                        <RoomInfo superhost={true}>{this.state.hostAndRooms.entirePlace? `Entire ${this.state.hostAndRooms.typeOfPlace}`: `Private Rooms in ${this.state.hostAndRooms.typeOfPlace}`} • {this.state.numbOfBedrooms} {this.state.numbOfBedrooms <2? 'bed':'beds'}</RoomInfo>
                    </RoomDescription>
                    :
                    <RoomDescription>
                        <RoomInfo superhost={false}>{this.state.hostAndRooms.entirePlace? `Entire ${this.state.hostAndRooms.typeOfPlace}`: `Private Rooms in ${this.state.hostAndRooms.typeOfPlace}`} • {this.state.numbOfBedrooms} {this.state.numbOfBedrooms <2? 'bed':'beds'}</RoomInfo>
                    </RoomDescription>
                    }

                    

                    <Reviews><Star></Star>{this.state.average} ({this.state.reviews.length})</Reviews>
                    
                </RoomType>
                <RoomName>{this.state.placeName}</RoomName>
                <RoomPrice>${Math.floor(this.state.price)} / night</RoomPrice>

                
            </SuggestionContainer>
        )
    }
}





export default Suggestion;


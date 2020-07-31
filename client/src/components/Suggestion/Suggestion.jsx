import React,{useState} from 'react';
import styled from 'styled-components';
import FavoriteIcon from '@material-ui/icons/Favorite';


import axios from 'axios';

const Star = styled.div`
#suggestions & {
  background: #FF385C;
  clip-path: polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%);
  display: inline-block;
  height: 14px;
  width: 14px;
  margin-right:5px;
  align-items:center;
}
}
`;

const Circle = styled.div`
#suggestions & {
    background:#F0F0F0;
    border-radius:50%;
    display:${({hover}) => hover?'flex':'none'};
    position: absolute;
    top:3%;
    right:3%;
    width:11%;
    height:16%;
    align-items: center;
    justify-content:center;

    &:hover{
        background:white;
    }
}
`;

const Heartsign= styled(FavoriteIcon)`
#suggestions & {
    position:relative;
    display:${({hover}) => hover?'block':'none'};

    text-align:center;
    margin-left:auto;
    margin-right:auto;
    fill: ${({favorite}) => !favorite? 'white !important':'rgb(255,56,92) !important'};
    height:60% !important;
    width:60% !important;
    
}

`;

// rgb(255, 56, 92)

const SuggestionContainer = styled.div`
#suggestions & {

    width:100%;
    &:hover{
        cursor:pointer;
    };
    height:100%;
 
}
`;

const ImageBox = styled.div`
#suggestions & {
    height:50%;
    position:relative;
    width:100%;
}

`;


const Image = styled.img`
#suggestions & {
    width:100%;
    height:100%;
    position:relative:
    top:0;
    bottom:0;
    left:0;
    right:0;
    max-width:100%;
    max-height:100%;
    object-fit:covers !important;

}
`;

const Superhost = styled.div`
#suggestions & {
    background:white;
    border-style:solid;
    border-color:black;
    padding:3px;
    border-radius:5px;
    border-width: thin;
    margin-right:5px;
    width:25%;
    text-align:center;
    font-size:0.5em;
    height:100%;
    align-items:center;
}
`;


const RoomType = styled.div`
#suggestions & {
    display:flex;
    justify-content:space-between;
    margin-top:0.7rem;
    width:98%;
    align-items:center;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;

}
`;

const RoomName=styled.div`
#suggestions & {
    margin-top:0.5rem;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
    font-size:1em;
    width:95%;

}
`;

const RoomPrice = styled.div`
#suggestions & {
    margin-top:0.5rem;
    font-size:1em;
}
`;

const Reviews = styled.div`
#suggestions & {
    width:50%;
    text-align:right;
    font-size:1em;
    height:100%;
    align-items:center;
    overflow:hidden;
    text-overflow:ellipsis;
    white-space:nowrap;
}
 `;

const RoomDescription= styled.div`
#suggestions & {
    display:flex;
    justify-content:flex-start;
    width:50%;
    font-size:1em;
}
`;


const RoomInfo = styled.div`
#suggestions & {
    overflow:hidden;
    text-overflow:ellipsis;
    width:${({superhost})=>superhost? `65%`: `90%`};
    white-space:nowrap;
    font-size:1em;
    color:#A0A0A0;
    height:100%;
}
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
            superhost:null,
            hover:false,
            favorite:false,
            photoUrl:''
        }

        this.getAverage = this.getAverage.bind(this);
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseLeave = this.mouseLeave.bind(this);
        this.addFavorite = this.addFavorite.bind(this);
    }




    componentDidMount(){  

        axios.get(`http://52.14.214.44:8080/api/reviews/${this.props.suggestion.listingId}`)
            .then(res =>{

                this.setState({
                    reviews:res.data
                })
            }).catch(err =>{
                console.log(err);
                console.log('could not retrieve reviews data')
            });
        this.getAverage();

        axios.get(`http://3.19.16.18/api/reservation/${this.props.suggestion.listingId}`)
            .then(res =>{

                this.setState({
                    price:res.data.standardPrice
                })
            }).catch(err =>{
                console.log(err);
                console.log('could not retrieve price data');
            })
        
        axios.get(`http://52.14.166.9:4000/api/description/${this.props.suggestion.listingId}`)
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

        axios.get(`http://3.12.169.208:2000/api/host/${this.props.suggestion.listingId}`)
            .then(res =>{
                this.setState({
                    superhost:JSON.parse(res.data.superhost)
                })
            }).catch(err =>{
                console.log(err);
                console.log('could not retrieve superhost data')
            });

        axios.get(`http://52.14.166.9:3001/api/photos/thumbnail/${this.props.suggestion.listingId}`)
            .then(res =>{
                this.setState({
                    photoUrl: res.data.thumbNail
                })

            }).catch(err =>{
              console.log(err);
              console.log('could not retrive thumbnail data');  
            })
    }

    componentDidUpdate(prevProps) {
        if(this.props.suggestion.listingId !== prevProps.suggestion.listingId) 
        {

            axios.get(`http://52.14.214.44:8080/api/reviews/${this.props.suggestion.listingId}`)
                .then(res =>{
                    console.log(this.state);
                    this.setState({
                        reviews:res.data
                    })
                }).catch(err =>{
                    console.log(err);
                    console.log('could not retrieve reviews data')
                });
            this.getAverage();
    
            axios.get(`http://3.19.16.18/api/reservation/${this.props.suggestion.listingId}`)
                .then(res =>{
                    this.setState({
                        price:res.data.standardPrice
                    })
                }).catch(err =>{
                    console.log(err);
                    console.log('could not retrieve price data');
                })
            
            axios.get(`http://52.14.166.9:4000/api/description/${this.props.suggestion.listingId}`)
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
    
            axios.get(`http://3.12.169.208:2000/api/host/${this.props.suggestion.listingId}`)
                .then(res =>{
                    this.setState({
                        superhost:JSON.parse(res.data.superhost)
                    })
                }).catch(err =>{
                    console.log(err);
                    console.log('could not retrieve superhost data')
                });

                axios.get(`http://52.14.166.9:3001/api/photos/thumbnail/${this.props.suggestion.listingId}`)
                .then(res =>{
                    this.setState({
                        photoUrl: res.data.thumbNail
                    })
    
                }).catch(err =>{
                  console.log(err);
                  console.log('could not retrive thumbnail data');  
                })
        }
      } 


    
    mouseEnter(){
        this.setState({
            hover:true
        })
    }

    mouseLeave(){
        this.setState({
            hover:false
        })
    }

    addFavorite(){
        this.setState(prevState=>({
            favorite:!prevState.favorite
        }))
    }

    getAverage(){
        axios.get(`http://52.14.214.44:8080/api/reviews/${this.props.suggestion.listingId}?type=review`)
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

                <ImageBox className="suggestionimgbox" style={{backgroundImage:`url('${this.state.photoUrl}')`,backgroundSize:'100% 100%', backgroundRepeat:'no-repeat'}} onMouseEnter={this.mouseEnter} onMouseLeave={this.mouseLeave}><Circle className="circleicon" hover={this.state.hover?1:0}><Heartsign id="hearticon" className={`heartsignicon${this.props.suggestion.listingId}`} onClick={this.addFavorite} favorite={this.state.favorite?1:0} border={1} stroke={"black"} strokeWidth={0.8} hover ={this.state.hover?1:0}/></Circle></ImageBox>
                {/* <RoomType> 
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

                <Reviews className="suggestionReviews"><Star></Star>{`${this.state.average} (${this.state.reviews.length})`}</Reviews>
                    
                </RoomType> */}
                <RoomName>{this.state.placeName}</RoomName>
                <RoomPrice><p style={{fontWeight:"bold", display:"inline-block", fontSize:'1em'}}>${Math.floor(this.state.price)}</p> / night</RoomPrice>

                
            </SuggestionContainer>
        )
    }
}





export default Suggestion;


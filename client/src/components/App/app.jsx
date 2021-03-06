import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import $ from 'jquery';

import Suggestion from '../Suggestion/Suggestion.jsx';


const AppContainer = styled.div`
#suggestions & {
  background-color: rgb(247,247,247);  
  width:100%;
  height:400px;
}
`;

const NavContainer = styled.div`
#suggestions & {
  display:flex;
  justify-content:space-between;
  margin-bottom:1rem;
  width:100%;
  height:10%;
}
`;



const SuggestionsContainer = styled.div`
#suggestions & {
  display:grid;
  grid-template-columns: 22% 22% 22% 22%;
  grid-gap:4%;
  width:100%;
  height:90%;
}
`;

// grid-template-columns: repeat(4, 1fr);

const MorePlace = styled.h2`
#suggestions & {
  display:block;
}
`;

const Pagination = styled.div`
#suggestions & {
}

`;

const SlideButton = styled.button`
#suggestions & {
  border:none;
  outline:none !important;
  color:black;
  background-color:white;
  text-align:center;
  text-decoration:none;
  display:inline-block;
  font-size:1.6vmin;
  margin: 1vmin 0.5vmin;
  border-radius:50%;
  height:2.6vmin;
  width:2.6vmin;
  box-shadow: 0.5px 0.5px 0.5px 1px 	#A9A9A9;

  &:hover{
    cursor:pointer;
  }
}
`;

const Suggestions = styled(Suggestion)`
width:22%`;



class App extends React.Component {
  constructor(props){
    super(props);

    this.requestedId = JSON.parse(window.location.pathname.split('/')[window.location.pathname.split('/').length-2]);

    this.state ={
      listingId : this.requestedId,
      suggestions:[],
      currentPage:1,
      todosPerPage:4,
      currentImageIndex: 0
    }

    this.handleClick = this.handleClick.bind(this);
    this.addFavorite= this.addFavorite.bind(this);

  }

  addFavorite(index){
    var index= Number(index);

    let {suggestions} = {...this.state};
    var item = suggestions.findIndex((cur,idx) =>{return idx === index})



    suggestions[item]['favorite'] = !suggestions[item]['favorite'];
    this.setState({
      suggestions:suggestions
    })

  }

  handleClick(direction){
    if(direction ==="left"){
      if(this.state.currentPage >1){
        this.setState(prevState =>({
          currentPage: prevState.currentPage -1
        }))
      }
    }else{

      if(this.state.currentPage < 3){
        this.setState(prevState =>({
          currentPage: prevState.currentPage +1
        }))
      }    
    }
  }

  shouldComponentUpdate(){
    return true;
  }

  componentDidMount(){

    axios.get(`http://52.14.214.44:8081/api/suggestions/${this.state.listingId}`)
      .then(res =>{
      this.setState({
        suggestions: res.data.map(obj =>({...obj, favorite:false}))
      })
      })
      .catch(err =>{
      console.log(err);
      console.log('componentDidMount failed')
      console.log(window.location.protocol + '//' +  window.location.host + `/api/suggestions/${this.state.listingId}`)
    })

  }
  

  render(){
    const {suggestions,currentPage,todosPerPage} = this.state;

    const indexOfLastTodo = currentPage*4;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentSuggestions = suggestions.slice(indexOfFirstTodo, indexOfLastTodo);

    return(

        <AppContainer>
          <NavContainer>
            <MorePlace>More places to stay</MorePlace>
            <Pagination>
              {`${this.state.currentPage} / 3        `} 
              <SlideButton className="Carousel_leftClick" onClick={() =>{this.handleClick('left')}}>{`<`}</SlideButton>
              <SlideButton className="Carousel_rightClick" onClick={() =>{this.handleClick('right')}}>{`>`}</SlideButton>
              </Pagination>
          </NavContainer>
          <SuggestionsContainer className="SuggestionContainer">

            {
              currentSuggestions.map((suggestion,key)=>{
                
                if(this.state.currentPage === 1){
                  key = key
                }else if(this.state.currentPage === 2){
                  key = key+4;
                } else if(this.state.currentPage ===3){
                  key = key+8;
                }

                return <Suggestion className = "suggestionComponent" favoriteClick = {this.addFavorite} favoriteSuggestion={this.state.suggestions} suggestion ={suggestion} index = {key} key={key}></Suggestion>
              })
            }

          </SuggestionsContainer>

        </AppContainer>

    )
  }
}

export default App;


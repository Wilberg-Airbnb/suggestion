import React from 'react';
import axios from 'axios';
import styled from 'styled-components';
import $ from 'jquery';

import Suggestion from '../Suggestion/Suggestion.jsx';


const AppContainer = styled.div`
  background-color: rgb(247,247,247);  
  margin: 4rem 10rem;
`;

const NavContainer = styled.div`
  display:flex;
  justify-content:space-between;
  margin-bottom:1rem;
`;

const SuggestionsContainer = styled.div`
  display:grid;
  grid-template-columns: auto auto auto auto;
  justifycontent: space-between;
  width:100%;
  max-width:100%
`;

// const SuggestionsContainer = styled.div`
//   display:flex;
//   overflow:auto;

//   grid-template-columns: auto auto auto auto;
//   justifycontent: space-between;
//   width:100%;
// `;

const MorePlace = styled.h2`
  display:block;
`;

const Pagination = styled.div`

`;

const SlideButton = styled.button`
  border:none;
  color:black;
  background-color:white;
  text-align:center;
  text-decoration:none;
  display:inline-block;
  font-size:16px;
  margin: 10px 5px;
  border-radius:50%;
  height:32px;
  width:32px;
  box-shadow: 0.5px 0.5px 0.5px 1px 	#A9A9A9;

  &:hover{
    cursor:pointer;
  }
`;



class App extends React.Component {
  constructor(props){
    super(props);

    this.requestedId = JSON.parse(window.location.pathname.split('/')[window.location.pathname.split('/').length-1]);

    this.state ={
      listingId : this.requestedId,
      suggestions:[],
      currentPage:1,
      todosPerPage:4,
      currentImageIndex: 0
    }

    this.handleClick = this.handleClick.bind(this);

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

  componentDidMount(){
    axios.get(`http://localhost:8081/api/suggestions/${this.state.listingId}`)
      .then(res =>{
      this.setState({
        suggestions: res.data
      },()=>{console.log(this.state.suggestions)})
      })
      .catch(err =>{
      console.log(err);
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
              <SlideButton onClick={() =>{this.handleClick('left')}}>{`<`}</SlideButton>
              <SlideButton onClick={() =>{this.handleClick('right')}}>{`>`}</SlideButton>
              </Pagination>
          </NavContainer>
          <SuggestionsContainer>

            {
              currentSuggestions.map((suggestion,key)=>{
                return <Suggestion suggestion ={suggestion} index = {key} key={key}></Suggestion>
              })
            }

          </SuggestionsContainer>

        </AppContainer>

    )
  }
}

export default App;


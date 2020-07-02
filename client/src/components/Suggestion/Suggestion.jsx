import React from 'react';
import styled from 'styled-components';


const ImageBox = styled.div`
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


const Suggestion = ({suggestion,index}) =>{
    console.log(index);

    return(
        <SuggestionContainer index = {index}>
            <ImageBox><Image src={suggestion.pictureURL} alt="picture"></Image></ImageBox>
        </SuggestionContainer>
    )
}

export default Suggestion;


import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow, configure } from "enzyme";
import axios from "axios";
import puppeteer from 'puppeteer';
import {suggestionsData,teststate} from './testdata.js';
import Suggestion from './Suggestion.jsx';
import 'jest-styled-components';

configure({adapter:new Adapter() });


const testObj = {'listingId':11};

expect.extend({
    toBeWithinRange(received, floor, ceiling) {
      const pass = received >= floor && received <= ceiling;
      if (pass) {
        return {
          message: () =>
            `expected ${received} not to be within range ${floor} - ${ceiling}`,
          pass: true,
        };
      } else {
        return {
          message: () =>
            `expected ${received} to be within range ${floor} - ${ceiling}`,
          pass: false,
        };
      }
    },
  });

describe('<Suggestion/>',()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = mount(<Suggestion suggestion={testObj}/>);

        wrapper.setState({
            reviews:teststate.reviews,
            average:teststate.average,
            price:teststate.price,
            placeName:teststate.placeName,
            numbOfBedrooms:teststate.numbOfBedrooms,
            hostAndRooms:teststate.hostAndRooms,
            superhost:teststate.superhost,
            hover:teststate.hover,
            favorite:teststate.favorite,
            photoUrl:teststate.photoUrl
        })

    })

    it('should add to become a favorite when click hearticon',() =>{
               
        
        expect(wrapper.state().favorite).toBe(false);
        wrapper.find(`.heartsignicon11`).at(0).simulate('click');
        expect(wrapper.state().favorite).toBe(true);
    });

    it('should appear hearticon when mouseenter image',() =>{

        var heart = wrapper.find('.heartsignicon11').at(1);
        expect(wrapper.find(`.heartsignicon11`).first().props('style')).toHaveProperty('hover',0);
        wrapper.find('.suggestionimgbox').at(0).simulate('mouseEnter');
        expect(wrapper.find(`.heartsignicon11`).first().props('style')).toHaveProperty('hover',1)
        wrapper.find('.suggestionimgbox').at(0).simulate('mouseLeave');
        expect(wrapper.find(`.heartsignicon11`).first().props('style')).toHaveProperty('hover',0);

    });

    it('should show average review score to two decimal places',() =>{
        let reviews = wrapper.find('.suggestionReviews').first().text().split(' ');
        expect(Number(reviews[0])).toBeWithinRange(1,5);
        expect(reviews[0].length).toBe(4);

    })

})

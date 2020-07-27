import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { mount, shallow, configure } from "enzyme";
import App from "./app.jsx";
import axios from "axios";
import puppeteer from 'puppeteer';
import {suggestionsData} from './testdata.js';

Enzyme.configure({ adapter: new Adapter(), disableLifecycleMethods: true });

//App unit testing


describe('<App />', () => {

  it('should find the listingId based on url param', async (done) => {
    global.window = Object.create(window);
    const url = "http://localhost:8081/15/";
    Object.defineProperty(window, 'location', {
      value: {
        href: url,
        pathname: '/15/'
      }
    })

    var wrapper = shallow(<App />);
    expect(wrapper.state().listingId).toEqual(15);
    done();
  })


   it('should call componentDidMount ', () => {
    const wrapper = shallow(<App/>);

    const instance = wrapper.instance();
    jest.spyOn(instance, 'componentDidMount'); 
    instance.componentDidMount();
    expect(instance.componentDidMount).toHaveBeenCalledTimes(1);
   });
   

   it('call axios to make get request to get data',() =>{
    const getSpy = jest.spyOn(axios,'get');
    const wrapper = mount(<App/>);

    expect(getSpy).toBeCalled();
   });

   
   it('should change current page when click arrow button',() =>{
    const wrapper = shallow(<App/>);
    const rightbutton = wrapper.find('.Carousel_rightClick');
    const leftbutton = wrapper.find('.Carousel_leftClick');

    expect(wrapper.state().currentPage).toBe(1);
    rightbutton.simulate('click');
    expect(wrapper.state().currentPage).toBe(2);
    leftbutton.simulate('click');
    expect(wrapper.state().currentPage).toBe(1);

})

  it('Can click slideButton', async () => {
    let browser = await puppeteer.launch({
      headless: false,
      devtools: true,
      slowMo: 250
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 900
      },
      userAgent: ''
    });

    await page.goto('http://localhost:8081/12');
    await page.waitForSelector('.Carousel_rightClick');
    await page.waitForSelector('.Carousel_leftClick');
    await page.click('#suggestions > div > div.sc-fznKkj.kUzAYA > div > button:nth-child(2)');
    await page.click('#suggestions > div > div.sc-fznKkj.kUzAYA > div > button:nth-child(1)');
            
    browser.close();
  }, 9000000);

});

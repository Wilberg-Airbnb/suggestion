// import '../../test/setupTests.js';
import React from 'react';
import { shallow, mount, render } from 'enzyme';
import Profile from './Profile.jsx';

// import Adapter from 'enzyme-adapter-react-16';
// import { shallow, configure } from 'enzyme';

// configure({adapter: new Adapter()});

it('expect to render Profile component',()=>{
  expect(shallow(<Profile/>).length).toEqual(1)
})





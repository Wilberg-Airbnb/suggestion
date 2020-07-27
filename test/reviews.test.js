// const {dbConnection} = require('../MYSQL/index.js');
const request = require('supertest')
const {app} = require('../server/index.js');
const {generateSeed2} = require('../server/seed.js')




describe('dummy data generation seed Test',() =>{

    test('generate information for 100 listingIds for place suggestions', async() =>{
    const suggestionSeed = await generateSeed2();
    expect(suggestionSeed.length).toEqual(100);
    expect(suggestionSeed[0].placeName).toEqual(expect.any(String))
    })
    
});

describe('server endpoints Test',()=>{

  test('It should response the GET method', () => {
    return request(app)
     .get('/api/suggestions/0')
     .then((response) => {
       expect(typeof JSON.parse(response.text)).toBe('object');

       });
   });

  test("it should give an array length of 12 with each index consisting of suggested listingId information", async() =>{
    const response = await request(app).get("/api/suggestions/15");

    expect(JSON.parse(response.text).length).toEqual(12);
    expect(JSON.parse(response.text)[0].listingId).toEqual(expect.any(Number))
  })

  
})


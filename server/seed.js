var faker = require('faker');
var chance = require('chance');
var chanced = new chance();
var fs = require('fs');
const Promise = require('bluebird');

const {dbConnection} = require('../MYSQL/index.js');
const queryPromise = Promise.promisify(dbConnection.query).bind(dbConnection);


function weightedRandomDistrib(min,max,mean,varianceFactor) {
  let prob = [], seq = [];
  for(let i=min;i<max;i++) {
    prob.push(Math.pow(max-Math.abs(mean-i),varianceFactor));
    seq.push(i);
  }

  return chanced.weighted(seq, prob);
}





function generateSeed2(){
  var roomtype = ['Entire place', 'private rooms','shared room'];
  let seed2 = [];
  for(var i = 0; i<100;i++){
    var obj ={
      listingId:i,
      superhost: Math.random() >= 0.6,
      roomtype: roomtype[Math.floor(Math.random()*3)],
      numberOfBeds : faker.random.number({min:0,max:3}),
      placeName: faker.lorem.word(),
      price: faker.finance.amount(40,250,2),
      pictureURL:`https://source.unsplash.com/320x240/?houses/${i}`
    }

    seed2.push(obj)

  }
  return seed2
}



var seed2= generateSeed2()

fs.writeFile(__dirname+'/dummyData2.txt', JSON.stringify(seed2), err =>{
  if(err){
    console.log('error writing dummy data',err)
  }else{
    console.log('succesfully wrote dummy data file');

    let seed2Promises = [];

    for(let i = 0; i<seed2.length; i++){
      let place = seed2[i];
 

      let {listingId,superhost,roomtype,numberOfBeds,placeName,price,pictureURL} = place;

      let queryArgs =[listingId,superhost,roomtype,numberOfBeds,placeName,price,pictureURL]

      seed2Promises.push(new Promise((resolve,reject) =>{
        dbConnection.query('INSERT INTO suggestions (listingId,superhost,roomtype,numbOfBedrooms,placeName,price,pictureURL) VALUES (?,?,?,?,?,?,?)',queryArgs,(err,results) =>{
          resolve(results);
        })
      }))
    }

    return Promise.all(seed2Promises).then(done =>{
      console.log('done with suggestions seed')
    }).catch(err =>{
      console.log("seed2",err);
    })


  }
})



module.exports.generateSeed2=generateSeed2;

module.exports.seed2 = seed2;

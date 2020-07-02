var faker = require('faker');
var chance = require('chance');
var chanced = new chance();
var fs = require('fs');
const Promise = require('bluebird');

// const {Reviews,save} = require ('../MongoDB/index.js');
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


function generateSeed(){
  var seed = [];

  for(var i = 0 ; i<100;i++){
    var seedArr=[];
    var numReviews = weightedRandomDistrib(1,100,40,3);
    for(var j = 0; j<numReviews ; j++){
      var obj = {
        listingId : i,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        avatarURL:faker.internet.avatar(),
        comments: faker.lorem.sentences(),
        createdAt:faker.date.between('2015-01-01','2020-07-10'),
        cleanliness: faker.random.number({min:1,max:5}),
        accuracy:faker.random.number({min:1,max:5}),
        communication:faker.random.number({min:1,max:5}),
        location:faker.random.number({min:1,max:5}),
        checkIn:faker.random.number({min:1,max:5}),
        value:faker.random.number({min:1,max:5})
      }
      seedArr.push(obj);
    }
    seed.push(seedArr)
  }
  return seed;
}


// function generateSeed2(){
//   var roomtype = ['Entire place', 'private rooms','shared room'];
//   var seed2 = [];
//   for(var i = 0; i<12;i++){
//     var obj ={
//       listingId:faker.random.number({min:0,max:99}),
//       roomtype: roomtype[Math.floor(Math.random()*3)],
//       numberOfBeds : faker.random.number({min:0,max:3}),
//       placeName: faker.lorem.words(),
//       price: faker.finance.amount(40,250,2),
//       pictureURL:'https://source.unsplash.com/320x240/?houses'
//     }

//     seed2.push(obj)

//   }
//   return seed2
// }

function generateSeed2(){
  var roomtype = ['Entire place', 'private rooms','shared room'];
  var seed2 = [];
  for(var i = 0; i<100;i++){
    var obj ={
      listingId:i,
      roomtype: roomtype[Math.floor(Math.random()*3)],
      numberOfBeds : faker.random.number({min:0,max:3}),
      placeName: faker.lorem.word(),
      price: faker.finance.amount(40,250,2),
      pictureURL:'https://source.unsplash.com/320x240/?houses'
    }

    seed2.push(obj)

  }
  return seed2
}


var seed = generateSeed();

fs.writeFile(__dirname+'/dummyData.txt', JSON.stringify(seed), err =>{
  if(err){
    console.log('error writing dummy data',err)
  }else{
    console.log('succesfully wrote dummy data file')

    let promises = [];



      for(let i = 0; i<seed.length;i++){
        listIdReviews = seed[i];

        for(let j=0;j<listIdReviews.length; j++){
          let review = listIdReviews[j];

          let {listingId,firstName,lastName,avatarURL,comments,createdAt,cleanliness,accuracy,communication,location,checkIn,value} = review

          let average = (cleanliness+accuracy+communication+location+checkIn+value)/6;

          let queryArgs = [listingId,firstName,lastName,avatarURL,comments,createdAt,cleanliness,accuracy,communication,location,checkIn,value,average]

          promises.push(new Promise((resolve,reject) =>{
            dbConnection.query('INSERT INTO reviews (listingId,firstName,lastName,avatarURL,comments,createdAt,cleanliness,accuracy,communication,location,checkIn,value,average) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',queryArgs,(err,result)=>{
              resolve(result);
            })

          }))

        }
      }
    return Promise.all(promises).then(done =>{
      console.log('done with reviews seed');
    }).catch(err =>{
      console.log("seed1",err);
    })

  }
})

seed2= generateSeed2()

fs.writeFile(__dirname+'/dummyData2.txt', JSON.stringify(seed2), err =>{
  if(err){
    console.log('error writing dummy data',err)
  }else{
    console.log('succesfully wrote dummy data file');

    let seed2Promises = [];

    for(let i = 0; i<seed2.length; i++){
      let place = seed2[i];

      console.log(place.pictureURL)

      let {listingId,roomtype,numberOfBeds,placeName,price,pictureURL} = place;

      let queryArgs =[listingId,roomtype,numberOfBeds,placeName,price,pictureURL]

      seed2Promises.push(new Promise((resolve,reject) =>{
        dbConnection.query('INSERT INTO suggestions (listingId,roomtype,numbOfBedrooms,placeName,price,pictureURL) VALUES (?,?,?,?,?,?)',queryArgs,(err,results) =>{
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


module.exports.generateSeed= generateSeed;
module.exports.generateSeed2=generateSeed2;
module.exports.seed = seed;
module.exports.seed2 = seed2;

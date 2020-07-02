const express = require('express');
const {dbConnection} = require('../MYSQL/index.js');
const morgan = require('morgan');
const path = require('path');

const app = express();
app.use(express.static('public/dist'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'))


app.get('/api/suggestions/:listingId',(req,res) =>{
  console.log('received')
  const listingId = req.params.listingId;
  let listArr=[Number(listingId)];

  let lists = new Array(100).fill(null).map((ele,idx) =>{return idx})

  lists.splice(listingId,1);

  for(var j =0; j<11;j++){
    var random = lists[Math.floor(Math.random() * lists.length)];
    listArr.push(random);
    var index = lists.indexOf(random)
    lists.splice(index,1);
  }

  var result = []
  listArr.forEach(listId =>{
    result.push(new Promise((resolve,reject)=>{
      dbConnection.query(`SELECT * FROM suggestions WHERE listingId=${listId}`,(err,listObj)=>{

        resolve(listObj[0])
      })
    }))
  })

  return Promise.all(result).then(suggestList =>{
    res.json(suggestList)
  }).catch(err =>{
    console.log(err);
  })



})


app.get('/api/reviews',(req,res) =>{
  console.log('sss')
  if(req.query.array){
    var array = JSON.parse(req.query.array);

    var averageReviews = [];

    for(let i =0; i<array.length;i++){
      let listingId = Number(array[i]);
      averageReviews.push(new Promise((resolve,reject) =>{
        dbConnection.query(`SELECT average FROM reviews WHERE listingId = ${listingId}`, (err,listObj)=>{
          if(err){
            console.log(err)
          }

          let avgValue = listObj.reduce((a, b) => a + b.average,0) / listObj.length;

          console.log(avgValue);
          resolve(avgValue)
        })
      }))
    }

    return Promise.all(averageReviews).then(avgArr =>{
      let avgValue = avgArr.reduce((a, b) => a + b) / avgArr.length;


      res.json(parseFloat((avgValue).toFixed(2)));
    }).catch(err =>{
      console.log(err);
    })
  }
})

app.get('/:listingId',(req,res) =>{
  if(req.params.listingId> 99){
    res.sendStatus(404);
  }

  var currentPage = path.join(__dirname, '../public/dist/index.html');

  res.sendFile(currentPage)
})

module.exports.app = app;



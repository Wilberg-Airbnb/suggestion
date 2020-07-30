const express = require('express');
const {dbConnection} = require('../MYSQL/index.js');
const morgan = require('morgan');
const {join} = require('path');
const cors = require('cors');
const compression = require('compression');

const app = express();
app.use(compression());
app.use(cors());
app.use(express.static('public/dist'));

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('combined'));


app.use((req,res,next) =>{
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Headers','Origin','X-Requested-With','Content-Type','Accept')
  next();
})

//app.use('/:listingId/', express.static('public/dist'));




app.get('/bundle.js',(req,res) =>{

  if(req.header('Accept-Encoding').includes('br')) {
    console.log('calling brotli');
    res.set('Content-Encoding', 'br');
    res.set('Content-Type','application/javascript');
    res.sendFile(join(__dirname,'../','public','dist','bundle.js.br'))
  } else if(req.header('Accept-Encoding').includes('gz')){
    console.log('calling gzip');
    res.set('Content-Encoding','gzip');
    res.set('Content-Type','application/javascript');
    res.sendFile(join(__dirname,'../','public','dist','bundle.js.gz'))
  }else{
    console.log('calling uncompressed');
    res.sendFile(join(__dirname,'../','public','dist','bundle.js'))
  }
});

app.use('/:listingId/', express.static('public/dist'));


app.use('/:listingId/', express.static('public/dist'));

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


module.exports.app = app;



const express = require('express')
const app = express()
const bodyParser= require('body-parser')
const MongoClient = require('mongodb').MongoClient



var db

MongoClient.connect('mongodb://Keith.E:password@ds119380.mlab.com:19380/quote-app', (err, database) => {

 if (err) return console.log(err)
  db = database
 // app.listen(3000, () => {
   // console.log('listening on 3000')
  //})
 
})



app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.set(bodyParser.json())
app.set(express.static('public'))

app.get('/', (req, res)=>{
 db.collection('quotes').find().toArray((err, result)=>{
  if (err) return console.log(err)
  res.render('index.ejs', {quotes: result})
  })
})


app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)
    console.log('saved to database')
    res.redirect('/home/keith/Documents/test/index.html')
  })
})







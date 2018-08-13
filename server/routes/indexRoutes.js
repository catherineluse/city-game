const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//knex.select('title', 'author', 'year').from('books')


router.get('/population', function(req, res, next){
  knex.schema.raw('SELECT "GC_RANK.display-label2","rescensus42010","respop72017" FROM "usa_population"')
    .then(cities => {
      console.log('number of results: ', cities.rows.length)
      return res.json(cities.rows)
    })
    .error((error)=>{
      return error;
    })
})

router.get('/coordinates', function(req, res, next){
  knex.schema.raw('SELECT "NAME","INTPTLAT","INTPTLONG" FROM "usa_coordinates"')
  .then(cities => {
    console.log('number of results: ', cities.rows.length)
    return res.json(cities.rows)
  })
  .error((error)=>{
    return error;
  })
})

module.exports = router;

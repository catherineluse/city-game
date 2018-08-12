const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// router.get('/american_cities', function(req, res, next){
//   knex('american_cities').then(cities => res.json(cities))
// })

module.exports = router;

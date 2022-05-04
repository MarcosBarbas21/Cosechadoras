const { Router } = require('express')
const router = Router();

const { renderIndex, renderAbout } = require('../controllers/index.controllers')

//routes
router.get('/', renderIndex);


router.get('/about', renderAbout);


module.exports = router;
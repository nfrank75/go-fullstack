const express = require('express');
const router = express.Router(); 


const auth = require('../middleware/auth');

const stuffCtrl = require('../controllers/stuff')


router.post('/', auth, stuffCtrl.createThing);
  

router.get('/',  auth, stuffCtrl.get_things);
  

router.get('/:id', auth,  stuffCtrl.get_one_thing);
  
  
router.put('/:id', auth, stuffCtrl.update_one_thing);
  

router.delete('/:id', auth, stuffCtrl.delete_thing);


module.exports = router;
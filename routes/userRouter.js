const router = require('express').Router();
const{signUp, verifyMail} = require('../controllers/userController');

router.route('/signup')
    .post(signUp);
router.route('/signup/verify')
    .post(verifyMail);


module.exports = router;
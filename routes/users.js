const router = require('express').Router();

router.get('/users', getUsers);
router.get('/users/:userId', getUser);
router.post('/users', createUser);

module.exports = router;

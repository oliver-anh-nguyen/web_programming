const express = require('express');
const path = require('path');
const options = {
    'caseSensitive': false,
    'strict': false
}
const router = express.Router(options);

router.get('/', (req, res, next) => {
    //throw new Error('Error in user page');
    res.sendFile(path.join(__dirname, '..', 'views', 'users.html'));
});

module.exports = router;
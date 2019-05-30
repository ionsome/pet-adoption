const user = require('../controllers/user.controller.js');

const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

module.exports = (app) => {
    const cards = require('../controllers/card.controller.js');

    app.post('/api/cards', user.authWrapper(cards.create));
    app.post('/api/upload', upload.single('file'), user.authWrapper(cards.uploadPhoto));
    app.get('/api/photo/:photoId', cards.getPhoto);
    app.get('/api/getMyCards', user.authWrapper(cards.findAll))
    app.get('/api/getAllCards', cards.getAll);
    app.get('/api/cards/:cardId', user.authWrapper(cards.findOne));
    app.post('/api/cards/:cardId', user.authWrapper(cards.update));
    app.delete('/api/cards/:cardId', user.authWrapper(cards.delete));
    app.delete('/api/cards', user.authWrapper(cards.deleteAll));
}
const user = require('../controllers/user.controller.js');

module.exports = (app) => {
    const tasks = require('../controllers/card.controller.js');

    app.post('/api/cards', user.authWrapper(tasks.create));
    app.get('/api/getMyCards', user.authWrapper(tasks.findAll))
    app.get('/api/getAllCards', tasks.getAll);
    app.get('/api/cards/:cardId', user.authWrapper(tasks.findOne));
    app.post('/api/cards/:cardId', user.authWrapper(tasks.update));
    app.delete('/api/cards/:cardId', user.authWrapper(tasks.delete));
    app.delete('/api/cards', user.authWrapper(tasks.deleteAll));
}
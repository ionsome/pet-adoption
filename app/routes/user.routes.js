
module.exports = (app) => {
    const user = require('../controllers/user.controller.js');

    app.post('/api/register', user.register);
    app.post('/api/login', user.login);
    app.post('/api/logout', user.logout);
    app.get('/api/username', user.authWrapper(user.getUsername));
    app.get('/api/firstname', user.authWrapper(user.getFirstname));
    app.get('/api/lastname', user.authWrapper(user.getLastname));
}
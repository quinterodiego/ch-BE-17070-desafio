const pugEngine = app => {
    app.set('views', './views/pug')
    app.set('view engine', 'pug')
}

module.exports = pugEngine
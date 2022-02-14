const ejsEngine = app => {
    app.set('views', './views/ejs')
    app.set('view engine', 'ejs')
}

module.exports = ejsEngine
const optionsMySQL = {
    client: 'mysql',
    connection: {
        host: 'localhost',
        user: 'root',
        password: '123456',
        database: 'dbdosan'
    },
    pool: { min: 0, max: 7 }
}

module.exports = { optionsMySQL };
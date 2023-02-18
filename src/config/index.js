const config = {

    production: {
        PORT: 3000,
        //Change database location
        DB_URI: 'mongodb://127.0.0.1:27017/examPrep',
        SECRET: "MySecret"
    },
    
    development: {
        PORT: 3000,
          //Change database location
        DB_URI: 'mongodb://127.0.0.1:27017/examPrep',
        SECRET: "MySecret"
    }
}

module.exports = config[process.env.node_env || "development"];
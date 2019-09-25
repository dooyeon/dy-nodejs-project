const environments = {
    development: {
        host: "localhost",
        port: "8000",
        redis: {
            password: "redistest",
            host: "localhost",
            port: 6379,
            user: 0,
            keyword: 1,
            search: 2
        }
    },

    test: {
        host: "localhost",
        port: "4000",
        redis: {
            password: "redis",
            host: "localhost",
            port: 6379
        }
    },

    production: {
        host: "localhost",
        port: "3000",
        mysql: {
            username: 'mvc',
            password: 'mvc',
            database: 'mvc_test'
        },
        redis: {
            password: "redis",
            host: "localhost",
            port: 6379
        }
    }
}

const nodeEnv = process.env.NODE_ENV || 'development';

module.exports = environments[nodeEnv];

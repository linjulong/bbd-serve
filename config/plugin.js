'use strict';

/** @type Egg.EggPlugin */
module.exports = {
    // had enabled by egg
    // static: {
    //   enable: true,
    // }
    jwt: {
        enable: true,
        package: "egg-jwt"
    },
    sequelize: {
        enable: true,
        package: 'egg-sequelize',
    },
    cors: {
        enable: true,
        package: 'egg-cors',
    },
    io: {
        enable: true,
        package: 'egg-socket.io',
    },
    redis: {
        enable: true,
        package: 'egg-redis',
    },
    validate: {
        enable: true,
        package: 'egg-validate',
    }
};
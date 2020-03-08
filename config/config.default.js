/* eslint valid-jsdoc: "off" */

'use strict';
const os = require('os');
///////////////////获取本机ip///////////////////////
function getIPAdress() {
    var interfaces = os.networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
}

const myHost = getIPAdress();
/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
    /**
     * built-in config
     * @type {Egg.EggAppConfig}
     **/
    const config = exports = {};

    // use for cookie sign key, should change to your own and keep security
    config.keys = appInfo.name + '_1567931979512_5170';

    // add your middleware config here
    config.middleware = ['authorization'];

    config.authorization = {
        enable: false,
        match(ctx) {
            //匹配不需要验证token的路由
            const url = ctx.request.url;
            if (url.startsWith('/base')) {
                return false;
            } else {
                return true;
            }
        }
    };

    //配置端口信息
    config.cluster = {
        listen: {
            port: 7002,
            hostname: myHost,
        }
    };

    //配置跨域
    config.security = {
        csrf: {
            enable: false,
            ignoreJSON: true
        },
        domainWhiteList: [`http://${myHost}:7002`, 'http://192.168.43.237:8080']
    };

    config.cors = {
        origin: '*',
        allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH'
    };

    config.jwt = {
        secret: "bbd" //自己设置的值
    };

    //配置数据库
    config.sequelize = {
        dialect: 'mysql',
        // dialectOptions: {
        //     charset: 'utf8mb4',
        // },
        // charset: 'utf8',
        host: '127.0.0.1',
        port: 3306,
        database: 'bbd',
        username: 'root',
        password: '684319',
        timezone: '+08:00', // 保存为本地时区
        logging: false,
        dialectOptions: {
            dateStrings: true,
            typeCast(field, next) {
                // for reading from database
                if (field.type === "DATETIME") {
                    return field.string();
                }
                return next();
            }
        },
        define: {
            freezeTableName: true,
            timestamps: false,
            //解决中文输入问题
            charset: 'utf8mb4'
        },
        // sync: { force: true }
    };

    config.io = {
        init: {}, // passed to engine.io
        namespace: {
            '/': {
                connectionMiddleware: ['auth'],
                packetMiddleware: [],
            }
        },
    };

    // add your user config here
    const userConfig = {
        // myAppName: 'egg',
        avatar: 'app/public/images/avatar/',
        equipment: 'app/public/images/equipment'
    };

    config.redis = {
        client: {
            port: 6379, // Redis port
            host: '127.0.0.1', // Redis host
            password: '684319',
            db: 0,
        },
    };

    return {
        ...config,
        ...userConfig,
    };
};
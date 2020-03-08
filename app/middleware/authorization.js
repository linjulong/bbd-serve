module.exports = () => {
    return async function(ctx, next) {
        if (ctx.get('Authorization')) {
            let token = ctx.get('Authorization');
            try {
                ctx.app.jwt.verify(token, ctx.app.config.jwt.secret);
            } catch (error) {
                if (error.name == 'TokenExpiredError') {
                    ctx.status = 401;
                    ctx.body = {
                        msg: '登录已超时'
                    }
                    return;
                } else {
                    ctx.status = 401;
                    ctx.body = {
                        msg: 'token失效'
                    }
                    return;
                }
            }
            await next();
        } else {
            ctx.status = 401;
            ctx.body = {
                msg: 'no token detected in http header Authorization'
            }
            return;
        }
    }
};
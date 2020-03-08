module.exports = app => {

    let { validator } = app;

    // 校验用户名是否正确
    validator.addRule('userName', (rule, value) => {
        if (/^\d+$/.test(value)) {
            return "用户名应该是字符串";
        } else if (value.length < 6 || value.length > 16) {
            console.log("用户名的长度应该在6-16之间");
        }
    });

    // 添加自定义参数校验规则
    validator.addRule('game_time', (rule, value) => {
        if (value == '') {
            return '比赛时间不能为空';
        }
    });

    validator.addRule('cityname', (rule, value) => {
        if (value == '') {
            return '比赛地点不能为空';
        }
    });

    validator.addRule('orientation', (rule, value) => {
        if (value == '') {
            return '位置不能为空';
        }
    });

};
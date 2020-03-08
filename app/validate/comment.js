module.exports = app => {

    let { validator } = app;

    validator.addRule('game_id', (rule, value) => {
        if (value < 0 || value == '') {
            return 'game_id不合法';
        }
    });

    validator.addRule('rate_id', (rule, value) => {
        if (value == '') {
            return '发布者id不能为空';
        } else if (value.length < 6 || value.length > 16) {
            return "用户名的长度应该在6-16之间";
        }
    });

    validator.addRule('be_rate_id', (rule, value) => {
        if (value == '') {
            return '发布者id不能为空';
        } else if (value.length < 6 || value.length > 16) {
            return "用户名的长度应该在6-16之间";
        }
    });

    validator.addRule('content', (rule, value) => {
        if (value == '') {
            return '评论内容不能为空';
        }
    });

};
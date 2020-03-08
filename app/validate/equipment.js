module.exports = app => {

    let { validator } = app;
    // 添加自定义参数校验规则
    validator.addRule('content', (rule, value) => {
        if (value == '') {
            return '内容不能为空';
        }
    });

    validator.addRule('img', (rule, value) => {
        if (value.length == 0) {
            return '图片不能为空';
        }
    });

    validator.addRule('price', (rule, value) => {
        if (!/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/.test(value)) {
            return "价格不合法";
        }
    });

    validator.addRule('tag', (rule, value) => {
        if (value == '') {
            return '标签不能为空';
        }
    });

    validator.addRule('username', (rule, value) => {
        if (value == '') {
            return '发布者id不能为空';
        } else if (value.length < 6 || value.length > 16) {
            return "用户名的长度应该在6-16之间";
        }
    });

    validator.addRule('district', (rule, value) => {
        if (value == '') {
            return '地区不能为空';
        }
    });

};
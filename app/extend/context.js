module.exports = {
    async getUsername() {
        const authorization = this.get('Authorization');
        const userInfo = await this.app.jwt.verify(authorization, this.app.config.jwt.secret);
        return userInfo.username;
    }
};
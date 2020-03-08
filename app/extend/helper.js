const sd = require('silly-datetime');

module.exports = {
    sillyDatetime(date) {
        return sd.format(date, 'YYYY-MM-DD HH:mm');
    },
    sillyToday() {
        return sd.format(new Date(), 'YYYY-MM-DD HH:mm:ss');
    },
    sillyFuture(timestamp) {
        sd.locate('zh-cn')
        return sd.fromNow(timestamp);
    }
};
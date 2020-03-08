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

const user = [
    { username: '863231099', nickname: '蔡徐坤', password: '684319', phone: '13078298906', avatar: `http://${myHost}:7002/public/images/avatar/caixukun.jpg` },
    { username: '777777', nickname: '吴亦凡', password: '777777', phone: '15816101122', avatar: `http://${myHost}:7002/public/images/avatar/wuyifan.jpg` }
]

const game = [
    { username: '863231099', game_number: 3, orientation: '控球后卫', create_time: "2019-10-01 14:07:31", create_stamp: 1, game_time: new Date().getTime() - 3600 * 1000 * 22, duration: 1, game_type: '5v5', poiaddress: "广东省广州市越秀区东风中路259号中山纪念堂", cityname: '广州市', district: "越秀区", lng: 113.264715, lat: 23.132888, chargeable: true, cost: 700, rate: 0 },
    { username: '863231099', game_number: 3, orientation: '得分后卫', create_time: "2019-10-01 14:07:31", create_stamp: 2, game_time: new Date().getTime() + 3600 * 1000 * 22, duration: 1.5, game_type: '4v4', poiaddress: "1广东省广州市越秀区东风中路259号中山纪念堂", cityname: '广州市', district: "海珠区", lng: 113.264715, lat: 23.132888, chargeable: false, cost: 700, rate: 0 },
    { username: '863231099', game_number: 3, orientation: '小前锋', create_time: "2019-10-01 14:07:31", create_stamp: 3, game_time: new Date().getTime() + 3600 * 1000 * 2, duration: 2, game_type: '3v3', poiaddress: "广东省广州市越秀区东风中路259号中山纪念堂", cityname: '广州市', district: "荔湾区", lng: 113.264715, lat: 23.132888, chargeable: false, cost: 0, rate: 0 },
    { username: '863231099', game_number: 3, orientation: '大前锋', create_time: "2019-10-01 14:07:31", create_stamp: 4, game_time: new Date().getTime() + 3600 * 1000 * 2, duration: 2.5, game_type: '3v3', poiaddress: "广东省广州市越秀区东风中路259号中山纪念堂", cityname: '广州市', district: "天河区", lng: 113.264715, lat: 23.132888, chargeable: false, cost: 0, rate: 0 },
    { username: '863231099', game_number: 3, orientation: '中锋', create_time: "2019-10-01 14:07:31", create_stamp: 5, game_time: new Date().getTime() + 3600 * 1000 * 2, duration: 3, game_type: '3v3', poiaddress: "广东省广州市越秀区东风中路259号中山纪念堂", cityname: '广州市', district: "白云区", lng: 113.264715, lat: 23.132888, chargeable: false, cost: 0, rate: 0 },
    { username: '863231099', game_number: 3, orientation: '小前锋 大前锋', create_time: "2019-10-01 14:07:31", create_stamp: 6, game_time: new Date().getTime() + 3600 * 1000 * 2, duration: 1, game_type: '5v5', poiaddress: "广东省广州市越秀区东风中路259号中山纪念堂", cityname: '广州市', district: "黄埔区", lng: 113.264715, lat: 23.132888, chargeable: false, cost: 0, rate: 0 },
    { username: '863231099', game_number: 3, orientation: '小前锋 大前锋', create_time: "2019-10-01 14:07:31", create_stamp: 7, game_time: new Date().getTime() + 3600 * 1000 * 2, duration: 1.5, game_type: '4v4', poiaddress: "广东省广州市越秀区东风中路259号中山纪念堂", cityname: '广州市', district: "南沙区", lng: 113.264715, lat: 23.132888, chargeable: false, cost: 0, rate: 0 },
    { username: '863231099', game_number: 3, orientation: '小前锋 大前锋', create_time: "2019-10-01 14:07:31", create_stamp: 8, game_time: new Date().getTime() + 3600 * 1000 * 2, duration: 2, game_type: '3v3', poiaddress: "广东省广州市越秀区东风中路259号中山纪念堂", cityname: '广州市', district: "番禺区", lng: 113.264715, lat: 23.132888, chargeable: false, cost: 0, rate: 0 },
    { username: '777777', game_number: 3, orientation: '小前锋 大前锋', create_time: "2019-10-01 14:07:31", create_stamp: 9, game_time: new Date().getTime() + 3600 * 1000 * 2, duration: 2.5, game_type: '3v3', poiaddress: "广东省广州市越秀区东风中路259号中山纪念堂", cityname: '广州市', district: "花都区", lng: 113.264715, lat: 23.132888, chargeable: false, cost: 0, rate: 0 },
    { username: '777777', game_number: 3, orientation: '小前锋 大前锋', create_time: "2019-10-01 14:07:31", create_stamp: 10, game_time: new Date().getTime() + 3600 * 1000 * 2, duration: 3, game_type: '3v3', poiaddress: "广东省广州市越秀区东风中路259号中山纪念堂", cityname: '广州市', district: "增城区", lng: 113.264715, lat: 23.132888, chargeable: false, cost: 0, rate: 0 },
    { username: '777777', game_number: 3, orientation: '小前锋 大前锋', create_time: "2019-10-01 14:07:31", create_stamp: 11, game_time: new Date().getTime() + 3600 * 1000 * 2, duration: 1, game_type: '5v5', poiaddress: "广东省广州市越秀区东风中路259号中山纪念堂", cityname: '广州市', district: "从化区", lng: 113.264715, lat: 23.132888, chargeable: false, cost: 0, rate: 0 },
    { username: '777777', game_number: 3, orientation: '小前锋 大前锋', create_time: "2019-10-01 14:07:31", create_stamp: 12, game_time: new Date().getTime() + 3600 * 1000 * 2, duration: 1.5, game_type: '4v4', poiaddress: "广东省广州市越秀区东风中路259号中山纪念堂", cityname: '广州市', district: "从化区", lng: 113.264715, lat: 23.132888, chargeable: false, cost: 0, rate: 0 },
    { username: '777777', game_number: 3, orientation: '小前锋 大前锋', create_time: "2019-10-01 14:07:31", create_stamp: 13, game_time: new Date().getTime() + 3600 * 1000 * 2, duration: 2, game_type: '3v3', poiaddress: "广东省广州市越秀区东风中路259号中山纪念堂", cityname: '广州市', district: "从化区", lng: 113.264715, lat: 23.132888, chargeable: false, cost: 0, rate: 0 },
    { username: '777777', game_number: 3, orientation: '小前锋 大前锋', create_time: "2019-10-01 14:07:31", create_stamp: 14, game_time: new Date().getTime() + 3600 * 1000 * 2, duration: 2.5, game_type: '3v3', poiaddress: "广东省广州市越秀区东风中路259号中山纪念堂", cityname: '广州市', district: "从化区", lng: 113.264715, lat: 23.132888, chargeable: false, cost: 0, rate: 0 },
    { username: '777777', game_number: 3, orientation: '小前锋 大前锋', create_time: "2019-10-01 14:07:31", create_stamp: 15, game_time: new Date().getTime() + 3600 * 1000 * 2, duration: 3, game_type: '3v3', poiaddress: "广东省广州市越秀区东风中路259号中山纪念堂", cityname: '广州市', district: "从化区", lng: 113.264715, lat: 23.132888, chargeable: false, cost: 0, rate: 0 },
    { username: '777777', game_number: 3, orientation: '小前锋 大前锋', create_time: "2019-10-01 14:07:31", create_stamp: 9, game_time: new Date().getTime() + 3600 * 1000 * 2, duration: 2.5, game_type: '3v3', poiaddress: "广东省广州市越秀区东风中路259号中山纪念堂", cityname: '广州市', district: "花都区", lng: 113.264715, lat: 23.132888, chargeable: false, cost: 0, rate: 0 },
    { username: '777777', game_number: 3, orientation: '小前锋 大前锋', create_time: "2019-10-01 14:07:31", create_stamp: 10, game_time: new Date().getTime() + 3600 * 1000 * 2, duration: 3, game_type: '3v3', poiaddress: "广东省广州市越秀区东风中路259号中山纪念堂", cityname: '广州市', district: "增城区", lng: 113.264715, lat: 23.132888, chargeable: false, cost: 0, rate: 0 },
    { username: '777777', game_number: 3, orientation: '小前锋 大前锋', create_time: "2019-10-01 14:07:31", create_stamp: 11, game_time: new Date().getTime() + 3600 * 1000 * 2, duration: 1, game_type: '5v5', poiaddress: "广东省广州市越秀区东风中路259号中山纪念堂", cityname: '广州市', district: "从化区", lng: 113.264715, lat: 23.132888, chargeable: false, cost: 0, rate: 0 },
    { username: '777777', game_number: 3, orientation: '小前锋 大前锋', create_time: "2019-10-01 14:07:31", create_stamp: 12, game_time: new Date().getTime() + 3600 * 1000 * 2, duration: 1.5, game_type: '4v4', poiaddress: "广东省广州市越秀区东风中路259号中山纪念堂", cityname: '广州市', district: "从化区", lng: 113.264715, lat: 23.132888, chargeable: false, cost: 0, rate: 0 },
    { username: '777777', game_number: 3, orientation: '小前锋 大前锋', create_time: "2019-10-01 14:07:31", create_stamp: 13, game_time: new Date().getTime() + 3600 * 1000 * 2, duration: 2, game_type: '3v3', poiaddress: "广东省广州市越秀区东风中路259号中山纪念堂", cityname: '广州市', district: "从化区", lng: 113.264715, lat: 23.132888, chargeable: false, cost: 0, rate: 0 },
    { username: '777777', game_number: 3, orientation: '小前锋 大前锋', create_time: "2019-10-01 14:07:31", create_stamp: 14, game_time: new Date().getTime() + 3600 * 1000 * 2, duration: 2.5, game_type: '3v3', poiaddress: "广东省广州市越秀区东风中路259号中山纪念堂", cityname: '广州市', district: "从化区", lng: 113.264715, lat: 23.132888, chargeable: false, cost: 0, rate: 0 },
    { username: '777777', game_number: 3, orientation: '小前锋 大前锋', create_time: "2019-10-01 14:07:31", create_stamp: 15, game_time: new Date().getTime() + 3600 * 1000 * 2, duration: 3, game_type: '3v3', poiaddress: "广东省广州市越秀区东风中路259号中山纪念堂", cityname: '广州市', district: "从化区", lng: 113.264715, lat: 23.132888, chargeable: false, cost: 0, rate: 0 },
]

const game_athletes = [
    { game_id: 1, username: '863231099' },
    { game_id: 1, username: '777777' },
    { game_id: 2, username: '863231099' },
    { game_id: 2, username: '777777' },
    { game_id: 3, username: '863231099' },
    { game_id: 4, username: '863231099' },
    { game_id: 5, username: '863231099' },
    { game_id: 6, username: '863231099' },
    { game_id: 7, username: '863231099' },
    { game_id: 8, username: '863231099' },
    { game_id: 9, username: '863231099' },
    { game_id: 10, username: '863231099' },
    { game_id: 11, username: '863231099' },
    { game_id: 12, username: '863231099' },
    { game_id: 13, username: '863231099' },
    { game_id: 14, username: '863231099' },
    { game_id: 15, username: '863231099' }
]

const equipment = [
    { equipment_id: 1, content: '蔡徐坤哈哈哈哈大萨达撒s蔡徐坤哈哈哈哈大萨达撒sad哈哈哈哈哈哈哈哈蔡徐坤哈哈哈哈大萨达撒sad哈哈哈哈哈哈哈哈ad哈哈哈哈哈哈哈哈', price: 111, tag: '可小刀 包邮', district: '越秀区', username: '863231099', create_stamp: 1576465833851 },
    { equipment_id: 2, content: '蔡徐坤哈哈哈哈哈哈哈哈哈哈哈哈', price: 222, tag: '可小刀 包邮', district: '从化区', username: '863231099', create_stamp: 1576465833851 },
    { equipment_id: 3, content: '蔡徐坤哈哈哈哈哈哈哈哈哈哈哈哈', price: 333, tag: '可小刀 包邮', district: '越秀区', username: '863231099', create_stamp: 1576465833851 },
    { equipment_id: 4, content: '444', price: 444, tag: '可小刀 包邮', district: '从化区', username: '863231099', create_stamp: 1576465833851 },
    { equipment_id: 5, content: '555', price: 555, tag: '可小刀 包邮', district: '越秀区', username: '863231099', create_stamp: 1576465833851 },
    { equipment_id: 6, content: '666', price: 666, tag: '可小刀 包邮', district: '越秀区', username: '863231099', create_stamp: 1576465833851 },
    { equipment_id: 7, content: '777', price: 777, tag: '可小刀 包邮', district: '从化区', username: '863231099', create_stamp: 1576465833851 },
    { equipment_id: 8, content: '888', price: 888, tag: '可小刀 包邮', district: '越秀区', username: '863231099', create_stamp: 1576465833851 },
    { equipment_id: 9, content: '999', price: 999, tag: '可小刀 包邮', district: '从化区', username: '777777', create_stamp: 1576465833851 },
    { equipment_id: 10, content: '10', price: 111, tag: '可小刀 包邮', district: '越秀区', username: '777777', create_stamp: 1576465833851 },
    { equipment_id: 11, content: '11', price: 111, tag: '可小刀 包邮', district: '越秀区', username: '777777', create_stamp: 1576465833851 },
    { equipment_id: 12, content: '12', price: 111, tag: '可小刀 包邮', district: '从化区', username: '777777', create_stamp: 1576465833851 },
    { equipment_id: 13, content: '111', price: 111, tag: '可小刀 包邮', district: '越秀区', username: '777777', create_stamp: 1576465833851 }
]

const equipment_image = [
    { equipment_id: 1, img_url: `http://${myHost}:7002/public/images/avatar/defaultAvatar.jpg` },
    { equipment_id: 2, img_url: `http://${myHost}:7002/public/images/equipment/1575264708231baby-beach-blur-1166989.jpg` },
    { equipment_id: 3, img_url: `http://${myHost}:7002/public/images/equipment/1575288828950timg (2).jpg` },
    { equipment_id: 4, img_url: `http://${myHost}:7002/public/images/avatar/defaultAvatar.jpg` },
    { equipment_id: 5, img_url: `http://${myHost}:7002/public/images/equipment/1575264708231baby-beach-blur-1166989.jpg` },
    { equipment_id: 6, img_url: `http://${myHost}:7002/public/images/equipment/1575288828950timg (2).jpg` },
    { equipment_id: 7, img_url: `http://${myHost}:7002/public/images/avatar/defaultAvatar.jpg` },
    { equipment_id: 8, img_url: `http://${myHost}:7002/public/images/equipment/1575264708231baby-beach-blur-1166989.jpg` },
    { equipment_id: 9, img_url: `http://${myHost}:7002/public/images/equipment/1575288828950timg (2).jpg` },
    { equipment_id: 10, img_url: `http://${myHost}:7002/public/images/avatar/defaultAvatar.jpg` },
    { equipment_id: 11, img_url: `http://${myHost}:7002/public/images/equipment/1575264708231baby-beach-blur-1166989.jpg` },
    { equipment_id: 12, img_url: `http://${myHost}:7002/public/images/equipment/1575288828950timg (2).jpg` },
    { equipment_id: 13, img_url: `http://${myHost}:7002/public/images/avatar/defaultAvatar.jpg` },
    { equipment_id: 14, img_url: `http://${myHost}:7002/public/images/equipment/1575264708231baby-beach-blur-1166989.jpg` },
    { equipment_id: 15, img_url: `http://${myHost}:7002/public/images/equipment/1575288828950timg (2).jpg` },
    { equipment_id: 16, img_url: `http://${myHost}:7002/public/images/avatar/defaultAvatar.jpg` },
    { equipment_id: 17, img_url: `http://${myHost}:7002/public/images/equipment/1575264708231baby-beach-blur-1166989.jpg` },
    { equipment_id: 18, img_url: `http://${myHost}:7002/public/images/equipment/1575288828950timg (2).jpg` },
    { equipment_id: 19, img_url: `http://${myHost}:7002/public/images/avatar/defaultAvatar.jpg` },
    { equipment_id: 20, img_url: `http://${myHost}:7002/public/images/equipment/1575264708231baby-beach-blur-1166989.jpg` },
    { equipment_id: 21, img_url: `http://${myHost}:7002/public/images/equipment/1575288828950timg (2).jpg` },
    { equipment_id: 22, img_url: `http://${myHost}:7002/public/images/avatar/defaultAvatar.jpg` },
    { equipment_id: 23, img_url: `http://${myHost}:7002/public/images/equipment/1575264708231baby-beach-blur-1166989.jpg` },
    { equipment_id: 24, img_url: `http://${myHost}:7002/public/images/equipment/1575288828950timg (2).jpg` },
    { equipment_id: 25, img_url: `http://${myHost}:7002/public/images/avatar/defaultAvatar.jpg` },
    { equipment_id: 26, img_url: `http://${myHost}:7002/public/images/avatar/defaultAvatar.jpg` }
]

const comments = [
    { game_id: 1, rate_id: '863231099', be_rate_id: '777777', content: '666', rate: 2.5, rate_time: '2020-01-05 18:54:00' },
]

module.exports = {
    user,
    game,
    game_athletes,
    equipment_image,
    equipment,
    comments
}
const config = require('../config.js')
const util = require('../addons/util')
const axios = require('axios')
const params = new URLSearchParams()
params.append('details', true)
params.append('type', 'deposition')

const postConfig = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${config.yooMoneyKey}`
    }
}

module.exports = async function (db, vk) {

    setInterval(async () => {
        let data = await axios.post(`https://yoomoney.ru/api/operation-history`, params, postConfig).then((response) => {
            return response.data
        }).catch((err) => {
            console.error(err)
            return false
        })
        if (!data) return


        for (i in data.operations) {
            if (data.operations[i].message && data.operations[i].message.startsWith(config.botName)) {
                if (!db.botSettings.botHistory.mainCurrency[data.operations[i].operation_id]) {
                    let messageData = data.operations[i].message.split(' ')
                    if (messageData[0] == config.botName) {

                        // Записываем платеж
                        db.botSettings.botHistory.mainCurrency[data.operations[i].operation_id] = {
                            operation_id: data.operations[i].operation_id,
                            messagePayload: messageData,
                            amount: data.operations[i].amount,
                            desc: data.operations[i].details,
                            datetime: data.operations[i].datetime
                        }
                        // ! Покупка баланса
                        if (messageData[1] == 'Balance') {
                            if (db.playersData[messageData[2]]) {
                                db.playersData[messageData[2]].balance += Math.floor(data.operations[i].amount * 1000)
                                vk.api.messages.send({
                                    message: `🔥 Поступил платёж ${data.operations[i].amount} ₽.\n🚀 Зачислили Вам ${util.number_format(data.operations[i].amount * 1000)} коинов`,
                                    peer_id: messageData[2],
                                    random_id: util.random(-2000000000, 2000000000)
                                }).catch((err) => {
                                    console.error(`VK API Error: `, err)
                                })
                                // Админ-уведомление
                                vk.api.messages.send({
                                    message: `[id${messageData[2]}|Пользователь] купил ${util.number_format(data.operations[i].amount * 1000)} коинов на ${data.operations[i].amount} ₽`,
                                    peer_id: config.admin,
                                    random_id: util.random(-2000000000, 2000000000)
                                }).catch((err) => {
                                    console.error('VK API Error: ', err)
                                })

                            }
                        }
                    }
                }
            }
        }
    }, 5000)



}
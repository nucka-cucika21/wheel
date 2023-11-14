const util = require('../addons/util')
const keyboards = require('../addons/keyboards')
const md5 = require('md5')
const {
    Keyboard
} = require('vk-io')
const config = require('../config')

module.exports = async function (db, vk) {

    setInterval(async () => {
        for (i in db.gamesData) {
            if (db.gamesData[i].convData.isActive == true && db.gamesData[i].convData.gamemode == 'dreamcatcher' && db.gamesData[i].convGame.amount > 0) {
                db.gamesData[i].convGame.timeNow -= Number(1)
                console.log(db.gamesData[i].convGame.timeNow)

                if (db.gamesData[i].convGame.timeNow <= 0) {
                    console.log('Игра закончилась')


                    let str = `Выпал коэффициент ${db.gamesData[i].convGame.resultData.result}\n\n`

                    for (d in db.gamesData[i].convGame.bets) {
                        if (db.gamesData[i].convGame.bets[d].x1 > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 'x1') {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].x1)} на коэффициент x1 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].x1 * 1)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].x1 * 1 + db.gamesData[i].convGame.bets[d].x1)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].x1 * 1 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].x1)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 'x1') {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].x1)} на коэффициент x1 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].x1)
                            }

                        }
                        if (db.gamesData[i].convGame.bets[d].x2 > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 'x2') {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].x2)} на коэффициент x2 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].x2 * 2)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].x2 * 2 + db.gamesData[i].convGame.bets[d].x2)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].x2 * 2 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].x2)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 'x2') {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].x2)} на коэффициент x2 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].x2)
                            }

                        }
                        if (db.gamesData[i].convGame.bets[d].x5 > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 'x5') {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].x5)} на коэффициент x5 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].x5 * 5)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].x5 * 5 + db.gamesData[i].convGame.bets[d].x5)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].x5 * 5 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].x5)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 'x5') {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].x5)} на коэффициент x5 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].x5)
                            }

                        }


                        if (db.gamesData[i].convGame.bets[d].x10 > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 'x10') {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].x10)} на коэффициент x10 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].x10 * 10)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].x10 * 10 + db.gamesData[i].convGame.bets[d].x10)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].x10 * 10 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].x10)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 'x10') {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].x10)} на коэффициент x10 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].x10)
                            }

                        }

                        if (db.gamesData[i].convGame.bets[d].x20 > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 'x20') {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].x20)} на коэффициент x20 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].x20 * 20)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].x20 * 20 + db.gamesData[i].convGame.bets[d].x20)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].x20 * 20 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].x20)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 'x20') {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].x20)} на коэффициент x20 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].x20)
                            }

                        }
                        if (db.gamesData[i].convGame.bets[d].x40 > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 'x40') {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].x40)} на коэффициент x40 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].x40 * 40)})\n`

                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].balance += Math.floor(db.gamesData[i].convGame.bets[d].x40 * 40 + db.gamesData[i].convGame.bets[d].x40)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].x40 * 40 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].x40)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 'x40') {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].x40)} на коэффициент x40 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].x40)
                            }

                        }
                        if (db.gamesData[i].convGame.bets[d].vx1 > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 'x1') {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vx1)} ${config.botVirtualCurrency} на коэффициент x1 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].vx1 * 1)})\n`
                        
                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].vx1 * 1 + db.gamesData[i].convGame.bets[d].vx1)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vx1 * 1 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vx1)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 'x1') {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vx1)} ${config.botVirtualCurrency} на коэффициент x1 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vx1)
                            }
                        
                        }
                        if (db.gamesData[i].convGame.bets[d].vx2 > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 'x2') {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vx2)} ${config.botVirtualCurrency} на коэффициент x2 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].vx2 * 2)})\n`
                        
                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].vx2 * 2 + db.gamesData[i].convGame.bets[d].vx2)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vx2 * 2 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vx2)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 'x2') {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vx2)} ${config.botVirtualCurrency} на коэффициент x2 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vx2)
                            }
                        
                        }
                        if (db.gamesData[i].convGame.bets[d].vx5 > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 'x5') {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vx5)} ${config.botVirtualCurrency} на коэффициент x5 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].vx5 * 5)})\n`
                        
                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].vx5 * 5 + db.gamesData[i].convGame.bets[d].vx5)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vx5 * 5 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vx5)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 'x5') {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vx5)} ${config.botVirtualCurrency} на коэффициент x5 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vx5)
                            }
                        
                        }
                        
                        
                        if (db.gamesData[i].convGame.bets[d].vx10 > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 'x10') {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vx10)} ${config.botVirtualCurrency} на коэффициент x10 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].vx10 * 10)})\n`
                        
                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].vx10 * 10 + db.gamesData[i].convGame.bets[d].vx10)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vx10 * 10 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vx10)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 'x10') {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vx10)} ${config.botVirtualCurrency} на коэффициент x10 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vx10)
                            }
                        
                        }
                        
                        if (db.gamesData[i].convGame.bets[d].vx20 > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 'x20') {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vx20)} ${config.botVirtualCurrency} на коэффициент x20 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].vx20 * 20)})\n`
                        
                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].vx20 * 20 + db.gamesData[i].convGame.bets[d].vx20)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vx20 * 20 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vx20)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 'x20') {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vx20)} ${config.botVirtualCurrency} на коэффициент x20 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vx20)
                            }
                        
                        }
                        if (db.gamesData[i].convGame.bets[d].vx40 > 0) {
                            // ? Ставка выиграла
                            if (db.gamesData[i].convGame.resultData.result == 'x40') {
                                str += `✅ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vx40)} ${config.botVirtualCurrency} на коэффициент x40 выиграла (+${util.number_format(db.gamesData[i].convGame.bets[d].vx40 * 40)})\n`
                        
                                // Работа с балансом
                                db.playersData[db.gamesData[i].convGame.bets[d].id].vbalance += Math.floor(db.gamesData[i].convGame.bets[d].vx40 * 40 + db.gamesData[i].convGame.bets[d].vx40)
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data += Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vx40 * 40 - db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vx40)
                            }
                            // Проигрыш
                            if (db.gamesData[i].convGame.resultData.result != 'x40') {
                                str += `❌ ${db.playersData[db.gamesData[i].convGame.bets[d].id].userData.globalSettings.allowCallNickname == true ? `[id${db.gamesData[i].convGame.bets[d].id}|${db.playersData[db.gamesData[i].convGame.bets[d].id].name}]` : `${db.playersData[db.gamesData[i].convGame.bets[d].id].name}`} ставка ${util.number_format(db.gamesData[i].convGame.bets[d].vx40)} ${config.botVirtualCurrency} на коэффициент x40 проиграла\n`
                                // Начисление топа 
                                db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data -= Math.floor(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].vx40)
                            }
                        
                        }


                        // Сам топ
                        console.log('top', db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data)

                        if (db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data < 0) {
                            db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data = 0
                        }

                        db.playersData[db.gamesData[i].convGame.bets[d].id].userStatistics.winAllTime += Number(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data)
                        db.playersData[db.gamesData[i].convGame.bets[d].id].userStatistics.winDay += Number(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data)
                        db.playersData[db.gamesData[i].convGame.bets[d].id].userStatistics.winWeek += Number(db.gamesData[i].convGame.bets[db.gamesData[i].convGame.bets[d].id].top_data)



                    }
                    str += `\n\nХэш игры: ${db.gamesData[i].convGame.resultData.hash}\nПроверка честности: ${db.gamesData[i].convGame.resultData.secret}@${db.gamesData[i].convGame.resultData.result}`
                    let sendId = db.gamesData[i].id

                    vk.api.messages.send({
                        peer_id: sendId,
                        message: `Итак, результаты раунда...`,
                        random_id: util.random(-200000000, 20000000000)
                    }).catch((err) => {
                        console.log(`Ошибка при отправлке сообщения ${err}`);
                    })
                    vk.upload.messagePhoto({
                        source: {
                            value: `./pictures/dreamcatcher/${db.gamesData[i].convGame.resultData.result}.jpg`
                        }
                    }).then((attachment) =>
                        vk.api.messages.send({
                            peer_id: sendId,
                            message: str,
                            attachment,
                            random_id: util.random(-200000000, 20000000000)
                        }).then(() => {
                            if (db.gamesData[db.gamesData[i].id].convSettings.adsMessage == true) {
                                let randomMessageID = Number(1)

                                if (randomMessageID == 1) {
                                    vk.api.messages.send({
                                        peer_id: sendId,
                                        message: `📺 Не терпится показать свой выигрыш? Тогда предложи новость на стену нашей группы!`,
                                        keyboard: Keyboard.builder().urlButton({
                                            label: `Наша группа`,
                                            url: `https://vk.com/public${config.botPollingGroupId}`
                                        }).inline(),
                                        random_id: util.random(-200000000, 20000000000)
                                    }).catch((err) => {
                                        console.log(`Ошибка при отправлке сообщения ${err}`);
                                    })
                                }
                                if (randomMessageID == 2) {
                                    vk.api.messages.send({
                                        peer_id: sendId,
                                        message: `🔥 Ты знал, что ты можешь получить награду в реальных деньгах просто играя? Теперь знаешь :3`,
                                        keyboard: Keyboard.builder().urlButton({
                                            label: `Как это работает?`,
                                            url: config.dayTopInfo
                                        }).inline(),
                                        random_id: util.random(-200000000, 20000000000)
                                    }).catch((err) => {
                                        console.log(`Ошибка при отправлке сообщения ${err}`);
                                    })
                                }
                                if (randomMessageID == 3) {
                                    vk.api.messages.send({
                                        peer_id: sendId,
                                        message: `🔈 Слишком шумно в официальных беседах? Узнай, как можно поиграть в одиночку`,
                                        keyboard: Keyboard.builder().urlButton({
                                            label: `Подробнее`,
                                            url: config.privateConvInfo
                                        }).inline(),
                                        random_id: util.random(-200000000, 20000000000)
                                    }).catch((err) => {
                                        console.log(`Ошибка при отправлке сообщения ${err}`);
                                    })
                                }
                                if (randomMessageID == 4) {
                                    vk.api.messages.send({
                                        peer_id: sendId,
                                        message: `⚠ Не соблюдаешь правила? Потом не обижайся, что получил блокировку`,
                                        keyboard: Keyboard.builder().urlButton({
                                            label: `Правила`,
                                            url: config.mainInfoLink
                                        }).inline(),
                                        random_id: util.random(-200000000, 20000000000)
                                    }).catch((err) => {
                                        console.log(`Ошибка при отправлке сообщения ${err}`);
                                    })
                                }
                                if (randomMessageID == 5) {
                                    vk.api.messages.send({
                                        peer_id: sendId,
                                        message: `🛒 Коины для игры можно купить внутри бота во вкладке "Магазин"`,
                                        keyboard: Keyboard.builder().urlButton({
                                            label: `Купить коины`,
                                            url: `https://vk.me/public${config.botPollingGroupId}`
                                        }).inline(),
                                        random_id: util.random(-200000000, 20000000000)
                                    }).catch((err) => {
                                        console.log(`Ошибка при отправлке сообщения ${err}`);
                                    })
                                }
                            }
                        })
                    ).catch((err) => {
                        console.log(`Ошибка при отправлке сообщения ${err}`);
                    })



                    // Генерируем случайный результат
                    let secret = util.str_rand(20)
                    let result = null
                    let rand = util.random(1, 98)
                    console.log(rand)
                    if (rand >= 1 && rand <= 35) result = 'x1'
                    if (rand >= 36 && rand <= 60) result = 'x2'

                    if (rand >= 61 && rand <= 80) result = 'x5'
                    if (rand >= 81 && rand <= 90) result = 'x10'
                    if (rand >= 91 && rand <= 97) result = 'x20'

                    if (rand >= 98 && rand <= 100) result = 'x40'
                    console.log(result)

                    let hash = md5(`${secret}@${result}`)

                    db.gamesData[i].convGame.resultData.result = result
                    db.gamesData[i].convGame.resultData.secret = secret
                    db.gamesData[i].convGame.resultData.hash = hash

                    // Обнуляем данные игры
                    db.gamesData[i].convGame.timeNow = Number(db.gamesData[i].convSettings.maxTime)
                    db.gamesData[i].convGame.bets = {}
                    db.gamesData[i].convGame.amount = 0

                }


            }
        }
    }, 1000)


}
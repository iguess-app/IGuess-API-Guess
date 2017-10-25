'use strict'

//Mid night every day (São Paulo - Brazil)
const Seconds = '*'
const Minutes = 55
const Hours = '*'
const fullHour = `${Seconds} ${Minutes} ${Hours}`
const dayOfMonth = '*'
const months = '*'
const dayOfWeek = '*'

module.exports = `${fullHour} ${dayOfMonth} ${months} ${dayOfWeek}`
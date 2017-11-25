'use strict'

//every minute, with 0 seconds (São Paulo - Brazil)
const Seconds = 0
const Minutes = '*'
const Hours = '*'
const fullHour = `${Seconds} ${Minutes} ${Hours}`
const dayOfMonth = '*'
const months = '*'
const dayOfWeek = '*'

module.exports = `${fullHour} ${dayOfMonth} ${months} ${dayOfWeek}`
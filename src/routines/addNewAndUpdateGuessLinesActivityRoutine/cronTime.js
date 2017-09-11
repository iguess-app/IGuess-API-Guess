'use strict'

//Mid night every day (São Paulo - Brazil)
const Seconds = 0
const Minutes = 0
const Hours = 0
const fullHour = `${Seconds} ${Minutes} ${Hours}`
const dayOfMonth = '*'
const months = '*'
const dayOfWeek = '*'

module.exports = `${fullHour} ${dayOfMonth} ${months} ${dayOfWeek}`
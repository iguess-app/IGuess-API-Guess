'use strict'

//1am every day (São Paulo - Brazil)
const Seconds = 0
const Minutes = 0
const Hours = 1
const fullHour = `${Seconds} ${Minutes} ${Hours}`
const dayOfMonth = '*'
const months = '*'
const dayOfWeek = '*'

module.exports = `${fullHour} ${dayOfMonth} ${months} ${dayOfWeek}`
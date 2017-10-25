'use strict'

//1am every day (São Paulo - Brazil)
const Seconds = '*'
const Minutes = 10
const Hours = '*'
const fullHour = `${Seconds} ${Minutes} ${Hours}`
const dayOfMonth = '*'
const months = '*'
const dayOfWeek = '*'

module.exports = `${fullHour} ${dayOfMonth} ${months} ${dayOfWeek}`
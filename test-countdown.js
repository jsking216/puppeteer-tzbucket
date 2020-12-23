const BigNumber = require('bignumber.js');

const hoursToMillis = (input) => {
  const hourInMinutes = input.times(60)
  const hourInSeconds = hourInMinutes.times(60)
  return hourInSeconds.times(1000)
}

const constant = hoursToMillis(new BigNumber(3));
const START_VALUE = 100;

const getCountdownDiffForNextBalance = (input) => {
  const balance = new BigNumber(input)
    .minus(START_VALUE) // We subtract 100 because that was the start value
    .times(10)
    .plus(2) // Because we want to get the next countdown value

  const countdownDiff = constant.plus(balance).dividedBy(balance)

  return countdownDiff
}

const getNextCountdown = (
  currentCountdown,
  potAmount
) => {
  const currentCountdownBn = new BigNumber(currentCountdown * 1000)
  const countdownDiff = getCountdownDiffForNextBalance(potAmount)
  const countdown = currentCountdownBn.minus(countdownDiff)
  return forHumans(countdown.dividedBy(1000).integerValue().toNumber())
}

/**
 * https://stackoverflow.com/a/34270811
 *
 * Translates seconds into human readable format of seconds, minutes, hours, days, and years
 *
 * @param  {number} seconds The number of seconds to be processed
 * @return {string}         The phrase describing the the amount of time
 */
const forHumans = (seconds) => {
  var levels = [
    [Math.floor(seconds / 31536000), 'years'],
    [Math.floor((seconds % 31536000) / 86400), 'days'],
    [Math.floor(((seconds % 31536000) % 86400) / 3600), 'hours'],
    [Math.floor((((seconds % 31536000) % 86400) % 3600) / 60), 'minutes'],
    [(((seconds % 31536000) % 86400) % 3600) % 60, 'seconds'],
  ]
  var returntext = ''

  for (var i = 0, max = levels.length; i < max; i++) {
    if (levels[i][0] === 0) continue
    returntext +=
      ' ' +
      levels[i][0] +
      ' ' +
      (levels[i][0] === 1
        ? levels[i][1].substr(0, levels[i][1].length - 1)
        : levels[i][1])
  }
  return returntext.trim()
}

console.log(getNextCountdown(Math.round(60 * 60 * 17.5), 120))
console.log(getNextCountdown(Math.round(60 * 60 * 15.5), 400))
const calculateTimeMax = (eventDate) => {
  let splitDate = eventDate.split(" ")
  const maxDay = Number(eventDate.split(" ")[0]) + 1;
  splitDate[0] = maxDay;
  return splitDate.join(" ");
}


module.exports = { calculateTimeMax }
export const formatMyDate = (date) => {
  if (!date) {
    return "Invalid Date";
  }

  const parsesdDate = new Date(date);
  if (isNaN(parsesdDate.getTime())) {
    return "Invalid Date";
  }
  let options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(
    parsesdDate
  );
  return formattedDate;
};

export const formatDuration = (duration) => {
  if (!duration) return null;

  var hour = Math.floor(duration / 3600);
  var minute = Math.floor((duration % 3600) / 60);
  var second = duration % 60;

  const durationString =
    (hour > 0 ? hour.toString().padStart(2, "0") + ":" : "") +
    minute.toString().padStart(2, "0") +
    ":" +
    second.toString().padStart(2, "0");
  return durationString;
};

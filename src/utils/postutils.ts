const getTimeSincePost = (date: Date) => {
  let time = new Date().getTime() - date.getTime();
  if (time < 0) return "future?";

  time /= 1000;
  if (time < 60) return `${Math.floor(time)}sec`;

  // minutes
  time /= 60;
  if (time < 60) return `${Math.floor(time)}min`;

  // hour
  time /= 60;
  if (time < 24) return `${Math.floor(time)}h`;

  // days
  time /= 24;
  if (time < 7) return `${Math.floor(time)}d`;

  // weeks
  time /= 7;
  if (time < 52) return `${Math.floor(time)}w`;

  // years
  time /= 52;
  return `${time}y`;
};

export { getTimeSincePost };

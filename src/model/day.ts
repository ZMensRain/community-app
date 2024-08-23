import { locationType } from "./event";

type Time = { hour: Number; minute: Number };

class Day {
  constructor(
    public start: Date | Time,
    public end: Date | Time,
    public date: Date,
    public locations: locationType[]
  ) {
    start = this.formatTime(start);
    end = this.formatTime(end);
  }

  private formatTime(time: Date | Time) {
    if (time instanceof Date)
      return { hour: time.getHours(), minute: time.getMinutes() };
    else return time;
  }
}

export { Day, Time };

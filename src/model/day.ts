import { LatLng } from "react-native-maps";

type Time = { hour: Number; minute: Number };

class Day {
  start: Time;
  end: Time;
  constructor(
    start: Date | Time,
    end: Date | Time,
    public date: Date,
    public locations: LatLng[]
  ) {
    this.start = this.formatTime(start);
    this.end = this.formatTime(end);
  }

  private formatTime(time: Date | Time) {
    if (time instanceof Date)
      return { hour: time.getHours(), minute: time.getMinutes() };
    else return time;
  }
}

export { Day, Time };

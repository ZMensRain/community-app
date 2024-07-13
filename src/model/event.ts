type Time = { hour: Number; minute: Number };

enum DressCode {
  Casual = "Casual",
  Formal = "Formal",
  Anything = "Anything",
  Costume = "Costume",
  Festive = "Festive",
}

class Day {
  start: Time;
  end: Time;
  date: Date;
  locations: Array<string | { lat: Number; lon: Number }>;
  constructor(
    starts: Date | Time,
    ends: Date | Time,
    date: Date,
    locations: Array<string | { lat: Number; lon: Number }>
  ) {
    if (starts instanceof Date) {
      this.start = { hour: starts.getHours(), minute: starts.getMinutes() };
    } else {
      this.start = starts;
    }
    if (ends instanceof Date) {
      this.end = { hour: ends.getHours(), minute: ends.getMinutes() };
    } else {
      this.end = ends;
    }

    this.date = date;
    this.locations = locations;
  }
}

type Id = { group: boolean; id: string };
type EventType = EventTypeEnum | string;
type EventTag = EventTagEnum | string;
type AgeRange = { min: Number; max: Number | null };
type EventKit = EventKitEnum | string;

class CommunityEvent {
  id: string;
  hosted_by: Id;
  title: string;
  description: string;
  type: EventType;
  ageRange: AgeRange;
  days: Array<Day>;
  dressCode: DressCode;
  attendingIds: Id[];
  links: string[];
  ticketWebsite: string | null;
  tags: EventTag[];
  kit: EventKit[];
  public constructor(
    id: string,
    hosted_by: Id,
    title: string,
    description: string,
    type: EventType,
    ageRange: AgeRange,
    days: Array<Day>,
    dressCode: DressCode,
    attendingIds: Id[],
    links: string[],
    ticketWebsite: string | null,
    tags: EventTag[],
    kit: EventKit[]
  ) {
    this.id = id;
    this.hosted_by = hosted_by;
    this.title = title;
    this.description = description;
    this.type = type;
    this.ageRange = ageRange;
    this.days = days;
    this.dressCode = dressCode;
    this.attendingIds = attendingIds;
    this.links = links;
    this.ticketWebsite = ticketWebsite;
    this.tags = tags;
    this.kit = kit;
  }

  public getLocations(
    unique: Boolean = true
  ): Array<string | { lat: Number; lon: Number }> {
    let output: Array<string | { lat: Number; lon: Number }> = [];
    for (let i = 0; i < this.days.length; i++) {
      const element = this.days[i];

      output = output.concat(element.locations);
    }

    let keys = [...new Set(output)];
    if (unique) {
      return keys;
    }
    return output;
  }
}

//TODO Fill Enums
enum EventTypeEnum {
  Meetings,
  MarketDay,
  CleanupDay,
  March,
  Rally,
  FundRaiser,
  Competition,
  Workshop,
  Opening,
  Festival,
  Performance,
  Networking,
  Welfare,
  Party,
  CareerDay,
}
enum EventTagEnum {}
enum EventKitEnum {
  Paint,
  Food,
  Drinks,
  Chairs,
  Tables,
  PicnicBlanket,
}

const yesterday = new Date();
yesterday.setDate(yesterday.getDate() - 1);

/*cspell:disable */
const testEvent = new CommunityEvent(
  "id",
  { group: false, id: "" },
  "Title",
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis auctor elit sed vulputate mi sit amet mauris commodo. Faucibus et molestie ac feugiat sed lectus. Convallis convallis tellus id interdum velit laoreet id donec. Turpis massa sed elementum tempus. Dolor morbi non arcu risus quis varius. Ipsum dolor sit amet consectetur adipiscing elit ut aliquam purus. Lectus sit amet est placerat in egestas erat imperdiet sed. Aliquam faucibus purus in massa. Quis hendrerit dolor magna eget est. Mi tempus imperdiet nulla malesuada pellentesque elit. Sed id semper risus in hendrerit gravida rutrum quisque non. Eu feugiat pretium nibh ipsum consequat nisl vel pretium. Commodo odio aenean sed adipiscing diam donec adipiscing. At quis risus sed vulputate odio ut. In hac habitasse platea dictumst.`,
  "Dance",
  { min: 10, max: 20 },
  [
    new Day({ hour: 8, minute: 30 }, { hour: 14, minute: 30 }, yesterday, [
      "1083 Bezuidenhout St, Mpumalanga",
    ]),
    new Day({ hour: 8, minute: 30 }, { hour: 14, minute: 30 }, new Date(), [
      "1978 Wattle St, Eastern Cape",
    ]),
    new Day({ hour: 8, minute: 30 }, { hour: 14, minute: 30 }, new Date(), [
      "2476 Diesel Street,Gauteng",
    ]),
    new Day({ hour: 8, minute: 30 }, { hour: 14, minute: 30 }, new Date(), [
      { lat: -26.396225, lon: 28.027029 },
    ]),
  ],
  DressCode.Anything,
  [
    { group: false, id: "pwsDKA79t6RN4SuZ" },
    { group: false, id: "qPMNPB9ny09cqSbA" },
    { group: false, id: "PIUK2EReuwr4aWm9" },
    { group: false, id: "ae8hykYw6fhtissI" },
    { group: false, id: "RRIJwi2VhOvRvhpK" },
    { group: false, id: "QaVsTDvyPZvEQa6Z" },
    { group: false, id: "967aHDSOMKYiBnFE" },
    { group: false, id: "WA87l0EIj2KCq8JA" },
    { group: false, id: "4goARK6KPGBtq5uU" },
  ],
  ["https://twitter.com", "https://facebook.com"],
  "https://www.tickets.com/",
  ["tag", "Vegan friendly", "swinging", "Dog Friendly", "something l"],
  ["Table", "Chairs", "Drinks"]
);
/*cspell:enable */

export {
  Day,
  CommunityEvent,
  testEvent,
  EventTag,
  EventKit,
  EventKitEnum,
  EventType,
  EventTypeEnum,
  DressCode,
  Id,
};

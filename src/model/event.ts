type time = { hour: Number; minute: Number };

enum dressCode {
  Casual = "Casual",
  Formal = "Formal",
  Anything = "Anything",
  Costume = "Costume",
  Festive = "Festive",
}

class Day {
  start: time;
  end: time;
  date: Date;
  locations: Array<String | { lat: Number; lon: Number }>;
  constructor(
    start: time,
    end: time,
    date: Date,
    locations: Array<String | { lat: Number; lon: Number }>
  ) {
    this.start = start;
    this.end = end;
    this.date = date;
    this.locations = locations;
  }
}

class CommunityEvent {
  id: String;
  hosted_by: { group: boolean; id: string };
  title: String;
  description: String;
  type: EventType | String;
  ageRange: { min: Number; max: Number | null };
  days: Array<Day>;
  dressCode: dressCode;
  attendingIds: Array<String>;
  links: Array<String>;
  ticketWebsite: String | null;
  tags: Array<EventTag | String>;
  kit: Array<EventKit | String>;
  public constructor(
    id: string,
    hosted_by: { group: boolean; id: string },
    title: string,
    description: string,
    type: EventType | String,
    ageRange: { min: Number; max: Number | null },
    days: Array<Day>,
    dressCode: dressCode,
    attendingIds: Array<String>,
    links: Array<String>,
    ticketWebsite: String | null,
    tags: Array<EventTag | String>,
    kit: Array<EventKit | String>
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
  ): Array<String | { lat: Number; lon: Number }> {
    let output: Array<String | { lat: Number; lon: Number }> = [];
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
enum EventType {
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
enum EventTag {}
enum EventKit {}

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
  dressCode.Anything,
  [
    "pwsDKA79t6RN4SuZ",
    "qPMNPB9ny09cqSbA",
    "1mYk0yc0R54MTJAw",
    "PIUK2EReuwr4aWm9",
    "ae8hykYw6fhtissI",
    "RRIJwi2VhOvRvhpK",
    "QaVsTDvyPZvEQa6Z",
    "967aHDSOMKYiBnFE",
    "WA87l0EIj2KCq8JA",
    "4goARK6KPGBtq5uU",
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
  EventType,
  dressCode,
};

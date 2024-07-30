import { Day } from "./day";

type locationType = string | { lat: Number; lon: Number };
type Id = { group: boolean; id: string };
type EventType = EventTypeEnum | string;
type EventTag = EventTagEnum | string;
type AgeRange = { min: Number; max: Number | null };
type EventKit = EventKitEnum | string;

class CommunityEvent {
  public constructor(
    public id: string,
    public hosted_by: Id,
    public title: string,
    public description: string,
    public type: EventType,
    public ageRange: AgeRange,
    public days: Day[],
    public dressCode: DressCode,
    public attendees: Id[],
    public links: string[],
    public ticketWebsite: string | null,
    public tags: EventTag[],
    public kit: EventKit[]
  ) {}

  public getLocations(unique: Boolean = true): locationType[] {
    let output: locationType[] = [];

    for (let i = 0; i < this.days.length; i++) {
      output = output.concat(this.days[i].locations);
    }

    if (unique) return [...new Set(output)];
    return output;
  }
}

//TODO Fill Enums
enum EventTagEnum {}
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
enum EventKitEnum {
  Paint,
  Food,
  Drinks,
  Chairs,
  Tables,
  PicnicBlanket,
}
enum DressCode {
  Casual = "Casual",
  Formal = "Formal",
  Anything = "Anything",
  Costume = "Costume",
  Festive = "Festive",
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
  locationType,
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

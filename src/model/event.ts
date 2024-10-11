import { LatLng } from "react-native-maps";
import { Day } from "./day";
import { Database } from "~/database.types";

type Id = { group: boolean; id: string };
type EventType = EventTypeEnum | string;
type EventTag = EventTagEnum | string;
type AgeRange = { min: number; max: number | null };
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
    public kit: EventKit[],
    public createdAt: Date
  ) {}

  public getLocations(unique: Boolean = true): LatLng[] {
    let output: LatLng[] = [];

    for (let i = 0; i < this.days.length; i++) {
      output = output.concat(this.days[i].locations);
    }

    if (unique) return [...new Set(output)];
    return output;
  }

  static fromDatabase(data: Database["public"]["Tables"]["events"]["Row"]) {
    const formatDays = (
      days: Database["public"]["CompositeTypes"]["day"][]
    ): Day[] => {
      const formatLocation = (
        data: Database["public"]["CompositeTypes"]["day"]["location"]
      ): LatLng[] => {
        //TODO
        return [];
      };
      const out = [];

      for (let index = 0; index < days.length; index++) {
        const element = days[index];
        const start = element.start_time?.split(":");
        const end = element.end_time?.split(":");
        if (!start || !end || !element.event_date) continue;

        out.push(
          new Day(
            { hour: Number(start[0]), minute: Number(start[1]) },
            { hour: Number(end[0]), minute: Number(end[1]) },
            new Date(element.event_date),
            formatLocation(element.location)
          )
        );
      }

      return out;
    };

    return new CommunityEvent(
      data.id,
      { id: data.created_by, group: false },
      data.title,
      data.description,
      data.type,
      { min: data.age_limit, max: 100 },
      formatDays(data.days),
      DressCode[data.dress_code],
      [], //data.attendees,
      data.links,
      data.ticket_website,
      data.tags,
      data.kit,
      new Date(data.created_at)
    );
  }

  public convertToDatabase(): Database["public"]["Tables"]["events"]["Row"] {
    let days = [];

    for (let i = 0; i < this.days.length; i++) {
      days.push({
        event_date: this.days[i].date.toISOString(),
        start_time: `${this.days[i].start.hour}:${this.days[i].start.minute}:00`,
        end_time: `${this.days[i].start.hour}:${this.days[i].start.minute}:00`,
        location: [],
      });
    }

    // @ts-ignore
    return {
      age_limit: this.ageRange.min,
      attendees: this.attendees.map((v) => v.id),
      days: days,
      description: this.description,
      dress_code:
        this.dressCode.toString() as Database["public"]["Enums"]["dresscode"],
      kit: this.kit as string[],
      links: this.links,
      tags: this.tags as string[],
      ticket_website: this.ticketWebsite,
      title: this.title,
      type: this.type.toString(),
    };
  }
}

//TODO Fill Enums
enum EventTagEnum {
  DogFriendly,
  Vegan,
}
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
      { latitude: 10, longitude: -20 },
    ]),
    new Day({ hour: 8, minute: 30 }, { hour: 14, minute: 30 }, new Date(), [
      { latitude: 10, longitude: -20 },
    ]),
    new Day({ hour: 8, minute: 30 }, { hour: 14, minute: 30 }, new Date(), [
      { latitude: 10, longitude: -20 },
    ]),
    new Day({ hour: 8, minute: 30 }, { hour: 14, minute: 30 }, new Date(), [
      { latitude: -26.396225, longitude: 28.027029 },
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
  ["Table", "Chairs", "Drinks"],
  new Date()
);
/*cspell:enable */

export {
  CommunityEvent,
  testEvent,
  EventTag,
  EventTagEnum,
  EventKit,
  EventKitEnum,
  EventType,
  EventTypeEnum,
  DressCode,
  Id,
};

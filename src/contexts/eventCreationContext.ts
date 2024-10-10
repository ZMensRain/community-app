import { createContext } from "react";
import { CommunityEvent, DressCode } from "../model/event";

export type EventCreationObject = {
  event: CommunityEvent;
  setEvent: React.Dispatch<React.SetStateAction<CommunityEvent>>;
  createEvent: () => void;
};

export const EventCreationContext = createContext<
  EventCreationObject | undefined
>(undefined);

export const initialCreationState = new CommunityEvent(
  "",
  { group: false, id: "" },
  "",
  "",
  "",
  { min: 1, max: 100 },
  [],
  DressCode.Anything,
  [],
  [],
  "",
  [],
  [],
  new Date()
);

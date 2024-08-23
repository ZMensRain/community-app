import { createContext } from "react";
import { CommunityEvent } from "../model/event";

export type EventCreationObject = {
  event: CommunityEvent;
  setEvent: React.Dispatch<React.SetStateAction<CommunityEvent>>;
  createEvent: () => void;
};

export const EventCreationContext = createContext<
  EventCreationObject | undefined
>(undefined);

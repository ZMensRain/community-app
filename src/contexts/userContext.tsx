import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { LatLng } from "react-native-maps";

export enum UserActionKind {
  setUser = "setUser",
  updateLocation = "updateLocation",
  updateUsername = "updateUsername",
  updateEmail = "updateEmail",
  updateInterests = "updateInterests",
  updatePostIds = "updatePostIds",
}

export interface User {
  id: string;
  email: string;
  username: string;
  location: LatLng;
  interests: string[];
  postIds: string[];
  discriminator: "user";
}

export interface UserAction {
  type: UserActionKind;
  payload: string | string[] | LatLng | User;
}

const userReducer = (state: User, action: UserAction) => {
  switch (action.type) {
    case UserActionKind.setUser:
      if (typeof action.payload == "string") return state;
      if ("latitude" in action.payload) return state;
      if ("discriminator" in action.payload == false) return state;
      return action.payload;
    case UserActionKind.updateEmail:
      if (typeof action.payload != "string") return state;
      return { ...state, email: action.payload };
    case UserActionKind.updateUsername:
      if (typeof action.payload != "string") return state;
      return { ...state, username: action.payload };
    case UserActionKind.updateInterests:
      if (typeof action.payload == "string") return state;
      if ("latitude" in action.payload) return state;
      if ("discriminator" in action.payload) return state;
      return { ...state, interests: action.payload };
    case UserActionKind.updateLocation:
      if (typeof action.payload == "string") return state;
      if ("latitude" in action.payload == false) return state;

      return { ...state, location: action.payload };
    case UserActionKind.updatePostIds:
      if (typeof action.payload == "string") return state;
      if ("latitude" in action.payload) return state;
      if ("discriminator" in action.payload) return state;

      return { ...state, postIds: action.payload };
    default:
      return state;
  }
};

const UserContext = createContext<{
  state: User;
  dispatch: React.Dispatch<UserAction>;
} | null>(null);

const initialState: User = {
  id: "",
  email: "",
  username: "",
  location: { latitude: 0, longitude: 0 },
  interests: [],
  postIds: [],
  discriminator: "user",
};

type props = { children: ReactNode };
export const UserProvider = (props: props) => {
  const [state, dispatch] = useReducer(userReducer, initialState);
  return (
    <UserContext.Provider value={{ state: state, dispatch: dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { CommunityEvent } from "../model/event";
import { Database } from "~/database.types";
import { Issue, IssueFromDatabase } from "../model/issue";

/* cSpell:disable */
const supabaseURL = "https://yemtwnliyzhfbdclmrnn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllbXR3bmxpeXpoZmJkY2xtcm5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY5NjUyMzQsImV4cCI6MjAzMjU0MTIzNH0.N31WgDzl0WzGGhpGoTL6cXzF2kdmdDSv1XMstnQwMQ0";
/* cSpell:enable */

const supabase = createClient<Database>(supabaseURL, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

const getEvents = async (created_by: string, number: number | null) => {
  let data: Database["public"]["Tables"]["events"]["Row"][] = [];

  if (number) {
    const f = await supabase
      .from("events")
      .select()
      .eq("created_by", created_by)
      .order("created_at")
      .limit(number);
    if (f.data) data = [...data, ...f.data];
  } else {
    const response = await supabase
      .from("events")
      .select()
      .eq("created_by", created_by)
      .order("created_at");
    if (response.data) data = data.concat(response.data);
  }

  return data.map((v) => CommunityEvent.fromDatabase(v));
};

const getIssues = async (created_by: string, number: number | null) => {
  let data: Database["public"]["Tables"]["issues"]["Row"][] = [];

  if (number) {
    const f = await supabase
      .from("issues")
      .select()
      .eq("created_by", created_by)
      .order("created_at")
      .limit(number);
    if (f.data) data = [...data, ...f.data];
  } else {
    const response = await supabase
      .from("issues")
      .select()
      .eq("created_by", created_by)
      .order("created_at");
    if (response.data) data = data.concat(response.data);
  }

  return data.map((v) => IssueFromDatabase(v));
};

async function getPosts(
  created_by: string,
  numberOfEach: number
): Promise<(CommunityEvent | Issue)[]> {
  let l = [
    ...(await getEvents(created_by, numberOfEach)),
    ...(await getIssues(created_by, numberOfEach)),
  ];
  l.sort((a, b) => {
    return b.createdAt.getTime() - a.createdAt.getTime();
  });

  return l;
}

const getUserData = async (id: string) => {
  let response = await supabase
    .from("profiles")
    .select("username, avatar_url, interests, location")
    .eq("id", id);
  if (response.error) {
    return response.error.message;
  }
  const data = response.data[0];
  let out = {
    location: {
      latitude: (data.location as { coordinates: number[] }).coordinates[1],
      longitude: (data.location as { coordinates: number[] }).coordinates[0],
    },
    username: data.username,
    interests: data.interests,
    avatar_url: data.avatar_url,
  };
  return out;
};

export { getUserData, supabase, getPosts, getEvents, getIssues };

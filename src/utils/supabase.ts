import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { CommunityEvent } from "../model/event";
import { Database } from "~/database.types";
import { IssueFromDatabase } from "../model/issue";
import { LatLng } from "react-native-maps";

/* cSpell:disable */
const supabaseURL = "https://yemtwnliyzhfbdclmrnn.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllbXR3bmxpeXpoZmJkY2xtcm5uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY5NjUyMzQsImV4cCI6MjAzMjU0MTIzNH0.N31WgDzl0WzGGhpGoTL6cXzF2kdmdDSv1XMstnQwMQ0";
/* cSpell:enable */

type getEventsParams = {
  userId?: string;
  location?: LatLng;
  tags?: string[];
  types?: string[];
  limit?: number;
  degrees?: number;
};
type getIssuesParams = {
  userId?: string;
  types?: string[];
  limit?: number;
  fixed?: boolean;
  degrees?: number;
  location?: LatLng;
};
type getPostsParams = getEventsParams & getIssuesParams;

const supabase = createClient<Database>(supabaseURL, supabaseKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
const km50inDegrees = 0.4511;

const getEvents = async ({
  userId,
  types,
  limit,
  tags,
  location,
  degrees = km50inDegrees,
}: getEventsParams) => {
  let request = supabase.from("events").select();
  if (userId) request = request.eq("created_by", userId);
  if (types && types.length > 0) request = request.in("type", types);
  if (limit) request = request.limit(limit);
  if (tags && tags.length > 0)
    request = request.containedBy("tags", tags).neq("tags", "{}");
  if (location) {
    const r = await supabase.rpc("get_events_in_range", {
      location_input: `POINT(${location.longitude} ${location.latitude})`,
      range_input: degrees,
    });
    if (!r.error) {
      const ids = r.data.map((v) => v.id);
      request = request.in("id", ids);
    }
  }
  const response = await request;
  if (response.error || response.data === null) return [];
  return response.data.map((data) => CommunityEvent.fromDatabase(data));
};

const getIssues = async ({
  userId,
  types,
  limit,
  fixed,
  degrees = km50inDegrees,
  location,
}: getIssuesParams) => {
  let request = supabase.from("issues").select();
  if (userId) request = request.eq("created_by", userId);
  if (types) request = request.in("type", types);
  if (limit) request = request.limit(limit);
  if (fixed !== undefined) request = request.eq("fixed", fixed);
  if (location) {
    const r = await supabase.rpc("get_issues_in_range", {
      location_input: `POINT(${location.longitude} ${location.latitude})`,
      range_input: degrees,
    });
    if (!r.error) {
      const ids = r.data.map((v) => v.id);
      request = request.in("id", ids);
    }
  }
  const response = await request;
  if (response.error || response.data === null) return [];
  return response.data.map((v) => IssueFromDatabase(v));
};

async function getPosts(params: getPostsParams) {
  const posts = [...(await getEvents(params)), ...(await getIssues(params))];

  posts.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
  return posts;
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

export {
  getUserData,
  supabase,
  getPosts,
  getEvents,
  getIssues,
  getEventsParams,
  getIssuesParams,
  getPostsParams,
};

import "react-native-url-polyfill/auto";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { createClient } from "@supabase/supabase-js";
import { CommunityEvent } from "../model/event";
import { Database } from '~/database.types';



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
  if (number) {
    return await supabase
      .from("events")
      .select()
      .eq("created_by", created_by)
      .order("created_at")
      .limit(number);
  }

  let response = await supabase
    .from("events")
    .select()
    .eq("created_by", created_by)
    .order("created_at");

  return response;
};

async function getPosts(created_by: string): Promise<CommunityEvent[]> {
  throw new Error("Unimplemented");
}

const getUserData = async (id: string) => {
  let response = await supabase
    .from("profiles")
    .select("username, avatar_url, interests")
    .eq("id", id);
  if (response.error) {
    return response.error.message;
  }

  return response.data[0];
};

export { getUserData, supabase };

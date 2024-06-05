import { Button, View } from "react-native";
import { supabase } from "../../src/utils/supabase";

function feed() {
  function signOut() {
    supabase.auth.signOut();
  }

  return (
    <View>{/* <Button onPress={signOut} title="Sign out"></Button> */}</View>
  );
}

export default feed;

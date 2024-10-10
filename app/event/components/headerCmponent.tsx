import { View, Linking, Text, StyleSheet } from "react-native";
import ProfileIcon from "~/src/components/shared/ProfileIcon";
import { CommunityEvent } from "~/src/model/event";
import { colors, bodyFonts, typeColor } from "~/src/utils/stylingValue";

type props = { event: CommunityEvent };

const HeaderComponent = ({ event }: props) => {
  return (
    <View
      style={{
        width: "100%",
        flexDirection: "row",
        marginTop: 20,
        backgroundColor: colors.primaryContainer,
        padding: 5,
        borderRadius: 10,
      }}
    >
      <ProfileIcon id={event.hosted_by} size={100} showName={false} />
      <View
        style={{
          flexDirection: "row",
          flexWrap: "wrap",
          gap: 10,
          flex: 1,
          alignContent: "center",
        }}
      >
        <View>
          <Text
            style={[
              styles.top,
              { color: typeColor(event.type.toString()) },
              { fontWeight: "bold" },
            ]}
          >
            {event.type}
          </Text>
        </View>
        <View>
          <Text style={[styles.top]}>
            Dress code:{"\n"}{" "}
            <Text style={{ color: colors.primary, fontWeight: "bold" }}>
              {event.dressCode}
            </Text>
          </Text>
        </View>
        <View>
          <Text style={[styles.top]}>
            Age Limit: {"\n"} {event.ageRange["min"].toString()}yr
            {event.ageRange["max"] != null
              ? ` — ${event.ageRange["max"]}yr`
              : ""}
          </Text>
        </View>
        <View>
          <Text
            style={[styles.linkText, { fontWeight: "bold" }]}
            onPress={() => Linking.openURL(event.ticketWebsite ?? "")}
          >
            Tickets
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  top: {
    fontSize: bodyFonts.small,
  },

  linkText: { color: colors.primary },
});

export default HeaderComponent;

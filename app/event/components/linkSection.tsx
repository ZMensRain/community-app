import { View, Linking, Text, StyleSheet } from "react-native";
import { colors } from "~/src/utils/stylingValue";

type props = { links: string[] };

const LinkSection = ({ links }: props) => {
  return (
    <View style={styles.vMT}>
      <Text style={styles.h1}>Links</Text>
      {links.map((link, index) => (
        <Text
          onPress={() => Linking.openURL(link.toString())}
          key={index}
          style={[styles.linkText, styles.bodyFont]}
        >
          {link}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    fontWeight: "semibold",
  },
  bodyFont: {
    fontSize: 14,
  },
  vMT: {
    marginVertical: 5,
  },
  linkText: { color: colors.primary },
});

export default LinkSection;

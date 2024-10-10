import { View, Linking, Text, StyleSheet } from "react-native";
import { colors, bodyFonts, titleFonts } from "~/src/utils/stylingValue";

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
    fontSize: titleFonts.medium,
    fontWeight: "semibold",
  },
  bodyFont: {
    fontSize: bodyFonts.small,
  },
  vMT: {
    marginVertical: 5,
  },
  linkText: { color: colors.primary },
});

export default LinkSection;

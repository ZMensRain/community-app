import { StyleSheet, Text } from "react-native";

const TermsComponent = () => {
  return (
    <Text style={styles.text}>
      By continuing, you agree to our Terms of Service and Privacy Policy
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    color: "#828282",
    textAlign: "center",
    marginTop: 40,
  },
});

export default TermsComponent;

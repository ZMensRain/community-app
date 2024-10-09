import { ActivityIndicator, View, Text } from "react-native";
import { pageStyle } from "~/src/utils/stylingValue";

type props = {
  error?: string;
};

const LoadingScreen = ({ error }: props) => {
  return (
    <View
      style={[
        pageStyle,
        {
          justifyContent: "center",
        },
      ]}
    >
      {error ? <Text>{error}</Text> : <ActivityIndicator size="large" />}
    </View>
  );
};

export default LoadingScreen;

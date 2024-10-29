import { router } from "expo-router";
import { useState } from "react";
import { FlatList, View, Text } from "react-native";
import SearchBar from "~/src/components/create/SearchBar";

import OutlineButton from "~/src/components/shared/outlineButton";
import { useIssueCreationContext } from "~/src/contexts/issueReportCreationContext";
import { IssueTypeEnum } from "~/src/model/issue";
import { getSearchResults } from "~/src/utils/search";
import { bodyFonts, pageStyle } from "~/src/utils/stylingValue";

const quickAccess = Object.keys(IssueTypeEnum);

const IssueTypeScreen = () => {
  const issueCreationContext = useIssueCreationContext();
  if (!issueCreationContext) return null;
  const [searched, setSearched] = useState<string>("");

  const onPickType = (type: string) => {
    router.navigate("create/issueReport/2");
    issueCreationContext.state[1]({
      ...issueCreationContext.state[0],
      type: type,
    });
  };

  return (
    <View style={[pageStyle, { paddingTop: 10 }]}>
      <SearchBar onTextUpdate={(v) => setSearched(v)} />
      <FlatList
        showsVerticalScrollIndicator={false}
        data={getSearchResults(searched, quickAccess)}
        renderItem={(v) => (
          <View style={{ marginTop: 10 }}>
            <OutlineButton onPress={() => onPickType(v.item)}>
              <Text style={{ fontSize: bodyFonts.medium }}>{v.item}</Text>
            </OutlineButton>
          </View>
        )}
      />
    </View>
  );
};

export default IssueTypeScreen;

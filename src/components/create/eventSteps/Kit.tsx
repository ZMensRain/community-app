import { StyleSheet, View, Text, ScrollView, Button } from "react-native";
import React, { useState } from "react";
import KitComponent from "../components/KitComponent";
import { EventKit } from "../../../model/event";
import NextButton from "../components/NextButton";
import KitSearchModal from "../components/KitSearchModal";

type props = {
  onNextButtonPressed: (kit: Array<String | EventKit>) => void;
};

const KitStep = (props: props) => {
  let [isAdding, setIsAdding] = useState<boolean>(false);
  let [kit, setKit] = useState<Array<String | EventKit>>([]);

  return (
    <View style={styles.container}>
      <KitSearchModal
        isVisible={isAdding}
        onClose={() => setIsAdding(false)}
        onAdd={(value) => setKit(kit.concat(value))}
      />
      <Text style={styles.pageTitle}>People should bring?</Text>
      <View style={(styles.section, { alignItems: "flex-start" })}>
        <Button title="Add" onPress={() => setIsAdding(true)}></Button>
      </View>

      <View style={[styles.section, { flex: 1 }, styles.separator]}>
        <ScrollView>
          {kit.map((value, index) => {
            return (
              <KitComponent
                kit={value}
                add={false}
                key={index}
                onButtonPressed={() => {
                  setKit(
                    kit.filter((_, i) => {
                      if (i === index) {
                        return false;
                      }
                      return true;
                    })
                  );
                }}
              />
            );
          })}
        </ScrollView>
      </View>

      <View style={{ justifyContent: "flex-end", paddingBottom: 35 }}>
        <NextButton onPressed={() => props.onNextButtonPressed(kit)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 25, backgroundColor: "white" },
  pageTitle: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
  },
  input: {
    backgroundColor: "#E4E4E4",
    borderRadius: 20,
    paddingVertical: 14,
    paddingHorizontal: 25,
  },
  inputLabel: { fontSize: 16, fontWeight: "bold" },
  section: { marginTop: 5 },
  separator: { borderTopColor: "black", borderTopWidth: 1, borderRadius: 2 },
});

export default KitStep;

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import {
  faMap,
  faClock,
  faCalendar,
} from "@fortawesome/free-regular-svg-icons";
import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FormikValues, useFormik } from "formik";
import React, { useCallback, useContext, useRef, useState } from "react";
import * as Yup from "yup";
import { router, Stack } from "expo-router";

import NextButton from "src/components/create/NextButton";
import { Day } from "src/model/day";
import DayCard from "src/components/DayCard";
import IconButton from "src/components/iconButton";
import DateAndTimePicker from "src/components/create/DateAndTimePicker";
import LocationPickerModal from "src/components/create/LocationModal";
import { EventCreationContext } from "src/contexts/eventCreationContext";
import Ionicons from "@expo/vector-icons/Ionicons";

const WhereWhenScreen = () => {
  let eventContext = useContext(EventCreationContext);
  if (eventContext === undefined) {
    Alert.alert("State is missing");
    return;
  }
  let [days, setDays] = useState<Day[]>(eventContext.event.days);
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["75%", "100%"];

  function next() {
    let e = eventContext!.event;
    e.days = days;
    eventContext?.setEvent(e);
    router.navigate("create/event/6");
  }

  const submitDay = (v: FormikValues) =>
    setDays(days.concat(new Day(v.starts, v.ends, v.date, v.location)));

  const validation = Yup.object().shape({
    date: Yup.date().required(),
    starts: Yup.date().required(),
    ends: Yup.date().required(),
    location: Yup.array().required(),
  });

  // Using useFormik instead of <Formik>
  // so the bottom sheet can set the location.
  const formik = useFormik({
    initialValues: {
      date: new Date(),
      starts: new Date(2000, 1, 1, 8, 30, 0, 0),
      ends: new Date(2000, 1, 1, 14, 30, 0, 0),
      location: [],
    },
    validationSchema: validation,
    validateOnChange: true,
    onSubmit: submitDay,
  });

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    []
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: "Wheres and Whens",
          headerRight: () => (
            <Pressable onPress={() => formik.handleSubmit()}>
              <Ionicons name="add" size={24} />
            </Pressable>
          ),
        }}
      />
      <GestureHandlerRootView style={styles.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/*Day form*/}
          <>
            {/*Date */}
            <DateAndTimePicker
              error={formik.errors.date as string}
              label="Date"
              mode="date"
              onValueSet={(newDate) => formik.setFieldValue("date", newDate)}
              value={formik.values.date}
              icon={faCalendar}
            />

            {/*Starts */}
            <DateAndTimePicker
              error={formik.errors.starts as string}
              label="Starts"
              mode="time"
              onValueSet={(newDate) => formik.setFieldValue("starts", newDate)}
              value={formik.values.starts}
              icon={faClock}
            />

            {/*Ends */}
            <DateAndTimePicker
              error={formik.errors.ends as string}
              label="Ends"
              mode="time"
              onValueSet={(newDate) => formik.setFieldValue("ends", newDate)}
              value={formik.values.ends}
              icon={faClock}
            />

            {/*Location */}
            <View style={styles.mt10}>
              <Text style={styles.label}>
                Location
                <Text style={{ color: "red" }}>*</Text>
              </Text>
              <IconButton
                icon={faMap}
                onPress={() => sheetRef.current?.snapToIndex(0)}
              >
                <Text>
                  {formik.values.location.length === 0
                    ? "No location set"
                    : formik.values.location.length}
                </Text>
              </IconButton>
              {formik.errors.location && <Text>{formik.errors.location}</Text>}
            </View>
          </>

          {/*Days view */}
          <>
            {days.length > 0 && (
              <View style={{ flex: 1 }}>
                <ScrollView
                  horizontal={true}
                  nestedScrollEnabled={true}
                  showsHorizontalScrollIndicator={false}
                  showsVerticalScrollIndicator={false}
                  style={{
                    height: 300,
                  }}
                >
                  {days.map((value, index) => {
                    return <DayCard day={value} index={index} key={index} />;
                  })}
                </ScrollView>
              </View>
            )}
          </>
        </ScrollView>

        <View style={{ justifyContent: "flex-end", paddingBottom: 35 }}>
          <NextButton onPressed={next} />
        </View>

        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enablePanDownToClose={true}
          backdropComponent={renderBackdrop}
          index={-1}
        >
          <LocationPickerModal
            onPickLocation={(location) => {
              sheetRef.current?.close();
              formik.setFieldValue("location", location);
            }}
          />
        </BottomSheet>
      </GestureHandlerRootView>
    </>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff", paddingHorizontal: 25 },
  pageTitle: {
    textAlign: "center",
    fontSize: 32,
    fontWeight: "bold",
    marginTop: 20,
  },
  label: { fontSize: 20, fontWeight: "semibold" },
  mt10: {
    marginTop: 10,
  },
});

export default WhereWhenScreen;

import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ScrollView,
  Alert,
  FlatList,
} from "react-native";

import BottomSheet from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FormikValues, useFormik } from "formik";
import React, { useContext, useRef, useState } from "react";
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
import { colors, titleFonts, pageStyle } from "~/src/utils/stylingValue";
import renderBackdrop from "~/src/components/shared/sheetBackdrop";
import { LatLng } from "react-native-maps";
const WhereWhenScreen = () => {
  const eventContext = useContext(EventCreationContext);
  if (eventContext === undefined) {
    Alert.alert("State is missing");
    return;
  }
  const [days, setDays] = useState<Day[]>(eventContext.event.days);
  const sheetRef = useRef<BottomSheet>(null);
  const snapPoints = ["75%", "100%"];

  function next() {
    if (days.length < 1) return;
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
    location: Yup.object().required(),
  });

  // Using useFormik instead of <Formik>
  // so the bottom sheet can set the location.
  const formik = useFormik({
    initialValues: {
      date: new Date(),
      starts: new Date(2000, 1, 1, 8, 30, 0, 0),
      ends: new Date(2000, 1, 1, 14, 30, 0, 0),
      location: { latitude: 0, longitude: 0 },
    },
    validationSchema: validation,
    validateOnChange: true,
    onSubmit: submitDay,
  });

  return (
    <>
      <Stack.Screen
        options={{
          title: "Wheres and Whens",
          headerRight: () => (
            <Pressable onPress={() => formik.handleSubmit()}>
              <Ionicons name="add" size={24} color={colors.primary} />
            </Pressable>
          ),
        }}
      />
      <View style={pageStyle}>
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
              icon={<Ionicons name="calendar-outline" size={25} />}
            />

            {/*Starts */}
            <DateAndTimePicker
              error={formik.errors.starts as string}
              label="Starts"
              mode="time"
              onValueSet={(newDate) => formik.setFieldValue("starts", newDate)}
              value={formik.values.starts}
              icon={<Ionicons name="time-outline" size={25} />}
            />

            {/*Ends */}
            <DateAndTimePicker
              error={formik.errors.ends as string}
              label="Ends"
              mode="time"
              onValueSet={(newDate) => formik.setFieldValue("ends", newDate)}
              value={formik.values.ends}
              icon={<Ionicons name="time-outline" size={25} />}
            />

            {/*Location */}
            <View style={styles.mt10}>
              <Text style={styles.label}>
                Location
                <Text style={{ color: "red" }}>*</Text>
              </Text>
              <IconButton
                icon={<Ionicons name="map-outline" size={25} />}
                onPress={() => sheetRef.current?.snapToIndex(0)}
              >
                <Text>
                  {`${formik.values.location.latitude}, ${formik.values.location.longitude}`}
                </Text>
              </IconButton>
              {formik.errors.location && (
                <Text>{formik.errors.location.toString()}</Text>
              )}
            </View>
          </>

          {/*Days view */}
          <>
            {days.length > 0 && (
              <FlatList
                horizontal={true}
                nestedScrollEnabled={true}
                showsHorizontalScrollIndicator={false}
                style={[styles.mt10, styles.dayList]}
                data={days}
                renderItem={(i) => (
                  <DayCard day={i.item} index={i.index} key={i.index} />
                )}
              />
            )}
          </>
        </ScrollView>

        <View style={{ justifyContent: "flex-end", paddingBottom: 25 }}>
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
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  label: { fontSize: titleFonts.small, fontWeight: "semibold" },
  mt10: {
    marginTop: 10,
  },
  dayList: {
    height: 300,
  },
});

export default WhereWhenScreen;

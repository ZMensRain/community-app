import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  Pressable,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { FormikValues, useFormik } from "formik";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Yup from "yup";

import TermsComponent from "~/src/components/auth/Terms";
import { supabase } from "src/utils/supabase";
import {
  bodyFonts,
  inputStyle,
  margin,
  padding,
  pageStyle,
  titleFonts,
} from "~/src/utils/stylingValue";
import FilledButton from "~/src/components/shared/filledButton";
import LoadingScreen from "~/src/components/shared/loadingScreen";

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  async function signInWithEmail(email: string, password: string) {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
      setLoading(false);
    }
  }

  const validation = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Too short")
      .max(16, "Too Long")
      .required("Required"),
  });

  const onSubmit = (values: FormikValues) =>
    signInWithEmail(values["email"], values["password"]);

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    onSubmit: onSubmit,
    validationSchema: validation,
  });

  return (
    <SafeAreaView style={[pageStyle, styles.container]}>
      <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <ScrollView>
          {/*Title*/}
          <Text style={styles.title}>Community</Text>
          {/*Subtitle*/}
          <Text style={styles.subtitle}>Sign In</Text>

          {loading ? (
            <LoadingScreen />
          ) : (
            <>
              {/*Input fields*/}

              <TextInput
                value={formik.values.email}
                onChangeText={formik.handleChange("email")}
                onBlur={formik.handleBlur("email")}
                keyboardType="email-address"
                placeholder={"email@address.com"}
                style={inputStyle}
              />
              {formik.errors.email && (
                <Text style={styles.error}>{formik.errors.email}</Text>
              )}

              <TextInput
                value={formik.values.password}
                onChangeText={formik.handleChange("password")}
                onBlur={formik.handleBlur("password")}
                secureTextEntry={true}
                placeholder={"Password"}
                style={inputStyle}
              />
              {formik.errors.password && (
                <Text style={styles.error}>{formik.errors.password}</Text>
              )}

              <View
                style={[
                  {
                    flexDirection: "row",
                    justifyContent: "space-between",
                    gap: 10,
                    marginVertical: margin.medium,
                  },
                ]}
              >
                <Text
                  style={styles.textButton}
                  onPress={() => router.navigate("auth/signUp")}
                >
                  Need an account?
                </Text>

                <Text
                  style={styles.textButton}
                  onPress={() => {
                    router.navigate("forgotPassword");
                  }}
                >
                  Forgot Password?
                </Text>
              </View>

              {/*Sign in button */}
              <FilledButton
                text="Sign in"
                onPress={() => formik.handleSubmit()}
                buttonStyle={{ backgroundColor: "black" }}
              />
            </>
          )}

          <TermsComponent />
        </ScrollView>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: padding.large },
  title: {
    fontWeight: "bold",
    fontSize: titleFonts.medium,
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    fontWeight: "semibold",
    fontSize: bodyFonts.medium,
    textAlign: "center",
    marginTop: 25,
  },
  textButton: {
    textAlign: "center",
    color: "#828282",
  },
  error: {
    color: "red",
  },
});

import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  TextInput,
  Pressable,
  Keyboard,
  Text,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGoogle, faApple } from "@fortawesome/free-brands-svg-icons/";
import { FormikValues, useFormik } from "formik";
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

function SignUp() {
  const [loading, setLoading] = useState(false);

  async function signUpWithEmail(email: string, password: string) {
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error?.name);
    // if (!session)
    //   Alert.alert("Please check your inbox for email verification!");
  }

  async function signUpWithApple() {
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "github",
    });

    if (error) Alert.alert(error.message);

    setLoading(false);
  }

  const submit = async (values: FormikValues) => {
    setLoading(true);
    await signUpWithEmail(values["email"], values["password"]);
    let user = await supabase.auth.getUser();

    let id = user.data.user?.id;

    let a = await supabase
      .from("profiles")
      .update({ username: values["username"] })
      .filter("id", "eq", id);

    setLoading(false);
  };

  const validation = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    username: Yup.string()
      .lowercase()
      .required("Required")
      .notOneOf(["null", "admin", "god"], "That name is blocked"),
    password: Yup.string()
      .min(8, "Too short")
      .max(16, "Too Long")
      .required("Required"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "", username: "" },
    onSubmit: submit,
    validationSchema: validation,
  });

  return (
    <SafeAreaView style={[pageStyle, styles.container]}>
      <Pressable onPress={Keyboard.dismiss}>
        <ScrollView>
          <Text style={styles.pageTitle}>Community</Text>
          <Text style={styles.subtitle}>Create an Account</Text>
          {loading ? (
            <ActivityIndicator size={"large"} />
          ) : (
            <>
              {/*Email address field*/}
              <View style={[styles.verticallySpaced]}>
                <TextInput
                  style={inputStyle}
                  onChangeText={formik.handleChange("email")}
                  onBlur={formik.handleBlur("email")}
                  value={formik.values.email}
                  placeholder="email@address.com"
                  keyboardType="email-address"
                  autoCapitalize={"none"}
                />
                {formik.errors.email && (
                  <Text style={styles.error}>{formik.errors.email}</Text>
                )}
              </View>

              {/*Username field*/}
              <View style={styles.verticallySpaced}>
                <TextInput
                  style={inputStyle}
                  onChangeText={formik.handleChange("username")}
                  onBlur={formik.handleBlur("username")}
                  value={formik.values.username}
                  placeholder="Username"
                  autoCapitalize={"words"}
                />
                {formik.errors.username && (
                  <Text style={styles.error}>{formik.errors.username}</Text>
                )}
              </View>

              {/*Password field*/}
              <View style={styles.verticallySpaced}>
                <TextInput
                  style={inputStyle}
                  editable
                  onChangeText={formik.handleChange("password")}
                  onBlur={formik.handleBlur("password")}
                  value={formik.values.password}
                  secureTextEntry={true}
                  placeholder="Password"
                  autoCapitalize={"none"}
                />
                {formik.errors.password && (
                  <Text style={styles.error}>{formik.errors.password}</Text>
                )}
              </View>

              {/*Sign up button*/}
              <View style={styles.verticallySpaced}>
                <FilledButton
                  onPress={() => formik.handleSubmit()}
                  text="Sign up With email"
                  buttonStyle={{ backgroundColor: "black" }}
                />
              </View>

              <View
                style={{
                  marginTop: 40,
                  flexDirection: "row",
                  justifyContent: "center",
                }}
              >
                <View style={styles.dividerLine} />
                <Text style={{ textAlign: "center", color: "#828282" }}>
                  or continue with
                </Text>
                <View style={styles.dividerLine} />
              </View>

              {/*Social sign in buttons*/}
              <>
                {/*Sign in with Google*/}
                <Pressable style={styles.withButton}>
                  <FontAwesomeIcon icon={faGoogle} size={25}></FontAwesomeIcon>
                  <Text style={styles.withButtonText}>Google</Text>
                </Pressable>

                {/*Sign in with Apple*/}
                <Pressable style={styles.withButton} onPress={signUpWithApple}>
                  <FontAwesomeIcon icon={faApple} size={25}></FontAwesomeIcon>
                  <Text style={styles.withButtonText}>Apple</Text>
                </Pressable>
              </>

              <Pressable onPress={() => router.navigate("auth/signIn")}>
                <Text style={[{ textAlign: "center", color: "#828282" }]}>
                  Have an account?
                </Text>
              </Pressable>
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

  verticallySpaced: {
    paddingVertical: 4,
  },

  pageTitle: {
    fontWeight: "bold",
    fontSize: titleFonts.medium,
    textAlign: "center",
    marginTop: margin.large,
  },
  subtitle: {
    fontWeight: "semibold",
    fontSize: bodyFonts.medium,
    textAlign: "center",
    marginTop: 25,
  },
  dividerLine: {
    height: 1,
    backgroundColor: "#828282",
    flex: 1,
    alignSelf: "center",
    marginHorizontal: 8,
  },
  withButton: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
    backgroundColor: "#eeeeee",
    width: "100%",
    paddingVertical: 10,
    marginVertical: 10,
    borderRadius: 10,
  },
  withButtonText: {
    textAlignVertical: "center",
    paddingHorizontal: 10,
    fontSize: bodyFonts.small,
    fontWeight: "medium",
  },

  error: { color: "red" },
});

export default SignUp;

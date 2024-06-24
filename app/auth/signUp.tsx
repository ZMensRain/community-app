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
import { supabase } from "../../src/utils/supabase";
import { SafeAreaView } from "react-native-safe-area-context";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons/faGoogle";
import { faApple } from "@fortawesome/free-brands-svg-icons/faApple";
import { FormikValues, Formik } from "formik";
import { router } from "expo-router";

import * as Yup from "yup";
import TermsComponent from "../../src/components/authComponents/Terms";

type formProps = {
  email: String;
  username: String;
  password: String;
};

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

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={Keyboard.dismiss}>
        <ScrollView>
          <Text style={styles.pageTitle}>Community</Text>
          <Text style={styles.subtitle}>Create an Account</Text>
          {loading ? (
            <ActivityIndicator size={"large"} />
          ) : (
            <Formik
              initialValues={{ email: "", password: "", username: "" }}
              onSubmit={submit}
              validationSchema={validation}
            >
              {({ handleChange, handleBlur, handleSubmit, values, errors }) => (
                <View style={[{ paddingHorizontal: 36 }]}>
                  <>
                    {/*Email address field*/}
                    <View style={[styles.verticallySpaced]}>
                      <TextInput
                        style={styles.input}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        value={values.email}
                        placeholder="email@address.com"
                        keyboardType="email-address"
                        autoCapitalize={"none"}
                      />
                      {errors.email != null && (
                        <Text style={styles.error}>{errors.email}</Text>
                      )}
                    </View>

                    {/*Username field*/}
                    <View style={styles.verticallySpaced}>
                      <TextInput
                        style={styles.input}
                        onChangeText={handleChange("username")}
                        onBlur={handleBlur("username")}
                        value={values.username}
                        placeholder="Username"
                        autoCapitalize={"words"}
                      />
                      {errors.username != null && (
                        <Text style={styles.error}>{errors.username}</Text>
                      )}
                    </View>

                    {/*Password field*/}
                    <View style={styles.verticallySpaced}>
                      <TextInput
                        style={styles.input}
                        editable
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        value={values.password}
                        secureTextEntry={true}
                        placeholder="Password"
                        autoCapitalize={"none"}
                      />
                      {errors.password != null && (
                        <Text style={styles.error}>{errors.password}</Text>
                      )}
                    </View>

                    {/*Sign up button*/}
                    <View style={styles.verticallySpaced}>
                      <Pressable
                        onPress={() => handleSubmit()}
                        style={styles.signUpButton}
                      >
                        <Text style={styles.signUpButtonText}>
                          Sign up with email
                        </Text>
                      </Pressable>
                    </View>
                  </>

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
                      <FontAwesomeIcon
                        icon={faGoogle}
                        size={25}
                      ></FontAwesomeIcon>
                      <Text style={styles.withButtonText}>Google</Text>
                    </Pressable>

                    {/*Sign in with Apple*/}
                    <Pressable
                      style={styles.withButton}
                      onPress={signUpWithApple}
                    >
                      <FontAwesomeIcon
                        icon={faApple}
                        size={25}
                      ></FontAwesomeIcon>
                      <Text style={styles.withButtonText}>Apple</Text>
                    </Pressable>
                  </>

                  <Pressable onPress={() => router.navigate("auth/signIn")}>
                    <Text style={[{ textAlign: "center", color: "#828282" }]}>
                      Have an account?
                    </Text>
                  </Pressable>
                </View>
              )}
            </Formik>
          )}
          <TermsComponent />
        </ScrollView>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },

  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },

  input: {
    marginVertical: 7.5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    borderWidth: 1,
  },
  pageTitle: {
    fontWeight: "bold",
    fontSize: 24,
    textAlign: "center",
    marginTop: 20,
  },
  subtitle: {
    fontWeight: "semibold",
    fontSize: 18,
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
    fontSize: 14,
    fontWeight: "medium",
  },
  signUpButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    borderRadius: 10,
  },
  signUpButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "medium",
  },

  error: { color: "red" },
});

export default SignUp;

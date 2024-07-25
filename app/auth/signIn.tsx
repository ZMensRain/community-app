import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  AppState,
  View,
  Pressable,
  Keyboard,
  ScrollView,
  Text,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { Formik, FormikValues } from "formik";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import * as Yup from "yup";

import TermsComponent from "src/components/authComponents/Terms";
import { supabase } from "src/utils/supabase";

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  async function signInWithEmail(email: string, password: string) {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) Alert.alert(error.message);
    setLoading(false);
  }

  const validation = Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string()
      .min(8, "Too short")
      .max(16, "Too Long")
      .required("Required"),
  });

  const onSubmit = (values: FormikValues) => {
    signInWithEmail(values["email"], values["password"]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
        <ScrollView>
          {/*Title*/}
          <Text style={styles.title}>Community</Text>
          {/*Subtitle*/}
          <Text style={styles.subtitle}>Sign In</Text>

          <View style={styles.body}>
            {loading ? (
              <ActivityIndicator size={"large"} />
            ) : (
              <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={onSubmit}
                validationSchema={validation}
                validateOnChange={true}
              >
                {({
                  handleChange,
                  handleBlur,
                  handleSubmit,
                  values,
                  errors,
                }) => (
                  <>
                    {/*Input fields*/}
                    <>
                      <TextInput
                        value={values.email}
                        style={styles.input}
                        onChangeText={handleChange("email")}
                        onBlur={handleBlur("email")}
                        placeholder={"email@address.com"}
                      />
                      {errors.email != null && (
                        <Text style={styles.error}>{errors.email}</Text>
                      )}

                      <TextInput
                        value={values.password}
                        style={styles.input}
                        onChangeText={handleChange("password")}
                        onBlur={handleBlur("password")}
                        placeholder={"password"}
                        secureTextEntry={true}
                      />
                      {errors.password != null && (
                        <Text style={styles.error}>{errors.password}</Text>
                      )}
                    </>

                    <Pressable
                      style={[styles.mt, styles.mb]}
                      onPress={() => router.navigate("auth/signUp")}
                      pressRetentionOffset={20}
                    >
                      <Text style={[{ textAlign: "center", color: "#828282" }]}>
                        Don't have an account?
                      </Text>
                    </Pressable>

                    {/*Sign in button */}
                    <Pressable
                      style={[styles.signInButton, styles.mt]}
                      onPress={() => handleSubmit()}
                    >
                      <Text style={styles.signInButtonText}>Sign in</Text>
                    </Pressable>
                  </>
                )}
              </Formik>
            )}
          </View>
          <TermsComponent />
        </ScrollView>
      </Pressable>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  body: {
    marginHorizontal: 36,
    justifyContent: "center",
    height: "100%",
  },
  title: {
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
  input: {
    marginVertical: 7.5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    borderWidth: 1,
  },
  signInButton: {
    backgroundColor: "#000",
    paddingVertical: 10,
    borderRadius: 10,
  },
  signInButtonText: {
    color: "white",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "medium",
  },
  error: {
    color: "red",
  },
  mt: {
    marginTop: 10,
  },
  mb: { marginBottom: 10 },
});

import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Pressable,
  Keyboard,
} from "react-native";
import FilledButton from "~/src/components/shared/filledButton";
import { useUserContext } from "~/src/contexts/userContext";

import {
  bodyFonts,
  inputStyle,
  margin,
  padding,
  pageStyle,
} from "~/src/utils/stylingValue";
import { Stack } from "expo-router";
import { useFormik } from "formik";
import { passwordValidation } from "~/src/utils/validation";
import { supabase } from "~/src/utils/supabase";

const ResetPassword = () => {
  const resetPassword = (newPassword: string) => {
    supabase.auth.updateUser({ password: newPassword });
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassword: "",
    },
    validationSchema: passwordValidation,
    validateOnChange: true,
    onSubmit: ({ password }) => resetPassword(password),
  });

  return (
    <>
      <Stack.Screen options={{ title: "Reset Password", headerShown: true }} />
      <Pressable style={pageStyle} onPress={() => Keyboard.dismiss()}>
        <Text style={styles.subtitle}>
          New Password<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={inputStyle}
          placeholder="New Password"
          secureTextEntry={true}
          value={formik.values.password}
          onChangeText={(v) => formik.setFieldValue("password", v)}
        />
        {formik.errors.confirmPassword && (
          <Text style={{ color: "red" }}>{formik.errors.password}</Text>
        )}
        <Text style={styles.subtitle}>
          Confirm New Password<Text style={{ color: "red" }}>*</Text>
        </Text>
        <TextInput
          style={inputStyle}
          placeholder="New Password Again"
          secureTextEntry={true}
          value={formik.values.confirmPassword}
          onChangeText={(v) => formik.setFieldValue("confirmPassword", v)}
        />
        {formik.errors.confirmPassword && (
          <Text style={{ color: "red" }}>{formik.errors.confirmPassword}</Text>
        )}
        <View style={{ paddingTop: padding.large }}>
          <FilledButton text="Reset" onPress={() => formik.handleSubmit()} />
        </View>
      </Pressable>
    </>
  );
};

const styles = StyleSheet.create({
  subtitle: {
    fontWeight: "semibold",
    fontSize: bodyFonts.medium,
    marginTop: margin.small,
  },
});

export default ResetPassword;

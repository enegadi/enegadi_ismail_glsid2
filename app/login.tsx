import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { Link } from "expo-router";
import styles from "./styles";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onLoginPress = () => {
    console.log("Login button pressed");
  };

  return (
    <KeyboardAvoidingView style={styles.containerView} behavior="padding">
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
          <View style={styles.loginFormView}>
            <Text style={styles.logoText}>Casino Game</Text>
            <TextInput
              placeholder="Username"
              style={styles.loginFormTextInput}
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              placeholder="Password"
              style={styles.loginFormTextInput}
              secureTextEntry={true}
              onChangeText={setPassword}
              value={password}
            />
            <Link href={"/home"} asChild>
              <TouchableOpacity
                style={styles.loginButton}
                onPress={onLoginPress}
              >
                <Text style={styles.loginButtonText}>Login</Text>
              </TouchableOpacity>
            </Link>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

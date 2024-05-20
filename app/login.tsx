import {
  View,
  Text,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
  TextInput,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import styles from "./styles";
import { Button } from "react-native-elements";
import { Link } from "expo-router";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isloading, setIsLoading] = useState(false);

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
            <Link href={"/home"}>
              <Button
                buttonStyle={styles.loginButton}
                onPress={() => onLoginPress()}
                title="Login"
              />
            </Link>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

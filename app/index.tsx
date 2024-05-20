import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { Link } from "expo-router";

const Index = () => {
  return (
    <View style={styles.container}>
      <Link
        href={"/login"}
        style={{
          backgroundColor: "bluelight",
          width: 200,
          height: 50,
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 10,
          marginBottom: 20,
          textAlign: "center",
          padding: 12,
          color: "white",
        }}
      >
        <Text>Start the game</Text>
      </Link>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Index;

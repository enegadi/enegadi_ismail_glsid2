import React, { useState, useEffect, useRef } from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  Animated,
  BackHandler,
} from "react-native";

// Importing dice images
const diceImages = [
  require("../assets/dice0.png"),
  require("../assets/dice1.png"),
  require("../assets/dice2.png"),
  require("../assets/dice3.png"),
  require("../assets/dice4.png"),
  require("../assets/dice5.png"),
  require("../assets/dice6.png"),
];

const Home: React.FC = () => {
  const [dice, setDice] = useState(0);
  const [playerMoney, setPlayerMoney] = useState(
    Math.floor(Math.random() * 10) + 1
  );
  const [casinoMoney, setCasinoMoney] = useState(
    Math.floor(Math.random() * 10) + 1
  );
  const [winner, setWinner] = useState<string | null>(null);
  const rotation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (playerMoney <= 0) {
      setWinner("Casino");
    } else if (casinoMoney <= 0) {
      setWinner("Player");
    }
  }, [playerMoney, casinoMoney]);

  const rollDice = () => {
    if (playerMoney > 0 && casinoMoney > 0) {
      Animated.sequence([
        Animated.timing(rotation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(rotation, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => {
        const newDice = Math.floor(Math.random() * 6) + 1;
        setDice(newDice);
        if (newDice === 2 || newDice === 3) {
          setPlayerMoney(playerMoney + 1);
          setCasinoMoney(casinoMoney - 1);
        } else {
          setPlayerMoney(playerMoney - 1);
          setCasinoMoney(casinoMoney + 1);
        }
      });
    }
  };

  const exitApp = () => {
    BackHandler.exitApp();
  };

  const rotationInterpolation = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
    <View style={styles.container}>
      {winner ? (
        <Text style={styles.winnerText}>The winner is {winner}!</Text>
      ) : (
        <>
          <View style={styles.row}>
            <Text style={styles.labelText}>Player's Money: </Text>
            <Text style={styles.valueText}>{playerMoney}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.labelText}>Casino's Money: </Text>
            <Text style={styles.valueText}>{casinoMoney}</Text>
          </View>
          <Animated.Image
            source={diceImages[dice]}
            style={[
              styles.diceImage,
              { transform: [{ rotate: rotationInterpolation }] },
            ]}
          />
          <View style={styles.buttonContainer}>
            <Button title="Roll Dice" onPress={rollDice} color="#1E90FF" />
          </View>
          <View style={styles.buttonContainer}>
            <Button title="Exit App" onPress={exitApp} color="#FF4500" />
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F5F5F5",
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  labelText: {
    fontSize: 18,
    fontWeight: "bold",
    marginRight: 10,
  },
  valueText: {
    fontSize: 18,
  },
  diceImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  buttonContainer: {
    marginTop: 10,
    width: '80%',
  },
  winnerText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
    color: "#32CD32",
  },
});

export default Home;

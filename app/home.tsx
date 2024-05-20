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
            <Text>Fortune du joueur: </Text>
            <Text>{playerMoney}</Text>
          </View>
          <View style={styles.row}>
            <Text>Fortune du casino: </Text>
            <Text>{casinoMoney}</Text>
          </View>
          <Animated.Image
            source={diceImages[dice]}
            style={[
              styles.diceImage,
              { transform: [{ rotate: rotationInterpolation }] },
            ]}
          />
          <Button title="Lancer les dés" onPress={rollDice} />
          <Button title="Quitter l'application" onPress={exitApp} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
    flex: 1,
  },
  row: {
    flexDirection: "row",
    marginBottom: 20,
  },
  diceImage: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  winnerText: {
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    margin: 20,
  },
});

export default Home;

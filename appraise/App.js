import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import Header from "./components/Header";
import StartGamesScreen from "./screens/StartGamesScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [guessRounds, setGuessRounds] = useState(0); //setting gameOver screen

  const configureNewGameHandler = () => {
    setGuessRounds(0);
  };

  const startGameHandler = (selectedNumber) => {
    setUserNumber(selectedNumber);
    //setGuessRounds(0);
  };

  const gameOverHandler = (numOfRounds) => {
    setGuessRounds(numOfRounds);
    setUserNumber(null);
  };

  //rendering both screens when working
  //gets data(no) from stored state in app
  let content = <StartGamesScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRounds <= 0) {
    //passes userNumber
    content = (
      <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
    );
  } else if (guessRounds > 0) {
    content = (
      <GameOverScreen
        roundsNumber={guessRounds}
        userNumber={userNumber}
        onRestart={configureNewGameHandler}
      />
    );
  }

  return (
    <View style={styles.screen}>
      <Header title="Guess A Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

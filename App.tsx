import { FC, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native';

type BrickProps = {
  row: number,
  col: number,
  value: number,
  onPress: () => void;
}

const Brick: FC<{ props: BrickProps }> = ({ props }) => {

  const images = [
    require("./assets/touchScreen.png"),
    require("./assets/x.png"),
    require("./assets/o.png")
  ]

  return (
    <View style={[styles.brick, { backgroundColor: "#2f3e46" }]}>
      <Image resizeMode="contain" source={images[props.value]} style={styles.brickImage}></Image>
    </View>
  )
}
const App: FC = () => {

  const colors = ["#7fc8f8", "#ff6392"];

  const [board, setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);
  const [currentPlayer, setCurrentPlayer] = useState(1);
  const [gameOver, setGameOver] = useState(false);
  const [playerXScore, setPlayerXScore] = useState(0);
  const [playerOScore, setPlayerOScore] = useState(0);

  const checkWin = (player: number) => {
    //check rows
    for (let i = 0; i < board.length; i++) {
      if (board[i][0] !== 0 && board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
        if (player == 1) {
          setPlayerXScore(playerXScore + 1);
        } else {
          setPlayerOScore(playerOScore + 1);
        }
        setGameOver(true);
        alert(`Player ${player} wins!`);
        return;
      }
    }
    //check cols
    for (let i = 0; i < board.length; i++) {
      if (board[0][i] !== 0 && board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
        if (player == 1) {
          setPlayerXScore(playerXScore + 1);
        } else {
          setPlayerOScore(playerOScore + 1);
        }
        setGameOver(true);
        alert(`Player ${player} wins!`);
        return;
      }
    }
    //check diagonals
    if (board[0][0] !== 0 && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
      if (player == 1) {
        setPlayerXScore(playerXScore + 1);
      } else {
        setPlayerOScore(playerOScore + 1);
      }
      setGameOver(true);
      alert(`Player ${player} wins!`);
      return;
    }
    if (board[0][2] !== 0 && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
      if (player == 1) {
        setPlayerXScore(playerXScore + 1);
      } else {
        setPlayerOScore(playerOScore + 1);
      }
      setGameOver(true);
      alert(`Player ${player} wins!`);
      return;
    }

    let fillCells = 0;
    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        if (board[i][j] !== 0) {
          fillCells += 1;
        }
      }
    }
    if (fillCells === 9) {
      setGameOver(true);
      alert("Its a draw!!!");
    }
  }

  const handlePress = (row: number, col: number) => {
    if (board[row][col] !== 0 || gameOver) {
      // The brick has already been played, do nothing
      return;
    }
    const newBoard = [...board];
    newBoard[row][col] = currentPlayer;
    setBoard(newBoard);
    console.log("BOARD: " + board);
    console.log("TURN: " + currentPlayer);
    checkWin(currentPlayer);
    setCurrentPlayer(currentPlayer === 1 ? 2 : 1);
  };

  const resetHandler = () => {
    setBoard(
      [[0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]]);
    setGameOver(false);
    setCurrentPlayer(1);
  }

  const resetScoreHandler = () => {
    resetHandler();
    setPlayerOScore(0);
    setPlayerXScore(0);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>

        <View>
          <Text style={styles.header}>TIC TAC TOE</Text>
        </View>

        <View style={styles.rowContainer}>
          <Text style={styles.playerXScore}> Player X Score: {playerXScore}</Text>
          <Text style={styles.playerOScore}> Player O Score: {playerOScore}</Text>
        </View>

        {board.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.rowContainer}>
            {row.map((value, colIndex) => (
              <TouchableOpacity disabled={board[rowIndex][colIndex] != 0 || gameOver} style={styles.brick} key={colIndex} onPress={() => handlePress(rowIndex, colIndex)}>
                <Brick
                  key={colIndex}
                  props={{ row: rowIndex, col: colIndex, value: board[rowIndex][colIndex], onPress: () => handlePress(rowIndex, colIndex) }}
                />
              </TouchableOpacity>
            ))}
          </View>
        ))}

        <View>
          <Text style={[styles.playerTurn, { color: currentPlayer === 1 ? colors[0] : colors[1] }]}>Player {currentPlayer === 1 ? "X" : "O"} Turn</Text>
        </View>

        <View style={styles.rowContainer}>
          <View style={styles.button}>
            <TouchableOpacity onPress={resetHandler}>
              <Text style={styles.buttonText}>
                Play Again
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity onPress={resetScoreHandler}>
              <Text style={styles.buttonText}>
                Reset Score
              </Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: '#181f1c',
  },
  rowContainer: {
    flexDirection: 'row',
  },
  brick: {
    flex: 1,
    margin: 10,
    aspectRatio: 1,
    // backgroundColor: 'blue',
  },
  button: {
    alignSelf: "center",
    margin: 20,
    justifyContent: "center",
    backgroundColor: '#007bff',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 16,
    color: '#fff',
    flex: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase'
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#5aa9e6',
    textAlign: 'center',
    margin: 20
  },
  brickImage: {
    width: "100%",
    height: "100%"
  },
  playerXScore: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#7fc8f8',
    textAlign: 'center',
    margin: 20,
    flex: 0.5,
  },
  playerOScore: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6392',
    textAlign: 'center',
    margin: 20,
    flex: 0.5,
  },
  playerTurn: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 20,
  }
});
export default App;



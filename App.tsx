// import { FC, useState } from 'react';
// import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';

// const Brick: FC<{ callback: (ind: number, r: number, c: number) => void, index: number, row: number, col: number, turn: { player: number } }> = ({ callback, index, turn, row, col }) => {
//   const [player, setPlayer] = useState<number>(0);
//   const colors = ["white", "green", "black"];
//   const [board, setBoard] = useState<number[]>([]);

//   const clickHandler = () => {
//     console.log("CLICK BRICK");
//     if (board.includes(index)) {
//       return;
//     }
//     setBoard(prevIndex => [...prevIndex, index]);
//     console.log(board);
//     setPlayer(turn.player);
//     callback(index, row, col);
//   }
//   return (
//     <View style={styles.brick}>
//       <TouchableOpacity disabled={board.includes(index)} style={[styles.brick, { backgroundColor: colors[player] }]} onPress={clickHandler}>
//       </TouchableOpacity>
//     </View>
//   )
// }

// const App: FC = () => {
//   const turn = { player: 1 };
//   const moves = { p: [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]] }

//   const checkWin = (player: number) => {
//     //check rows
//     for (let i = 0; i < moves.p.length; i++) {
//       if (moves.p[i][0] !== -1 && moves.p[i][0] === moves.p[i][1] && moves.p[i][1] === moves.p[i][2]) {
//         alert(`Player ${player} wins!`);
//         return;
//       }
//     }
//     //check cols
//     for (let i = 0; i < moves.p.length; i++) {
//       if (moves.p[0][i] !== -1 && moves.p[0][i] === moves.p[1][i] && moves.p[1][i] === moves.p[2][i]) {
//         alert(`Player ${player} wins!`);
//         return;
//       }
//     }
//     //check diagonals
//     if (moves.p[0][0] !== -1 && moves.p[0][0] === moves.p[1][1] && moves.p[1][1] === moves.p[2][2]) {
//       alert(`Player ${player} wins!`);
//       return;
//     }
//     if (moves.p[0][2] !== -1 && moves.p[0][2] === moves.p[1][1] && moves.p[1][1] === moves.p[2][0]) {
//       alert(`Player ${player} wins!`);
//       return;
//     }

//     let fillCells = 0;
//     for (let i = 0; i < moves.p.length; i++) {
//       for (let j = 0; j < moves.p.length; j++) {
//         if (moves.p[i][j] !== -1) {
//           fillCells += 1;
//         }
//       }
//     }
//     if (fillCells === 9) {
//       alert("Its a draw!!!");
//     }
//   }

//   const resetHandler = () => {
//     for (let i = 0; i < moves.p.length; i++) {
//       for (let j = 0; j < moves.p.length; j++) {
//         if (moves.p[i][j] !== -1) {
//           moves.p[i][j] = -1;
//         }
//       }
//     }
//   }

//   const clickHandler = (index: number, row: number, col: number) => {
//     console.log("CLICK APP " + index);
//     if (turn.player == 1) {
//       moves.p[row][col] = turn.player;
//       console.log("MOVES " + moves.p);
//       checkWin(turn.player);
//       turn.player = 2;
//     }
//     else {
//       moves.p[row][col] = turn.player;
//       console.log("MOVES " + moves.p);
//       checkWin(turn.player);
//       turn.player = 1;
//     }
//   }
//   return (
//     <View style={styles.container}>

//       <View style={styles.rowContainer}>
//         <Brick callback={clickHandler} index={0} turn={turn} row={0} col={0}></Brick>
//         <Brick callback={clickHandler} index={1} turn={turn} row={0} col={1}></Brick>
//         <Brick callback={clickHandler} index={2} turn={turn} row={0} col={2}></Brick>
//       </View>

//       <View style={styles.rowContainer}>
//         <Brick callback={clickHandler} index={3} turn={turn} row={1} col={0}></Brick>
//         <Brick callback={clickHandler} index={4} turn={turn} row={1} col={1}></Brick>
//         <Brick callback={clickHandler} index={5} turn={turn} row={1} col={2}></Brick>
//       </View>

//       <View style={styles.rowContainer}>
//         <Brick callback={clickHandler} index={6} turn={turn} row={2} col={0}></Brick>
//         <Brick callback={clickHandler} index={7} turn={turn} row={2} col={1}></Brick>
//         <Brick callback={clickHandler} index={8} turn={turn} row={2} col={2}></Brick>
//       </View>

//       <View style={styles.button}>
//         <TouchableOpacity onPress={resetHandler}>
//           <Text style={styles.buttonText}>
//             Restart
//           </Text>
//         </TouchableOpacity>
//       </View>

//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     marginTop: StatusBar.currentHeight,
//     flex: 1,
//     backgroundColor: 'yellow',
//   },
//   rowContainer: {
//     flexDirection: 'row',
//   },
//   brick: {
//     flex: 1,
//     margin: 10,
//     aspectRatio: 1,
//     // backgroundColor: 'blue',
//   },
//   button: {
//     alignSelf: "center",
//     margin: 20,
//     justifyContent: "center",
//     backgroundColor: "#DDDDDD",
//     borderRadius: 20,
//     height: 50,
//     width: 200,
//   },
//   buttonText: {
//     fontSize: 30,
//     textAlign: 'center',
//   }
// });
// export default App;

import { FC, useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native';

type Player = {
  player: number
}

type Props = {
  index: number,
  state: number,
  turn: Player,
  onClick: (index: number, row: number, col: number) => void,
  row: number,
  col: number,
}

const Brick: FC<{ props: Props }> = ({ props }) => {
  const colors = ["white", "green", "black"];
  const [board, setBoard] = useState<number[]>([]);


  const clickHandler = () => {
    if (board.includes(props.index)) {
      console.log(board);
      return;
    }
    setBoard(prevIndex => [...prevIndex, props.index]);
    props.state = props.turn.player;
    console.log("turn: " + props.turn.player);
    console.log("state: " + props.state);
    props.onClick(props.index, props.row, props.col);
  }
  return (
    <View style={[styles.brick, { backgroundColor: colors[props.state] }]}>
      <TouchableOpacity disabled={props.state !== 0} style={[styles.brick, { backgroundColor: colors[props.state] }]} onPress={clickHandler}>
      </TouchableOpacity>
    </View>
  )
}

const App: FC = () => {
  const turn: Player = { player: 1 };
  const moves = { p: [[-1, -1, -1], [-1, -1, -1], [-1, -1, -1]] }

  const checkWin = (player: number) => {
    //check rows
    for (let i = 0; i < moves.p.length; i++) {
      if (moves.p[i][0] !== -1 && moves.p[i][0] === moves.p[i][1] && moves.p[i][1] === moves.p[i][2]) {
        alert(`Player ${player} wins!`);
        return;
      }
    }
    //check cols
    for (let i = 0; i < moves.p.length; i++) {
      if (moves.p[0][i] !== -1 && moves.p[0][i] === moves.p[1][i] && moves.p[1][i] === moves.p[2][i]) {
        alert(`Player ${player} wins!`);
        return;
      }
    }
    //check diagonals
    if (moves.p[0][0] !== -1 && moves.p[0][0] === moves.p[1][1] && moves.p[1][1] === moves.p[2][2]) {
      alert(`Player ${player} wins!`);
      return;
    }
    if (moves.p[0][2] !== -1 && moves.p[0][2] === moves.p[1][1] && moves.p[1][1] === moves.p[2][0]) {
      alert(`Player ${player} wins!`);
      return;
    }

    let fillCells = 0;
    for (let i = 0; i < moves.p.length; i++) {
      for (let j = 0; j < moves.p.length; j++) {
        if (moves.p[i][j] !== -1) {
          fillCells += 1;
        }
      }
    }
    if (fillCells === 9) {
      alert("Its a draw!!!");
    }
  }

  const resetHandler = () => {
    for (let i = 0; i < moves.p.length; i++) {
      for (let j = 0; j < moves.p.length; j++) {
        if (moves.p[i][j] !== -1) {
          moves.p[i][j] = -1;
        }
      }
    }
  }

  const clickHandler = (index: number, row: number, col: number) => {
    console.log("CLICK APP " + index);
    if (turn.player == 1) {
      moves.p[row][col] = turn.player;
      console.log("MOVES " + moves.p);
      checkWin(turn.player);
      turn.player = 2;
    }
    else {
      moves.p[row][col] = turn.player;
      console.log("MOVES " + moves.p);
      checkWin(turn.player);
      turn.player = 1;
    }
  }
  return (
    <View style={styles.container}>

      <View style={styles.rowContainer}>
        <Brick props={{ index: 0, state: 0, turn: turn, onClick: clickHandler, row: 0, col: 0 }}></Brick>
        <Brick props={{ index: 1, state: 0, turn: turn, onClick: clickHandler, row: 0, col: 1 }}></Brick>
        <Brick props={{ index: 2, state: 0, turn: turn, onClick: clickHandler, row: 0, col: 2 }}></Brick>
      </View>

      <View style={styles.rowContainer}>
        <Brick props={{ index: 3, state: 0, turn: turn, onClick: clickHandler, row: 1, col: 0 }}></Brick>
        <Brick props={{ index: 4, state: 0, turn: turn, onClick: clickHandler, row: 1, col: 1 }}></Brick>
        <Brick props={{ index: 5, state: 0, turn: turn, onClick: clickHandler, row: 1, col: 2 }}></Brick>
      </View>

      <View style={styles.rowContainer}>
        <Brick props={{ index: 6, state: 0, turn: turn, onClick: clickHandler, row: 2, col: 0 }}></Brick>
        <Brick props={{ index: 7, state: 0, turn: turn, onClick: clickHandler, row: 2, col: 1 }}></Brick>
        <Brick props={{ index: 8, state: 0, turn: turn, onClick: clickHandler, row: 2, col: 2 }}></Brick>
      </View>

      <View style={styles.button}>
        <TouchableOpacity onPress={resetHandler}>
          <Text style={styles.buttonText}>
            Restart
          </Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: 'yellow',
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
    backgroundColor: "#DDDDDD",
    borderRadius: 20,
    height: 50,
    width: 200,
  },
  buttonText: {
    fontSize: 30,
    textAlign: 'center',
  }
});
export default App;

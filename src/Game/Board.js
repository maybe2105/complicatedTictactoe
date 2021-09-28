import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import React, { forwardRef } from "react";
const PLAYER = {
  ONE: 1,
  TWO: 2,
};
const Board = ({
  size = 3,
  userMove,
  moveData,
  player,
  winner,
  resetGame,
  setWinner,
}) => {
  const [board, setBoard] = React.useState(
    Array.from({ length: size }, (x, y) =>
      Array.from({ length: size }, (a, b) => "")
    )
  );
  const [currentCheckingMove, setCurrentCheckingMove] = React.useState({});
  let winnerPath = moveData.filter((data, index) =>
    winner?.path.includes(index)
  );
  const winCheck = (data) => {
    let validWin =
      data.player == PLAYER.ONE ? new RegExp("O{3}") : new RegExp("X{3}");

    let rDiag = { string: "", path: [] };
    let lDiag = { string: "", path: [] };
    let column = { string: "", path: [] };
    let row = { string: "", path: [] };
    for (let i = -2; i <= 2; i++) {
      if (board[data.r + i]?.[data.c + i] == data.sign) {
        rDiag = {
          string: rDiag.string.concat(data.sign),
          path: [
            ...rDiag.path,
            [...moveData].findIndex(
              (mD) => mD.r == data.r + i && mD.c == data.c + i
            ),
          ],
        };
      } else {
        rDiag = {
          string: rDiag.string.concat("-"),
          path: [...rDiag.path],
        };
      }
    }
    for (let i = -2; i <= 2; i++) {
      if (board[data.r + i]?.[data.c - i] == data.sign) {
        lDiag = {
          string: lDiag.string.concat(data.sign),
          path: [
            ...lDiag.path,
            [...moveData].findIndex(
              (mD) => mD.r == data.r + i && mD.c == data.c - i
            ),
          ],
        };
      } else {
        lDiag = {
          string: lDiag.string.concat("-"),
          path: [...lDiag.path],
        };
      }
    }
    for (let i = -2; i <= 2; i++) {
      if (board[data.r + i]?.[data.c] == data.sign) {
        row = {
          string: row.string.concat(data.sign),
          path: [
            ...row.path,
            [...moveData].findIndex(
              (mD) => mD.r == data.r + i && mD.c == data.c
            ),
          ],
        };
      } else {
        row = {
          string: row.string.concat("-"),
          path: [...row.path],
        };
      }
    }
    for (let i = -2; i <= 2; i++) {
      if (board[data.r]?.[data.c + i] == data.sign) {
        column = {
          string: column.string.concat(data.sign),
          path: [
            ...column.path,
            [...moveData].findIndex(
              (mD) => mD.r == data.r && mD.c == data.c + i
            ),
          ],
        };
      } else {
        column = {
          string: column.string.concat("-"),
          path: [...column.path],
        };
      }
    }
    if (validWin.test(rDiag.string)) {
      setWinner({ player: data.player, path: rDiag.path });
    }
    if (validWin.test(lDiag.string)) {
      setWinner({ player: data.player, path: lDiag.path });
    }
    if (validWin.test(row.string)) {
      setWinner({ player: data.player, path: row.path });
    }
    if (validWin.test(column.string)) {
      setWinner({ player: data.player, path: column.path });
    }
  };
  React.useEffect(() => {
    let newBoard = board;
    [...moveData].map((data) => {
      board[data.r][data.c] = data.sign;
    });
    setBoard(newBoard);
    if (moveData.length > 0) {
      winCheck(currentCheckingMove);
    }
  }, [moveData]);
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        margin: "32px 24px",
        width: "30%",
      }}
    >
      {board.map((row, rIndex) => {
        return (
          <Box style={{ display: "flex" }} key={rIndex}>
            {row.map((col, cIndex) => {
              const thisMoveData = moveData.find(
                (data) => data.c == cIndex && data.r == rIndex
              );
              const winnerMove = winnerPath.find(
                (path) => path.r == rIndex && path.c == cIndex
              );

              return (
                <Box
                  key={cIndex}
                  style={{
                    border: "1px solid #000",
                    padding: 8,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onClick={() => {
                    if (
                      !moveData.find(
                        (data) => data.r == rIndex && data.c == cIndex
                      ) &&
                      !winner
                    )
                      setCurrentCheckingMove({
                        r: rIndex,
                        c: cIndex,
                        player,
                        sign: player == PLAYER.ONE ? "O" : "X",
                      });
                    userMove(rIndex, cIndex);
                  }}
                >
                  <Typography
                    align="center"
                    style={{
                      fontSize: 24,
                      width: 36,
                      height: 36,
                      color: winnerMove ? "red" : "",
                    }}
                  >
                    {thisMoveData ? thisMoveData.sign : ""}
                    {/* {board[rIndex[cIndex]] || ""}; */}
                  </Typography>
                </Box>
              );
            })}
          </Box>
        );
      })}
      <Box mt={4}>
        {winner ? (
          <Typography>Chiến thắng !!!</Typography>
        ) : moveData.length < size * size ? (
          <Typography>{`Lượt đi của người chơi ${player}`}</Typography>
        ) : (
          <Typography>Đã hết lượt</Typography>
        )}
      </Box>
      <Button
        onClick={() => {
          setBoard(
            Array.from({ length: size }, (x, y) =>
              Array.from({ length: size }, (a, b) => "")
            )
          );
          setCurrentCheckingMove({});
          resetGame();
        }}
        variant="outlined"
        style={{ width: 120, marginTop: 16 }}
      >
        Chơi lại
      </Button>
    </Box>
  );
};

export default Board;

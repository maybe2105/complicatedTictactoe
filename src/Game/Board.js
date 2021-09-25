import { Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";

const Board = ({ size = 3, userMove, moveData, player, winner, resetGame }) => {
  const board = Array.from({ length: size }, (x, y) =>
    Array.from({ length: size }, (a, b) => " ")
  );
  let winnerPath = moveData.filter((data, index) =>
    winner?.path.includes(index)
  );
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
        onClick={resetGame}
        variant="outlined"
        style={{ width: 120, marginTop: 16 }}
      >
        Chơi lại
      </Button>
    </Box>
  );
};

export default Board;

import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Button,
  IconButton,
} from "@mui/material";

import { Box } from "@mui/system";
import React, { useState } from "react";
import Board from "./Board";
import History from "./History";

const PLAYER = {
  ONE: 1,
  TWO: 2,
};
const BOARD = [
  { value: 6, content: "6x6" },
  { value: 9, content: "9x9" },
  { value: 12, content: "12x12" },
  { value: 15, content: "15x15" },
];
const Game = () => {
  const [player, setPlayer] = useState(PLAYER.ONE);
  const [moveData, setMoveData] = useState({ data: [], reverse: false });
  const [winner, setWinner] = useState(null);
  const [size, setSize] = useState(null);
  const resetGame = () => {
    setPlayer(PLAYER.ONE);
    setMoveData({ data: [], reverse: false });
    setWinner(null);
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
      }}
    >
      {size ? (
        <>
          <Board
            setWinner={(data) => {
              console.log("here");
              setWinner({ player: data.player, path: data.path });
            }}
            size={size}
            resetGame={resetGame}
            userMove={(rIndex, cIndex) => {
              setPlayer((player) =>
                player == PLAYER.ONE ? PLAYER.TWO : PLAYER.ONE
              );
              if (
                !moveData.data.find(
                  (data) => data.r == rIndex && data.c == cIndex
                ) &&
                !winner
              ) {
                setMoveData({
                  ...moveData,
                  data: [
                    {
                      r: rIndex,
                      c: cIndex,
                      sign: player == PLAYER.ONE ? "O" : "X",
                      player,
                    },
                    ...moveData.data,
                  ],
                });
              }
            }}
            moveData={moveData.data}
            player={player}
            winner={winner}
          />
          <History
            moveData={moveData.data}
            reverse={moveData.reverse}
            reverseData={() => {
              const newData = { ...moveData, reverse: !moveData.reverse };
              setMoveData(newData);
            }}
          />
          {(winner || moveData.data.length == size * size) && (
            <Box
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 32,
                height: "100%",
                flex: 1,
                alignItems: "center",
              }}
            >
              <Box
                style={{
                  display: "flex",
                  marginTop: 32,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {winner ? (
                  <Typography>
                    <Typography component="span" style={{ fontWeight: 600 }}>
                      {`Người chơi ${winner.player}`}
                    </Typography>
                    &nbsp;đã dành chiến thắng
                  </Typography>
                ) : (
                  <Typography>
                    Không người chơi nào chiến thắng, kết quả hoà
                  </Typography>
                )}
              </Box>
            </Box>
          )}
        </>
      ) : (
        <Box
          style={{
            width: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography style={{ fontWeight: 600, marginRight: 16 }}>
            Hãy chọn kích cỡ bàn chơi
          </Typography>
          <FormControl
            style={{
              flex: 1,
              maxWidth: 200,
              display: "flex",
              placeContent: "center center",
            }}
          >
            <InputLabel id="sizeLabel" style={{ height: "100%" }}>
              Chọn kích cỡ
            </InputLabel>
            <Select
              value={size}
              labelId="sizeLabel"
              size="small"
              id="size"
              label="size"
              onChange={(e) => setSize(e.target.value)}
            >
              {BOARD.map((data) => {
                return (
                  <MenuItem key={data.value} value={data.value}>
                    {data.content}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Box>
      )}
    </div>
  );
};

export default Game;

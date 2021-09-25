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
const size = 3;
const Game = () => {
  const [player, setPlayer] = useState(PLAYER.ONE);
  const [moveData, setMoveData] = useState({ data: [], reverse: false });
  const [winner, setWinner] = useState(null);
  const resetGame = () => {
    setPlayer(PLAYER.ONE);
    setMoveData({ data: [], reverse: false });
    setWinner(null);
  };

  const winCheck = (moveData, player) => {
    let validWin =
      player == PLAYER.ONE ? new RegExp("^O{3}") : new RegExp("^X{3}");

    for (let i = 0; i < size; i++) {
      let column = { string: "", path: [] };
      let row = { string: "", path: [] };
      let rDiagnol = { string: "", path: [] };
      let lDiagnol = { string: "", path: [] };
      let mapData = [...moveData].map((data, index) => {
        const checkSign = player == PLAYER.ONE ? "O" : "X";
        if (data.sign == checkSign) {
          if (data.c == i) {
            column = {
              string: column.string?.concat(data.sign),
              path: [...column.path, index],
            };
          }
          if (data.r == i) {
            row = {
              string: row.string?.concat(data.sign),
              path: [...row.path, index],
            };
          }
          if (data.r == data.c) {
            rDiagnol = {
              string: rDiagnol.string?.concat(data.sign),
              path: [...rDiagnol.path, index],
            };
          }
          if (
            (data.r == size - 1 && data.c == 0) ||
            (data.c == size - 1 && data.r == 0) ||
            (data.r == 1 && data.c == 1)
          ) {
            lDiagnol = {
              string: lDiagnol.string?.concat(data.sign),
              path: [...lDiagnol.path, index],
            };
          }
        }
      });

      if (validWin.test(column.string)) {
        setWinner({ player: player, path: column.path });
        return;
      }
      if (validWin.test(row.string)) {
        setWinner({ player: player, path: row.path });
        return;
      }
      if (validWin.test(rDiagnol.string)) {
        setWinner({ player: player, path: rDiagnol.path });
        return;
      }
      if (validWin.test(lDiagnol.string)) {
        setWinner({ player: player, path: lDiagnol.path });
        return;
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Board
        resetGame={resetGame}
        userMove={(rIndex, cIndex) => {
          if (
            !moveData.data.find(
              (data) => data.r == rIndex && data.c == cIndex
            ) &&
            !winner
          ) {
            winCheck(
              [
                {
                  r: rIndex,
                  c: cIndex,
                  sign: player == PLAYER.ONE ? "O" : "X",
                  player,
                },
                ...moveData.data,
              ],
              player
            );
            if (moveData.reverse) {
              setMoveData({
                ...moveData,
                data: [
                  ...moveData.data,
                  {
                    r: rIndex,
                    c: cIndex,
                    sign: player == PLAYER.ONE ? "O" : "X",
                    player,
                  },
                ],
              });
            } else {
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
            setPlayer((player) =>
              player == PLAYER.ONE ? PLAYER.TWO : PLAYER.ONE
            );
          }
        }}
        moveData={moveData.data}
        player={player}
        winner={winner}
      />
      <History
        moveData={moveData.data}
        reverse={() => {
          let newMoveData = [...moveData.data];
          setMoveData({
            ...moveData,
            reverse: !moveData.reverse,
          });
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
    </div>
  );
};

export default Game;

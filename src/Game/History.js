import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";

const SORT_MODE = {
  newest: 0,
  oldest: 1,
};

const History = ({ moveData, reverse }) => {
  const [sortMode, setSortMode] = useState(SORT_MODE.newest);
  const [sortedMove, setSortedMove] = useState([]);

  React.useEffect(() => {
    setSortedMove([...moveData]);
  }, [moveData]);

  return (
    <Box mt={2} ml={3}>
      <Box style={{ display: "flex", alignItems: "center" }}>
        <Typography style={{ fontWeight: 600 }}>Lịch sử nước đi</Typography>
        <FormControl>
          <InputLabel id="history">Sắp xếp</InputLabel>
          <Select
            labelId="history"
            id="select"
            value={sortMode}
            size="small"
            label="Sắp xếp"
            onChange={(e) => {
              setSortMode(e.target.value);
              let tempArr = [...sortedMove];
              setSortedMove([...tempArr.reverse()]);
            }}
            style={{ marginLeft: 16 }}
          >
            {[
              { value: SORT_MODE.newest, content: "Mới nhất" },
              { value: SORT_MODE.oldest, content: "Cũ nhất" },
            ].map((data) => {
              return <MenuItem value={data.value}>{data.content}</MenuItem>;
            })}
          </Select>
        </FormControl>
      </Box>
      {sortedMove.map((data, i) => {
        return (
          <Typography
            style={{
              fontWeight:
                (sortMode == SORT_MODE.oldest && i == moveData.length - 1) ||
                (sortMode == SORT_MODE.newest && i == 0)
                  ? 600
                  : 400,
            }}
          >{`Người chơi ${data.player} đánh ${data.sign} vào vị trí (${data.r}, ${data.c})`}</Typography>
        );
      })}
    </Box>
  );
};

export default History;

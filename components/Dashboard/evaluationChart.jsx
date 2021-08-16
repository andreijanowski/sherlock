import React from "react";
import { Flex } from "@rebass/grid";
import { string } from "prop-types";

import { AreaChart, Area, XAxis, Tooltip } from "recharts";
import { getRandomInt, randomChartGenerator } from "./utils";
import { Percentage, TileHeader, Tile } from "./styled";

const EvaluationChart = ({ title }) => (
  <Tile withoutRadius>
    <Flex justifyContent="space-between">
      <TileHeader>{title}</TileHeader>
      <Percentage>{getRandomInt(1, 9)}%</Percentage>
    </Flex>
    <AreaChart
      strokeWidth={2}
      width={548}
      height={200}
      data={randomChartGenerator()}
      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
    >
      <XAxis strokeWidth={0} dataKey="name" />
      <Tooltip />
      <Area
        fill="none"
        strokeWidth={2}
        type="monotone"
        dataKey="uv"
        stroke="#8884d8"
      />
      <Area
        fill="none"
        strokeWidth={2}
        type="monotone"
        dataKey="value"
        stroke="#F38176"
      />
      <Area
        fill="none"
        strokeWidth={2}
        type="monotone"
        dataKey="pv"
        stroke="#123456"
      />
    </AreaChart>
  </Tile>
);

EvaluationChart.propTypes = {
  title: string.isRequired
};

export default EvaluationChart;

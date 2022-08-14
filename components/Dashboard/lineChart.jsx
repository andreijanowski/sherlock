import React from "react";
import { Flex } from "@rebass/grid";
import { bool, string } from "prop-types";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { getRandomInt, randomChartGenerator } from "./utils";
import { Percentage, TileHeader, Tile } from "./styled";
import ArrowComponent from "./arrow";

const LineChart = ({ title, isDown }) => (
  <Tile width={[1, 1, 1, 1 / 4]} withoutRadius>
    <Flex justifyContent="space-between">
      <TileHeader>{title}</TileHeader>
      <Percentage isDown={isDown}>
        <ArrowComponent isDown={isDown} />
        {getRandomInt(1, 9)}%
      </Percentage>
    </Flex>
    <ResponsiveContainer width="100%" height={200}>
      <AreaChart
        strokeWidth={4}
        width={256}
        height={200}
        data={randomChartGenerator()}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#F38176" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#F38176" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis strokeWidth={0} dataKey="name" />
        <Tooltip />
        <Area
          strokeWidth={4}
          type="monotone"
          dataKey="uv"
          stroke={isDown ? "#F38176" : "#8884d8"}
          fillOpacity={1}
          fill={isDown ? "url(#colorPv)" : "url(#colorUv)"}
        />
      </AreaChart>
    </ResponsiveContainer>
  </Tile>
);

LineChart.propTypes = {
  title: string.isRequired,
  isDown: bool
};

LineChart.defaultProps = {
  isDown: false
};

export default LineChart;

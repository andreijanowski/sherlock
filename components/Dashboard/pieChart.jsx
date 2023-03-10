import React from "react";
import { PieChart, Pie, Cell, Legend, ResponsiveContainer } from "recharts";
import { Flex } from "@rebass/grid";
import { shape, arrayOf } from "prop-types";
import { randomChartGenerator } from "./utils";
import { Bullet } from "./styled";

const CustomizedLegend = props => {
  const { payload } = props;
  return (
    <Flex flexDirection="column">
      {payload.map((entry, index) => {
        const isLastChild = index === payload.length - 1;
        return (
          <Flex
            mb={isLastChild ? 0 : 3}
            justifyContent="space-between"
            alignItems="center"
            key={entry.payload.value}
          >
            <Flex alignItems="center">
              <Bullet background={entry.color} />
              {entry.payload.name}
            </Flex>
            <div>{entry.payload.value}</div>
          </Flex>
        );
      })}
    </Flex>
  );
};

CustomizedLegend.propTypes = {
  payload: arrayOf(shape())
};

CustomizedLegend.defaultProps = {
  payload: []
};

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
const data = randomChartGenerator(true);

export const PaymentChart = () => (
  <ResponsiveContainer width="100%">
    <PieChart width={256} height={300}>
      <Pie
        data={data}
        dataKey="value"
        cy={85}
        innerRadius={50}
        outerRadius={85}
        fill="#8884d8"
        activeIndex={2}
      >
        {data.map((entry, index) => (
          <Cell key={`cell-${entry.id}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Legend content={<CustomizedLegend />} />
    </PieChart>
  </ResponsiveContainer>
);

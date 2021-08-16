import ProgressBar from "./progressBar";
import { Tile, TileHeader } from "./styled";
import { getRandomInt } from "./utils";

const SAMPLE_DATA = [
  { color: "salmon", title: "group1" },
  { color: "royalblue", title: "group 2" },
  { color: "turquoise", title: "group 3" }
];

const ProgressBarTile = () => (
  <Tile height="200" isSmall>
    <TileHeader>Data 1</TileHeader>
    {SAMPLE_DATA.map(({ color, title }) => (
      <ProgressBar
        color={color}
        withPercentage
        title={title}
        width={getRandomInt(30, 80)}
      />
    ))}
  </Tile>
);

export default ProgressBarTile;

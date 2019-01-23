import { PerfectSquare, ActionIcon } from "components";
import { Image } from "../styled";

const Picture = ({ src }) => (
  <PerfectSquare width={1}>
    <Image {...{ src }}>
      <ActionIcon deletePicture size="sm" icon={["fa", "times"]} />
    </Image>
  </PerfectSquare>
);

export default Picture;

import { string, func } from "prop-types";
import { PerfectSquare, ActionIcon } from "components";
import { Image } from "../styled";

const Picture = ({ url, id, remove }) => (
  <PerfectSquare>
    <Image {...{ url }}>
      <ActionIcon
        deletePicture
        size="sm"
        icon={["fa", "times"]}
        onClick={() => remove(id)}
      />
    </Image>
  </PerfectSquare>
);

Picture.propTypes = {
  url: string.isRequired,
  id: string.isRequired,
  remove: func.isRequired
};

export default Picture;

import React, { useMemo, useState } from "react";
import { Flex } from "@rebass/grid";

import { useT } from "utils/hooks";
import { getConfig } from "./utils";
import Menu from "./Menu";
import Canvas from "./Canvas";

const IntegrationsLandingList = () => {
  const t = useT("app");
  const config = useMemo(() => getConfig(t), [t]);
  const [activeItem, setActiveItem] = useState(config[0].items[0]);

  return (
    <Flex justifyContent="space-between" alignItems="stretch">
      <Menu
        config={config}
        activeItem={activeItem}
        setActiveItem={setActiveItem}
      />
      <Canvas activeItem={activeItem} />
    </Flex>
  );
};

IntegrationsLandingList.propTypes = {};

export default IntegrationsLandingList;

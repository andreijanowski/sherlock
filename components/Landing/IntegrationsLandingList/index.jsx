import React, { useMemo, useState, useEffect } from "react";
import { Flex } from "@rebass/grid";
import { useRouter } from "next/router";

import { useT } from "utils/hooks";
import { getConfig } from "./utils";
import Menu from "./Menu";
import Canvas from "./Canvas";

const IntegrationsLandingList = () => {
  const { query } = useRouter();
  const t = useT("app");
  const config = useMemo(() => getConfig(t), [t]);
  const [activeItem, setActiveItem] = useState(config[0].items[0]);

  useEffect(() => {
    if (!query.partners) return;

    let newActiveItem;

    config.forEach(section => {
      if (newActiveItem) return;
      newActiveItem = section.items.find(
        sectionItem =>
          !sectionItem.isComingSoon && sectionItem.id === query.partners
      );
    });

    if (!newActiveItem) return;

    setActiveItem(newActiveItem);
  }, [config, query, query.partners]);

  return (
    <Flex justifyContent="space-between" alignItems="stretch">
      <Menu config={config} activeItem={activeItem} />
      <Canvas activeItem={activeItem} />
    </Flex>
  );
};

IntegrationsLandingList.propTypes = {};

export default IntegrationsLandingList;

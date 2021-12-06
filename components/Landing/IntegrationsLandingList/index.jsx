import React, { useMemo, useState, useEffect } from "react";
import { Flex } from "@rebass/grid";
import { useRouter } from "next/router";

import { useT } from "utils/hooks";
import { INTEGRATIONS_VIDEO_URL } from "consts";
import { AdaptiveBox } from "components/styleguide/common";
import { getConfig } from "./utils";
import Menu from "./Menu";
import Canvas from "./Canvas";
import MobileVideoButton from "../MobileVideoButton";

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
    <Flex
      justifyContent="space-between"
      alignItems="stretch"
      flexDirection={["column", null, "row"]}
    >
      <Menu config={config} activeItem={activeItem} />
      <AdaptiveBox mt={40} display={["block", null, "none"]}>
        <MobileVideoButton url={INTEGRATIONS_VIDEO_URL} />
      </AdaptiveBox>
      <AdaptiveBox display={["none", null, "flex"]} flexDirection="column">
        <Canvas activeItem={activeItem} />
      </AdaptiveBox>
    </Flex>
  );
};

IntegrationsLandingList.propTypes = {};

export default IntegrationsLandingList;

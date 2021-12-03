import React, { useCallback, useEffect, useState } from "react";
import { Box } from "@rebass/grid";

import { useT } from "utils/hooks";
import ButtonsBar from "components/styleguide/ButtonsBar";
import { theme } from "utils/theme";
import VideoButton from "components/Landing/VideoButton";
import { INTEGRATIONS_VIDEO_URL } from "consts";
import { AdaptiveBox } from "components/styleguide/common";
import { sectionItemShape } from "../types";
import { Container, SubtitleStyled, PartnersListContainer } from "./styled";
import PartnersList from "./PartnersList";

const Canvas = ({ activeItem }) => {
  const t = useT("landing");
  const [activeGroup, setActiveGroup] = useState(activeItem.groups[0]);

  const getKey = useCallback(item => item.label, []);

  useEffect(() => {
    setActiveGroup(activeItem.groups[0]);
  }, [activeItem]);

  const shouldDisplaySwitcher = activeItem.groups.length > 1;

  return (
    <Container>
      <AdaptiveBox display={["none", null, "block"]}>
        <SubtitleStyled mb={4}>{`${activeItem.label} ${t(
          "partners"
        )}`}</SubtitleStyled>
      </AdaptiveBox>
      {shouldDisplaySwitcher && (
        <Box mb="40px">
          <ButtonsBar
            slim
            inversedColors
            getKey={getKey}
            items={activeItem.groups.map(group => ({
              label: group.label,
              value: group
            }))}
            onChange={setActiveGroup}
            primaryColor={theme.colors.landingDarkBlue}
            secondaryColor={theme.colors.white}
            value={activeGroup}
          />
        </Box>
      )}
      <PartnersListContainer>
        <PartnersList activeGroup={activeGroup} />
      </PartnersListContainer>
      <AdaptiveBox display={["none", null, "flex"]} alignItems="center">
        <VideoButton url={INTEGRATIONS_VIDEO_URL} />
      </AdaptiveBox>
    </Container>
  );
};

Canvas.propTypes = {
  activeItem: sectionItemShape.isRequired
};

export default Canvas;

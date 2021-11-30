import React, { useState, useEffect, useCallback } from "react";
import { Box } from "@rebass/grid";

import { useT } from "utils/hooks";
import ButtonsBar from "components/styleguide/ButtonsBar";
import { theme } from "utils/theme";
import VideoButton from "components/Landing/VideoButton";
import { INTEGRATIONS_VIDEO_URL } from "consts";
import { sectionItemShape } from "../types";
import { Container, SubtitleStyled } from "./styled";
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
      <SubtitleStyled mb={4}>{`${activeItem.label} ${t(
        "partners"
      )}`}</SubtitleStyled>
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
      <PartnersList activeGroup={activeGroup} />
      <VideoButton url={INTEGRATIONS_VIDEO_URL} />
    </Container>
  );
};

Canvas.propTypes = {
  activeItem: sectionItemShape.isRequired
};

export default Canvas;

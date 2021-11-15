import React from "react";
import { Box } from "@rebass/grid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";

import { useTranslation } from "i18n";
import { rowShape } from "../types";
import TableHint from "../TableHint";
import { Cell } from "../styled";
import {
  PrimaryCellContainer,
  PrimaryCellIcon,
  PrimaryCellLabel,
  PrimaryCellComingSoon
} from "./styled";

const TablePrimaryCell = ({
  row: { icon: Icon, label, href, onClick, renderHint, isComingSoon }
}) => {
  const { t } = useTranslation();
  return (
    <Cell>
      <PrimaryCellContainer>
        <PrimaryCellIcon isComingSoon={isComingSoon}>
          <Icon />
        </PrimaryCellIcon>
        <PrimaryCellLabel
          onClick={onClick}
          isComingSoon={isComingSoon}
          {...(href ? { as: "a", href, target: "_blank" } : null)}
        >
          {label}
          {href && (
            <Box ml={2}>
              <FontAwesomeIcon icon={faArrowRight} />
            </Box>
          )}
          {renderHint && <TableHint>{renderHint()}</TableHint>}
        </PrimaryCellLabel>
        {isComingSoon && (
          <PrimaryCellComingSoon>{t("plans:comingSoon")}</PrimaryCellComingSoon>
        )}
      </PrimaryCellContainer>
    </Cell>
  );
};

TablePrimaryCell.propTypes = {
  row: rowShape.isRequired
};
export default TablePrimaryCell;

import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import { func } from "prop-types";
import { Flex } from "@rebass/grid";

const namespaces = ["common"];

export class Nav extends PureComponent {
  render() {
    const { t } = this.props;
    return <Flex>{t("navigation")}</Flex>;
  }
}

Nav.propTypes = {
  t: func.isRequired
};

export default withI18next(namespaces)(Nav);

import { PureComponent } from "react";
import withI18next from "lib/withI18next";
import { func } from "prop-types";
import { Flex } from "@rebass/grid";

const namespaces = ["common"];

class Footer extends PureComponent {
  render() {
    const { t } = this.props;
    return <Flex>{t("footer")}</Flex>;
  }
}

Footer.propTypes = {
  t: func.isRequired
};

export default withI18next(namespaces)(Footer);

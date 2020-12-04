import { string, oneOfType, arrayOf, element } from "prop-types";
import Tippy from "@tippy.js/react";

// According to documentation, <span> wrapper tag should be used
// whether child component don't forward the ref.
// https://github.com/atomiks/tippyjs-react#readme

const Tooltip = ({ children, content, placement, ...rest }) => (
  <>
    <Tippy {...{ content, placement, ...rest }}>
      <span> {children}</span>
    </Tippy>
  </>
);

Tooltip.propTypes = {
  content: oneOfType([arrayOf(element), string.isRequired]).isRequired,
  children: oneOfType([arrayOf(element), element.isRequired]).isRequired,
  placement: string
};

Tooltip.defaultProps = {
  placement: "top-start"
};

export default Tooltip;

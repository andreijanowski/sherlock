import { PureComponent, createRef } from "react";
import { oneOfType, string, number } from "prop-types";
import ReactResizeDetector from "react-resize-detector";
import { Sizer } from "./styled";

class AutosizeInput extends PureComponent {
  sizer = createRef();

  state = { inputWidth: 0 };

  handleResize = () =>
    this.setState({
      inputWidth: this.sizer.current.scrollWidth
    });

  render() {
    const { value } = this.props;
    const { inputWidth } = this.state;

    return (
      <>
        <Sizer ref={this.sizer}>{value}</Sizer>
        <ReactResizeDetector handleWidth onResize={this.handleResize} />
        <input
          {...{ ...this.props, value, style: { width: `${inputWidth + 2}px` } }}
        />
      </>
    );
  }
}

AutosizeInput.propTypes = {
  value: oneOfType([string, number]).isRequired
};

export default AutosizeInput;

import React, { PureComponent } from "react";
import styled from "styled-components";
import { Flex } from "@rebass/grid";
import { node } from "prop-types";

const Square = styled(Flex)`
  height: ${p => p.height}px;
`;

class PerfectSquare extends PureComponent {
  state = {
    height: 0
  };

  sqareRef = React.createRef();

  componentDidMount() {
    this.setHeight();
    window.addEventListener("resize", this.setHeight);
  }

  setHeight = () =>
    this.sqareRef.current &&
    this.setState({
      height: this.sqareRef.current.offsetWidth
    });

  compoenentWillUnmount() {
    window.removeEventListener("resize", this.setHeight);
  }

  render() {
    const { children } = this.props;
    const { height } = this.state;

    return (
      <Square ref={this.sqareRef} height={height}>
        {children}
      </Square>
    );
  }
}

PerfectSquare.propTypes = {
  children: node.isRequired
};

export default PerfectSquare;

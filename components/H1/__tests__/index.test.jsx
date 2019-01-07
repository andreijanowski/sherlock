/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import H1 from "..";

describe("H1 component", () => {
  const comp = shallow(<H1 />);

  it("renders correctly", () => {
    expect(comp).toMatchSnapshot();
  });
});

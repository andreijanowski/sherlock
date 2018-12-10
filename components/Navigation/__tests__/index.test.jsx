/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import "jest-styled-components";
import { Nav } from "..";

const props = {
  t: m => m
};

describe("Nav component", () => {
  const comp = <Nav {...props} />;
  const shallowComponent = shallow(comp);

  it("renders correctly", () => {
    expect(shallowComponent).toMatchSnapshot();
  });
});

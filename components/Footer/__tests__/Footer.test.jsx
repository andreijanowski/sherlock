/* eslint-env jest */
import React from "react";
import { shallow } from "enzyme";
import Footer from "components/Footer";
import "jest-styled-components";

const props = {
  t: m => m
};

describe("Footer component", () => {
  const comp = <Footer {...props} />;
  const shallowComponent = shallow(comp);

  it("renders correctly", () => {
    expect(shallowComponent).toMatchSnapshot();
  });
});

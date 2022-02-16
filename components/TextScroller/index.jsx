import React from "react";
import { arrayOf, string, shape } from "prop-types";

import { Container, Scroller, Word } from "./styled";

const TextScroller = ({ words, scrollerProps }) => (
  <Container>
    <Scroller
      flexDirection="column"
      alignItems="flex-start"
      count={words.length + 1}
      {...scrollerProps}
    >
      {words.map((word, index) => (
        <Word key={word} index={index}>
          {word}
        </Word>
      ))}
      <Word index={words.length}>{words[0]}</Word>
    </Scroller>
  </Container>
);

TextScroller.propTypes = {
  words: arrayOf(string).isRequired,
  scrollerProps: shape()
};

TextScroller.defaultProps = {
  scrollerProps: null
};

export default TextScroller;

import React, { useState, useCallback, useEffect } from "react";
import { func, string } from "prop-types";

import { CloseIcon, SearchIcon } from "components/Icons";
import { Input, InputIcon, InputWrapper } from "./styled";

const Search = ({ t, onSearchUpdate, currentBusinessId }) => {
  const [value, setValue] = useState("");

  const onChange = useCallback(
    ({ target: { value: newValue } }) => {
      setValue(newValue);
      onSearchUpdate(newValue);
    },
    [onSearchUpdate]
  );

  const clearValue = useCallback(() => {
    setValue("");
    onSearchUpdate("");
  }, [onSearchUpdate]);

  useEffect(() => {
    setValue("");
  }, [currentBusinessId]);

  return (
    <InputWrapper>
      <Input
        placeholder={t("clients:search")}
        value={value}
        onChange={onChange}
      />
      {value ? (
        <InputIcon onClick={clearValue}>
          <CloseIcon />
        </InputIcon>
      ) : (
        <InputIcon>
          <SearchIcon />
        </InputIcon>
      )}
    </InputWrapper>
  );
};

Search.propTypes = {
  t: func.isRequired,
  onSearchUpdate: func.isRequired,
  currentBusinessId: string
};

Search.defaultProps = {
  currentBusinessId: null
};

export default Search;

import { Component } from "react";
import { oneOf, bool } from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { i18n } from "i18n";
import isServer from "utils/isServer";
import {
  LanguageSwitcherWrapper,
  LanguageList,
  LanguageListItem,
  SelectedLanguageWrapper,
  FlagIcon
} from "./styled";

/* Temporary list of available languages, remove after provide valid locales data */
const LANGUAGES = ["en", "fr", "de", "it", "es"];

class LanguageSwitcher extends Component {
  state = {
    listIsVisible: false,
    selectedLanguage: LANGUAGES.some(l => l === i18n.language)
      ? i18n.language
      : "en"
  };

  componentDidMount() {
    this.setState({
      selectedLanguage: i18n.language
    });
  }

  toggleLanguageListVisible = () => {
    this.setState(state => ({
      listIsVisible: !state.listIsVisible
    }));
  };

  changeLanguage = language => {
    this.setState({
      selectedLanguage: language
    });
    i18n.changeLanguage(language);
  };

  setProperIconPosition = () => {
    const { listIsVisible } = this.state;
    const { listPosition } = this.props;
    if (listPosition === "top")
      return listIsVisible ? "horizontal" : "vertical";
    return listIsVisible ? "vertical" : "horizontal";
  };

  render() {
    const { listIsVisible, selectedLanguage } = this.state;
    const { withBorder, listPosition } = this.props;
    return (
      <LanguageSwitcherWrapper
        onBlur={() => this.setState({ listIsVisible: false })}
        onClick={this.toggleLanguageListVisible}
        tabIndex="0"
        {...{ withBorder }}
      >
        <SelectedLanguageWrapper>
          {!isServer && (
            <>
              <FlagIcon code={selectedLanguage} />
              {selectedLanguage}
            </>
          )}
        </SelectedLanguageWrapper>
        <FontAwesomeIcon
          flip={this.setProperIconPosition()}
          icon="angle-down"
        />
        {listIsVisible && (
          <LanguageList {...{ listPosition }}>
            {LANGUAGES.filter(language => language !== selectedLanguage).map(
              language => (
                <LanguageListItem
                  key={language}
                  onClick={() => this.changeLanguage(language)}
                >
                  <FlagIcon code={language} />
                  {language}
                </LanguageListItem>
              )
            )}
          </LanguageList>
        )}
      </LanguageSwitcherWrapper>
    );
  }
}

LanguageSwitcher.propTypes = {
  withBorder: bool,
  listPosition: oneOf(["top", "bottom"])
};

LanguageSwitcher.defaultProps = {
  withBorder: true,
  listPosition: "bottom"
};

export default LanguageSwitcher;

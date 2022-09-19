import { Component } from "react";
import { oneOf, bool, func, node } from "prop-types";
import { i18n, withTranslation } from "i18n";
import { Router } from "routes";
import isServer from "utils/isServer";
import replacePathLng from "utils/replacePathLng";
import {
  LanguageSwitcherWrapper,
  LanguageList,
  LanguageListItem,
  SelectedLanguageWrapper,
  FlagIcon,
  HiddenSEOLinks
} from "./styled";

/* Temporary list of available languages, remove after provide valid locales data */
export const LANGUAGES = ["en", "fr", "de", "it", "es"];
export const FULL_URL = "https://business.foodetective.co";

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

  changeLanguage = async lng => {
    this.setState({
      selectedLanguage: lng
    });
    await i18n.changeLanguage(lng);
    const prevPath = Router.asPath;
    const newPath = replacePathLng(prevPath, lng);
    Router.replaceRoute(newPath, undefined, { shallow: true });
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
    const { listPosition, t, children, withNoFlag } = this.props;

    return (
      <LanguageSwitcherWrapper
        onBlur={() => this.setState({ listIsVisible: false })}
        onClick={this.toggleLanguageListVisible}
        tabIndex="0"
      >
        <HiddenSEOLinks>
          {LANGUAGES.map(lng => (
            <a key={lng} href={`${FULL_URL}/${lng}`}>{`${FULL_URL}/${lng}`}</a>
          ))}
        </HiddenSEOLinks>
        <SelectedLanguageWrapper>
          {children}
          {t(selectedLanguage)}
          {!isServer && !withNoFlag && <FlagIcon code={selectedLanguage} />}
        </SelectedLanguageWrapper>
        {listIsVisible && (
          <LanguageList {...{ listPosition }}>
            {LANGUAGES.filter(language => language !== selectedLanguage).map(
              language => (
                <LanguageListItem
                  key={language}
                  onClick={() => this.changeLanguage(language)}
                >
                  <FlagIcon code={language} />
                  {t(language)}
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
  listPosition: oneOf(["top", "bottom"]),
  t: func.isRequired,
  children: node,
  withNoFlag: bool
};

LanguageSwitcher.defaultProps = {
  withBorder: true,
  listPosition: "bottom",
  children: null,
  withNoFlag: false
};

export default withTranslation("languages")(LanguageSwitcher);

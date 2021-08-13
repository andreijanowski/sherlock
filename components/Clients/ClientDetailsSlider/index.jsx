import React, { Fragment, useMemo } from "react";
import { Flex, Box } from "@rebass/grid";
import Slide from "react-burger-menu/lib/menus/slide";
import { decorator as reduxBurgerMenu } from "redux-burger-menu/immutable";
import { bool, func, shape } from "prop-types";

import { AcceptedDetectiveIcon, CloseIcon } from "components/Icons";
import {
  SlideWrapper,
  ContentWrapper,
  MainInfoTags,
  MainInfoTag,
  Section,
  SectionTitle,
  PersonalInfoRow,
  PersonalInfoLabel,
  PersonalInfoValue,
  Tags,
  Tag,
  Currency
} from "./styled";
import {
  BUDGET_KEYS,
  getClientDetails,
  PERSONAL_DATA_KEYS,
  TAGS_KEYS,
  TOTAL_BUDGET_KEY,
  ALLERGIES_KEY
} from "../utils";
import { Avatar, DetectiveLabel, Name } from "../styled";

const PAGE_WRAP_ID = "app";
const OUTER_CONTAINER_ID = "layout";
const SLIDER_WIDTH = 400;

const getSlideStyles = isMobile => ({
  bmCrossButton: {
    top: isMobile ? "75px" : "15px",
    right: "15px",
    fontSize: "24px"
  }
});

const ClientDetailsSlider = ({
  t,
  isOpen,
  client,
  onStateChange,
  isMobile
}) => {
  const {
    avatar,
    name,
    mainInfo,
    budget,
    personal,
    tags,
    acceptedFoodDetective
  } = useMemo(() => getClientDetails(client, t), [client, t]);

  const renderedTags = useMemo(
    () =>
      client
        ? TAGS_KEYS.map(tagGroupKey => {
            const tagsGroupArray = tags[tagGroupKey];
            if (!tagsGroupArray || !tagsGroupArray.length) return null;
            const isAllergies = tagGroupKey === ALLERGIES_KEY;
            return (
              <Fragment key={tagGroupKey}>
                <SectionTitle>{t(`clients:${tagGroupKey}`)}</SectionTitle>
                <Tags>
                  {tagsGroupArray.map(tag => (
                    <Tag key={tag} pink={isAllergies} blue={!isAllergies}>
                      {tag}
                    </Tag>
                  ))}
                </Tags>
              </Fragment>
            );
          })
        : [],
    [client, t, tags]
  );

  const hasTags = !!renderedTags.filter(Boolean).length;

  const slideStyles = useMemo(() => getSlideStyles(isMobile), [isMobile]);

  return (
    <SlideWrapper>
      <Slide
        isOpen={isOpen}
        onStateChange={onStateChange}
        pageWrapId={PAGE_WRAP_ID}
        outerContainerId={OUTER_CONTAINER_ID}
        right
        width={isMobile ? "100%" : SLIDER_WIDTH}
        customCrossIcon={<CloseIcon />}
        styles={slideStyles}
      >
        {client && (
          <ContentWrapper isMobile={isMobile}>
            <Flex flexDirection="column" alignItems="center">
              <Box mb={48}>
                <Flex mb={3} justifyContent="center">
                  <Avatar src={avatar} big />
                </Flex>
                <Name big>{name}</Name>
                {acceptedFoodDetective && (
                  <Flex justifyContent="center" alignItems="center">
                    <Box mr="6px">
                      <AcceptedDetectiveIcon />
                    </Box>
                    <DetectiveLabel>
                      {t("clients:acceptedDetective")}
                    </DetectiveLabel>
                  </Flex>
                )}
                {!!mainInfo.length && (
                  <MainInfoTags>
                    {mainInfo.map(mainInfoTag => (
                      <MainInfoTag key={mainInfoTag}>{mainInfoTag}</MainInfoTag>
                    ))}
                  </MainInfoTags>
                )}
              </Box>
              <Section>
                <SectionTitle>{t("clients:personal.title")}</SectionTitle>
                {PERSONAL_DATA_KEYS.map(dataKey => {
                  const dataValue = personal[dataKey];
                  if (!dataValue) return null;
                  return (
                    <PersonalInfoRow key={dataKey}>
                      <PersonalInfoLabel>
                        {t(`clients:personal.${dataKey}`)}
                      </PersonalInfoLabel>
                      <PersonalInfoValue>{dataValue}</PersonalInfoValue>
                    </PersonalInfoRow>
                  );
                })}
              </Section>
              {hasTags && <Section>{renderedTags}</Section>}
              <Section>
                {BUDGET_KEYS.map(budgetKey => (
                  <Fragment key={budgetKey}>
                    <SectionTitle>{t(`clients:${budgetKey}`)}</SectionTitle>
                    <Currency total={budgetKey === TOTAL_BUDGET_KEY}>
                      €{budget[budgetKey]}
                    </Currency>
                  </Fragment>
                ))}
              </Section>
            </Flex>
          </ContentWrapper>
        )}
      </Slide>
    </SlideWrapper>
  );
};

ClientDetailsSlider.propTypes = {
  t: func.isRequired,
  isOpen: bool.isRequired,
  isMobile: bool.isRequired,
  onStateChange: func.isRequired,
  client: shape()
};

ClientDetailsSlider.defaultProps = {
  client: null
};

export default reduxBurgerMenu(ClientDetailsSlider);

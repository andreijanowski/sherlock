import React, { cloneElement, useState, useCallback, useMemo } from "react";
import { Modal, parsePeriods } from "components";
import { func, string, shape } from "prop-types";
import Cookies from "js-cookie";
import { useT } from "utils/hooks";
import { connect } from "react-redux";

import { postBusiness, patchBusiness } from "actions/businesses";
import { fetchProfileBusiness } from "actions/users";
import { setCurrentBusiness } from "actions/app";
import { deleteServiceLink, patchServiceLink } from "actions/externalServices";

import {
  getInitialValues,
  getGroupsValues,
  isSelectValueChanged
} from "sections/profile/basicInformation/utils";
import { getInitialValues as getImagesValues } from "sections/profile/picturesAndMenus/utils";
import { getInitialValues as getInitialAdditionalInfo } from "sections/profile/additionalInformation/utils";
import { getInitialValues as getInitialLinks } from "sections/profile/redirectionLinks/utils";
import { getGroupsData } from "sections/profile/utils";

import Button, { BUTTON_VARIANT } from "components/styleguide/Button";
import Bar from "components/Dashboard/progressBar";
import { STEP, CLOSE, getContent } from "components/Onboarding/utils";
import { AddServiceLink, Confirm } from "components/modals";
import H3 from "components/H3";
import { addProtocol } from "utils/urls";
import { ModalStyles, BottomNavigation } from "./styled";

const MODALS = {
  ADD_SERVICE_LINK: "ADD_SERVICE_LINK",
  REMOVE_SERVICE_LINK: "REMOVE_SERVICE_LINK"
};

const OnboardingModal = ({
  business,
  businessId,
  businessGroups,
  updateBusiness,
  businessOpenPeriods,
  businessMenus,
  businessPictures,
  businessProducts,
  groups,
  serviceLinks,
  updateServiceLink,
  removeServiceLink
}) => {
  const t = useT("onboarding");

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [hasHintOpen, setHasHintOpen] = useState(true);
  const [updatedValues, setUpdatedValues] = useState();
  const [modalData, setModalData] = useState(null);

  const [currentStep, setCurrentStep] = useState(getContent(t)[STEP.INTRO]);

  const onClose = () => {
    setIsModalOpen(false);
    Cookies.remove("Onboarding");
  };

  const hideModal = useCallback(() => {
    setModalData(null);
  }, []);

  const handleNextClick = () =>
    currentStep.nextStep === CLOSE
      ? onClose()
      : setCurrentStep(getContent(t)[currentStep.nextStep]);

  const handlePrevClick = () =>
    setCurrentStep(getContent(t)[currentStep.prevStep]);

  const handleSubmit = useCallback(
    (newValue, newValuesList, prevValues) => {
      const {
        deliveryUrl,
        onlineBookingUrl,
        takeawayUrl,
        name,
        tagline,
        country,
        region,
        street,
        streetNumber,
        city,
        postCode,
        ownerRole,
        bio,
        email,
        phone,
        phoneCountry,
        secretCode,
        website,
        facebook,
        instagram,
        youtube,
        breakfastService,
        lunchService,
        dinnerService,
        brunchService,
        cafeService,
        snackService,
        currency,
        pricePerPerson,
        hasCatering,
        hasReservations,
        hasPrivateEvents,
        availableInLefood,
        canPayWithCards,
        canPayWithCash,
        canPayWithMobile
      } = newValue;
      const {
        types,
        cuisines,
        foodsAndDrinks,
        quirks,
        diets,
        michelinStars,
        country: newCountry,
        region: newRegion
      } = newValuesList;
      const { country: countryValue, region: regionValue } = prevValues;

      const sendGroupsList =
        !name &&
        !tagline &&
        !(country && country.value) &&
        !(region && region.value) &&
        !street &&
        !streetNumber &&
        !city &&
        !postCode &&
        !ownerRole &&
        !bio;

      const requestValues = {
        name,
        tagline,
        countryCode: isSelectValueChanged(country, countryValue)
          ? country.value
          : undefined,
        regionCode: isSelectValueChanged(region, regionValue)
          ? region.value
          : undefined,
        street,
        streetNumber,
        city,
        postCode,
        groupsList: sendGroupsList
          ? getGroupsValues([
              ...types.slice(0, 3),
              ...cuisines.slice(0, 5),
              ...foodsAndDrinks.slice(0, 6),
              ...quirks.slice(0, 10),
              ...diets,
              ...michelinStars.slice(0, 1)
            ])
          : undefined,
        ownerRole,
        bio,
        email,
        phone,
        phoneCountryPrefix:
          phoneCountry && phoneCountry.value
            ? phoneCountry.value.prefix
            : undefined,
        phoneCountryCode:
          phoneCountry && phoneCountry.value
            ? phoneCountry.value.code
            : undefined,
        secretCode,
        website: addProtocol(website),
        facebook: addProtocol(facebook),
        instagram: addProtocol(instagram),
        youtube: addProtocol(youtube),
        breakfastService,
        lunchService,
        dinnerService,
        brunchService,
        cafeService,
        snackService,
        currency: currency && currency.value,
        pricePerPerson,
        hasCatering,
        hasReservations,
        hasPrivateEvents,
        availableInLefood,
        canPayWithCards,
        canPayWithCash,
        canPayWithMobile,
        deliveryUrl: addProtocol(deliveryUrl),
        onlineBookingUrl: addProtocol(onlineBookingUrl),
        takeawayUrl: addProtocol(takeawayUrl)
      };
      if (Object.values(requestValues).some(v => !!v)) {
        setUpdatedValues({
          types,
          cuisines,
          foodsAndDrinks,
          quirks,
          diets,
          michelinStars,
          country: newCountry,
          region: newRegion
        });

        return updateBusiness(businessId, requestValues, true);
      }
      return null;
    },
    [businessId, updateBusiness]
  );

  const initialPeriods = businessOpenPeriods
    ? parsePeriods(businessOpenPeriods)
    : {};

  const initialValues = useMemo(
    () => ({
      ...getInitialValues({ business, businessGroups }),
      periods: initialPeriods,
      ...getImagesValues({
        business,
        businessMenus,
        businessPictures,
        businessProducts
      }),
      ...getInitialAdditionalInfo(business),
      ...getInitialLinks(business)
    }),
    [
      business,
      businessGroups,
      businessMenus,
      businessPictures,
      businessProducts,
      initialPeriods
    ]
  );

  const onServiceLinkChange = useCallback(
    (id, values) => updateServiceLink(id, values),
    [updateServiceLink]
  );

  const onServiceLinkDelete = useCallback(
    ({ id, name }) => {
      const modalProps = {
        children: (
          <H3>{t("additionalInformation:deletePrompt", { service: name })}</H3>
        ),
        btnOkText: t("forms:delete"),
        btnCancelText: t("forms:cancel"),
        restyled: true,
        inverseColors: true,
        onConfirm: async () => {
          await removeServiceLink(id);
          hideModal();
        }
      };

      setModalData({ name: MODALS.REMOVE_SERVICE_LINK, props: modalProps });
    },
    [hideModal, removeServiceLink, t]
  );

  const onServiceAdd = useCallback(() => {
    setModalData({ name: MODALS.ADD_SERVICE_LINK });
  }, []);

  const groupsData = getGroupsData(groups);

  return (
    <>
      <ModalStyles />
      <Modal
        open={isModalOpen}
        onClose={onClose}
        btnCancelText={t("forms:cancel")}
      >
        {cloneElement(
          currentStep.component,
          {
            values: { ...initialValues, ...updatedValues },
            hasHintOpen,
            setHasHintOpen,
            handleSubmit,
            businessId,
            groupsData,
            serviceLinks,
            onServiceAdd,
            onServiceLinkChange,
            onServiceLinkDelete
          },
          null
        )}
        <BottomNavigation>
          <Bar
            color="midnightblue"
            width={currentStep.progress || "0"}
            height="5px"
            radius="5px"
            bgcolor="#fff"
            wrapperStyles={{
              width: "calc(100% + 76px)",
              position: "absolute",
              top: "-10px"
            }}
          />
          {currentStep.prevButtonText && (
            <Button
              onClick={handlePrevClick}
              color="black"
              variant={BUTTON_VARIANT.NAKED}
            >
              {currentStep.prevButtonText}
            </Button>
          )}
          <Button
            onClick={handleNextClick}
            withArrow
            type="submit"
            variant={BUTTON_VARIANT.GRADIENT}
          >
            {currentStep.buttonText}
          </Button>
        </BottomNavigation>
        {modalData && modalData.name === MODALS.ADD_SERVICE_LINK && (
          <AddServiceLink open onClose={hideModal} />
        )}
        {modalData && modalData.name === MODALS.REMOVE_SERVICE_LINK && (
          <Confirm open onClose={hideModal} {...modalData.props} />
        )}
      </Modal>
    </>
  );
};

OnboardingModal.propTypes = {
  business: shape(),
  businessId: string,
  businessGroups: shape(),
  updateBusiness: func.isRequired,
  businessOpenPeriods: shape(),
  businessMenus: shape(),
  businessPictures: shape(),
  businessProducts: shape(),
  groups: shape(),
  updateServiceLink: func.isRequired,
  removeServiceLink: func.isRequired,
  serviceLinks: shape()
};

OnboardingModal.defaultProps = {
  business: null,
  businessId: "",
  businessGroups: null,
  businessOpenPeriods: null,
  businessMenus: null,
  businessPictures: null,
  businessProducts: null,
  groups: null,
  serviceLinks: null
};

export default connect(
  state => {
    const serviceLinks = state.getIn(["externalServices", "data", "links"]);
    const businessData = state.getIn(["users", "currentBusiness", "data"]);
    const business =
      businessData &&
      businessData.get("businesses") &&
      businessData.get("businesses").first();
    return {
      business: business && business.get("attributes"),
      businessId: business && business.get("id"),
      businessGroups: businessData && businessData.get("groups"),
      businessMenus: businessData && businessData.get("menus"),
      businessPictures: businessData && businessData.get("pictures"),
      businessProducts: businessData && businessData.get("products"),
      businessOpenPeriods: businessData && businessData.get("openPeriods"),
      groups: state.getIn(["groups", "data", "groups"]),
      serviceLinks
    };
  },
  {
    updateBusiness: patchBusiness,
    changeCurrentBusiness: setCurrentBusiness,
    addBusiness: postBusiness,
    getProfileBusiness: fetchProfileBusiness,
    updateServiceLink: patchServiceLink,
    removeServiceLink: deleteServiceLink
  }
)(OnboardingModal);

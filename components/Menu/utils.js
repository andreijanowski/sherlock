export const MODALS = {
  PUBLISH_MODAL: "publish",
  UNPUBLISH_MODAL: "unpublish"
};

export const BUSINESS_STATES = {
  PUBLISHED: "published",
  WAITING_FOR_APPROVAL: "waiting_for_approval"
};

export const getButtonsProps = ({
  businessState,
  showUnpublishModal,
  showPublishModal
}) => {
  switch (businessState) {
    case BUSINESS_STATES.PUBLISHED:
      return {
        label: "app:manageProfile.unPublish",
        color: "ruby",
        onClick: showUnpublishModal
      };

    case BUSINESS_STATES.WAITING_FOR_APPROVAL:
      return {
        label: "app:manageProfile.waitingForApproval",
        color: "carrotOrange"
      };

    default:
      return {
        label: "app:manageProfile.publish",
        onClick: showPublishModal,
        isButton: true
      };
  }
};

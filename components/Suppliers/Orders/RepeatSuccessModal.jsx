import React from "react";
import Modal from "react-responsive-modal";
import { bool, func } from "prop-types";
import { useTranslation } from "i18n";
import { useLng } from "utils/hooks";
import { useRouter } from "next/router";
import { Box } from "@rebass/grid";
import { ChevronRightIcon } from "components/Icons";

const RepeatSuccessModal = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const lng = useLng();
  const router = useRouter();

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      classNames={{
        modal: "w-170 p-0 shadow-card rounded-4 overflow-hidden",
        closeIcon: "hidden"
      }}
    >
      <div className="w-170 bg-white">
        <div className="w-full bg-blue-800 py-6 px-10">
          <div className="mb-4 text-center text-xl font-bold leading-1.4 text-white">
            {t("app:orderRepeatSuccessSent.title")}
          </div>
          <div className="mx-auto text-center text-white">
            {t("app:orderRepeatSuccessSent.description")}
          </div>
        </div>
        <div className="p-8">
          <div className="flex justify-center">
            <img src="/static/img/orderRepeatSuccess.png" alt="tablet" />
          </div>

          <div className="mt-12 mb-4 flex items-center justify-center space-x-4">
            <Box
              className="cursor-pointer font-semibold leading-1.4 text-blue-600"
              onClick={() => router.push(`/${lng}/app/suppliers`)}
            >
              {t("app:orderRepeatSuccessSent.gotIt")}
            </Box>
            <Box className="flex cursor-pointer items-center space-x-2 rounded-full bg-blue-800 bg-linear2 py-2 px-6">
              <span className="font-semibold leading-1.4 text-white">
                {t("app:orderRepeatSuccessSent.continue")}
              </span>
              <ChevronRightIcon />
            </Box>
          </div>
        </div>
      </div>
    </Modal>
  );
};

RepeatSuccessModal.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired
};

export default RepeatSuccessModal;

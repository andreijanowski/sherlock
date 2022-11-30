import React from "react";
import Modal from "react-responsive-modal";
import { useRouter } from "next/router";
import { Box } from "@rebass/grid";
import { bool, func } from "prop-types";
import { useTranslation } from "../../i18n";
import { useLng } from "../../utils/hooks";

const SuccessModal = ({ isOpen, onClose }) => {
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
        <div className="w-full bg-blue-800 p-10 text-center text-xl font-bold text-white">
          {t("app:requestSuccessSent.title")}
        </div>
        <div className="p-8">
          <div className="mx-auto mb-8 max-w-120 text-center font-semibold text-blue-A900">
            {t("app:requestSuccessSent.description")}
          </div>
          <div className="flex justify-center">
            <img src="/static/img/orderHistory.png" alt="tablet" />
          </div>

          <div className="mt-12 mb-4 flex items-center justify-center space-x-4">
            <Box
              className="cursor-pointer font-semibold leading-1.4 text-blue-600"
              onClick={() => router.push(`/${lng}/app/suppliers`)}
            >
              {t("app:requestSuccessSent.gotIt")}
            </Box>
          </div>
        </div>
      </div>
    </Modal>
  );
};

SuccessModal.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired
};

export default SuccessModal;

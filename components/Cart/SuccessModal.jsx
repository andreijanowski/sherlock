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
      <div className="bg-white w-170">
        <div className="w-full bg-blue-800 text-white font-bold p-10 text-center text-xl">
          {t("app:requestSuccessSent.title")}
        </div>
        <div className="p-8">
          <div className="text-blue-A900 text-center mb-8 max-w-120 mx-auto font-semibold">
            {t("app:requestSuccessSent.description")}
          </div>
          <div className="flex justify-center">
            <img src="/static/img/orderHistory.png" alt="tablet" />
          </div>

          <div className="flex items-center space-x-4 mt-12 justify-center mb-4">
            <Box
              className="text-blue-600 cursor-pointer font-semibold leading-1.4"
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

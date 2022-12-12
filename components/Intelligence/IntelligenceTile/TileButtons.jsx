import React, { useState, useEffect, useMemo } from "react";
import { func, shape } from "prop-types";
import { IntelligenceModal } from "components/modals";
import { Button } from "../../buttons";
import { PlayGradientIcon, InfoGardientIcon } from "../../Icons";
import { Tooltip } from "react-tooltip";

const TileButton = ({ t, data }) => {
  const {
    id,
    redirectionText,
    redirectionUrl,
    videoUrl,
    title,
    subtitle,
    logoUrl,
    description
  } = data;
  const [checked, setChecked] = useState(false);
  const toggleChecked = () => setChecked(value => !value);
  const openInNewTab = url => window.open(url, "_blank", "noreferrer");

  useEffect(() => {
    if (checked) {
      document.getElementById("intelligence-section").style.filter =
        "blur(5px)";
    } else {
      document.getElementById("intelligence-section").style.filter =
        "blur(0px)";
    }
  }, [checked]);

  const showTooltip = useMemo(
    () => !!(redirectionText?.length > 15),
    [redirectionText?.length]
  );

  return (
    <>
      <div className="mx-4 flex flex-wrap items-center">
        {videoUrl && (
          <div className="mr-4 mt-2 h-9 w-9 last:mr-0">
            <button
              className="rounded-[50%] hover:bg-primary/[0.15]"
              onClick={() => openInNewTab(videoUrl)}
            >
              <PlayGradientIcon />
            </button>
          </div>
        )}
        {description && (
          <div className="mr-4 mt-2 h-9 w-9 last:mr-0">
            <button
              className="rounded-[50%] hover:bg-primary/[0.15]"
              onClick={toggleChecked}
            >
              <InfoGardientIcon />
            </button>
            {checked && (
              <IntelligenceModal
                description={description}
                title={title}
                subtitle={subtitle}
                image={logoUrl}
                onConfirm={toggleChecked}
                onCloseModal={toggleChecked}
              />
            )}
          </div>
        )}
        {redirectionUrl && (
          <>
            <div
              id={`url-tooltip-${id}`}
              className="mr-4 mt-2 h-9 w-9 min-w-26 flex-grow last:mr-0"
            >
              <Button
                color="gradient"
                square
                rootClassName={"w-full"}
                onClick={() => openInNewTab(redirectionUrl)}
              >
                {redirectionText ? (
                  <p className="truncate text-xs text-white">
                    {redirectionText}
                  </p>
                ) : (
                  <p className="text-xs text-white">{t("app:learnMore")}</p>
                )}
              </Button>
            </div>
            {showTooltip && (
              <Tooltip
                className="tooltip"
                anchorId={`url-tooltip-${id}`}
                content={redirectionText}
              />
            )}
          </>
        )}
      </div>
    </>
  );
};

TileButton.propTypes = {
  t: func.isRequired,
  data: shape().isRequired
};

export default TileButton;

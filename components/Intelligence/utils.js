export const getIntelligenceDataDetails = intelligenceData => {
  const id = intelligenceData.getIn(["id"]);
  const title = intelligenceData.getIn(["attributes", "title"]);
  const redirectionUrl = intelligenceData.getIn([
    "attributes",
    "redirectionUrl"
  ]);
  const videoUrl = intelligenceData.getIn(["attributes", "videoUrl"]);
  const redirectionText = intelligenceData.getIn([
    "attributes",
    "redirectionText"
  ]);
  const subtitle = intelligenceData.getIn(["attributes", "subtitle"]);
  const description = intelligenceData.getIn(["attributes", "description"]);
  const logoUrl = intelligenceData.getIn(["attributes", "logo", "url"]);

  return {
    id,
    title,
    redirectionUrl,
    videoUrl,
    redirectionText,
    subtitle,
    logoUrl,
    description
  };
};

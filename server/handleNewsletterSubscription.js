const { GoogleSpreadsheet } = require("google-spreadsheet");

const {
  GOOGLE_SHEET_SERVICE_ACCOUNT_EMAIL,
  GOOGLE_SHEET_SERVICE_ACCOUNT_KEY,
  NEWSLETTER_GOOGLE_SHEET_ID
} = require("../consts");

const doc = new GoogleSpreadsheet(NEWSLETTER_GOOGLE_SHEET_ID);

const connectDocPromise = doc.useServiceAccountAuth({
  client_email: GOOGLE_SHEET_SERVICE_ACCOUNT_EMAIL,
  private_key: GOOGLE_SHEET_SERVICE_ACCOUNT_KEY
});

async function handleNewsletterSubscription(req, res) {
  try {
    const {
      body: { email }
    } = req;

    // connecting to gapi with service account
    await connectDocPromise;
    // loading info into doc object
    await doc.loadInfo();

    // loading sheet
    const sheet = doc.sheetsByIndex[0];
    // adding header row to avoid error with empty header
    await sheet.setHeaderRow(["Email"]);

    // adding data
    await sheet.addRow([email]);

    res.status(200);
    res.json({
      success: true
    });
  } catch (e) {
    res.status(500);
    res.json({
      success: false,
      message: e.message
    });
  }
}

module.exports = handleNewsletterSubscription;

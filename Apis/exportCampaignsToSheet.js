const { google } = require("googleapis");
const path = require("path");
const EmergencyCampaign = require("../models/emergency_campaigns");

const SERVICE_ACCOUNT_PATH = path.join(__dirname, "../config/service-account.json");
const SPREADSHEET_ID = "1hCw1z4NBTuEBmQtw_tkKCeBuTUjC_gP1k4kB7wt5wXc";
const SHEET_NAME = "Sheet1";

const auth = new google.auth.GoogleAuth({
  keyFile: SERVICE_ACCOUNT_PATH,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

const sheets = google.sheets({ version: "v4", auth });

const exportEmergencyCampaigns = async () => {
  try {
    const campaigns = await EmergencyCampaign.findAll();

    const data = [["ID", "Campaign Name", "Description", "Target", "Raised", "Start Date", "End Date", "Status"]];

    for (const c of campaigns) {
      data.push([
        c.id,
        c.campaign_name,
        c.description,
        c.target_amount,
        c.amount_raised,
        c.start_date ? new Date(c.start_date).toISOString() : "",
        c.end_date ? new Date(c.end_date).toISOString() : "",
        c.status
      ]);
    }

    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: data
      }
    });

    console.log("✅ Campaigns exported to Google Sheets");
    return { success: true, count: data.length - 1 };
  } catch (error) {
    console.error("❌ Error exporting campaigns:", error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { exportEmergencyCampaigns };

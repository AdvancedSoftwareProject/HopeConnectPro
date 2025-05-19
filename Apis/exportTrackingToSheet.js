const { google } = require("googleapis");
const fs = require("fs");
const path = require("path");
const TrackingUpdate = require("../models/trackingUpdate");
const { Op } = require("sequelize");

const SPREADSHEET_ID = "1P-fdNyiFwKJpMRT1QbZu619scg-dI6IHDYkM27gV9Oc";
const SHEET_NAME = "Sheet1"; 
const SERVICE_ACCOUNT_PATH = path.join(__dirname, "../config/hopeconnect-tracking-export-baad434bcdd9.json"); 


const auth = new google.auth.GoogleAuth({
  keyFile: SERVICE_ACCOUNT_PATH,
  scopes: ["https://www.googleapis.com/auth/spreadsheets"]
});

const sheets = google.sheets({ version: "v4", auth });

const exportLatestTrackingStatus = async () => {
  try {
    
    const uniqueDeliveries = await TrackingUpdate.findAll({
      attributes: ["delivery_id"],
      group: ["delivery_id"]
    });

    const data = [["Delivery ID", "Latest Status", "Update Time"]]; 

    for (const delivery of uniqueDeliveries) {
      const latestUpdate = await TrackingUpdate.findOne({
        where: { delivery_id: delivery.delivery_id },
        order: [["created_at", "DESC"]]
      });

      if (latestUpdate) {
        data.push([
          latestUpdate.delivery_id,
          latestUpdate.status,
          latestUpdate.update_time.toISOString()
        ]);
      }
    }

    
    await sheets.spreadsheets.values.update({
      spreadsheetId: SPREADSHEET_ID,
      range: `${SHEET_NAME}!A1`,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: data
      }
    });

    console.log("✅ Exported tracking data to Google Sheets.");
    return { success: true, message: "Data exported successfully." };

  } catch (error) {
    console.error("❌ Error exporting to Google Sheets:", error.message);
    return { success: false, error: error.message };
  }
};

module.exports = { exportLatestTrackingStatus };

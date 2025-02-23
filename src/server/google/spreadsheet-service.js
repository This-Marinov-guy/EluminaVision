import { google } from "googleapis";

const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
const auth = new google.auth.GoogleAuth({
  credentials: credentials,
  scopes: ["https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/spreadsheets"],
});

export const writeToGoogleSheet = async (data, spreadsheetId) => {
  const client = await auth.getClient();

  // Create an instance of Google Sheets API
  const sheets = google.sheets({ version: "v4", auth: client });

  // Spreadsheet ID and range of data
  const range = "website";

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range,
    valueInputOption: "USER_ENTERED",
    resource: {
      values: [data],
    },
  });
};



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

// 🆕 Function to clear data from row 2 downwards and insert new data
export const resetAndWriteToGoogleSheet = async (dataArray, spreadsheetId) => {
  const client = await auth.getClient();
  const sheets = google.sheets({ version: "v4", auth: client });

  const sheetName = "QR"; // Adjust if needed
  const startRow = 2; // Start clearing from row 2

  // 1️⃣ Clear existing data (row 2 onward)
  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range: `${sheetName}!A${startRow}:Z`, // Adjust column range as needed
  });

  // 2️⃣ Prepare the new data as an array of arrays
  const values = dataArray.map((obj) => Object.values(obj));

  // 3️⃣ Write the new data
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range: `${sheetName}!A${startRow}`, // Insert at row 2
    valueInputOption: "USER_ENTERED",
    resource: { values },
  });
};

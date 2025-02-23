// import { google } from "googleapis";
// import moment from "moment";
// import fs from "fs";
// import { Readable } from "stream";

// const credentials = JSON.parse(process.env.GOOGLE_APPLICATION_CREDENTIALS);
// const auth = new google.auth.GoogleAuth({
//   credentials: credentials,
//   scopes: ["https://www.googleapis.com/auth/drive", "https://www.googleapis.com/auth/spreadsheets"],
// });

// export const createFolder = async (parentFolderId, folderName = "") => {
//   try {
//     const client = await auth.getClient();
//     const drive = google.drive({ version: "v3", auth: client });

//     folderName = moment().format("DD MM YY") + " | " + folderName;
//     // Check if a folder with the given name exists within the parent folder
//     const folderSearch = await drive.files.list({
//       q: `name='${folderName}' and mimeType='application/vnd.google-apps.folder' and '${parentFolderId}' in parents and trashed=false`,
//       fields: "files(id, name)",
//     });
//     let folderId = folderSearch.data.files.length > 0 ? folderSearch.data.files[0].id : null;

//     // If folder doesn't exist, create it inside the parent folder
//     if (!folderId) {
//       const folderMetadata = {
//         name: folderName,
//         parents: [parentFolderId],
//         mimeType: "application/vnd.google-apps.folder",
//       };

//       const folderResponse = await drive.files.create({
//         resource: folderMetadata,
//         fields: "id",
//       });

//       folderId = folderResponse.data.id;
//     }

//     return folderId;
//   } catch (err) {
//     console.log(err);
//     return null;
//   }
// };

// export const uploadFiles = async (files, folderName = moment().format("DD MM YY")) => {
//   const client = await auth.getClient();
//   const drive = google.drive({ version: "v3", auth: client });
//   const uploadedFileUrls = [];

//   const folderId = await createFolder(ORDER_DRIVE_FOLDER, folderName);
//   if (!folderId) {
//     throw new Error("Folder creation failed");
//   }

//   for (let index = 0; index < files.length; index++) {
//     const file = files[index];
//     const fileMetadata = {
//       name: `${index + 1}.jpg`,
//       parents: [folderId],
//     };

//     const media = {
//       mimeType: file.mimetype,
//       body: fs.createReadStream(file.filepath), // Create a read stream from the file path
//     };

//     try {
//       // Upload the file to Google Drive
//       const response = await drive.files.create({
//         resource: fileMetadata,
//         media: media,
//         fields: "id",
//       });

//       const fileId = response.data.id;
//       console.log("Uploaded File ID:", fileId);

//       // Make the file public (optional)
//       await drive.permissions.create({
//         fileId: fileId,
//         requestBody: {
//           role: "reader",
//           type: "anyone",
//         },
//       });

//       // Get the public URL
//       const fileUrl = `https://drive.google.com/uc?id=${fileId}`;
//       uploadedFileUrls.push(fileUrl);
//     } catch (error) {
//       console.error(`Error uploading file ${file.originalFilename}:`, error);
//     }
//   }

//   return uploadedFileUrls;
// };

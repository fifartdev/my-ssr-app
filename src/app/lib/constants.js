// PRODUCTION
const endpoint = process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT;
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT;
const apiKey = process.env.APPWRITE_KEY;
//const apiKey = process.env.NEXT_PUBLIC_APPWRITE_KEY;
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const tableClientsId = process.env.NEXT_PUBLIC_APPWRITE_TABLE_CLIENTS_ID;
const tableServiceCategoryId =
  process.env.NEXT_PUBLIC_APPWRITE_TABLE_SERVICES_CATEGORIES_ID;
const tableServicesId = process.env.NEXT_PUBLIC_APPWRITE_TABLE_SERVICES;

export {
  endpoint,
  projectId,
  apiKey,
  databaseId,
  tableClientsId,
  tableServiceCategoryId,
  tableServicesId,
};

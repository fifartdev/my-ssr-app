import { Client, TablesDB } from "appwrite";
import { endpoint, projectId } from "./constants";

const client = new Client().setEndpoint(endpoint).setProject(projectId);

const tablesDB = new TablesDB(client);

export { tablesDB };

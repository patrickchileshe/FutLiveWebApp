// This file sets up the database connection using the @db/sqlit and stuff

import { Database } from "@db/sqlite";

export const db = new Database("application.db");


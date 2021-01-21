-- CreateTable
CREATE TABLE "MainObject" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "number" TEXT NOT NULL,
    "title" TEXT,
    "clientId" INTEGER NOT NULL,
    "address" TEXT,
    "telephones" TEXT,
    "mode" TEXT,
    "signal" TEXT,
    "chiefId" INTEGER NOT NULL,
    "deputyId" INTEGER NOT NULL,
    "routeId" INTEGER NOT NULL,
    "gps" TEXT,
    "companyId" INTEGER NOT NULL,
    "typeCheck" INTEGER,
    "dayMode" INTEGER NOT NULL DEFAULT 0,
    "daytimeMode" INTEGER NOT NULL DEFAULT 0,
    "nightMode" INTEGER NOT NULL DEFAULT 0,
    "opened" BOOLEAN NOT NULL,
    FOREIGN KEY ("clientId") REFERENCES "Client" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("chiefId") REFERENCES "Chief" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("deputyId") REFERENCES "Deputy" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("routeId") REFERENCES "Route" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY ("companyId") REFERENCES "Company" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

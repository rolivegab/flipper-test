-- CreateTable
CREATE TABLE "Subtitle" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "ratio" NUMERIC(8, 2) NOT NULL,
    "author" TEXT NOT NULL,
    "postedAt" TIMESTAMP(3) NOT NULL,
    "language" TEXT NOT NULL,
    "downloads" INTEGER NOT NULL,
    "link" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    PRIMARY KEY ("id")
);

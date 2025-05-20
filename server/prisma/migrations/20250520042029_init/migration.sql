-- CreateTable
CREATE TABLE "posts" (
    "postId" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "authorId" INTEGER NOT NULL,
    CONSTRAINT "posts_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "user" ("userId") ON DELETE RESTRICT ON UPDATE CASCADE
);

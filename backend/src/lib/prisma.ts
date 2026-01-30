// import { PrismaClient } from '@prisma/client';
// const prisma = new PrismaClient();
// export default prisma;

// import { PrismaClient } from '@prisma/client';

// // Prisma 7 の接続エラーを物理的に回避
// const prisma = new PrismaClient({
//   datasourceUrl: "postgresql://user:password@db:5432/appdb"
// });

// export default prisma;

// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient({
//   datasources: {
//     db: {
//       // Docker内なら 'db:5432'、ローカルなら 'localhost:5432' を試す
//       url: process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/appdb",
//     },
//   },
// });

// export default prisma;

import { PrismaClient } from '@prisma/client';

// Prisma 7でも、それ以前のバージョンでも動く「最も安全な」書き方
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL || "postgresql://user:password@localhost:5432/appdb",
    },
  },
} as any); // 👈 'as any' をつけることで、バージョンの違いによる細かいエラーを無視して起動させます

export default prisma;
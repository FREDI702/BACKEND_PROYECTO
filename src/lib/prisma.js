const { PrismaClient } = require('../generated/prisma');
const {prismaNeon} = require("@prisma/adapter/neon");

const adapter = new PrismaNeon({
    url: process.env.DATABASE_URL,
});

const prisma = new PrismaClient({
    adapter,
});

module.exports = prisma;
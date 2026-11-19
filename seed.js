require("dotenv/config");
const prisma = require("./src/lib/prisma");

async function main(){
    await prisma.date.createMany({
    date:[
        {nombre:"Michilaptop Gamer",fecha: new Date("2026-11-01T00:00:00") },
        {nombre:"Michilaptop Ultra",fecha: new Date("2026-12-01T00:00:00") },
        {nombre:"Michilaptop Pro",fecha: new Date("2027-01-01T00:00:00") },
        {nombre:"Michilaptop Air",fecha: new Date("2027-02-01T00:00:00") },
        {nombre:"Michilaptop Mini",fecha: new Date("2027-03-01T00:00:00") },
    ],

});
console.log("Seed data created successfully");
}

main()
.catch((e) => {console.error(e); process.exit(1); })
.finally(() => prisma.$disconnect());
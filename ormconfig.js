const {SnakeNamingStrategy} = require("typeorm-naming-strategies");

module.exports = {
    type: "postgres",
    url: process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5432/postgres",
    entities: [
        "dist/**/*.entity{.ts,.js}"
    ],
    ssl: true,
    logging: false,
    synchronize: true,
    namingStrategy: new SnakeNamingStrategy()
}

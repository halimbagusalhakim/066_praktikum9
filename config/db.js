
async function connectDatabase() {
    try {
        await sequelize.authenticate();
        console.log('databased connected sucessfully.');

        await db.sequelize.sync({ alter: true });
        console.log('Database synchronized');

    } catch (err){
        console.error('database connectiono failed:', err.message);
        process.exit(1);
    }
}
module.exports = connectDatabase;
require('dotenv').config();
const connectDB = require('../src/config/database');
const Role = require('../src/models/Role');

const run = async () => {
    await connectDB(process.env.MONGO_URI);
    await Role.updateOne({ role_name: 'Admin' }, { role_name: 'Admin', description: 'Administrator' }, { upsert: true });
    await Role.updateOne({ role_name: 'Normal' }, { role_name: 'Normal', description: 'Normal user' }, { upsert: true });
    console.log('Roles seeded');
    process.exit(0);
};

run().catch((e) => {
    console.error(e);
    process.exit(1);
});

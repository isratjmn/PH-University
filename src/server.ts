import mongoose from 'mongoose';
import config from './app/config';
import app from './app';
import { Server } from 'http';
import seedSuperAdmin from './app/DB';
let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    seedSuperAdmin();
    server = app.listen(config.port, () => {
      console.log(`PH University App Listening on Port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}
main();

process.on('unhandledRejection', (error) => {
  console.log(` UnhandleRejection is Detected, Shutting down.....`, error);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(` uncaughtException is Detected, Shutting down.....`);
  process.exit(1);
});

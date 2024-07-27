import cluster from 'cluster';
require('dotenv').config();
import os from 'os';
import { startServer } from './server';

if (process.env.CLUSTER) {
  if (cluster.isPrimary) {
    for (let i = 0; i < os.cpus().length; i++) {
      cluster.fork();
    }
  } else {
    startServer();
  }
} else {
  startServer();
}

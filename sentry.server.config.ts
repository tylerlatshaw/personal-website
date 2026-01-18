// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

Sentry.init({
  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: false,
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE || "local",
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN || "https://5c150727d1334f0ae9b5a43d256396da@o4506043986280448.ingest.us.sentry.io/4509543618248704",
  environment: process.env.NODE_ENV || "local",
});

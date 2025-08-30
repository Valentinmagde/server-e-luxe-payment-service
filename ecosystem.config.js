module.exports = {
  apps: [
    {
      name: `e-luxe-payment-service-${process.env.NODE_ENV || "development"}`,
      script: "build/server.js",
      env: {
        NODE_ENV: "development",
      },
      env_test: {
        NODE_ENV: "test",
      },
      env_staging: {
        NODE_ENV: "staging",
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};

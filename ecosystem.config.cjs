module.exports = {
  apps: [
    {
      name: "ndz-bot",
      script: "index.js",

      cwd: __dirname,

      interpreter: "node",

      instances: 1,
      exec_mode: "fork",

      autorestart: true,
      watch: false,

      max_memory_restart: "500M",

      env: {
        NODE_ENV: "production",
        TZ: "Asia/Jakarta"
      },

      time: true,

      restart_delay: 5000,

      kill_timeout: 5000,

      listen_timeout: 10000,

      error_file: "./logs/error.log",
      out_file: "./logs/output.log",

      merge_logs: true,

      log_date_format: "YYYY-MM-DD HH:mm:ss"
    }
  ]
};

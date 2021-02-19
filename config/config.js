const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || "YOUR_secret_key",
  mongoUri:  "mongodb+srv://root:root00@cluster0.mq5hg.mongodb.net/harvestApp?retryWrites=true&w=majority"
}

export default config


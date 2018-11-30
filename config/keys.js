// const dotenv = require("dotenv").config();

module.exports = {
  mongoURI: process.env.MONGO_URI,
  secretOrKey: process.env.SECRET_OR_KEY,
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_SECRET,
    redirect: process.env.GOOGLE_CALLBACK_URL
  },
  twitter: {
    twitterApiKey: process.env.TWITTER_API_KEY,
    twitterSecretKey: process.env.TWITTER_SECRET_KEY,
    twitterAccessToken: process.env.TWITTER_ACCESS_TOKEN,
    twitterTokenSecret: process.env.TWITTER_TOKEN_SECRET
  },
  admin: {
    userName: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD
  },
  imgQuality: Number(process.env.IMAGE_QUALITY) || 80,
  paginateCount: Number(process.env.PAGINATE_COUNT) || 30,
  imgWidthLandscape: Number(process.env.IMAGE_WIDTH_LANDSCAPE) || 1024,
  imageWidthPortrait: Number(process.env.IMAGE_WIDTH_PORTRAIT) || 580,
  thumbWidth: Number(process.env.THUMB_WIDTH) || 400
};

const passport = require("passport");
const OutlookStrategy = require("passport-outlook").Strategy;

passport.use(
  new OutlookStrategy(
    {
      clientID: process.env.OUTLOOK_CLIENT_ID,
      clientSecret: process.env.OUTLOOK_CLIENT_SECRET,
      callbackURL: `${process.env.API_URL}/auth/outlook/callback`,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      try {
        // Save user credentials to database
        const user = {
          id: profile.id,
          accessToken,
          refreshToken,
          email: profile._json.EmailAddress,
        };
        return done(null, user);
      } catch (error) {
        return done(error, null);
      }
    }
  )
);

const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

passport.use(
	new GoogleStrategy(
		{
			clientID: "77586473246-dod9nf8tjsnvs5g64ocekshdi8n75h0b.apps.googleusercontent.com",
			clientSecret:"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",
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
		},
		function (accessToken, refreshToken, profile, callback) {
			callback(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});
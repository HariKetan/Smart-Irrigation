const jwt = require("jsonwebtoken");

// Generate JWT token for the existing test user
const token = jwt.sign(
	{
		userId: "cmdu3x3gg0000d4upl3msz10n", // The actual user ID from the database
		farmId: 1,
	},
	"abcdefghujkl" // JWT secret from .env
);

console.log("🔑 JWT Token:", token);
console.log("📝 Test credentials:");
console.log("   Email: test@example.com");
console.log("   Password: password123");
console.log("   User ID:", "cmdu3x3gg0000d4upl3msz10n");

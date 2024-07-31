const setRateLimit = require("express-rate-limit");
const jwt = require("jsonwebtoken");

// Rate limit middleware
const rateLimitMiddleware = setRateLimit({
  windowMs: 60 * 1000,
  max: 200,
  message: "You have exceeded your 5 requests per minute limit.",
  headers: true,
});

// Authentication middleware
const authtoken = async (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res.status(401).send({ message: "No token found" });
  }

  try {
    const user = await jwt.verify(token, process.env.PRIVATE_KEY);

    req.user = user;

    next();
  } catch (error) {
    res.status(403).send({ message: "Invalid Token" });
  }
};

// Combined middleware
const rateLimitAndAuthMiddleware = (req, res, next) => {
  // Apply rate-limiting middleware
  rateLimitMiddleware(req, res, (rateLimitError) => {
    if (rateLimitError) {
      return res.status(429).send({ message: "Rate limit exceeded" });
    }

    // If rate limit is not exceeded, continue with authentication middleware
    authtoken(req, res, (authError) => {
      if (authError) {
        // Handle authentication error if needed
        return res.status(401).send({ message: "Authentication failed" });
      }

      // Both rate limit and authentication passed, proceed to the next middleware or route handler
      next();
    });
  });
};

module.exports = rateLimitAndAuthMiddleware;

const jwt = require("jsonwebtoken");

const authenticate = async (req, res, next) => {
    const authHeader = req.headers?.authorization;
    const token = authHeader?.startsWith("Bearer ")
        ? authHeader.split(" ")[1]
        : req.cookies?.token;

    if (!token) {
        return res.status(401).json({ msg: "Login Please" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = {
            userId: decoded.userId,
            email: decoded.email,
            role: decoded.role || "user",
        };
        next();
    } catch (error) {
        return res.status(401).json({ msg: "Invalid or Expired Token" });
    }
};

const authorize = (...roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ msg: "Forbidden" });
    }
    next();
};

const authorizeOwnerOrRole = (ownerParam, ...roles) => (req, res, next) => {
    const isOwner = req.user?.userId?.toString() === req.params[ownerParam]?.toString();
    const hasRole = roles.includes(req.user?.role);

    if (!isOwner && !hasRole) {
        return res.status(403).json({ msg: "Forbidden" });
    }
    next();
};

module.exports = { authenticate, authorize, authorizeOwnerOrRole };

import { SignJWT, jwtVerify } from "jose";

export const getSecretKey = () => {
    const secret = process.env.PRIVATE_KEY;
    if (!secret || secret.length === 0) {
        throw new Error("The environment variable PRIVATE_KEY is not set.");
    }

    return secret;
};

export const verifyToken = async (token) => {
    try {
        const privateKey = getSecretKey();
        const verified = await jwtVerify(
            token,
            new TextEncoder().encode(privateKey)
        );
        return verified.payload;
    } catch (err) {
        throw new Error(`Error verifying token: ${err.message}`);
    }
};

export const generateToken = async (payload) => {
    try {
        const privateKey = getSecretKey();
        const alg = "HS256";

        const jwt = await new SignJWT(payload)
            .setProtectedHeader({ alg })
            .setIssuedAt()
            .setIssuer("urn:example:issuer")
            .setAudience("urn:example:audience")
            .setExpirationTime("30d")
            .sign(new TextEncoder().encode(privateKey));
        return jwt;
        // const token = await SignJWT()
    } catch (err) {
        throw new Error(`Error generating token: ${err.message}`);
    }
};

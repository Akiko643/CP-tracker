import errorMessage from "./error.messages";

export const handleError = (err, res) => {
    if (err.code === 11000) {
        return res.status(400).json({ message: errorMessage.DUPLICATE });
    }
};

import errorMessage from "./error.messages";

export const handleError = (err, res) => {
    console.log(err);
    if (err.code === 11000) {
        return res.status(200).json({ message: errorMessage.DUPLICATE });
    }
    return res.status(400).json({ message: err.message });
};

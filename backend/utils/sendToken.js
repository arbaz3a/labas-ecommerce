/* create jwt token put it in response and send */
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();

    // remove password from output
    const userObj = user.toObject();
    delete userObj.password;

    res.status(statusCode).json({
        success: true,
        token,
        user: userObj,
    });
};

module.exports = sendTokenResponse;

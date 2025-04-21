const { Router } = require("express");
const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey : "public_EfcIq+TGpFGsTUw7LgG4UYIwZu4=",
    privateKey : "private_YjjKubNPNN33+ce2I2cI1veHmkA=",
    urlEndpoint : "https://ik.imagekit.io/aparna"
});

const getAuthParams = (req, res) => {
    res.send(imagekit.getAuthenticationParameters());
};

const imageRouter = Router();
imageRouter.get('/auth', getAuthParams);

module.exports = {
    imageRouter
};

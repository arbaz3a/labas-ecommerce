const uploadToImageKit = async (fileBuffer, fileName) => {
    const privateKey = process.env.IMAGEKIT_PRIVATE_KEY;
    if (!privateKey) {
        throw new Error("IMAGEKIT_PRIVATE_KEY environment variable is not defined");
    }

    const blob = new Blob([fileBuffer]);
    const formData = new FormData();
    formData.append("file", blob, fileName);
    formData.append("fileName", fileName);

    const authHeader = "Basic " + Buffer.from(privateKey + ":").toString("base64");

    const response = await fetch("https://upload.imagekit.io/api/v1/files/upload", {
        method: "POST",
        headers: {
            "Authorization": authHeader,
        },
        body: formData,
    });

    if (!response.ok) {
        const errText = await response.text();
        throw new Error(`ImageKit upload failed: ${response.statusText} - ${errText}`);
    }

    const data = await response.json();
    return data.url;
};

module.exports = { uploadToImageKit };

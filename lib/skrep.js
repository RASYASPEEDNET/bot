const fs = require("fs");
const path = require("path");
const FormData = require("form-data");
const { fromBuffer } = require("file-type");

async function CatBox(buffer) {
    try {
        const fetch = (await import("node-fetch")).default;

        const type = await fromBuffer(buffer);
        const ext = type ? type.ext : "bin";

        const form = new FormData();
        form.append("fileToUpload", buffer, `file.${ext}`);
        form.append("reqtype", "fileupload");

        const res = await fetch("https://catbox.moe/user/api.php", {
            method: "POST",
            body: form
        });

        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        return await res.text();
    } catch (err) {
        console.error("CatBox Error:", err);
        return null;
    }
}

async function uploadImageBuffer(buffer) {
    return await CatBox(buffer);
}

module.exports = {
    CatBox,
    uploadImageBuffer
};

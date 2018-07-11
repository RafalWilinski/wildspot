const Storage = require("@google-cloud/storage");
const spawn = require("child-process-promise").spawn;
const path = require("path");

const storage = new Storage();
const bucketName = "wildspots-d2aad.appspot.com";

const bucket = storage.bucket(bucketName);

spawn("rm", ["-fr", "./images/*.jpg", "./images/*.png"]);

bucket
  .getFiles()
  .then(results => {
    const files = results[0];

    for (const index in files) {
      const file = files[index];

      if (file.name.startsWith("thumb_")) {
        console.log("Already a Thumbnail.");
        return null;
      }

      (filePath => {
        const fileName = filePath.split("/")[1];
        const thumbFileName = `thumb_${fileName}`;

        const tempFilePath = path.join(__dirname, `images/${fileName}`);
        const thumbFilePath = path.join(__dirname, `images/${thumbFileName}`);

        console.log({
          filePath,
          fileName,
          thumbFileName,
          thumbFilePath,
          tempFilePath,
        });

        bucket
          .file(filePath)
          .download({
            destination: tempFilePath,
          })
          .then(d => {
            spawn("convert", [
              tempFilePath,
              "-thumbnail",
              "200x200>",
              thumbFilePath,
            ])
              .then(() => {
                console.log("Thumbnail created at", thumbFilePath);

                return bucket.upload(thumbFilePath, {
                  destination: `images/${thumbFileName}`,
                });
              })
              .catch(console.error);
          })
          .catch(console.error);
      })(file.name);
    }
  })
  .catch(console.error);

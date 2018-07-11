const functions = require("firebase-functions");
const gcs = require("@google-cloud/storage")();
const spawn = require("child-process-promise").spawn;
const path = require("path");
const os = require("os");
const fs = require("fs");
const fetch = require("node-fetch");

exports.geoToCountry = functions.database
  .ref("/spots/{spotId}")
  .onCreate((snapshot, context) => {
    const original = snapshot.val();
    const url = `http://api.geonames.org/countryCodeJSON?lat=${
      original.entity.coordinates[1]
    }&lng=${original.entity.coordinates[0]}&username=wildspot`;

    return fetch(url)
      .then(res => res.json())
      .then(json => {
        return Promise.all([
          snapshot.ref
            .child("entity")
            .child("countryName")
            .set(json.countryName),
          snapshot.ref
            .child("entity")
            .child("countryCode")
            .set(json.countryCode),
        ]);
      });
  });

exports.generateThumbnail = functions.storage.object().onFinalize(object => {
  const fileBucket = object.bucket;
  const filePath = object.name;
  const contentType = object.contentType;
  const fileName = path.basename(filePath);

  if (fileName.startsWith("thumb_")) {
    console.log("Already a Thumbnail.");
    return null;
  }

  const bucket = gcs.bucket(fileBucket);
  const tempFilePath = path.join(os.tmpdir(), fileName);
  const metadata = {
    contentType: contentType,
  };

  return bucket
    .file(filePath)
    .download({
      destination: tempFilePath,
    })
    .then(() => {
      console.log("Image downloaded locally to", tempFilePath);

      return spawn("convert", [
        tempFilePath,
        "-thumbnail",
        "200x200>",
        tempFilePath,
      ]);
    })
    .then(() => {
      console.log("Thumbnail created at", tempFilePath);

      const thumbFileName = `thumb_${fileName}`;
      const thumbFilePath = path.join(path.dirname(filePath), thumbFileName);

      return bucket.upload(tempFilePath, {
        destination: thumbFilePath,
        metadata: metadata,
      });
    })
    .then(() => fs.unlinkSync(tempFilePath));
});

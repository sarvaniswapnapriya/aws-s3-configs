const AWS = require('aws-sdk');
const fs = require('fs');
const path = require('path');

AWS.config.update({ region: 'eu-north-1' });

const s3 = new AWS.S3();
const bucketName = 'coderabbit-s3-demo';
const filePath = path.join(__dirname, 'sample.txt'); // Sample file to upload

async function uploadFile() {
  const fileContent = fs.readFileSync(filePath);
  const params = {
    Bucket: bucketName,
    Key: 'uploads/sample.txt',
    Body: fileContent,
    ACL: 'public-read' // Security issue: Publicly readable
  };

  try {
    const data = await s3.upload(params).promise();
    console.log(`File uploaded successfully at ${data.Location}`);
  } catch (error) {
    console.error('Error uploading file:', error);
  }
}

uploadFile();

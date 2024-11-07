const AWS = require('aws-sdk');

// Initialize the S3 client
const s3 = new AWS.S3({
  region: 'eu-north-1',  
});

const bucketName = 'coderabbit-s3-demo';   

// File details
const fileName = 'example-file.txt';  
const fileContent = 'This file contains some random information.';  

async function uploadFile() {
  const params = {
    Bucket: bucketName,
    Key: fileName, 
    Body: fileContent,  
    ACL: 'public-read',  
  };

  try {
    const data = await s3.upload(params).promise();
    console.log(`File uploaded successfully. URL: ${data.Location}`);
  } catch (err) {
    console.error('Error uploading file:', err);
  }
}

uploadFile();

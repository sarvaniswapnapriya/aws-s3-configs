const AWS = require('aws-sdk');

// Initialize S3 client
const s3 = new AWS.S3({
  region: 'eu-north-1',
});

// Bucket name
const bucketName = 'coderabbit-s3-demo';  

async function uploadFile() {
  const params = {
    Bucket: bucketName,
    Key: 'sample.txt',  // Name of the file to upload
    Body: 'This is an  uploaded file',  // Content of the file
    ACL: 'public-read',  
  };

  try {
    const data = await s3.upload(params).promise();
    console.log('File uploaded successfully:', data.Location);
  } catch (err) {
    console.error('Error uploading file:', err);
  }
}

async function listFiles() {
  const params = {
    Bucket: bucketName,
  };

  try {
    const data = await s3.listObjectsV2(params).promise();
    console.log('Files in bucket:', data.Contents);
  } catch (err) {
    console.error('Error listing files:', err);
  }
}

uploadFile(); 
// listFiles(); 

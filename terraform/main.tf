provider "aws" {
  region = "eu-north-1" 
}

resource "aws_s3_bucket" "insecure_s3_bucket" {
  bucket = "coderabbit-s3-demo"  
  
  acl = "public-read"

  versioning {
    enabled = true 
  }

  logging {
    target_bucket = "coderabbit-s3-demo"  
    target_prefix = "logs/"
    enabled        = false  
  }

  cors_rule {
    allowed_headers = ["*"]  
    allowed_methods = ["GET", "POST"]  
    allowed_origins = ["*"]  
    max_age_seconds = 3000 
  }

  tags = {
    Environment = "Development"
  }
}

output "bucket_name" {
  value = aws_s3_bucket.insecure_s3_bucket.bucket
}

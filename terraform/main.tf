provider "aws" {
  region = "eu-north-1"
}

resource "aws_s3_bucket" "coderabbit_s3_demo" {
  bucket = "coderabbit-s3-demo"
  acl    = "public-read"  # Security Issue: Publicly accessible bucket

  # Overly permissive bucket policy
  policy = <<POLICY
  {
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": "*",
        "Action": "s3:*",
        "Resource": [
          "arn:aws:s3:::coderabbit-s3-demo",
          "arn:aws:s3:::coderabbit-s3-demo/*"
        ]
      }
    ]
  }
  POLICY

  # Misconfigured CORS settings
  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "POST", "PUT"]
    allowed_origins = ["*"]
    max_age_seconds = 3000
  }

  # Logging disabled
  logging {
    target_bucket = "coderabbit-s3-demo"
    target_prefix = "logs/"
  }

  # Versioning is disabled
  versioning {
    enabled = false
  }

  # Tags
  tags = {
    Environment = "Development"
  }
}

output "bucket_name" {
  value = aws_s3_bucket.coderabbit_s3_demo.bucket
}

#!/bin/bash

# Define the base URL for the images
BASE_URL="http://openimg.saltyaus.space/images"

# Define the directory containing images
IMAGES_DIR="images"
JSON_FILE="images.json"

# Initialize JSON file
echo "[" > $JSON_FILE

# Find all image files (JPG, PNG, JPEG)
find $IMAGES_DIR -type f \( -name "*.jpg" -o -name "*.png" -o -name "*.jpeg" \) | while read image_path; do
  # Extract category and image name
  CATEGORY=$(basename $(dirname "$image_path"))
  IMAGE_NAME=$(basename "$image_path")
  TITLE=$(basename "$IMAGE_NAME" | sed 's/\.[^.]*$//')  # Remove file extension for title

  # Append image data to the JSON file
  echo "  {" >> $JSON_FILE
  echo "    \"url\": \"$BASE_URL/$CATEGORY/$IMAGE_NAME\"," >> $JSON_FILE
  echo "    \"name\": \"$TITLE\"," >> $JSON_FILE
  echo "    \"category\": \"$CATEGORY\"" >> $JSON_FILE
  echo "  }," >> $JSON_FILE
done

# Remove trailing comma and close the JSON array
sed -i '$ s/,$//' $JSON_FILE
echo "]" >> $JSON_FILE

#!/bin/bash

# Define the base URL for the images
BASE_URL="http://openimg.saltyaus.space/images"

# Navigate to the images folder
IMAGES_DIR="images" # Ensure this matches your repository structure
JSON_FILE="images.json"

# Start the JSON array
echo "[" > $JSON_FILE

# Loop through all categories and images
for category in $(find $IMAGES_DIR -mindepth 1 -type d -exec basename {} \;); do
  for image_path in $(find $IMAGES_DIR/$category -type f -name "*.jpg"); do
    # Generate a description using the Python script
    description=$(python generate_description.py "$image_path")

    # Append to the JSON file
    echo "  {" >> $JSON_FILE
    echo "    \"url\": \"$BASE_URL/$category/$(basename $image_path)\"," >> $JSON_FILE
    echo "    \"name\": \"$description\"," >> $JSON_FILE
    echo "    \"category\": \"$category\"" >> $JSON_FILE
    echo "  }," >> $JSON_FILE
  done
done

# Remove trailing comma and close the JSON array
sed -i '$ s/,$//' $JSON_FILE
echo "]" >> $JSON_FILE

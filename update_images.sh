#!/bin/bash

# Define variables
BASE_URL="http://openimg.saltyaus.space/images"
IMAGES_DIR="images"
JSON_FILE="images.json"

# Initialize JSON file if it doesn't exist
if [ ! -f "$JSON_FILE" ]; then
  echo "[]" > "$JSON_FILE"
fi

# Read existing JSON data into a variable
EXISTING_JSON=$(cat "$JSON_FILE")

# Function to check if an image entry exists in the JSON
function image_exists {
  local url="$1"
  echo "$EXISTING_JSON" | grep -q "\"url\": \"$url\""
}

# Process all images in the repository
NEW_ENTRIES=()
for category in $(find "$IMAGES_DIR" -mindepth 1 -type d -exec basename {} \;); do
  for image in $(find "$IMAGES_DIR/$category" -type f -name "*.jpg" -exec basename {} \;); do
    IMAGE_URL="$BASE_URL/$category/$image"
    IMAGE_NAME="$(basename "$image" .jpg)"
    
    # Skip if the image already exists in the JSON
    if image_exists "$IMAGE_URL"; then
      echo "Image $IMAGE_URL already exists in $JSON_FILE. Skipping..."
      continue
    fi

    # Add new entry for this image
    NEW_ENTRY=$(cat <<EOF
{
  "url": "$IMAGE_URL",
  "name": "$IMAGE_NAME",
  "category": "$category"
}
EOF
)
    NEW_ENTRIES+=("$NEW_ENTRY")
  done
done

# Append new entries to the JSON file
if [ ${#NEW_ENTRIES[@]} -gt 0 ]; then
  # Remove the closing bracket and append new entries
  jq '. |= .[:-1]' "$JSON_FILE" > tmp.json && mv tmp.json "$JSON_FILE"
  for entry in "${NEW_ENTRIES[@]}"; do
    echo "  $entry," >> "$JSON_FILE"
  done

  # Remove trailing comma and close the JSON array
  sed -i '$ s/,$//' "$JSON_FILE"
  echo "]" >> "$JSON_FILE"
  echo "New images have been added to $JSON_FILE."
else
  echo "No new images found. $JSON_FILE is up-to-date."
fi

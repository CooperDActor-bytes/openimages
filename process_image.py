import json
import os
import sys

# Check if an image file was passed
if len(sys.argv) < 2:
    print("No image file provided.")
    sys.exit(1)

# The image file to process
image_path = sys.argv[1]

# Ensure images.json exists
json_path = "images.json"
if not os.path.exists(json_path):
    with open(json_path, "w") as f:
        json.dump([], f)

# Load existing data
with open(json_path, "r") as f:
    data = json.load(f)

# Extract category and image name
category, image_name = os.path.split(image_path)[-2:]
image_url = f"http://openimg.saltyaus.space/images/{category}/{image_name}"

# Avoid duplicates
if any(entry["url"] == image_url for entry in data):
    print(f"Image {image_url} already exists in images.json. Skipping.")
    sys.exit(0)

# Add a new entry
entry = {
    "category": category,
    "name": image_name,
    "url": image_url,
    "description": f"Description for {image_name}"  # Placeholder description
}
data.append(entry)

# Save updated data
with open(json_path, "w") as f:
    json.dump(data, f, indent=4)

print(f"Added {image_url} to images.json")

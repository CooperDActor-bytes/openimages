import os
import json

repo_url = "https://your-username.github.io/your-repo/images"

def generate_json():
    image_data = []
    base_path = "images"

    for category in os.listdir(base_path):
        category_path = os.path.join(base_path, category)
        if os.path.isdir(category_path):
            for image in os.listdir(category_path):
                if image.endswith(('.png', '.jpg', '.jpeg', '.gif')):
                    image_data.append({
                        "category": category,
                        "name": os.path.splitext(image)[0],
                        "url": f"{repo_url}/{category}/{image}"
                    })

    with open('images.json', 'w') as json_file:
        json.dump(image_data, json_file, indent=2)

if __name__ == "__main__":
    generate_json()

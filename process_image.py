import sys
from PIL import Image
import torch
from transformers import BlipProcessor, BlipForConditionalGeneration

def generate_description(image_path):
    # Load the pre-trained BLIP model and processor
    processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
    model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")
    
    # Open the image
    image = Image.open(image_path).convert("RGB")

    # Preprocess the image and generate a caption
    inputs = processor(images=image, return_tensors="pt")
    out = model.generate(**inputs)
    description = processor.decode(out[0], skip_special_tokens=True)
    
    return description

if __name__ == "__main__":
    image_path = sys.argv[1]  # Get the image file path from the argument
    print(f"Processing image: {image_path}")
    
    # Generate and print the image description
    description = generate_description(image_path)
    print(f"Image Description: {description}")

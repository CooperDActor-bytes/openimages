import sys
from transformers import BlipProcessor, BlipForConditionalGeneration
from PIL import Image

# Initialize the BLIP processor and model
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

def generate_caption(image_path):
    # Load the image
    image = Image.open(image_path).convert("RGB")

    # Generate a caption
    inputs = processor(image, return_tensors="pt")
    caption_ids = model.generate(**inputs)
    caption = processor.decode(caption_ids[0], skip_special_tokens=True)

    return caption

# Main entry point
if __name__ == "__main__":
    # Get the image path from the command-line arguments
    image_path = sys.argv[1]

    # Generate the caption and print it
    description = generate_caption(image_path)
    print(description)

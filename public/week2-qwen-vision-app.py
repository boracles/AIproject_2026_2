import base64
import os
import shutil
from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI


load_dotenv()

api_key = os.getenv("DASHSCOPE_API_KEY")
base_url = os.getenv("DASHSCOPE_BASE_URL")
if not api_key or not base_url:
    raise RuntimeError("Check your .env file")

client = OpenAI(api_key=api_key, base_url=base_url)

LABELS = ["person", "document", "food", "device", "other"]
prompt = f"""
Classify this photo for an automatic photo organization service.
Choose exactly one category from: {', '.join(LABELS)}
Choose the category that best represents the photo.
Return only the category name.
"""

with open("sample.jpg", "rb") as image_file:
    image_base64 = base64.b64encode(image_file.read()).decode("utf-8")

image_data_url = "data:image/jpeg;base64," + image_base64

response = client.chat.completions.create(
    model="qwen3.8-flash",
    messages=[
        {
            "role": "user",
            "content": [
                {
                    "type": "image_url",
                    "image_url": {"url": image_data_url},
                },
                {"type": "text", "text": prompt},
            ],
        }
    ],
    extra_body={"enable_thinking": False},
)

category = response.choices[0].message.content.strip().lower()
print("Category:", category)

if category not in LABELS:
    raise ValueError(f"Unexpected category: {category}")

target_dir = Path("sorted") / category
target_dir.mkdir(parents=True, exist_ok=True)
target_file = target_dir / "sample.jpg"

shutil.copy2("sample.jpg", target_file)
print("Saved:", target_file)

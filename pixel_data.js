from PIL import Image

# Đường dẫn tới file ảnh gốc
image_path = "/mnt/data/pixel-art-radahn-festival-v0-7vrfqq7baf491.png"
output_file = "pixel_data.js"

# Mở ảnh
img = Image.open(image_path)
img = img.convert("RGBA")  # Chuyển đổi sang RGBA nếu chưa
pixels = list(img.getdata())  # Lấy dữ liệu pixel
width, height = img.size

# Ghi dữ liệu pixel ra file JavaScript
with open(output_file, "w") as f:
    f.write("const imageData = {\n")
    f.write(f"  width: {width},\n")
    f.write(f"  height: {height},\n")
    f.write("  pixels: [\n")
    for i in range(0, len(pixels), width):
        row = pixels[i:i + width]
        f.write("    " + str(row) + ",\n")
    f.write("  ]\n")
    f.write("};\n")

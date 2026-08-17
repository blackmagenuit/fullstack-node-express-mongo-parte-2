from PIL import Image, ImageDraw, ImageFont
import os

text = '''> fullstack-backend@1.0.0 test
> node --test

POST /api/auth/register 201 232.389 ms - 372
POST /api/auth/login 200 147.818 ms - 367
✔ registro y login (3564.9089ms)
GET /api/users?search=ana&role=admin&page=1&limit=10 200 100.196 ms - 240
✔ obtiene usuarios con filtros y paginación (128.7695ms)
GET /api/users 401 0.870 ms - 40
✔ sin token devuelve 401 (12.8174ms)
GET /api/users 401 0.819 ms - 29
✔ token inválido devuelve 401 (18.6979ms)
ℹ tests 4
ℹ suites 0
ℹ pass 4
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 34164.0581'''

os.makedirs('evidencias', exist_ok=True)
font_path = 'C:/Windows/Fonts/consola.ttf'
try:
    font = ImageFont.truetype(font_path, 22)
except Exception:
    font = ImageFont.load_default()

lines = text.splitlines()
max_line_len = max(len(line) for line in lines)
img_w = max(1200, max_line_len * 11 + 80)
img_h = max(720, len(lines) * 28 + 80)
img = Image.new('RGB', (img_w, img_h), 'white')
draw = ImageDraw.Draw(img)
margin_x = 24
y = 24
for line in lines:
    draw.text((margin_x, y), line, fill='black', font=font)
    y += 28

out_path = os.path.join('evidencias', '20-pruebas-automatizadas.jpg')
img.save(out_path, quality=95)
print(out_path)
print(os.path.getsize(out_path))

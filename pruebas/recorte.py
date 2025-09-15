import cv2, os

def recortar_lineas_centro_cv2(imagen_path, salida_path):
    img = cv2.imread(imagen_path)
    alto, ancho, _ = img.shape  # alto=375, ancho=500

    # Coordenadas para cortar
    start = alto // 2 - 2
    end = start + 5

    # Concatenamos parte superior + parte inferior
    nueva = cv2.vconcat([img[:start, :, :], img[end:, :, :]])

    cv2.imwrite(salida_path, nueva)

# Ejemplo
for i in range(45,46):
    original = os.path.join("assets", "test1", f"im{i}.png")
    nueva = os.path.join("assets", "test1.1", f"im{i}.png")
    recortar_lineas_centro_cv2(original, nueva)

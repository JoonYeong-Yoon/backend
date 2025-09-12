# python/predict.py
import tensorflow as tf
import numpy as np
from PIL import Image
import sys
import json
import os,cv2

# 이미지 경로
image_path = sys.argv[1]
print(f"[DEBUG] Received image path: {image_path}", file=sys.stderr)

# 클래스 이름 (모델 학습 시 사용한 순서대로 작성해야 함)
classes = [
    "태선화/과다색소침착",
    "농포/여드름",
    "결절/종괴",
    "무증상",
]

# ---------------- 모델 로드 ----------------
model_path = os.path.join(os.path.dirname(__file__), "best_model.h5")
model = tf.keras.models.load_model(model_path)

# ---------------- 이미지 전처리 ----------------
def preprocess_image(img_path, target_size=(224, 224)):
    img = cv2.imread(img_path)[..., ::-1]  # BGR to RGB
    img_array = cv2.resize(img, target_size)
    # img = Image.open(img_path).convert("RGB")   # RGB 변환
    # img = img.resize(target_size)               # 224x224 리사이즈
    # img_array = np.array(img)# / 255.0           # [0,1] 정규화
    img_array = np.expand_dims(img_array, axis=0)  # (1, 224, 224, 3)
    return img_array

img_array = preprocess_image(image_path)

# ---------------- 예측 ----------------
predictions = model.predict(img_array)
probabilities = predictions[0]  # (num_classes,) 형태

# 가장 높은 확률의 클래스 선택
max_idx = np.argmax(probabilities)
message = f"{probabilities[max_idx]*100:.2f}% 확률로 '{classes[max_idx]}'이(가) 의심됩니다."

# ---------------- JSON 출력 ----------------
print(json.dumps({
    "probabilities": {c: float(p) for c, p in zip(classes, probabilities)},
    "message": message
}))

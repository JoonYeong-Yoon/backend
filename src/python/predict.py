import tensorflow as tf
import numpy as np
from PIL import Image
import sys
import json

# 이미지 경로
image_path = sys.argv[1]

# 🔹 더미 모델 대신 간단하게 랜덤 확률 생성
classes = ["태선화/과다색소침착",
    "농포/여드름",
    "결절/종괴",
    "무증상",]
probabilities = np.random.rand(len(classes))
probabilities /= probabilities.sum()  # 확률 합 1

max_idx = np.argmax(probabilities)
message = f"{probabilities[max_idx]*100:.2f}% 확률로 '{classes[max_idx]}'이(가) 의심됩니다."

# JSON 출력
print(json.dumps({
    "probabilities": {c: float(p) for c,p in zip(classes, probabilities)},
    "message": message
}))

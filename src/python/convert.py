import tensorflow as tf
IMG_SIZE = 224
inputs = tf.keras.layers.Input((IMG_SIZE, IMG_SIZE, 3))
x = tf.keras.applications.mobilenet_v2.preprocess_input(inputs)
backbone = tf.keras.applications.MobileNetV2(
    input_shape=(IMG_SIZE, IMG_SIZE, 3),
    include_top=False,
    weights='imagenet'
)

# Backbone freeze : layer의 weight를 학습하지 않음
for layer in backbone.layers:
    layer.trainable = False
    
x = backbone(x)
x = tf.keras.layers.GlobalAveragePooling2D()(x)
x = tf.keras.layers.Dropout(0.3)(x)
outputs = tf.keras.layers.Dense(4, activation='softmax')(x)  # 클래스 4개
model = tf.keras.Model(inputs, outputs)
model.summary()

model.load_weights('mymodel.h5')
model.save('mymodel_.h5')
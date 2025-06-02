FROM quay.io/astronomer/astro-runtime:12.8.0

USER root

RUN apt-get update && apt-get install ffmpeg libsm6 libxext6  -y

USER nonroot



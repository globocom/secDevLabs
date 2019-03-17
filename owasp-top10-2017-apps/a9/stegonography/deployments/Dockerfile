FROM python:3
WORKDIR /app
ADD app/ /app
RUN apt-get update && \
    apt-get clean && \
    pip install -r requirements.txt
CMD python app.py
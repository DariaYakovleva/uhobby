FROM python:3.9.6-slim-buster

WORKDIR /app

RUN apt-get update \
  && apt-get -y install netcat gcc g++\
  && apt-get clean

RUN apt-get update
RUN pip install --upgrade pip
COPY ./requirements.txt .
RUN pip install -r requirements.txt

COPY . .

CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "90", "--workers", "1"]

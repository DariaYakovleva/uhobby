from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from uhobby.hobbies import FindHobby
from uhobby import logger

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=[
        "http://localhost:8080"
    ],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.state.hobbies = {}

@app.get("/", tags=["root"])
async def read_root() -> dict:
    return {"message": "Welcome to UHOBBY."}


@app.get("/get_all_hobbies", tags=["hobby"])
async def get_all_hobbies() -> list:
    hobbies = FindHobby()

    return hobbies.get_all_hobbies()


@app.post("/get_recommendation", tags=["hobby"])
async def get_recommendation(data: dict) -> list:
    user_id = data.get('user_id')
    positive = data.get('positive')
    for hobby in positive:
        logger.log_data_hobby(user_id, hobby, "positive")

    hobbies = FindHobby()
    recommendation = hobbies.get_similar_hobbies(positive)[:10]
    result = []
    hobby_id = 0
    for hobby, score in recommendation:
        data = {
            "key": hobby_id,
            "hobby_en": hobby.hobby_en,
            "hobby_ru": hobby.hobby_ru,
            "hobby_url": hobby.hobby_url,
            "hobby_score": round(score, 4),
            "image_url": hobby.image_url
        }
        result.append(data)
        logger.log_data_hobby(user_id, hobby.hobby_ru, "recommendation")
        hobby_id += 1

    return result


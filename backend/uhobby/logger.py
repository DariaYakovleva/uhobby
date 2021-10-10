import requests


def log_data_hobby(user_id, hobby_ru, feedback):
    URL = "https://api.airtable.com/TODO"
    headers = {
        'Content-Type': "application/json",
        'Authorization': "Bearer TODO"
    }

    record = {
        "fields": {
            "user_id": str(user_id),
            "hobby_ru": hobby_ru,
            "feedback": feedback
        }
    }

    requests.post(URL, headers=headers, json=record)

import requests
import json

headers = {
    'accept': 'application/json',
    'Content-Type': 'application/json',
}

data = {"login": "email@email.com", "password": "password123"}
print(json.dumps(data))

response = requests.post('https://faktury-backend.herokuapp.com/api/login', headers=headers, data=json.dumps(data))
print(response.text)
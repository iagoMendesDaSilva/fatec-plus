import os
import json
import requests
 
class Notification:
    def __init__(self):
        self.app_id = os.getenv("FATEC_PLUS_ONESIGNAL")
        self.header = {"Content-Type": "application/json; charset=utf-8"}
    
    def create_payload(self, player_id, title, message,data):
        return {"app_id": self.app_id,
           "include_player_ids": player_id,
           "contents": {"en": message},"headings":{"en": title},
           "small_icon":"ic_launcher_round","data":data}

    def send(self, player_id, title, message, data=None):
        payload = self.create_payload(player_id, title, message, data)
        requests.post("https://onesignal.com/api/v1/notifications", headers=self.header, data=json.dumps(payload))

notification = Notification()
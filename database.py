from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017/")
db = client.campus_engagement

def initialize_db():
    if db.volunteer_events.count_documents({}) == 0:
        db.volunteer_events.insert_many([
            {
                "title": "Community Clean-Up",
                "description": "Help us clean the local park.",
                "date": "2025-11-01",
                "venue": "Park Area A",
                "requirements": "Gloves and boots recommended."
            },
            {
                "title": "Food Drive Volunteer",
                "description": "Assist in packing food donations.",
                "date": "2025-11-15",
                "venue": "Campus Hall B",
                "requirements": "No prior experience required."
            }
        ])

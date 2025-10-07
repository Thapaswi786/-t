from flask import Flask
from flask_cors import CORS

from database import initialize_db
from routes.auth_routes import auth_routes
from routes.volunteer_routes import volunteer_routes

app = Flask(__name__)
CORS(app)

app.register_blueprint(auth_routes, url_prefix='/api')
app.register_blueprint(volunteer_routes, url_prefix='/api')

if __name__ == '__main__':
    initialize_db()
    app.run(debug=True)

@auth_routes.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        username = data.get('username')
        if not username:
            return jsonify({"status": "error", "message": "Username required"}), 400
        user = db.users.find_one({"username": username})
        if not user:
            user_id = db.users.insert_one(create_user(username)).inserted_id
            user = db.users.find_one({"_id": ObjectId(user_id)})
        user['_id'] = str(user['_id'])
        return jsonify({"status": "success", "user": user})
    except Exception as e:
        print("Error during login:", e)
        return jsonify({"status": "error", "message": str(e)}), 500


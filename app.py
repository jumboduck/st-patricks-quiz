import os
from flask import (
    Flask, flash, render_template,
    redirect, request, session, url_for)
from flask_pymongo import PyMongo
from bson.objectid import ObjectId

if os.path.exists("env.py"):
    import env


app = Flask(__name__)

app.config["MONGO_DBNAME"] = os.environ.get("MONGO_DBNAME")
app.config["MONGO_URI"] = os.environ.get("MONGO_URI")
app.secret_key = os.environ.get("SECRET_KEY")

mongo = PyMongo(app)

# Function to load 'Home' page as default


@app.route('/')
@app.route('/home')
def home():
    return render_template("index.html")


# Function to load 'leaderboard' page

@app.route('/leaderboard')
def leaderboard():
    teams = list(mongo.db.teams.find())
    return render_template("leaderboard.html", teams=teams)


# Function to load 'quiz' page

@app.route('/quiz')
def quiz():
    # grab the session user's username from db
    name = mongo.db.users.find_one(
        {"name": session["user"]})["name"]

    if session["user"]:
        return render_template("quiz.html", name=name)


# Function to load 'login' page

@app.route("/login", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        # check if username already exists in db
        existing_user = mongo.db.users.find_one(
            {"name": request.form.get("name").lower()})

        if existing_user:
            flash("Username already exists")
            return redirect(url_for("login"))

        login = {
            "name": request.form.get("name").lower(),
        }
        mongo.db.users.insert_one(login)

        # put the new user into 'session' cookie
        session["user"] = request.form.get("name").lower()
        flash("Registration Successful!")
        return redirect(url_for("quiz", name=session["user"]))

    return render_template("login.html")


# IP and PORT

if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
            port=int(os.environ.get('PORT')),
            debug=True)

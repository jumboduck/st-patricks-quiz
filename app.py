# Imports

import os
from flask import Flask, render_template, request, url_for
if os.path.exists("env.py"):
    import env


app = Flask(__name__)


# Function to load 'Home' page as default

@app.route('/')
@app.route('/home')
def home():
    return render_template("index.html")


# Function to load 'leaderboard' page

@app.route('/leaderboard')
def leaderboard():
    return render_template("leaderboard.html")


# Function to load 'quiz' page

@app.route('/quiz')
def quiz():
    return render_template("quiz.html")


# Function to load 'login' page

@app.route('/login')
def login():
    return render_template("login.html")


# IP and PORT

if __name__ == '__main__':
    app.run(host=os.environ.get('IP'),
            port=int(os.environ.get('PORT')),
            debug=True)
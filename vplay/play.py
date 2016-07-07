# -*- coding: utf-8 -*-


from flask import Blueprint, Flask, render_template

play = Blueprint('play', __name__)

@play.route('/player0/')
def play1():
    return render_template('demo1.html')

@play.route('/player1/')
def player1():
    return render_template('demo1-1.html')

@play.route('/player2/')
def player2():
    return render_template('demo2-1.html')

@play.route('/player3/')
def play2():
    return render_template('demo2.html')



def create_app(debug=True):
    global play
    app = Flask(__name__, template_folder="")
    app.register_blueprint(play)
    app.debug = debug
    return app

if __name__ == '__main__':
    app = create_app()
    app.run(host="0.0.0.0", port=4646)
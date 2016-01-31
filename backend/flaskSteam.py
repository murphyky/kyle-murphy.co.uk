#from urllib import request, parse
import requests
import os

steam_api = 'http://api.steampowered.com/'

from flask import Flask, request, make_response
app = Flask(__name__)

@app.route('/api/get_user/<user_id>')
def get_user(user_id):

	error = None

	url = steam_api+'ISteamUser/GetPlayerSummaries/v0002/'
	
	params = {
		'key': app.config['STEAM_KEY'],
		'steamids' : user_id
	}

	resp = make_response(requests.get(url, params).text)
	
	return resp

if __name__ == '__main__':
	app.config.from_object('config')
	app.run(host='0.0.0.0')
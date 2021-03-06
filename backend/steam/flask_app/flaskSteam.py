#from urllib import request, parse
import requests
import os
import socket
import json

steam_api = 'http://api.steampowered.com/'

from flask import Flask, request, make_response, jsonify

application = Flask(__name__)

def request_generator(endpoint, params):

	try:
		if socket.gethostname() == 'kyle-murphy.com':
			import uwsgi
			params['key'] = uwsgi.opt['steam_key']
		else:
			params['key'] = application.config['STEAM_KEY']

		url = steam_api + endpoint + '?' #start of query string

		for param in params:
			url = url + (param + '=' + params[param] + '&')

		url = url[:-1]

		return requests.get(url).text
	except Exception as e:
		print e


@application.route('/api')
def index():
	return 'API TEST'

def get_user(user_id):
	
	error = None

	try:
		return request_generator('ISteamUser/GetPlayerSummaries/v0002/', {
			'steamids': user_id
			})
		
	except Exception as e:
		print e

def get_player_history(user_id):

	try:

		return request_generator('IPlayerService/GetRecentlyPlayedGames/v0001/',
			{
			'steamid': user_id,
			'format': 'json'
			})

	except Exception as e:
		print e

@application.route('/api/generate_steam_badge/<user_id>/')
def generate_steam_badge(user_id):
	try:

		user_response = get_user(user_id)
		play_history_response = get_player_history(user_id)

		response = {
			'user_details': json.loads(user_response),
			'play_history': json.loads(play_history_response)
		}

		return jsonify(**response)

	except Exception as e:
		print e

if __name__ == '__main__':
	application.config.from_object('config')
	application.config['PROPOGATE_EXCEPTIONS'] = True
	application.run(host='0.0.0.0', debug=True)

#from urllib import request, parse
import requests
import os

steam_api = 'http://api.steampowered.com/'

from flask import Flask, request, make_response

application = Flask(__name__)

@application.route('/')
def index():
	return 'Hi there on port 5000'

@application.route('/get_user/<user_id>/')
def get_user(user_id):

	error = None

	try:
		url = steam_api+'ISteamUser/GetPlayerSummaries/v0002/'
	
		params = {
			'key': application.config['STEAM_KEY'],
			'steamids' : user_id
		}

		url = url + '?key='+params['key']+'&steamids='+params['steamids']

		return make_response(requests.get(url).text)
		
	except Exception as e:
		print e
		return make_response(e)

if __name__ == '__main__':
	application.config.from_object('config')
	application.run(host='0.0.0.0')

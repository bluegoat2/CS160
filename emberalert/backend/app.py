from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd

app = Flask(__name__)
CORS(app)

MAP_KEY = 'b7f1b1174e56b9b7b17cbcd413b062af'  # Your FIRMS API key

@app.route('/api/wildfires')
def get_wildfire_data():
	try:
		# Using VIIRS S-NPP NRT instead of NOAA-20
		area_url = f'https://firms.modaps.eosdis.nasa.gov/api/area/csv/{MAP_KEY}/VIIRS_SNPP_NRT/world/2'
		df = pd.read_csv(area_url)
		df = df[['latitude', 'longitude', 'acq_date', 'acq_time', 'bright_ti4', 'bright_ti5']]
		data = df.to_dict(orient='records')
		return jsonify(data)

	except Exception as e:
		return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
	app.run(debug=True)

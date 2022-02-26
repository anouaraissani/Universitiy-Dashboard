from flask import Flask, render_template, request
from flask import redirect
from flask import jsonify
import json

from flaskext.mysql import MySQL

app = Flask(__name__)

mysql = MySQL()

app.config['MYSQL_DATABASE_HOST'] 	  = 'localhost'
app.config['MYSQL_DATABASE_PORT'] 	  = 3306
app.config['MYSQL_DATABASE_USER'] 	  = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'anouar'
app.config['MYSQL_DATABASE_DB'] 	  = 'db_university'

mysql.init_app(app)

app = Flask(__name__)

@app.route('/')
def index():
	return render_template('index.html')
	
	
@app.route('/api/data')
def doGetData():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT annee, count(*) FROM resultats GROUP BY annee")	

	data = cursor.fetchall()	
	row_headers=["annee","nbr"]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)
	

@app.route('/api/data2')
def doGetData2():
	
	data = {"years":[], "datasets":[]}
	
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT DISTINCT annee FROM resultats")	

	years_tuple = cursor.fetchall()
	years_list =  [item[0] for item in years_tuple]
	data["years"]=years_list	

	cursor.execute("SELECT DISTINCT specialite FROM resultats")	

	specialite_tuple = cursor.fetchall()
	specialite_list =  [item[0] for item in specialite_tuple]
	
	for specialite in specialite_list:
			cursor.execute("SELECT count(*) FROM resultats WHERE specialite='"+specialite+"' GROUP BY annee")	
			nbrEtud_tuple = cursor.fetchall()
			nbrEtud_list =  [item[0] for item in nbrEtud_tuple]
			data["datasets"].append({"label":specialite, "data":nbrEtud_list})	
	
	data_JSON = json.dumps(data)	
	return data_JSON 	


@app.route('/api/data3')
def doGetData3():
	data = {"years":[], "datasets":[]}
	
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT DISTINCT annee FROM resultats")	

	years_tuple = cursor.fetchall()
	years_list =  [item[0] for item in years_tuple]
	data["years"]=years_list	

	cursor.execute("SELECT DISTINCT sexe FROM resultats")	

	sexe_tuple = cursor.fetchall()
	sexe_list =  [item[0] for item in sexe_tuple]

	
	for sexe in sexe_list:
			cursor.execute("select count(*) from resultats WHERE sexe='"+sexe+"' GROUP BY annee")	
			gender_tuple = cursor.fetchall()
			gender_list =  [item[0] for item in gender_tuple]

			#change color
			#hexadecimal = "#"+''.join([random.choice('ABCDEF0123456789') for i in range(6)])

			if sexe == 'F':
				color = "#FFC0CB"
			else:
				color = "#87CEFA"
			
			data["datasets"].append({"label":sexe, "data":gender_list, "backgroundColor":color})
	
	data_JSON = json.dumps(data)	
	return data_JSON 	


@app.route('/api/data4')
def doGetData4():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT annee, count(*) FROM resultats WHERE moyenne >= 10 GROUP BY annee")	

	data = cursor.fetchall()	
	row_headers=["annee","nbr"]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)


@app.route('/api/data5')
def doGetData5():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT annee, count(*) FROM resultats WHERE moyenne < 10 GROUP BY annee")	

	data = cursor.fetchall()	
	row_headers=["annee","nbr"]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)


if __name__ == '__main__':
	app.run(debug=True, port=8080)
	

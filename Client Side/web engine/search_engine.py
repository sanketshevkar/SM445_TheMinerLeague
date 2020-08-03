from fin_exp import *
from mon_con import *
import pymongo
from flask_cors import CORS, cross_origin
from flask import Flask, request, redirect, url_for, render_template, send_from_directory
from werkzeug.utils import secure_filename
import os
from flask import request, jsonify, make_response



app = Flask(__name__, static_url_path="/static")

result={'fin_exp':"",'mon_con':''}


@app.route('/search', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        data=request.form.to_dict(flat=False)
        company_name=data['Company_Name'][0]
        result_fin_exp=fin_exp(company_name.lower())
        #result_mon_con=mon_con(company_name.lower())
        print(result_fin_exp)
        print(result_mon_con)
        result['fin_exp']=result_fin_exp
        result['mon_con']=result_mon_con
        return jsonify(result)






if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8000))
    app.run(host='0.0.0.0', port=port)

flask_cors.CORS(app, expose_headers='Authorization')

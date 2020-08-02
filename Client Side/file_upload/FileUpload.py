import os
from flask import Flask, request, redirect, url_for, render_template, send_from_directory
from werkzeug.utils import secure_filename
from PyPDF2 import PdfFileReader, PdfFileWriter
from flask_cors import CORS, cross_origin
import ast
from mutual_funds import *
from classifier import *
from equity import *
from splits import *
from bc_dates import *
import pymongo
client = pymongo.MongoClient("mongodb+srv://santin:Sanshev123@cluster0-8wria.mongodb.net/BSE?retryWrites=true&w=majority")
db = client['BSE']

UPLOAD_FOLDER = os.path.dirname(os.path.abspath(__file__)) + '/uploads/'
DOWNLOAD_FOLDER = os.path.dirname(os.path.abspath(__file__)) + '/downloads/'
ALLOWED_EXTENSIONS = {'pdf', 'txt'}

result={'Company_Name':'','Security_Code':'','Label':''}

app = Flask(__name__, static_url_path="/static")
DIR_PATH = os.path.dirname(os.path.realpath(__file__))
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['DOWNLOAD_FOLDER'] = DOWNLOAD_FOLDER
# limit upload size upto 8mb
app.config['MAX_CONTENT_LENGTH'] = 8 * 1024 * 1024


def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/upload', methods=['GET', 'POST'])
def index():
    if request.method == 'POST':
        if 'file' not in request.files:
            print('No file attached in request')
            return redirect(request.url)
        file = request.files['file']
        data=request.form.to_dict(flat=False)
        result['Company_Name']=data['Company_Name'][0]
        result['Security_Code']=data['Security_Code'][0]
        if(data['Label'][0]=='Dividend'):
            result['Label']='dividend'
        elif(data['Label'][0]=='Mutual Fund'):
            result['Label']='mutualfunds'
        elif(data['Label'][0]=='Not Sure'):
            result['Label']=''
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            process_file(os.path.join(app.config['UPLOAD_FOLDER'], filename), result['Company_Name'],result['Security_Code'])
            return "success"


def process_file(path, company_name, security_code):
    ca_miner(path, company_name, security_code)
    # with open(path, 'a') as f:
    #    f.write("\nAdded processed content")


def ca_miner(path, company_name, security_code):
    action_class=corp_action_classifier(path)
    if(action_class['class']=='mutual_fund'):
        mfs=mutual_funds(path)
        for info in mfs:
            id=db['mutual_funds'].insert_one(info).inserted_id
            print(info)
    elif(action_class['class']=='equity'):
        action_class_eq=equity_classifier(path,result['Label'])
        if(action_class_eq['class']=='dividend'):
            eq=dividend(path,company_name,security_code)
            id=db['equity'].insert_one(eq).inserted_id
            print(eq)



if __name__ == '__main__':
    port = int(os.environ.get("PORT", 8000))
    app.run(host='0.0.0.0', port=port)

flask_cors.CORS(app, expose_headers='Authorization')

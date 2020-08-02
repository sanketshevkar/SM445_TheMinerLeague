# Findex

Corporate action Miner Bot based on AI-ML (Client App)


### Prerequisites

You need to have anaconda, nodejs, npm installed as a prerequisite. Also you need to create and activate the anaconda virtual environment first.

```
conda env create --file findex_env.yml
conda activate findex_env

As a sudo/admin user run:
python -m spacy download en 
```

Also download the models from google drive:
[Model Google Drive](https://drive.google.com/drive/folders/1gblU96MwxAd7EegKPfZoDaPxf1HGmpVf?usp=sharing)

Download and save the models in file_upload folder.


### Installing

Install Node server modules

```
cd WebApp
npm install
```

Install Node modules for frontend

```
cd WebApp
cd client
npm install
```


## Running the program

Run the Node server and Frontend together 

```
cd WebApp
npm run dev
```

Run the file upload python script

```
cd file_upload
python File_Upload.py
```


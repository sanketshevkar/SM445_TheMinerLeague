import pymongo
from flask import Flask
from mutual_funds import *
from classifier import *
from equity import *
from splits import *
from bc_dates import *
from fetch_data import *
#from SIHscraper.SIHscraper.spiders.sih_spider import *
app = Flask(__name__)
client = pymongo.MongoClient("mongodb+srv://santin:Sanshev123@cluster0-8wria.mongodb.net/BSE?retryWrites=true&w=majority")
db = client['BSE']


test_div=[{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/282076be-4d18-4957-ad9b-58824665be20.pdf','com':'SHANTHI GEARS LTD.','scrip':'522034','label':'dividend'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/c1c52378-e8c4-4e51-8a1e-fcbb5b48fb8d.pdf','com':'ZENSAR TECHNOLOGIES LTD.','scrip':'504067','label':'dividend'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/7251146a-dd79-4d50-a0c0-5701d571ea35.pdf','com':'CCL PRODUCTS (INDIA) LTD.','scrip':'519600','label':'dividend'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/4FC1C153-B1B4-4719-A288-C84676C12267-143510.pdf','com':'Adani Gas Ltd','scrip':'542066','label':'dividend'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/4c71fe0b-b49b-4f3c-9040-6d7fe90e3c4c.pdf','com':'NUCLEUS SOFTWARE EXPORTS LTD.','scrip':'531209','label':'dividend'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/A45BDFD2-3BCB-4E94-93E4-5B9489E4B194-130917.pdf','com':'Indiabulls Ventures Limited','scrip':'532960','label':'dividend'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/9df08295-63e9-4f8e-a1ad-92b6799ca7c4.pdf','com':'ZYDUS WELLNESS LTD.','scrip':'531335','label':'dividend'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/d7488631-2051-444c-a8e5-3fcc39edf2f3.pdf','com':'Alicon Castalloy Limited','scrip':'531147','label':'dividend'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/dc69df95-71a4-48fa-aa00-69a0e35adade.pdf','com':'S H Kelkar and Company Ltd','scrip':'539450','label':'dividend'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/071b0368-44c1-4396-884d-01979ed2c659.pdf','com':'A.K.CAPITAL SERVICES LTD.','scrip':'530499','label':'dividend'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/C6DE346E-1FBA-4075-9F8C-D198BBE050C6-170756.pdf','com':'Kirloskar Industries Ltd','scrip':'500243','label':'dividend'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/6f473978-fb7f-408b-af19-7c878c350631.pdf','com':'EIH LTD.','scrip':'522014','label':'dividend'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/2656611d-debc-4a99-823d-99447c957bb7.pdf','com':'KESAR TERMINALS & INFRASTRUCTURE LTD.','scrip':'533289','label':'dividend'}]

test_split=[{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/5697279e-6ad9-4be8-ae64-6b9ba52232d2.pdf','com':'GUJARAT COTEX LTD.','scrip':'514386','label':'stock_splits'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/105FBB8A_E9B9_4480_9A3E_DBEFA775E9B4_190455.pdf','com':'IST LTD.','scrip':'508807','label':'stock_splits'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/016f0e5a-7b45-4b1f-b196-196e96435327.pdf','com':'PRIME INDUSTRIES LTD.','scrip':'519299','label':'stock_splits'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/adc49a79-b9f0-40f5-b201-bf2d5d5f275e.pdf','com':'SESHASAYEE PAPER & BOARDS LTD.','scrip':'502450','label':'stock_splits'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/CorpAttachment/2019/2/6a217412-d326-4418-8d82-5201177649b5.pdf','com':'WOODSVILLA LTD.','scrip':'526959','label':'stock_splits'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/CorpAttachment/2019/1/736499C7_2A44_4DC7_9948_AA5EA209687D_104315.pdf','com':'ACRYSIL LTD.','scrip':'524091','label':'stock_splits'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/CorpAttachment/2018/10/2efc5d0e-19f5-4217-883a-01ef0811666d.pdf','com':'ORIENTAL VENEER PRODUCTS LTD.','scrip':'531859','label':'stock_splits'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/CorpAttachment/2018/10/5963849b-5172-468b-b2c6-b83e4124be75.pdf','com':'SAKUMA EXPORTS LTD.','scrip':'532713','label':'stock_splits'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/CorpAttachment/2018/8/8f74f9ce-b24b-497b-99d2-8252d7511d3a.pdf','com':'KIC METALIKS LTD.','scrip':'513693','label':'stock_splits'},]


test_bc=[{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachLive/2821701a-6877-4f03-aa1b-064f7d6698d7.pdf','com':'AkzoNobel','scrip':'500710','label':'book_closures'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachLive/18c9b6cf-afbe-4a8f-b3f4-fc3db1f684f3.pdf','com':'Polyplex Corporation Ltd.','scrip':'524051','label':'stock_splits'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/ad786033-f372-433d-abaf-6261164236c3.pdf','com':'nelco unlock potential','scrip':'504112','label':'stock_splits'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/122d6585-ac8e-428c-8e1c-7a5984438412.pdf','com':'MahaanImpex Ltd.','scrip':'542753','label':'stock_splits'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/0bd03c08-2def-4551-bfeb-a9c4a8940b4e.pdf','com':'The Victoria Mills Ltd.','scrip':'503349','label':'stock_splits'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/48f220c3-f3aa-4c1d-b7ee-4b5b37be1958.pdf','com':'Sky Industries Ltd.','scrip':'526479','label':'stock_splits'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/17e3055c-2f08-440f-b00a-cb31c453d505.pdf','com':'Kokuyo Camlin Ltd.','scrip':'523207','label':'stock_splits'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/5f17c7f5-631e-4c41-ad01-198cce360d63.pdf','com':'IDBI Bank','scrip':'500116','label':'stock_splits'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/3ea1d22f-ce62-4fe6-b545-52a89bc19dad.pdf','com':'Solara Active Pharma Sciences Ltd.','scrip':'541540','label':'stock_splits'},
{'doc':'https://www.bseindia.com/xml-data/corpfiling/AttachHis/4e34695e-400e-4049-a4f6-ea0b351e2444.pdf','com':'Tata','scrip':'500400','label':'stock_splits'},]

tests=[test_div]

for test in tests:
    for doc in test_div:
        action_class=corp_action_classifier(doc['doc'])
        if(action_class['class']=='mutual_fund'):
            mfs=mutual_funds(doc)
            for info in mfs:
                id=db['mutual_funds'].insert_one(info).inserted_id
                print(id)
        elif(action_class['class']=='equity'):
            action_class_eq=equity_classifier(doc['doc'],doc['label'])
            if(action_class_eq['class']=='dividend'):
                eq=dividend(doc['doc'],doc['com'],doc['scrip'])
                com_list = list(doc['com'].split(" "))
                com=com_list[0].lower()
                result=fetch_data(com,'dividend')
                #print(result)
                eq['Dividend']=result['moc']['Dividend(%)']
                id=db['equity'].insert_one(eq).inserted_id
                #print(eq)
            elif(action_class_eq['class']=='stock_splits'):
                split=splits(doc['doc'],doc['com'],doc['scrip'])
                #id=db['split'].insert_one(split).inserted_id
                com_list = list(doc['com'].split(" "))
                com=com_list[0].lower()
                result=fetch_data(com,'stock_splits')
                print(result)
            elif(action_class_eq['class']=='book_closures'):
                book_close=bc_dates(doc['doc'],doc['com'],doc['scrip'])
                #id=db['split'].insert_one(split).inserted_id
                com_list = list(doc['com'].split(" "))
                com=com_list[0].lower()
                result=fetch_data(com,'book_closures')
                print(result)






if __name__ == '__main__':
    app.run()

    
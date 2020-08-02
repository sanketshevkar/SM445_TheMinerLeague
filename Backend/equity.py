import spacy
#import PyPDF2
import re
nlp = spacy.load('en_core_web_sm')
import datefinder
import fitz
from spacy.matcher import Matcher
import pandas as pd
import urllib.request

def dividend(doc,com,scrip):
    user_agent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7'

    
    headers={'User-Agent':user_agent} 

    request=urllib.request.Request(doc,None,headers) #The assembled request
    response = urllib.request.urlopen(request)
    data = response.read() # The data u need
    text = fitz.open(stream=data, filetype="pdf")


    matches=[]
    r_date=0
    p_date=0
    #text = fitz.open(doc)
    page1 = text.loadPage(0)
    page1text = page1.getText("text")
    text_extracted = nlp(page1text)
    result={'Record_Date':'','Payment_Date':'','Type':'','Dividend':'','Company_Name':com,'Security_Code':scrip} 

    #Record Date
     #Record Date
    matcher_div_rDate = Matcher(nlp.vocab)
    pattern1 = [{'LOWER': 'record'},{'LOWER': 'date'}]
    matcher_div_rDate.add('RecordDate', None, pattern1)

    #Payment Date    
    matcher_div_pDate = Matcher(nlp.vocab)
    pattern4 = [{'LOWER': 'will'},{'LOWER': 'be'},{'LOWER': 'paid'}]
    pattern5 = [{'LOWER': 'shall'},{'LOWER': 'be'},{'LOWER': 'paid'}]
    pattern6 = [{'LOWER': 'credited'},{'LOWER': 'to'},{'LOWER': 'their'},{'LOWER': 'accounts'}]
    pattern7 = [{'LOWER': 'payment'},{'LOWER': 'of'},{'LOWER': 'dividend'}]
    matcher_div_pDate.add('PaymentDate',None,pattern4,pattern5,pattern6,pattern7)

    #Dividend Type
    matcher_div_type = Matcher(nlp.vocab)
    pattern8 = [{'LOWER':'interim'}]
    pattern9 = [{'LOWER':'special'}]
    pattern10 = [{'LOWER':'final'}]
    matcher_div_type.add('DividendType',None,pattern8,pattern9,pattern10)

    found_matches_rDate = matcher_div_rDate(text_extracted)
    found_matches_pDate = matcher_div_pDate(text_extracted)
    found_matches_type = matcher_div_type(text_extracted)

    sents = [sent for sent in text_extracted.sents]

    
    
    #Finding Record Date
    if(len(found_matches_rDate)>=1):
        for i in range(len(found_matches_rDate)):
            for match_id, start, end in found_matches_rDate:
                string_id=nlp.vocab.strings[match_id]
                span=text_extracted[start:end]
                if(string_id=='RecordDate'):
                    for sent in text_extracted.sents:
                        if ((found_matches_rDate[i][1] < sent.end and found_matches_rDate[i][1] > sent.start)or(found_matches_rDate[i][2] < sent.end and found_matches_rDate[i][2] > sent.start)):
                            matches=list(datefinder.find_dates(sent.text))
                        if(len(matches)>=1):
                            r_date=matches[0].date().strftime('%m/%d/%Y')
                        #df['RecordDate']=r_date
        
    #print("Record Date: ",r_date)
    result['Record_Date']=r_date

    #Finding Payment Date
    if(len(found_matches_pDate)>=1):
        for i in range(len(found_matches_pDate)):
            for match_id, start, end in found_matches_pDate:
                string_id=nlp.vocab.strings[match_id]
                span=text_extracted[start:end]
                if(string_id=='PaymentDate'):
                    for sent in text_extracted.sents:
                        if ((found_matches_pDate[i][1] < sent.end and found_matches_pDate[i][1] > sent.start)or(found_matches_pDate[i][2] < sent.end and found_matches_pDate[i][2] > sent.start)):
                            matches=list(datefinder.find_dates(sent.text))
                        if(len(matches)>=1):
                            p_date=matches[0].date().strftime('%m/%d/%Y')
                        #df['RecordDate']=r_date
    
    if(p_date==r_date):
        #print("Payment Date: ",0)
        result['Payment_Date']=0
    else:
        result['Payment_Date']=p_date
        
    #Finding Dividend Type
    for match_id,start,end in found_matches_type:
        string_id = nlp.vocab.strings[match_id]
        span = text_extracted[start:end]

    div_type=span.text
    #df['Type']=div_type
    
    #print("Dividend Type: ",div_type)
    result['Type']=div_type

    return result

import spacy
#import PyPDF2
import re
nlp = spacy.load('en_core_web_sm')
import datefinder
import fitz
from spacy.matcher import Matcher
import pandas as pd
import urllib.request

def bc_dates(doc,com,scrip):


    matches=[]
    r_date=0
    p_date=0
    text = fitz.open(doc)
    page1 = text.loadPage(0)
    page1text = page1.getText("text")
    text_extracted = nlp(page1text)
    result={'Company_Name':com,'Security_Code':scrip,'BC_Start_Date':'','BC_End_Date':''} 

    #Record Date
     #Record Date
    matcher_div_bcDate = Matcher(nlp.vocab)
    pattern11 = [{'LOWER': 'remain'},{'LOWER': 'closed'}]
    matcher_div_bcDate.add('BCDate',None,pattern11)

    found_matches_bcDate = matcher_div_bcDate(text_extracted)

    sents = [sent for sent in text_extracted.sents]

    
    if(len(found_matches_bcDate)>=1):
        for i in range(len(found_matches_bcDate)):
            for match_id, start, end in found_matches_bcDate:
                string_id=nlp.vocab.strings[match_id]
                span=text_extracted[start:end]
                if(string_id=='BCDate'):
                    for sent in text_extracted.sents:
                        if ((found_matches_bcDate[i][1] < sent.end and found_matches_bcDate[i][1] > sent.start)or(found_matches_bcDate[i][2] < sent.end and found_matches_bcDate[i][2] > sent.start)):
                            matches=list(datefinder.find_dates(sent.text))
                        if(len(matches)>=1):
                            bc_start_date=matches[0].date().strftime('%m/%d/%Y')
                            bc_end_date=matches[1].date().strftime('%m/%d/%Y')
                        #df['RecordDate']=r_date
        
    result['BC_Start_Date']=bc_start_date
    result['BC_End_Date']=bc_end_date

    return result
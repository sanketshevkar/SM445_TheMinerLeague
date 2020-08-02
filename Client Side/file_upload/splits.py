from price_parser import Price
import spacy
import pandas as pd 
nlp = spacy.load('en_core_web_sm')
import fitz
import re
from spacy.matcher import Matcher
import datefinder
import urllib.request

def splits(doc,com,scrip):
    text = fitz.open(doc)
    
    matches=[]
    r_date=0
    f_val1=0
    f_val2=0
  
    
    page1 = text.loadPage(0)
    page1text = page1.getText("text")
    text_extracted = nlp(page1text)

    result={'Old_Face_Value':'','New_Face_Value':'','Company_Name':com,'Security_Code':scrip}  

    #Record Date
    matcher_div_rDate = Matcher(nlp.vocab)
    pattern1 = [{'LOWER': 'record'},{'LOWER': 'date'}]
    matcher_div_rDate.add('RecordDate', None, pattern1)
    
    matcher_div_split = Matcher(nlp.vocab)
    pattern2 = [{'LOWER': 'face'},{'LOWER': 'value'}]
    matcher_div_split.add('Split', None, pattern2)
    



    found_matches_rDate = matcher_div_rDate(text_extracted)
    found_matches_split = matcher_div_split(text_extracted)
  

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
                            #print(sent.text)
                            matches=list(datefinder.find_dates(sent.text))
                        if(len(matches)>=1):
                            r_date=matches[0].date().strftime('%m/%d/%Y')
                        #df['RecordDate']=r_date
        

    
    
    if(len(found_matches_split)>=1):
        for i in range(len(found_matches_split)):
            for match_id, start, end in found_matches_split:
                string_id=nlp.vocab.strings[match_id]
                span=text_extracted[start:end+30]
                string=str(span)
                f_val1=str(Price.fromstring(string).amount)
                reverse_list = list(string.split(" "))
                reverse_list.reverse()
                space=' '
                string=space.join(reverse_list)
                f_val2=str(Price.fromstring(string).amount)
                break;
            break;
                
    result['Old_Face_Value']=f_val1
    result['New_Face_Value']=f_val2

    return(result)
    
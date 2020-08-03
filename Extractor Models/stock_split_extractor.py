import urllib
from datefinder import DateFinder
import fitz
import spacy

from price_parser import Price
import pandas as pd 


import fitz
import re
from spacy.matcher import Matcher

import datefinder
import urllib.request

date_finder = DateFinder()

def extract_entities_stock(pdf_path):

    user_agent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7'
    headers = {'User-Agent' : user_agent} 

    request = urllib.request.Request(pdf_path, None, headers)
    response = urllib.request.urlopen(request)

    data = response.read()
    doc = fitz.open(stream = data, filetype = "pdf")


    string = ''
    total_page_count = doc.pageCount
    for page_num in range(total_page_count):
        page_ = doc.loadPage(page_num).getText()
        page_ = page_.replace('\n', ' ')
        string += page_ + ' '

    nlp = spacy.load('spacy_nlp_PDRD')
    doc = nlp(string)

    entities_found = {'RD':'', 
                     'CMPY':''}

    for ent in doc.ents:
        entities_found[ent.label_] = ent.text

    nlp = spacy.load('/company_name_extractor')
    doc = nlp(string)

    for ent in doc.ents:
        if ent.label_ == 'CMP' and entities_found['CMPY'] == '':
            entities_found['CMPY'] = ent.text


    matches=[]
    f_val1=0
    f_val2=0
    
    nlp = spacy.load('en_core_web_sm')
    text_extracted = nlp(string)

    result = {'Old_Face_Value':'','New_Face_Value':''}  

    matcher_div_split = Matcher(nlp.vocab)
    pattern2 = [{'LOWER': 'face'},{'LOWER': 'value'}]
    matcher_div_split.add('Split', None, pattern2)

    found_matches_split = matcher_div_split(text_extracted)

    sents = [sent for sent in text_extracted.sents]

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

    d1 = {'record_date': entities_found['RD'], 
           'company_name': entities_found['CMPY']} 
    d1.update(result)
    return d1

    d1 = {'record_date':'', 
               'payment_date' : '',
               'company_name': ''}
    d2 = {'Old_Face_Value':'','New_Face_Value':''}
    
    d1.update(d2)
    
    return d1
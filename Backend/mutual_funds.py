import camelot
import spacy
import pandas as pd 
nlp = spacy.load('en_core_web_sm')
import fitz
import re
from spacy.matcher import Matcher
import datefinder
import urllib.request


def mutual_funds(doc):
    user_agent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7'

    
    headers={'User-Agent':user_agent} 

    request=urllib.request.Request(doc,None,headers) #The assembled request
    response = urllib.request.urlopen(request)
    data = response.read() # The data u need
    
    tables = camelot.read_pdf(doc,pages='all')
    document = fitz.open(stream=data, filetype="pdf")

    page1 = document.loadPage(0)
    page1text = page1.getText("text")
    text_extracted = nlp(page1text)
    
    matcher_rDate = Matcher(nlp.vocab)
    matcher_mDate = Matcher(nlp.vocab)
    
    pattern1 = [{'LOWER': 'record'},{'LOWER': 'date'}]
    pattern2 = [{'LOWER': 'book'},{'LOWER': 'closure'}]
    matcher_rDate.add('RecordDate', None, pattern1, pattern2)

    pattern1 = [{'LOWER': 'maturity'},{'LOWER': 'date'}]
    pattern2 = [{'LOWER': 'maturation'},{'LOWER': 'date'}]
    matcher_mDate.add('MaturityDate', None, pattern1, pattern2)
    
    found_matches_rDate = matcher_rDate(text_extracted)

    found_matches_mDate = matcher_mDate(text_extracted)
    
    sents = [sent for sent in text_extracted.sents]
    
    if(len(tables)==1):
        #df = pd.DataFrame()
        d=tables[0].df
        new_header = d.iloc[0] #grab the first row for the header
        d = d[1:] #take the data less the header row
        d.columns = new_header #set the header row as the df header
        for col in d.columns:
            if(bool(re.search(r"ISIN", col))):
                isin=d[col]
                data = {'ISIN': isin}
        df = pd.DataFrame(data)
        
    
        for col in d.columns:
            if(bool(re.search(r"Record\D", col))):
                #record_date=d.iloc[:,4]
                df['Record_Date']=d[col]
        
        for col in d.columns:
            if(bool(re.search(r"Matur\D", col))):
                #mature_date=d.iloc[:,6]
                df['Maturity_Date']=d[col]
                
        if not 'Record_Date' in df.columns:     
            if(len(found_matches_rDate)==1):
                for match_id, start, end in found_matches_rDate:
                    string_id = nlp.vocab.strings[match_id]  # get string representation
                    span = text_extracted[start:end]  
                    if(string_id=='RecordDate'):
                        for sent in text_extracted.sents:
                            if (found_matches_rDate[0][1] < sent.end and found_matches_rDate[0][1] > sent.start) :  # this is the fifth match, that starts at doc3[673]
                                matches = list(datefinder.find_dates(sent.text))
                        if(len(matches)==1):
                            r_date=matches[0].date().strftime('%m/%d/%Y')
                            df['Record_Date']=r_date
                        
        if not 'Maturity_Date' in df.columns:
            if(len(found_matches_mDate)==1):
                for match_id, start, end in found_matches_mDate:
                    string_id = nlp.vocab.strings[match_id]  # get string representation
                    span = text_extracted[start:end]
                    if(string_id=='MaturityDate'):
                        for sent in text_extracted.sents:
                            if (found_matches_mDate[0][1] < sent.end and found_matches_mDate[0][1] > sent.start) :  # this is the fifth match, that starts at doc3[673]
                                matches = list(datefinder.find_dates(sent.text))
                        if(len(matches)==1):
                            m_date=matches[0].date().strftime('%m/%d/%Y')
                            df['Maturity_Date']=m_date
        
        
        #out = df.to_dict(orient='records')
        
        out=df.to_dict(orient='records')       
        document.close()
    
    else:
        out=({'false'})
        document.close()
    return out
    
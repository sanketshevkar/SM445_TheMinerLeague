import urllib
from datefinder import DateFinder
import fitz
import spacy

date_finder = DateFinder()

def extract_entities_div(pdf_path):
    try:
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
                         'PD':'', 
                         'CMPY':''}

        for ent in doc.ents:
            entities_found[ent.label_] = ent.text

        nlp = spacy.load('/nlp_model_bc_date')
        doc = nlp(string)

        for ent in doc.ents:
            if ent.label_ == 'CMPY':
                entities_found[ent.label_] = ent.text

        nlp = spacy.load('/company_name_extractor')
        doc = nlp(string)

        for ent in doc.ents:
            if ent.label_ == 'CMP' and entities_found['CMPY'] == '':
                entities_found['CMPY'] = ent.text

        return {'record_date': entities_found['RD'], 
               'payment_date' : entities_found['PD'],
               'company_name': entities_found['CMPY']}
    except:
        pass

    return {'record_date':'', 
               'payment_date' : '',
               'company_name': ''}
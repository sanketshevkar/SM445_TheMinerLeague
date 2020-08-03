import urllib
from datefinder import DateFinder
import fitz
import spacy

date_finder = DateFinder()

def extract_entities_bc(pdf_path):
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
        
        nlp = spacy.load('/nlp_model_bc_date')
        doc = nlp(string)
        
        entities_found = {}
        entities_found['CMPY'] = ''
        entities_found['FD'] = ''
        entities_found['TD'] = ''
        
        for ent in doc.ents:
            entities_found[ent.label_] = ent.text
        
        if 'FD' in entities_found and 'TD' not in entities_found:
            from_date = entities_found['FD']
            from_date_index = entities_found['FD'].index(from_date)
            idx = from_date_index + len(from_date) + 1
        
            while string[idx] != '.':
                idx += 1

            sentence = string[from_date_index : idx]
            date_finder = DateFinder()
            dates = list(date_finder.extract_date_strings(sentence))
            
            for date in dates:
                if date[2]['months']:
                    entities_found['TD'] = date[0]
                    break

        nlp = spacy.load('/company_name_extractor')
        doc = nlp(string)
        
        for ent in doc.ents:
            if ent.label_ == 'CMP' and entities_found['CMPY'] == '':
                entities_found['CMPY'] = ent.text
            
        return {'start_date': entities_found['FD'], 
               'end_date' : entities_found['TD'], 
               'company_name': entities_found['CMPY']}
    except:
        pass
    return {'start_date': '', 
           'end_date' : '', 
           'company_name': ''}
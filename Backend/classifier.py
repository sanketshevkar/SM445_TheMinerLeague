import pandas as pd
import numpy as np
import pickle
import urllib.request
import os
import fitz
import re

from keras.models import load_model
from keras.preprocessing import sequence

def corp_action_classifier(path : str):
    
    """Predict Corporate Action from pdf path
    args:
        path to pdf
    returns
        dict : {'path': .., 
                'class': ..}
    Classes Returned: debt | equity | mutual_fund
    
    If pdf is not scannable: returns {'path': path,
                                      'class': ''}
    -"""
    user_agent = 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7'

    
    headers={'User-Agent':user_agent} 

    request=urllib.request.Request(path,None,headers) #The assembled request
    response = urllib.request.urlopen(request)
    data = response.read() # The data u need
    doc = fitz.open(stream=data, filetype="pdf")    
    string = ''
    #doc = fitz.open(path)
    total_page_count = doc.pageCount

    for page_num in range(total_page_count):
        page_ = doc.loadPage(page_num).getText()
        page_ = page_.replace('\n', ' ')
        string += page_ + ' '
        
    if string.strip() is '':
        #print("Document text is invalid... Not scannable")
        return {'path':path,
                'class': ''}
    
    data = [string]    
    data = pd.DataFrame(data, columns = ['Article'])

    word_filter_data = pickle.load(open('word_filter_three_class.sav', 'rb'))

    vectors = np.array([[data['Article'][i].count(word) for word in word_filter_data] for i in range(data.shape[0])])

    model = pickle.load(open('three_class.sav', 'rb'))
    result = int(model.predict(vectors)[0])
    
    names = ['debt', 'equity', 'mutual_fund']
    return {'path': path, 
            'class': names[result]}


def equity_classifier(pdf_path, label) -> dict:
    """
    Predict Type of Corporate Action from pdf (link)
    args:
        link to pdf, true_label
    returns

    If pdf is not scannable: returns {'class': 'invalid', 
                                      'path': link to pdf}

    If label is an empty string or prediction matches label : returns {'class' : model_prediction,
                                                                        'path' : link to pdf}

    If prediction does not match label: model is re-trained on the sample with the true label.
    returns {'class': label, 
            'path': link to pdf}
  
    Classes Returned: 'dividend' | 'book_closures' | 'stock_splits'

    """
    
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
        
    if string.strip() == '':
        return {'class': 'invalid', 'path': pdf_path}
        

    sample = np.array([string])
    max_len = 2000

    tok = pickle.load(open('deep_learning_CNN_tok.sav', 'rb'))
    test_sequences = tok.texts_to_sequences(sample)
    test_sequences_matrix = sequence.pad_sequences(test_sequences, maxlen = max_len)
    
    model = load_model('deep_learning_CNN_colab.h5')
    result = np.argmax(model.predict(test_sequences_matrix)[0])
    
    names = ['dividend', 'book_closures', 'stock_splits']
    
    if label is '' or names[result] == label:
        return {'class': names[result], 
                'path': pdf_path}

    print("Why don't you explain this to me like I'm Five! - Scott")

    ohe = pickle.load(open('deep_learning_CNN_ohe.sav', 'rb'))
    
    int_label = np.array([names.index(label)]).reshape(-1, 1)
    int_label = ohe.transform(int_label)
    
    model.fit(test_sequences_matrix, int_label)
    model.save('deep_learning_CNN_colab.h5')
    
    return {'class': label, 
            'path': pdf_path}
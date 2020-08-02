# Collecting the training data

train_data = []

from IPython.display import clear_output
import os
import fitz

path = 'D:/training_dividend_bse/train_data_nse_bobo/'
i = 0
for file in os.listdir(path):
    i += 1
    try:
        doc = fitz.open(path + file)
        total_page_count = doc.pageCount

        if total_page_count > 2: 
            total_page_count = 2

        string = ''

        for page_num in range(total_page_count):
            page_ = doc.loadPage(page_num).getText()
            string += page_ + ' '

        page_ = string
        if string.strip() == '':
            continue
            
        print()
        print()
        print()
        print(page_)
        print(f"Page Number {i}")
        
        dict_ = {'entities' : []}

        record_date = input("Enter Record Date: ").strip()
        if record_date == '':
            pass
        else:
            start = page_.index(record_date)
            end = start + len(record_date)
            dict_['entities'].append((start, end, 'RD'))


        payment_date = input("Enter Payment Date: ").strip()
        if payment_date == '':
            pass
        else:
            start = page_.index(payment_date)
            end = start + len(payment_date)
            dict_['entities'].append((start, end, 'PD'))

        type_ = input("Enter Type: ").strip()
        if type_ == '':
            pass
        else:
            start = page_.index(type_)
            end = start + len(type_)
            dict_['entities'].append((start, end, 'type'))
            
        train_data.append((page_, dict_))
            
    except:
        pass

print(train_data)

# Training the model
import spacy
import random
from spacy.util import minibatch, compounding
from pathlib import Path

TRAIN_DATA = new_train_data

nlp=spacy.blank("en")
nlp.add_pipe(nlp.create_pipe('ner'))
nlp.begin_training()

ner = nlp.get_pipe('ner')
        
ner.add_label('PD')
ner.add_label('RD')


for iteration in range(50):
    print(iteration)
    # shuufling examples  before every iteration
    random.shuffle(TRAIN_DATA)
    losses = {}
    # batch up the examples using spaCy's minibatch
    batches = minibatch(TRAIN_DATA, size=compounding(4.0, 32.0, 1.001))
    for batch in batches:
        texts, annotations = zip(*batch)
        
        try:
            nlp.update(
                        texts,  # batch of texts
                        annotations,  # batch of annotations
                        drop=0.5,  # dropout - make it harder to memorise data
                        losses=losses,
                    )
        except:
            pass
        print("Losses", losses)
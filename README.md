# Findex

## Problem Statement

Companies have to inform stock exchanges about
the corprate actions of the securities that are listed
on the exchange.
The same data is available on other websites in an
unstructured form.
In this problem statement we have to provide a
solution so that we can gather corporate action data
from uppaid sources.
//image

## Our Solution

Corporate action Miner Bot based on AI-ML.

1. Web Crawler

   - Crawls through Financial Express webiste and Money Control website to search for the desired company name and corporate actions.

2. Segment Classifier

   - The documents are first classified into
     three major segments.
     - Equity
     - Mutual Funds
     - Debt
   - Algorithm - XGboost
   - Accuracy - 86.7%

3. Equity Classifier

   - Documents are further subclassified into:
     - Dividend
     - Book Closures
     - Stock Splits
   - Algorithm - Adaptive 1-D Convolutional Neural Network
   - Accuracy - 91.2%

4. NLP Models

   - Specific Details are extracted from the document for each class.
   - Algorithm - Trained Named Entity Recognition model in spacy for extracting relevant details.

5. Cloud Database

   - Final Corporate Action Details are uploaded to a MongoDB Cloud Instance.

6. Client Side
   - NodeJS REST-API connects to the MongoDB Cloud Instance and fetches and serves the data to the Client application.

<img src="website.jpeg" width="400" height="250"> <img src="app.jpeg" width="200" height="250">

# Built With

## **Client Side Tech-Stack**

    - NodeJs
    - ReactJs
    - React Native
    - MongoDB
    - AWS

## **Pipeline Tech-Stack**

    - Tensorflow
    - Flask
    - Spacy
    - Selenium
    - Scikit Learn

## Getting Started

Follow the instructions present in the README files inside each folder of the project.

### Prerequisites

You need to have anaconda, nodejs, npm installed as a prerequisite. Also you need to create and activate the anaconda virtual environment first.

```
conda env create --file findex_env.yml
conda activate findex_env

As a sudo/admin user run:
python -m spacy download en

```

# Performance

# Future Scope

We aim to develop, not only a small solution
but a whole mobile-first, cloud-first and
completely automated product for small
capped investors.

For enterprises, we aim to provide a flexible
product with plug and play modules to develop
a robust and automated solution.

# Acknowledgements

    https://spacy.io/usage/training
    https://www.bseindia.com/corporates/ann.html
    https://www1.hkexnews.hk/search/titlesearch.xhtml?lang=en
    https://pymupdf.readthedocs.io/en/latest/
    https://selenium-python.readthedocs.io/

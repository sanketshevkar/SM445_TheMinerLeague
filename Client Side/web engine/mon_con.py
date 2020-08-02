from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.common.exceptions import ElementClickInterceptedException
import pandas as pd
import time
from html.parser import HTMLParser
from lxml import html

def mon_con(company_name : str):
    labels=['dividend','book_closures','stock_splits']
    
    opts = Options()
    #opts.add_argument("--headless")
    opts.add_argument("user-agent=Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US; rv:1.9.0.7) Gecko/2009021910 Firefox/3.0.7")
    
    final_dict = {}
    page_count = {'dividend': 1, 'book_closures': 1, 'stock_splits': 1}
    
    # Financial exp
               
    driver = webdriver.Chrome('C:/Users/Admin/Downloads/chromedriver_win32/chromedriver.exe', options = opts)
    
    final_list = []
    return_dict={}
    
    urls = {'dividend' : ('https://www.financialexpress.com/market/stock-market/dividend-details/', 
                              'https://www.moneycontrol.com/stocks/marketinfo/dividends_declared/index.php?sel_year=2020'), 
                'book_closures' : ('https://www.financialexpress.com/market/stock-market/book-closure/', 
                                   'https://www.moneycontrol.com/stocks/marketinfo/meetings.php?opttopic=bookclosure'), 
                'stock_splits' : ('https://www.financialexpress.com/market/stock-market/split-of-face-value/', 
                                  'https://www.moneycontrol.com/stocks/marketinfo/splits/index.php')}
    
    for label in labels:

        driver.get(urls[label][1])
        soup = BeautifulSoup(driver.page_source, 'html.parser')

        tables = soup.find_all('table')

        df_params = {'dividend': (2, [0, 1]), 'stock_splits' : (2, [0]), 'book_closures': (1, [0])}

        table = tables[df_params[label][0]]
        tab_data = [[cell.text for cell in row.find_all(["th","td"])]
                                for row in table.find_all("tr")]

        df_cols = {'dividend': ['Company Name','Interim/Final/Dividend', 'Dividend(%)','Announcement Date', 'Dividend Date', 'Record Date'],
                    'book_closures': ['Company Name', 'From Date', 'To Date', 'Purpose'], 
                    'stock_splits' : ['Company Name', 'FV Changed From', 'FV Changed To', 'Record Date']}

        date_cols = {'Dividend Date', 'Record Date', 'From Date', 'To Date', 'Announcement Date'}

        df = pd.DataFrame(tab_data)
        df.drop(labels = df_params[label][1], inplace = True)
        df.columns = df_cols[label]

        result = df[df['Company Name'].str.lower().str.find(company_name) == 0]

        if(label=='dividend'):
            return_dict = {'Dividend Date': '',
            'Record Date': '', 
            'Dividend(%)': '',
            'Interim/Final/Dividend': ''}
            
        if(label=='book_closures'):
            return_dict = { 
            'From Date': '', 
            'To Date': '',
            'Purpose': ''}
            
        if(label=='stock_splits'):
            return_dict = {'Record Date': '', 
            'FV Changed From': '',
            'FV Changed To': ''}

        if len(result):
            for key in result.columns:
                if key in date_cols:
                    if result.iloc[0][key].strip() != '-':
                        return_dict[key] = pd.to_datetime(result.iloc[0][key]).strftime('%#m/%#d/%Y')
                else:
                    if key == 'Purpose':
                        return_dict[key] = ' '.join(result.iloc[0][key].split())
                    else:
                        return_dict[key] = result.iloc[0][key]
                        
        final_list.append(return_dict)
        
        
    driver.quit()

    
   
    
    
    return final_list
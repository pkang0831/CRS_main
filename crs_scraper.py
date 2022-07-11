# Scrape the government data from CRS page
import requests
import pandas as pd
from collections import deque
from bs4 import BeautifulSoup as bs
import calendar

url = "https://www.canada.ca/en/immigration-refugees-citizenship/corporate/mandate/policies-operational-instructions-agreements/ministerial-instructions/express-entry-rounds.html"

# Checking if the website response correctly

abbr_to_num = {name: num for num, name in enumerate(calendar.month_abbr) if num}


def run():

    with requests.session() as s:
        res = s.get(url)

        if res.status_code == requests.codes.ok: # if response with 200
            soup = bs(res.content,'html.parser')
            table_data = [next.text for next in soup.find_all('td')]
            id_inv = table_data[::7]
            date_str = table_data[1::7]
            prgm_name = table_data[2::7]
            inv_num = table_data[3::7]
            crs_score = table_data[4::7]
            date_form = table_data[5::7]
            prgm_name2 = table_data[6::7]
            day_date_form = [i.strip().split(' ')[1].replace(',','') for i in date_str]
            month_date_form = [str(abbr_to_num[i.strip().split(' ')[0][:3]]) for i in date_str]
            year_date_form = [i.strip().split(' ')[2] for i in date_str]
            return id_inv, date_str, prgm_name, inv_num, crs_score, date_form, prgm_name2, day_date_form, month_date_form, year_date_form
        else:
            print('error 404')
            return None

if __name__ == "__main__":
    print(run())
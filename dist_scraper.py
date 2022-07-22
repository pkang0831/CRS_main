# Scrape the government data from CRS page
import json
import requests
import pandas as pd
from collections import deque
from bs4 import BeautifulSoup as bs
import calendar
from collections import deque, defaultdict

# Checking if the website response correctly

abbr_to_num = {name: num for num, name in enumerate(calendar.month_abbr) if num}
def run():
    scraped_data = []
    for i in range(1,10):
        url = "https://www.uiis.ca/category/express-entry/page/" + str(i) + "/"
        print(url)
        with requests.session() as s:
            headers = {'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/92.0.4515.131 Safari/537.36'}
            res = s.get(url, headers = headers)
            if res.status_code == requests.codes.ok: # if response with 200
                soup = bs(res.content,'html.parser')
                table_data = [next.text for next in soup.find_all(['td','th'])]
                meta_data_for_table = [next.text for next in soup.find_all('p')]
                crs_score = [next.text for next in soup.find_all(lambda tag: tag.name in ['h2','p'] and "CRS score" in tag.text)]
                invitations = [next.text for next in soup.find_all(lambda tag: tag.name in ['h2','h4','h5','p'] and "Number of invitation" in tag.text)]
                # Filtering date and times
                first_filter_meta_data = [i for i in meta_data_for_table if 'Date and time of round:' in i]
                first_filter_meta_data = [i.replace('\xa0',' ') for i in first_filter_meta_data]
                first_filter_meta_data = [i.replace('Date and time of round: ','') for i in first_filter_meta_data]
                first_filter_meta_data = [i[:-16] if 'UTC' in i else i for i in first_filter_meta_data]
                first_filter_meta_data = [i.strip() for i in first_filter_meta_data]
                # Filtering number of invitations
                invitations = [i.replace('<h2>','').replace('<strong>','').replace('<p>','') for i in invitations]
                invitations = [i.replace('</h2>','').replace('</strong>','').replace('</p>','') for i in invitations]
                invitations = [i.replace('<sup id="fn*-0-rf"></sup>','').replace('\xa0','') for i in invitations]
                invitations = [i.replace('<sup id="fn1-0-rf"></sup>','') for i in invitations]
                invitations = [i.replace('Number of invitations issued:','').replace(',','').strip() for i in invitations]
                invitations = [i.replace('Footnote*','') for i in invitations]
                
                # Filtering crs scores
                crs_score = [i.replace('CRS score of lowest-ranked candidate invited:\xa0','').strip() for i in crs_score]
                crs_score = [i.replace('CRS score of lowest-ranked candidate invited:','').strip() for i in crs_score]
                table_data = [i for i in table_data if 'crs score range' not in i.lower()]
                table_data = [i for i in table_data if 'number of candidates' not in i.lower()]
                table_data = [i for i in table_data if 'Classes' not in i]
                table_data = [i for i in table_data if 'Number of Invitations' not in i]
                # table data preprocessing (edge cases) - page 6
                if i == 6:
                    edge_cases = [
                        '(Federal Skilled Worker)',
                        '(Canadian Experience)',
                        '(Federal Skilled Trades)',
                        '(Provincial nominee)',
                        'Class referred to inparagraph 2(a) of the Express Entry Instructions (Federal Skilled Worker)',
                        'Class referred to inparagraph 2(b) of the Express Entry Instructions (Canadian Experience)',
                        'Class referred to inparagraph 2(c) of the Express Entry Instructions (Federal Skilled Trades)',
                        'Class referred to inparagraph 2(d) of the Express Entry Instructions (Provincial nominee)'
                    ]
                    idxes = []
                    for j in edge_cases:
                        idx = table_data.index(j)
                        idxes.append(idx)
                        idxes.append(idx + 1)
                    new_table_data = []
                    for x in range(len(table_data)):
                        if x not in idxes:
                            new_table_data.append(table_data[x])
                    table_data = new_table_data

                if i == 9:
                    idx_not_to_include = [i for i in range(34,84)]
                    new_table_data = []
                    for x in range(len(table_data)):
                        if x not in idx_not_to_include:
                            new_table_data.append(table_data[x])
                    table_data = new_table_data
                    first_filter_meta_data = first_filter_meta_data[:-1]
                    invitations = invitations[:-1]

                score_dict = defaultdict(list)
                table_queue = deque(table_data)
                while table_queue:
                    sc_range = table_queue.popleft()
                    score_dict[sc_range].append(table_queue.popleft())

                scraped_data.append([first_filter_meta_data, invitations, crs_score, score_dict])
            else:
                print('error 404')

    _dates = []
    _invitations = []
    _crs_scores = []
    _score_dist = []

    for i in range(0,9):
        _dates.append(scraped_data[i][0])
        _invitations.append(scraped_data[i][1])
        _crs_scores.append(scraped_data[i][2])
        _score_dist.append(scraped_data[i][3])

    # _dates = [i for i in _dates for i in i]
    # _invitations = [i for i in _invitations for i in i]
    # _crs_scores = [i for i in _crs_scores for i in i]

    return _dates, _invitations, _crs_scores, _score_dist
    
if __name__ == "__main__":
    _dates, _invitations, _crs_scores, _score_dist = run()

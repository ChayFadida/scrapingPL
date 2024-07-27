from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time
import re
import csv
from collections import Counter, defaultdict

class PremierLeagueHomeScraper:
    BASE_URL = "https://www.premierleague.com/"
    PAGES = {
        1: "fixtures",
        2 :"results",
        3 :"tables",
        4 :"transfers",
        5 :"stats",
        6 :"news",
        7 :"video",
        8 :"tickets",
        9 :"clubs",
        10 :"players",
        11 :"awards?at=1&aw=-1&se=578",
        12 :"about",
        13 :"about/what-we-do",
        14 :"about/governance",
        15 :"about/statement-of-principles",
        16 :"about/inclusion",
        17 :"about/publications",
        18 :"about/partners",
        19 :"footballandcommunity/wider-football/overview",
        20 :"wider-football/stadium-fund",
        21 :"wider-football/womens-and-girls-football",
        22 :"wider-football/academies-and-player-welfare",
        23 :"history/dashboard",
        24 :"history/season-reviews",
        25 :"history/kits?se=719&cl=-1",
        26 :"history/origins"
    }
    
    STOP_WORDS = set([
        'a', 'also', 'and', 'are', 'from', 'he', 'how', 'lot', 'me', 'my',
        'of', 'often', 'some', 'the', 'they', 'to', 'very'
    ])
    
    def __init__(self, headless=True):
        self.headless = headless
        self.driver = self._initialize_driver()
        self.toSearchPages = []

    def _initialize_driver(self):
        options = Options()
        options.add_argument('--no-sandbox')
        if self.headless:
            options.add_argument('--headless')
        return webdriver.Chrome(options=options)

    def handle_cookies(self):
        try:
            manage_cookies_button = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.ID, "onetrust-pc-btn-handler"))
            )
            manage_cookies_button.click()

            accept_recommended_button = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.ID, "accept-recommended-btn-handler"))
            )
            accept_recommended_button.click()

            time.sleep(10)

            # Check for advertisement and close if present
            self.close_advertisement()
        except Exception as e:
            pass

    def close_advertisement(self):
        try:
            close_ad_button = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.ID, "advertClose"))
            )
            close_ad_button.click()
            time.sleep(2)  # Give it a moment to close
        except Exception as e:
            pass

    def get_word_counts(self, text):
        words = re.findall(r'\b[a-zA-Z]+\b', text.lower())  # Exclude numbers
        filtered_words = [word for word in words if word not in self.STOP_WORDS]
        return Counter(filtered_words)

    def search_words_in_pages(self, word_list):
        word_list = set(word.lower() for word in word_list)
        page_word_counts = {}
        inverted_index = defaultdict(set)
        
        for page_id, page in self.PAGES.items():
            url = self.BASE_URL + page
            self.driver.get(url)
            self.handle_cookies()
            
            # Extract page content
            page_content = self.driver.page_source
            soup = BeautifulSoup(page_content, 'html.parser')
            text_content = soup.get_text().lower()

            # Search for words in the content
            for word in word_list:
                if word in text_content:
                    self.toSearchPages.append(page_id)
                    break

        return inverted_index

    def scrape(self, word_list):
        page_word_counts = {}
        inverted_index = defaultdict(set)
        
        for page_id in self.toSearchPages:
            url = self.BASE_URL + self.PAGES[page_id]
            self.driver.get(url)
            self.handle_cookies()
            
            # Extract page content
            page_content = self.driver.page_source
            soup = BeautifulSoup(page_content, 'html.parser')
            text_content = soup.get_text()

            # Get word counts
            page_word_count = self.get_word_counts(text_content)
            page_word_counts[page_id] = page_word_count
            
            # Update inverted index
            for word in page_word_count:
                inverted_index[word].add(page_id)
                
                if word in word_list:
                    # Find elements with the word and print their class IDs
                    elements_with_word = soup.find_all(text=re.compile(r'\b' + word + r'\b', re.IGNORECASE))
                    for element in elements_with_word:
                        if element.parent.has_attr('class'):
                            print(f"Word: {word}, Class ID: {element.parent['class']}, Page: {self.PAGES[page_id]}")

        self.driver.quit()
        return page_word_counts, inverted_index

    def export_to_csv(self, page_word_counts, inverted_index, word_list,filename='inverted_index.csv'):
        with open(filename, 'w', newline='') as csvfile:
            fieldnames = ['Word'] + [f"Page {page_id}" for page_id in self.PAGES.keys()] + ['Total Count']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

            writer.writeheader()
            for word, page_ids in inverted_index.items():
                row = {'Word': word}
                total_count = 0
                for page_id in self.PAGES.keys():
                    count = page_word_counts.get(page_id, {}).get(word, 0)
                    row[f"Page {page_id}"] = count
                    total_count += count
                row['Total Count'] = total_count
                writer.writerow(row)

        with open(f"queryResults_{filename}" , 'w', newline='') as csvfile:
            relevant_pages = []
            for word, page_ids in inverted_index.items():
                if word in word_list:
                    total_count = 0
                    for page_id in self.PAGES.keys():
                        count = page_word_counts.get(page_id, {}).get(word, 0)
                        if count>0:
                            relevant_pages.append(page_id)
            relevant_pages = list(set(relevant_pages))

            fieldnames = ['Word'] + [f"Page {page_id}" for page_id in relevant_pages] + ['Page URL']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

            writer.writeheader()
            for word, page_ids in inverted_index.items():
                if word in word_list:
                    for page_id in relevant_pages:
                        row = {'Word': word}
                        count = page_word_counts.get(page_id, {}).get(word, 0)
                        row[f"Page {page_id}"] = count
                        total_count += count
                        row['Page URL'] = self.BASE_URL + self.PAGES[page_id]
                        writer.writerow(row)


if __name__ == "__main__":
    word_list = ["emirates", "anfield", "goodison", "Stamford"]
    scraper = PremierLeagueHomeScraper()
    
    # Search word list and find the inverted index for these words
    inverted_index = scraper.search_words_in_pages(word_list)
    
    # Perform full scrape and find the inverted index for all words
    page_word_counts, full_inverted_index = scraper.scrape(word_list)
    scraper.export_to_csv(page_word_counts, full_inverted_index, word_list)
    print("Full inverted index exported to inverted_index.csv")

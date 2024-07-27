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
    PAGES = [
        "fixtures",
        "results",
        "tables",
        "transfers",
        "stats",
        "news",
        "video",
        "tickets",
        "clubs",
        "players",
        "awards?at=1&aw=-1&se=578",
        "about",
        "about/what-we-do",
        "about/governance",
        "about/statement-of-principles",
        "about/inclusion",
        "about/publications",
        "about/partners",
        "footballandcommunity/wider-football/overview",
        "wider-football/stadium-fund",
        "wider-football/womens-and-girls-football",
        "wider-football/academies-and-player-welfare",
        "history/dashboard",
        "history/season-reviews"
        "history/kits?se=719&cl=-1",
        "history/origins"
    ]
    
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
        
        for page_id, page in enumerate(self.PAGES):
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
                    self.toSearchPages.append(page)
                    break

        return inverted_index

    def scrape(self):
        page_word_counts = {}
        inverted_index = defaultdict(set)
        
        for page_id, page in enumerate(self.toSearchPages):
            url = self.BASE_URL + page
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
                
                # Find elements with the word and print their class IDs
                elements_with_word = soup.find_all(text=re.compile(r'\b' + word + r'\b', re.IGNORECASE))
                for element in elements_with_word:
                    if element.parent.has_attr('class'):
                        print(f"Word: {word}, Class ID: {element.parent['class']}, Page: {page}")

        self.driver.quit()
        return page_word_counts, inverted_index

    def export_to_csv(self, inverted_index, filename='inverted_index.csv'):
        with open(filename, 'w', newline='') as csvfile:
            fieldnames = ['Word', 'Page IDs']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

            writer.writeheader()
            for word, page_ids in inverted_index.items():
                writer.writerow({'Word': word, 'Page IDs': ','.join(map(str, page_ids))})

if __name__ == "__main__":
    word_list = ["emirates", "anfield", "goodison", "Stamford"]
    scraper = PremierLeagueHomeScraper()
    
    # Search word list and find the inverted index for these words
    inverted_index = scraper.search_words_in_pages(word_list)
    
    # Perform full scrape and find the inverted index for all words
    page_word_counts, full_inverted_index = scraper.scrape()
    scraper.export_to_csv(full_inverted_index)
    print("Full inverted index exported to inverted_index.csv")

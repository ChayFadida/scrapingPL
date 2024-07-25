from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup
import time
import re
import csv
from collections import Counter

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
        "awards?at=1&aw=-1&se=578"
    ]
    
    def __init__(self, headless=True):
        self.headless = headless
        self.driver = self._initialize_driver()

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
        words = re.findall(r'\b\w+\b', text.lower())
        return Counter(words)

    def scrape(self, top_word):
        page_word_counts = {}
        overall_word_count = Counter()
        
        for page in self.PAGES:
            url = self.BASE_URL + page
            self.driver.get(url)
            self.handle_cookies()
            
            # Extract page content
            page_content = self.driver.page_source
            soup = BeautifulSoup(page_content, 'html.parser')
            text_content = soup.get_text()

            # Get word counts
            page_word_count = self.get_word_counts(text_content)
            page_word_counts[page] = page_word_count
            overall_word_count.update(page_word_count)

        self.driver.quit()

        # Get top top_word words per page
        top_words_per_page = {
            page: count.most_common(top_word)
            for page, count in page_word_counts.items()
        }

        # Get top top_word words overall
        top_words_overall = overall_word_count.most_common(top_word)

        return top_words_per_page, top_words_overall

    def export_to_csv(self, top_words_per_page, top_words_overall, filename_page='top_words_per_page.csv', filename_overall='top_words_overall.csv'):
        # Export top words per page
        with open(filename_page, 'w', newline='') as csvfile:
            fieldnames = ['Page', 'Word', 'Count']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

            writer.writeheader()
            for page, words in top_words_per_page.items():
                for word, count in words:
                    writer.writerow({'Page': page, 'Word': word, 'Count': count})

        # Export top words overall
        with open(filename_overall, 'w', newline='') as csvfile:
            fieldnames = ['Word', 'Count']
            writer = csv.DictWriter(csvfile, fieldnames=fieldnames)

            writer.writeheader()
            for word, count in top_words_overall:
                writer.writerow({'Word': word, 'Count': count})

if __name__ == "__main__":
    scraper = PremierLeagueHomeScraper()
    top_words_per_page, top_words_overall = scraper.scrape(20)
    scraper.export_to_csv(top_words_per_page, top_words_overall)
    print("Top words exported to CSV files.")

from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from bs4 import BeautifulSoup, ResultSet
import time
from player import Player
from enum import Enum
from prettytable import PrettyTable
import csv

class StatType(Enum):
    APPEARANCES = "Appearances"
    TACKLE = "Total Tackele Made"
    GOAL = "Total Goal Made",
    ASSISTS = "Total Assists Made",
    MIN = "Total Minutes Played",
    SHOTS = "Total Shots Made",
    PASSES = "Total Passes Made",
    YELLOW_CARDS = "Total Yellow Cards Made",
    RED_CARDS = "Total Red Cards Made",
    CLEAN_SHEETS = "Total Clean Sheets Made"
    


class PremierLeagueStatScraper:
    BASE_URL = "https://www.premierleague.com/stats/top/players/"
    STAT_URL_MAPPING = {
        StatType.APPEARANCES: "appearances?se=-1",
        StatType.TACKLE: "total_tackle?se=-1",
        StatType.GOAL: "goals?se=-1",
        StatType.ASSISTS: "goal_assist?se=-1",
        StatType.MIN: "mins_played?se=-1",
        StatType.SHOTS: "total_scoring_att?se=-1",
        StatType.PASSES: "total_pass?se=-1",
        StatType.YELLOW_CARDS: "yellow_card?se=-1",
        StatType.RED_CARDS: "red_card?se=-1",
        StatType.CLEAN_SHEETS: "clean_sheet?se=-1"
        
    }
    STAT_CLASS_MAPPING = 'stats-table__main-stat'

    def __init__(self, stat_type, num_pages=3, headless=True):
        self.stat_type = stat_type
        self.num_pages = num_pages
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
        except:
            pass

    def get_stat_url(self):
        return self.BASE_URL + self.STAT_URL_MAPPING[self.stat_type]

    def get_stat_class(self):
        return self.STAT_CLASS_MAPPING

    def scrape_table(self, html_content):
        players = []
        soup = BeautifulSoup(html_content, "html.parser")

        table_body = soup.find('tbody', class_='stats-table__container')
        if table_body:
            rows = table_body.find_all('tr', class_='table__row')

            for row in rows:
                rank = row.find('td', class_='stats-table__rank').text.strip()

                player_name_elem = row.find('a', class_='playerName')
                player_name = player_name_elem.text.strip()
                player_link = player_name_elem['href']
                if player_link.startswith('//'):
                    player_link = player_link[2:]

                nationality_elem = row.find('span', class_='playerCountry')
                nationality = nationality_elem.text.strip() if nationality_elem else 'Unknown'

                stat = row.find('td', class_=self.get_stat_class()).text.strip()

                club_elem = row.find('a', class_='stats-table__cell-icon-align')
                club = club_elem.text.strip() if club_elem else 'Retired/Unknown'

                player = Player(rank, player_name, nationality, club, stat, player_link)
                players.append(player)

        return players

    def click_next_button(self):
        next_button = WebDriverWait(self.driver, 15).until(
            EC.element_to_be_clickable((By.CSS_SELECTOR, ".paginationNextContainer"))
        )
        next_button.click()
        time.sleep(7)

    def close_advertisement(self):
        try:
            close_ad_button = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.ID, "advertClose"))
            )
            close_ad_button.click()
            time.sleep(2)  # Give it a moment to close
        except Exception as e:
            print(f"No advertisement to close: {e}")

    def scrape(self):
        url = self.get_stat_url()
        players_data = []

        try:
            self.driver.get(url)
            self.handle_cookies()

            for _ in range(self.num_pages):
                html_content = self.driver.page_source
                players = self.scrape_table(html_content)
                players_data.extend(players)
                self.click_next_button()
        finally:
            self.driver.quit()

        return players_data
    
    def print_players_table(self):
        players = self.scrape()
        table = PrettyTable()
        table.field_names = ["Rank", "Player Name", "Nationality", "Club", "Stat", "Player Link"]
        for player in players:
            table.add_row([player.rank, player.name, player.nationality, player.club, player.stat, player.player_link])
        print(f"\n\nTop {self.num_pages * 10} {self.stat_type.value} in the Premier League")
        print(table)

    def export_to_csv_players(self, filename="players_stats.csv"):
        players = self.scrape()
        with open(filename, mode='w', newline='', encoding='utf-8') as file:
            writer = csv.writer(file)
            writer.writerow(["Rank", "Player Name", "Nationality", "Club", "Stat", "Player Link"])
            for player in players:
                writer.writerow([player.rank, player.name, player.nationality, player.club, player.stat, player.player_link])
        print(f"Data has been exported to {filename}")
        

class PremierLeagueTransferScraper:
    BASE_URL = "https://www.premierleague.com/transfers"
    STAT_CLASS_MAPPING = 'stats-table__main-stat'
    
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
        except:
            pass
        
    def scrape_table(self, html_content):
        transfers = []
        soup = BeautifulSoup(html_content, 'html.parser')

        # Find all sections with the class 'transfers-club-header'
        all_headers = soup.find_all('div', class_='articleWidget full-width articleWidget--transfer-club-header')

        # Locate the section that contains "Aston Villa"
        target_section = None
        for header in all_headers:
            team_name = header.find('h3', class_='transfers-club-header__team-name')
            if team_name and "Ipswich Town" in team_name.get_text(strip=True):
                target_section = header
                break

        if target_section:
            # Find the table following this specific section
            table_body = target_section.next_sibling.find('tbody')
            
            # if isinstance(table, list) or isinstance(table, ResultSet):
            #     if table:
            #         table = table[0]  # Take the first table if multiple are found
            # Extract data from the table
            # if table:
            #     table_body = table.find('tbody')
            rows = table_body.find_all('tr')

            for row in rows:
                cells = row.find_all('td')
                player_name = cells[0].get_text(strip=True)
                transfer_type_elem_link = cells[1].find('a')
                transfer_type_elem_non_link = cells[1].find('span')
                transfer_type = transfer_type_elem_link.get_text(strip=True) if transfer_type_elem_link else None
                transfer_type = transfer_type_elem_non_link.get_text(strip=True) if None else transfer_type
                transfer_type_link = transfer_type_elem_link['href'] if transfer_type_elem_link else None
                if transfer_type_link and transfer_type_link.startswith('//'):
                    transfer_type_link = transfer_type_link[2:]

                club = cells[2].get_text(strip=True)

                    # Create a dictionary for each row
                transfer = {
                    'player_name': player_name,
                    'transfer_type': transfer_type,
                    'transfer_type_link': transfer_type_link,
                    'club': club
                }
                transfers.append(transfer)
            transfer = list(set(transfer))
            return transfers
        else:
            print("Ipswich Town section not found.")
            

    def close_advertisement(self):
        try:
            close_ad_button = WebDriverWait(self.driver, 10).until(
                EC.element_to_be_clickable((By.ID, "advertClose"))
            )
            close_ad_button.click()
            time.sleep(2)  # Give it a moment to close
        except Exception as e:
            print(f"No advertisement to close: {e}")

    def scrape(self):
        transfer_data = []

        try:
            self.driver.get(self.BASE_URL)
            self.handle_cookies()
            html_content = self.driver.page_source
            transfers = self.scrape_table(html_content)
            transfer_data.extend(transfers)
        finally:
            self.driver.quit()

        return transfer_data
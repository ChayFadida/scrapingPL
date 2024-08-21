import requests
from bs4 import BeautifulSoup
import networkx as nx
from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.options import Options
from webdriver_manager.chrome import ChromeDriverManager
import time
import matplotlib.pyplot as plt

# List of URLs
urls = [
    "https://www.premierleague.com/news/3998819",
    "https://www.premierleague.com/news/3960710",
    "https://www.premierleague.com/news/3921955",
    "https://www.premierleague.com/news/3894601",
    "https://www.premierleague.com/news/3893153",
    "https://www.premierleague.com/news/3853193",
    "https://www.premierleague.com/news/3808489",
    "https://www.premierleague.com/news/3808575",
    "https://www.premierleague.com/news/3776619",
    "https://www.premierleague.com/news/3331263",
    "https://www.premierleague.com/news/3331249"
]

def trim_url(url):
    # Split the URL by '/' and get the last part
    return url.rstrip('/').split('/')[-1]

trimmed_urls = [trim_url(url) for url in urls]

# Setup Selenium
chrome_options = Options()
chrome_options.add_argument("--headless")  # Run in headless mode
chrome_options.add_argument("--disable-gpu")
chrome_options.add_argument("--no-sandbox")
chrome_options.add_argument("--disable-dev-shm-usage")

service = Service(ChromeDriverManager().install())
driver = webdriver.Chrome(service=service, options=chrome_options)

def fetch_links(url):
    try:
        driver.get(url)
        last_height = driver.execute_script("return document.body.scrollHeight")
        curr_height = 0
        jumps = 200
        i=1
        while curr_height < last_height:
            driver.execute_script(f"window.scrollTo(0, {jumps*i});")
            curr_height +=jumps
            i+=1
            time.sleep(0.5)
          # Wait for new content to load
        # Scroll down to load dynamic content

        soup = BeautifulSoup(driver.page_source, 'html.parser')
        links = set()
        for a_tag in soup.find_all('a', href=True):
            href = a_tag['href']
            if href.startswith('/'):
                href = f"https://www.itfc.co.uk{href}"
            href = href.rstrip('/')  # Remove trailing slash for consistency
            if href in urls:
                links.add(href)
        return links
    except Exception as e:
        print(f"Failed to fetch {url}: {e}")
        return set()

# Create a directed graph
G = nx.DiGraph()
for original, trimmed in zip(urls, trimmed_urls):
    G.add_node(trimmed)

# Add edges between pages by scraping links
for original, trimmed in zip(urls, trimmed_urls):
    print(f"Scraping {original}")
    links = fetch_links(original)
    trimmed_links = [trim_url(link) for link in links]
    for link, trimmed_link in zip(links, trimmed_links):
        print(f"Adding edge from {original} to {link}")
        G.add_edge(trimmed, trimmed_link)

# Calculate PageRank
pagerank = nx.pagerank(G, alpha=0.85)

# Visualize the graph
plt.figure(figsize=(12, 12))  # Set figure size
pos = nx.spring_layout(G, k=0.5, iterations=50)  # Use a layout for positioning nodes
nx.draw(G, pos, with_labels=True, node_size=2000, node_color='skyblue', font_size=10, font_weight='bold', arrows=True)
plt.title("Page Link Graph")
plt.show()

# Print the PageRank of each page
for page, rank in pagerank.items():
    print(f"{page} : {rank:.3f}")

# Quit the driver
driver.quit()

import re
from collections import defaultdict, Counter
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
import nltk
import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin

# Download stopwords and punkt if not already downloaded
nltk.download('stopwords')
nltk.download('punkt')

# Initialize stop words
stop_words = set(stopwords.words('english'))
stop_words.update(map(str, range(10)))  # Add digits '0'-'9' to stop words
stop_words.update(map(chr, range(ord('a'), ord('z') + 1)))  # Add letters 'a'-'z' to stop words


# Function to process text and remove stop words
def process_text(text):
    words = word_tokenize(text.lower())  # Tokenize and convert to lowercase
    words = [word for word in words if word.isalnum() and word not in stop_words]  # Filter out stop words and non-alphanumeric tokens
    return words

# Function to fetch page content
def fetch_page_content(url):
    response = requests.get(url)
    if response.status_code == 200:
        return response.text
    return ""

# Function to extract meaningful text from HTML content
def extract_text_from_html(html_content):
    soup = BeautifulSoup(html_content, 'html.parser')
    # Extract text from paragraphs, headings, etc.
    text = ' '.join(soup.stripped_strings)
    return text

# Example input URLs and their corresponding paths
urls_pages = {
    "https://www.premierleague.com/": {
        1: "players/4617/player/overview",
        2: "players/15202/player/overview",
        3: "players/8897/player/overview",
        4: "players/4316/player/overview",
        5: "players/3929/player/overview",
        6: "players/2651/player/overview",
        7: "players/335/player/overview",
        8: "players/1218/player/overview",
        9: "players/239/player/overview",
        10: "players/1420/player/overview",
        11: "players/2516/player/overview",
        12: "players/1710/player/overview",
        13: "players/1230/player/overview",
        14: "players/12707/player/overview",
        15: "players/1342/player/overview",
    },
    "https://www.itfc.co.uk/news": {
        16: "2024/july/01/town-sign-ben-johnson",
        17: "2024/july/12/greaves-becomes-third-signing",
        18: "2024/july/13/liam-delap-joins-town",
        19: "2024/july/17/town-sign-keeper-muric",
        20: "2024/august/01/conor-townsend-joins-ipswich-town",
    }
}

# Build inverted index
inverted_index = defaultdict(set)
word_counts = Counter()

for base_url, paths in urls_pages.items():
    for doc_id, path in paths.items():
        # Join base URL with path
        full_url = urljoin(base_url, path)
        # Fetch page content
        html_content = fetch_page_content(full_url)
        # Extract and process text from HTML content
        page_text = extract_text_from_html(html_content)
        words = process_text(page_text)
        word_counts.update(words)
        for word in words:
            inverted_index[word].add(doc_id)

# Get the 15 most common words
most_common_words = [word for word, _ in word_counts.most_common(15)]

# Create an inverted index for the most common words
final_inverted_index = {word: inverted_index[word] for word in most_common_words}

# Print the results
for word, doc_ids in final_inverted_index.items():
    print(f"{word}: {sorted(doc_ids)}")

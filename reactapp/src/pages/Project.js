import React, { useState } from 'react';
import './Homework.css'; // Import CSS for Homework component

const questions = [
  {
    id: 'Q1',
    text: '1. What is the site\'s main business? What information is available to website users? Answer in one paragraph. Attach the link to the site.',
    content: (
      <div>
        <p>The Premier League website is mainly used as the official online platform of the top football league in England, offering comprehensive coverage of the league's activities. The main business of the site revolves around the latest news, live updates from matches, and in-depth analysis of teams and players, as well as detailed statistics. In addition, the site offers interactive features such as fantasy football, a shop for official products, and access to game tickets, which creates a fascinating experience for football fans.</p>
        <p><a href="https://www.premierleague.com/" target="_blank" rel="noopener noreferrer">https://www.premierleague.com/</a></p>
      </div>
    )
  },
  {
    id: 'Q2',
    text: '2. Write down three interesting queries that you would like to receive an answer to on the site, and that the site does not currently answer. For each such query, specify the details of the information required to answer the query.',
    content: (
      <div>
        <h3>Query Execution Times and Analysis:</h3>
        <ul>
          <li><strong>Top 5 Passes of All Time</strong>: Retrieves the top 5 passers of all time (all seasons) for players of English origin who still play for teams in London. <br /></li>
          <li><strong>Top 10 Goalkeepers</strong>: Identifies the top 10 goalkeepers whose origins are outside of Europe and have the most clean sheets (games without conceding goals). <br /></li>
          <li><strong>Ipswich Town Player Transfer News</strong>: Fetches all the transfer news related to players from Ipswich Town whose transfer status is either "Transfer In" or "Loan Out." <br /></li>
        </ul>
        <h4>Required information query 1:</h4>
        <p>List of London clubs.</p>
        <p>List of players and the following information about them: country of origin, team, number of passes of all times.</p>
        <h4>Required information query 2:</h4>
        <p>List of players, role in the team, country of origin, amount of clean sheets</p>
        <h4>Required information query 3:</h4>
        <p>The list of players in the Ipswich Town transfer window, the transfer status of each player, link to the appropriate article.</p>
      </div>
    )
  },
  {
    id: 'Q3',
    text: '3. Build a crawler that returns the results to the queries you defined. It is recommended (but not mandatory) to build the crawler in Python. Introduce the crawler code.',
    content: (
      <div>
        <p>You can find the crawler and queries code on GitHub:</p>
        <a href="https://github.com/ChayFadida/scrapingPL/blob/master/scraper/plScraper.py" target="_blank" rel="noopener noreferrer">https://github.com/ChayFadida/scrapingPL/blob/master/scraper/plScraper.py</a>
        <p></p>
        <a href="https://github.com/ChayFadida/scrapingPL/blob/master/scraper/queries.py" target="_blank" rel="noopener noreferrer">https://github.com/ChayFadida/scrapingPL/blob/master/scraper/queries.py</a>
      </div>
    )
  },
  {
    id: 'Q4',
    text: '4. Write down different interesting technologies that you used in the project.',
    content: (
      <div className="technology-list">
        <div className="technology">
          <h3>Selenium</h3>
          <img src="/images/selenium.png" alt="Selenium" />
          <p>Selenium: an automation tool that is used to program crawlers in order to access and control Internet browsers automatically for the purpose of collecting information from websites.</p>
        </div>
        <div className="technology">
          <h3>BeautifulSoup</h3>
          <img src="/images/beautifulsoup.png" alt="BeautifulSoup" />
          <p>BeautifulSoup: a library in Python that is used to analyze and process HTML and XML code and facilitates the extraction of data from web pages easily and efficiently.</p>
        </div>
        <div className="technology">
          <h3>PrettyTable</h3>
          <img src="/images/prettytable.png" alt="PrettyTable" />
          <p>PrettyTable: is a Python library used to create and display tables in an easy-to-read textual format, be it in the console, in a file, or in any other text format. It allows designing and organizing data in tables in an easy and convenient way.</p>
        </div>
        <div className="technology">
          <h3>NetworkX</h3>
          <img src="/images/networks.png" alt="NetworkX" />
          <p>NetworkX: a Python library used for the creation, manipulation, and study of complex networks of nodes and edges. It provides tools to work with both unweighted and weighted graphs and is often used in network analysis and graph theory.</p>
        </div>
        <div className="technology">
          <h3>Matplotlib</h3>
          <img src="/images/matplotlib.png" alt="Matplotlib" />
          <p>Matplotlib: a comprehensive library for creating static, animated, and interactive visualizations in Python. It is widely used for generating plots, histograms, power spectra, bar charts, error charts, and scatterplots, making data visualization accessible and easy to integrate.</p>
        </div>
      </div>
    )
  },
  {
    id: 'Q5',
    text: '5. How long did your queries run? What does it depend on? Do you think this time can be improved?',
    content: (
      <div>
        <p>The running times of the various queries (with the same order as question 2):</p>
        <ul>
          <li>Query 1: 95.85 seconds</li>
          <li>Query 2: 94.5 seconds</li>
          <li>Query 3: 20.06 seconds</li>
        </ul>
        <p>We will note that the first two queries search the Stats page, a page with filters, they have to browse the table created from the selected filters in order to filter results for the query we defined. in oppose to the third query which searches on another page and in a much smaller table. It is possible to shorten these times by using other technologies.</p>
      </div>
    )
  },
  {
    id: 'Q6',
    text: '6. Build an inverted index for the 15 common words returned (enough to refer to the first 20 pages returned).',
    content: (
      <div>
        <p>i.	External -> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]</p>
        <p>ii.	Link -> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]</p>
        <p>iii.	League-> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]</p>
        <p>iv.	Pl-> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]</p>
        <p>v.	Competitions-> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]</p>
        <p>vi.	Premier-> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]</p>
        <p>vii.	Cup-> [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 13, 14, 15]</p>
        <p>viii.	United-> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]</p>
        <p>ix.	Official-> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]</p>
        <p>x.	Stats-> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]</p>
        <p>xi.	Fpl-> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]</p>
        <p>xii.	Manchester-> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]</p>
        <p>xiii.	Fa-> [1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 13, 14, 15]</p>
        <p>xiv.	Fantasy-> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]</p>
        <p>xv.	Club-> [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]</p>

      </div>
    )
  },
  {
    id: 'Q7',
    text: '7. Choose one of the queries, and calculate tfIdf of the concepts in the query.',
    content: (
      <div>
        <p>Calculate the term frequency-inverse document frequency (tfIdf) for the first query, taking into account the frequency of each term in the query and across all documents.</p>
        <p>QUERY 1: Retrieves the top 5 passers of all time (all seasons) for players of English origin who still play for teams in London.</p>
        <p>Query terms are: Top, Pass, London, England, Player, Club, Seasons</p>
        <table border="1">
  <thead>
    <tr>
      <th>Word</th>
      <th>P1</th>
      <th>P2</th>
      <th>P3</th>
      <th>P4</th>
      <th>P5</th>
      <th>Dfi</th>
      <th>D/dfi</th>
      <th>IDF</th>
      <th>W-d1</th>
      <th>W-d2</th>
      <th>W-d3</th>
      <th>W-d4</th>
      <th>W-d5</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Top</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>1</td>
      <td>5</td>
      <td>26375/5</td>
      <td>log⁡(26375/5)=3.722</td>
      <td>3.722</td>
      <td>3.722</td>
      <td>3.722</td>
      <td>3.722</td>
      <td>3.722</td>
    </tr>
    <tr>
      <td>Pass</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>-</td>
      <td>-</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <td>London</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>-</td>
      <td>-</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
      <td>0</td>
    </tr>
    <tr>
      <td>England</td>
      <td>6</td>
      <td>6</td>
      <td>6</td>
      <td>6</td>
      <td>6</td>
      <td>30</td>
      <td>26375/30</td>
      <td>log⁡(26375/30)=2.944</td>
      <td>17.664</td>
      <td>17.664</td>
      <td>17.664</td>
      <td>17.664</td>
      <td>17.664</td>
    </tr>
    <tr>
      <td>Player</td>
      <td>3</td>
      <td>7</td>
      <td>4</td>
      <td>7</td>
      <td>3</td>
      <td>24</td>
      <td>26375/24</td>
      <td>log⁡(26375/24)=3.04</td>
      <td>9.12</td>
      <td>21.8</td>
      <td>12.16</td>
      <td>21.8</td>
      <td>9.12</td>
    </tr>
    <tr>
      <td>Club</td>
      <td>8</td>
      <td>14</td>
      <td>10</td>
      <td>11</td>
      <td>9</td>
      <td>52</td>
      <td>26375/52</td>
      <td>log⁡(26375/52)=2.705</td>
      <td>21.64</td>
      <td>37.87</td>
      <td>27.05</td>
      <td>29.755</td>
      <td>24.345</td>
    </tr>
    <tr>
      <td>Seasons</td>
      <td>2</td>
      <td>4</td>
      <td>4</td>
      <td>3</td>
      <td>2</td>
      <td>15</td>
      <td>26375/15</td>
      <td>log⁡(26375/15)=3.245</td>
      <td>6.490</td>
      <td>9.735</td>
      <td>12.98</td>
      <td>12.98</td>
      <td>6.490</td>
    </tr>
  </tbody>
</table>

      </div>
    )
  },
  {
    id: 'Q8',
    text: '8. Are there hubs in the returned pages? Authorities?',
    content: (
      <div>
        <p>The first two queries return links to the players' pages, each page is independent and does not contain a link to another player's page, therefore in these two queries we will not have Hubs & Authorities.
        In the last query we return a news page about the transfer of a player, on this page there are links to other news so Hubs & Authorities may exist.</p>
      </div>
    )
  },
  {
    id: 'Q9',
    text: '9. Choose 10 pages that the crawler returned, and which have links between them. Calculate PageRank for each page.',
    content: (
      <div>
        <p>Here are some of the news articles from Ipswich Town's official website that were used for PageRank analysis PageRank for each page alpha=0.85: </p>
        <ul>
        <li><a href="https://www.itfc.co.uk/news/2024/june/30/omari-is-back" target="_blank" rel="noopener noreferrer">Omari Is Back (June 30, 2024)</a>: 0.0823</li>
        <li><a href="https://www.itfc.co.uk/news/2024/july/01/town-sign-ben-johnson" target="_blank" rel="noopener noreferrer">Town Sign Ben Johnson (July 1, 2024)</a>: 0.0823</li>
        <li><a href="https://www.itfc.co.uk/news/2024/july/12/greaves-becomes-third-signing" target="_blank" rel="noopener noreferrer">Greaves Becomes Third Signing (July 12, 2024)</a>: 0.0823</li>
        <li><a href="https://www.itfc.co.uk/news/2024/july/13/liam-delap-joins-town" target="_blank" rel="noopener noreferrer">Liam Delap Joins Town (July 13, 2024)</a>: 0.0823</li>
        <li><a href="https://www.itfc.co.uk/news/2024/july/17/town-sign-keeper-muric" target="_blank" rel="noopener noreferrer">Town Sign Keeper Muric (July 17, 2024)</a>: 0.0823</li>
        <li><a href="https://www.itfc.co.uk/news/2024/august/01/conor-townsend-joins-ipswich-town" target="_blank" rel="noopener noreferrer">Conor Townsend Joins Ipswich Town (August 1, 2024)</a>: 0.0823</li>
        <li><a href="https://www.itfc.co.uk/news/2024/august/05/loan-move-for-elkan" target="_blank" rel="noopener noreferrer">Loan Move for Elkan (August 5, 2024)</a>: 0.504</li>
      </ul>
      <p>
        <a href="https://github.com/ChayFadida/scrapingPL/blob/master/scraper/PageRankQ3.py" target="_blank" rel="noopener noreferrer">
            Link to the script
        </a>
        </p>
        <p>These pages have been selected to analyze their PageRank and link structure. The calculations were performed using the <code>networkx</code> library. We created a directed graph with a node for each link and a script to search hrefs from the same list of nodes within each page. As soon as we found a link to another page, we added a corresponding edge.</p>
        <p>For PageRank calculations, we used an alpha value of 0.85. The graph illustrating the link structure and PageRank results is shown below:</p>
        <img src="/images/graph.png" alt="PageRank Graph" style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }} />
      </div>
    )
  },
  {
    id: 'Q10',
    text: '10. Show the results of the PageRank calculation to two users. Get relevance feedback from them and suggest an adapted query based on the new information.',
    content: (
      <div>
        <p>According to the PageRank results, we see that only one page is ranked significantly higher than the rest. To assess the relevance of the results, we asked two users to mark the results according to their relevance:</p>
        <table border="1">
          <thead>
            <tr>
            <th>Users</th>
              <th>P1</th>
              <th>P2</th>
              <th>P3</th>
              <th>P4</th>
              <th>P5</th>
              <th>P6</th>
              <th>P7</th>
              <th>Precision</th>
              <th>Recall</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>User A</td>
              <td>R</td>
              <td>R</td>
              <td>R</td>
              <td>R</td>
              <td>R</td>
              <td>R</td>
              <td></td>
              <td>6/7=0.857</td>
              <td>6/6=1</td>
            </tr>
            <tr>
              <td>User B</td>
              <td>R</td>
              <td>R</td>
              <td>R</td>
              <td>R</td>
              <td>R</td>
              <td>R</td>
              <td>R</td>
              <td>7/7=1</td>
              <td>7/7=1</td>
            </tr>
          </tbody>
        </table>
        <p>Based on the feedback and the Precision/Recall calculation, the queries can be improved by adjusting additional ranking criteria such as adding parameters of personal relevance to the users. For example, a parameter for "Is the player in the senior squad or the youth team" could be added. This change will allow for a better matching of search results to user preferences and can improve the quality of searches.</p>
      </div>
    )
  }
  
];


const Project = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  return (
    <div className="homework-container">
      <h1>Project</h1>
      <div className="questions-list">
        {questions.map(question => (
          <div
            key={question.id}
            className="question-item"
            onClick={() => setSelectedQuestion(question.id)}
          >
            {question.text}
          </div>
        ))}
      </div>
      <div className="question-content">
        {selectedQuestion && (
          <>
            {/* Display the selected question text */}
            <h2>{questions.find(q => q.id === selectedQuestion)?.id}</h2>
            {/* Display the "Answer" label */}
            <p><strong>Answer:</strong></p>
            {/* Display the content of the selected question */}
            <div>
              {questions.find(q => q.id === selectedQuestion)?.content}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Project;

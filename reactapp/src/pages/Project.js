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
        <p>Calculate the term frequency-inverse document frequency (tfIdf) for the chosen query, taking into account the frequency of each term in the query and across all documents.</p>
        <p>QUERY III: Retrieves all "Player of the Month" awards given in April to players managed by a London-based manager.</p>
        <p>Query terms are: Player, Award, Month, Manager, April, London</p>
        <table border="1">
          <thead>
            <tr>
              <th>Word</th>
              <th>P1</th>
              <th>P2</th>
              <th>P3</th>
              <th>P4</th>
              <th>P5</th>
              <th>P6</th>
              <th>P7</th>
              <th>P8</th>
              <th>P9</th>
              <th>P10</th>
              <th>Dfi</th>
              <th>D/dfi</th>
              <th>IDF</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Player</td>
              <td>8</td>
              <td>9</td>
              <td>13</td>
              <td>13</td>
              <td>7</td>
              <td>7</td>
              <td>11</td>
              <td>6</td>
              <td>6</td>
              <td>11</td>
              <td>91</td>
              <td>26375/91</td>
              <td>log(26375/91) = 2.46</td>
            </tr>
            <tr>
              <td>Award</td>
              <td>6</td>
              <td>12</td>
              <td>8</td>
              <td>8</td>
              <td>12</td>
              <td>11</td>
              <td>6</td>
              <td>4</td>
              <td>2</td>
              <td>5</td>
              <td>74</td>
              <td>26375/74</td>
              <td>log(26375/74) = 2.55</td>
            </tr>
            <tr>
              <td>Month</td>
              <td>12</td>
              <td>17</td>
              <td>12</td>
              <td>12</td>
              <td>15</td>
              <td>15</td>
              <td>14</td>
              <td>15</td>
              <td>4</td>
              <td>9</td>
              <td>124</td>
              <td>26375/124</td>
              <td>log(26375/124) = 2.32</td>
            </tr>
            <tr>
              <td>London</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td>April</td>
              <td>5</td>
              <td>1</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>2</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>4</td>
              <td>12</td>
              <td>26375/12</td>
              <td>log(26375/12) = 3.34</td>
            </tr>
            <tr>
              <td>Manager</td>
              <td>10</td>
              <td>8</td>
              <td>2</td>
              <td>2</td>
              <td>10</td>
              <td>6</td>
              <td>3</td>
              <td>8</td>
              <td>0</td>
              <td>1</td>
              <td>50</td>
              <td>26375/50</td>
              <td>log(26375/50) = 2.72</td>
            </tr>
          </tbody>
        </table>
        <table border="1">
          <thead>
            <tr>
              <th>Word</th>
              <th>W-1</th>
              <th>W-2</th>
              <th>W-3</th>
              <th>W-4</th>
              <th>W-5</th>
              <th>W-6</th>
              <th>W-7</th>
              <th>W-8</th>
              <th>W-9</th>
              <th>W-10</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Player</td>
              <td>19.68</td>
              <td>22.14</td>
              <td>31.98</td>
              <td>31.98</td>
              <td>17.22</td>
              <td>17.22</td>
              <td>27.06</td>
              <td>14.76</td>
              <td>14.76</td>
              <td>27.06</td>
            </tr>
            <tr>
              <td>Award</td>
              <td>15.3</td>
              <td>30.6</td>
              <td>20.4</td>
              <td>20.4</td>
              <td>30.6</td>
              <td>28.05</td>
              <td>15.3</td>
              <td>10.2</td>
              <td>5.1</td>
              <td>12.75</td>
            </tr>
            <tr>
              <td>Month</td>
              <td>27.84</td>
              <td>39.44</td>
              <td>27.84</td>
              <td>27.84</td>
              <td>34.8</td>
              <td>34.8</td>
              <td>32.48</td>
              <td>34.8</td>
              <td>9.28</td>
              <td>20.88</td>
            </tr>
            <tr>
              <td>London</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
              <td>-</td>
            </tr>
            <tr>
              <td>April</td>
              <td>16.7</td>
              <td>3.34</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>6.68</td>
              <td>0</td>
              <td>0</td>
              <td>0</td>
              <td>13.36</td>
            </tr>
            <tr>
              <td>Manager</td>
              <td>27.2</td>
              <td>21.76</td>
              <td>5.44</td>
              <td>5.44</td>
              <td>27.2</td>
              <td>16.32</td>
              <td>8.16</td>
              <td>21.76</td>
              <td>0</td>
              <td>2.72</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
  ,
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
        <li><a href="https://www.premierleague.com/news/3998819" target="_blank" rel="noopener noreferrer">Page Link</a>: 0.034</li>
        <li><a href="https://www.premierleague.com/news/3960710" target="_blank" rel="noopener noreferrer">Page Link</a>: 0.041</li>
        <li><a href="https://www.premierleague.com/news/3921955" target="_blank" rel="noopener noreferrer">Page Link</a>: 0.034</li>
        <li><a href="https://www.premierleague.com/news/3894601" target="_blank" rel="noopener noreferrer">Page Link</a>: 0.048</li>
        <li><a href="https://www.premierleague.com/news/3893163" target="_blank" rel="noopener noreferrer">Page Link</a>: 0.053</li>
        <li><a href="https://www.premierleague.com/news/3853183" target="_blank" rel="noopener noreferrer">Page Link</a>: 0.075</li>
        <li><a href="https://www.premierleague.com/news/3808489" target="_blank" rel="noopener noreferrer">Page Link</a>: 0.089</li>
        <li><a href="https://www.premierleague.com/news/3808575" target="_blank" rel="noopener noreferrer">Page Link</a>: 0.139</li>
        <li><a href="https://www.premierleague.com/news/3776619" target="_blank" rel="noopener noreferrer">Page Link</a>: 0.034</li>
        <li><a href="https://www.premierleague.com/news/3331263" target="_blank" rel="noopener noreferrer">Page Link</a>: 0.226</li>
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
        <ul>
          <li><strong>Total relevant:</strong> 12. There are a total of 12 relevant results, which include players/coaches who, while receiving the title player/coach of the month, played/coached in teams outside of London.</li>
          <li><strong>How to select the relevant pages:</strong>
            <ol>
              <li>User A is an adult man, an ardent fan of football and of the English league in particular. This user was able to distinguish and identify that some of the query results are players who in the relevant season did not play/train in a team in London but currently appear as belonging to a team from London because they moved there this summer.</li>
              <li>User B is a boy, also an ardent fan of the English league but does not yet master the geography of England and therefore did not recognize that players/coaches from Manchester United do not belong to teams from London.</li>
            </ol>
          </li>
        </ul>
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
            <th>P8</th>
            <th>P9</th>
            <th>P10</th>
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
            <td></td>
            <td>R</td>
            <td>R</td>
            <td>R</td>
            <td>R</td>
            <td></td>
            <td>8/10=0.8</td>
            <td>8/12=0.66</td>
          </tr>
          <tr>
            <td>User B</td>
            <td>R</td>
            <td>R</td>
            <td></td>
            <td>R</td>
            <td>R</td>
            <td></td>
            <td></td>
            <td>R</td>
            <td>R</td>
            <td>R</td>
            <td>7/10=0.7</td>
            <td>7/12=0.58</td>
          </tr>
        </tbody>
      </table>
        <p>Based on the feedback and the Precision/Recall calculation, the queries can be improved by adjusting additional ranking criteria such as adding parameters of personal relevance to users. For example, return all messages about player/coach of the month between April 2023 and April 2024 for people who were not connected to any clubs in London at the time of the announcement. Ensure that club affiliation is verified based on the location of the club during the month of the award and excludes anyone who has moved to or from clubs in London after the date of the announcement.</p>
        <p>In addition, you can add a list of the clubs in London in order to completely avoid confusion.</p>
      </div>
    )
  },
  {
    id: 'Q12',
    text: '12. On 12.8 you will present the page from section 11, which includes sections 1-10. You will receive feedback from your friends. Answer in the table:',
    content: (
      <div>
        <table border="1">
          <thead>
            <tr>
              <th>What change was suggested?</th>
              <th>Do you think there is room for improvement? If yes, explain how it can be improved. If not, justify!</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>"They used Selenium, and it caused us a lot of problems, so maybe I would improve that."</td>
              <td>In our project, the use of Selenium was without any problems.</td>
            </tr>
            <tr>
              <td>"Give a little more freedom in the queries so that they don’t return very specific results and let the user filter."</td>
              <td>We agree with the comment, but in fact, the implementation of the queries behind the scenes is based on flexibility in the code, so if we want to run the same query with a different filter, we can refer to the same class but with the new filter type that we want to search for.</td>
            </tr>
            <tr>
              <td>"Response time speed."</td>
              <td>We don't think this needs improvement because, relative to the amount of information on the site, our queries return results quite quickly.</td>
            </tr>
            <tr>
              <td>"Improve Selenium search times, other technologies can be used to improve runtime."</td>
              <td>Since the site contains ads, notifications, and all tables in queries i and ii are on the same URL, to reach the relevant information, we have to perform "clicks" within the site. To simulate a user clicking on the site, we have to use the Selenium package. Additionally, to avoid being flagged as bots and getting kicked off the site, we must wait a certain time between clicks, hence the longer run times, which cannot be improved.</td>
            </tr>
            <tr>
              <td>"I didn’t find anything to improve, maybe correct the recall calculation."</td>
              <td>Following the improvement of the third query, the recall calculation was also corrected 😊</td>
            </tr>
          </tbody>
        </table>
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

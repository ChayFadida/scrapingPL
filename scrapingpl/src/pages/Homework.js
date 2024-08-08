import React, { useState } from 'react';
import './Homework.css'; // Import CSS for Homework component

const questions = [
  {
    id: 'q1',
    text: 'A. Write down different interesting technologies that you used in the project.',
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
      </div>
    )
  },
  {
    id: 'q2',
    text: 'B. How long did your queries run? What does it depend on? Do you think this time can be improved?',
    content: (
      <div>
        <h3>Query Execution Times and Analysis:</h3>
        <ul>
          <li><strong>Top 10 Streaks of All Time</strong>: Retrieves the top 10 streaks of all time (all seasons) for players of English descent still playing for teams from London. <br /> <strong>Query Runtime</strong>: 95.85 seconds</li>
          <li><strong>Top 20 Goalkeepers</strong>: Identifies the top 20 goalkeepers who come from outside of Europe and have the most clean sheets (games without conceding goals). <br /> <strong>Query Runtime</strong>: 94.50 seconds</li>
          <li><strong>Aston Villa Player News</strong>: Fetches all the news related to players from Aston Villa whose transfer status is either "transfer in" or "loan out." <br /> <strong>Query Runtime</strong>: 20.06 seconds</li>
        </ul>
        <h4>Analysis:</h4>
        <p>The first two queries are performed on the statistics page, which includes multiple filters and a large table. The queries need to browse and filter results from this extensive dataset, contributing to their longer runtime.</p>
        <p>The third query, on the other hand, operates on a smaller page with a more focused dataset, resulting in a significantly shorter runtime.</p>
        <h4>Optimization:</h4>
        <p>The times for the first two queries can potentially be reduced by employing more efficient technologies or optimizing the database queries. Techniques such as indexing, query optimization, or improved data retrieval methods may help shorten the execution time.</p>
      </div>
    )
  },
  {
    id: 'q3',
    text: 'C. Are there hubs in the returned pages? Authorities?',
    content: (
      <div>
        <p>The first two queries return links to individual player pages. Each page is independent and does not contain links to other player pages. As a result, Hubs and Authorities are not present within these two queries.</p>
        <p>In contrast, the third query returns a news page regarding player transfers. This page includes links to other news articles, which means Hubs and Authorities may be present on this page.</p>
      </div>
    )
  },
  {
    id: 'q4',
    text: 'D. Choose 10 pages that the crawler returned, and which have links between them. Calculate PageRank for each page.',
    content: (
      <div>
        <p>Here are some of the news articles from Aston Villa’s official website that were used for PageRank analysis PageRank for each page alpha=0.85: </p>
        <ul>
        <li><a href="https://www.itfc.co.uk/news/2024/june/30/omari-is-back" target="_blank" rel="noopener noreferrer">Omari Is Back (June 30, 2024)</a>: 0.0823</li>
        <li><a href="https://www.itfc.co.uk/news/2024/july/01/town-sign-ben-johnson" target="_blank" rel="noopener noreferrer">Town Sign Ben Johnson (July 1, 2024)</a>: 0.0823</li>
        <li><a href="https://www.itfc.co.uk/news/2024/july/12/greaves-becomes-third-signing" target="_blank" rel="noopener noreferrer">Greaves Becomes Third Signing (July 12, 2024)</a>: 0.0823</li>
        <li><a href="https://www.itfc.co.uk/news/2024/july/13/liam-delap-joins-town" target="_blank" rel="noopener noreferrer">Liam Delap Joins Town (July 13, 2024)</a>: 0.0823</li>
        <li><a href="https://www.itfc.co.uk/news/2024/july/17/town-sign-keeper-muric" target="_blank" rel="noopener noreferrer">Town Sign Keeper Muric (July 17, 2024)</a>: 0.0823</li>
        <li><a href="https://www.itfc.co.uk/news/2024/august/01/conor-townsend-joins-ipswich-town" target="_blank" rel="noopener noreferrer">Conor Townsend Joins Ipswich Town (August 1, 2024)</a>: 0.0823</li>
        <li><a href="https://www.itfc.co.uk/news/2024/august/05/loan-move-for-elkan" target="_blank" rel="noopener noreferrer">Loan Move for Elkan (August 5, 2024)</a>: 0.504</li>
      </ul>
        <p>These pages have been selected to analyze their PageRank and link structure. The calculations were performed using the <code>networkx</code> library. We created a directed graph with a node for each link and a script to search hrefs from the same list of nodes within each page. As soon as we found a link to another page, we added a corresponding edge.</p>
        <p>For PageRank calculations, we used an alpha value of 0.85. The graph illustrating the link structure and PageRank results is shown below:</p>
        <img src="/images/graph.png" alt="PageRank Graph" style={{ maxWidth: '100%', height: 'auto', marginTop: '20px' }} />
      </div>
    )
  },
  {
    id: 'q5',
    text: 'E. Based on the PageRank results, assess the relevance of the pages using user feedback and suggest improvements for the queries.',
    content: (
      <div>
        <p>According to the PageRank results, we observe that only one page is ranked significantly higher than the others. To evaluate the relevance of the search results, we gathered feedback from two users:</p>
        <ul>
          <li><strong>User A:</strong> Marked all pages as relevant except for the page with the URL <a href="https://www.itfc.co.uk/news/2024/august/05/loan-move-for-elkan" target="_blank" rel="noopener noreferrer">Loan Move for Elkan (August 5, 2024)</a>.</li>
          <li><strong>User B:</strong> Marked all pages as relevant.</li>
        </ul>
        <p>Based on this feedback, we can enhance the queries by incorporating additional ranking criteria. For example, we could include parameters that reflect personal relevance to users, such as whether a player is part of the senior squad or the youth team. This adjustment will better align search results with user preferences and improve the quality of the search experience.</p>
      </div>
    )
  }
];

const Homework = () => {
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  return (
    <div className="homework-container">
      <h1>Homework</h1>
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
          <div>
            {questions.find(q => q.id === selectedQuestion)?.content}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homework;

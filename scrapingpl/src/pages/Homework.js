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
        <p>Here are some of the news articles from Aston Villa’s official website:</p>
        <ul>
          <li><a href="https://www.avfc.co.uk/news/2024/june/23/villa-announce/" target="_blank" rel="noopener noreferrer">Villa Announce New Signings (June 23, 2024)</a></li>
          <li><a href="https://www.avfc.co.uk/news/2024/june/28/Villa-announce-Ian-Maatsen-signing/" target="_blank" rel="noopener noreferrer">Villa Announce Ian Maatsen Signing (June 28, 2024)</a></li>
          <li><a href="https://www.avfc.co.uk/news/2024/july/01/Aston-Villa-confirm-double-signing/" target="_blank" rel="noopener noreferrer">Aston Villa Confirm Double Signing (July 1, 2024)</a></li>
          <li><a href="https://www.avfc.co.uk/news/2024/july/01/Aston-Villa-confirm-double-signing/" target="_blank" rel="noopener noreferrer">Aston Villa Confirm Double Signing (July 1, 2024)</a></li>
          <li><a href="https://www.avfc.co.uk/news/2024/july/01/Villa-confirm-Barkley-signing/" target="_blank" rel="noopener noreferrer">Villa Confirm Barkley Signing (July 1, 2024)</a></li>
          <li><a href="https://www.avfc.co.uk/news/2024/july/10/philippe-coutinho-announcement/" target="_blank" rel="noopener noreferrer">Philippe Coutinho Announcement (July 10, 2024)</a></li>
          <li><a href="https://www.avfc.co.uk/news/2024/july/11/O-Reilly-joins-Shrewsbury-Town-on-loan/" target="_blank" rel="noopener noreferrer">O'Reilly Joins Shrewsbury Town on Loan (July 11, 2024)</a></li>
          <li><a href="https://www.avfc.co.uk/news/2024/july/19/villa-confirm-philogene-signing/" target="_blank" rel="noopener noreferrer">Villa Confirm Philogene Signing (July 19, 2024)</a></li>
          <li><a href="https://www.avfc.co.uk/news/2024/july/22/villa-announce-onana-signing/" target="_blank" rel="noopener noreferrer">Villa Announce Onana Signing (July 22, 2024)</a></li>
          <li><a href="https://www.avfc.co.uk/news/2024/august/02/barry-joins-stockport-county-on-loan/" target="_blank" rel="noopener noreferrer">Barry Joins Stockport County on Loan (August 2, 2024)</a></li>
          <li><a href="https://www.avfc.co.uk/news/2024/august/06/Dobbin-joins-West-Bromwich-Albion-on-loan/" target="_blank" rel="noopener noreferrer">Dobbin Joins West Bromwich Albion on Loan (August 6, 2024)</a></li>
          <li><a href="https://www.avfc.co.uk/news/2024/august/06/feeney-links-up-with-shrewsbury-town/" target="_blank" rel="noopener noreferrer">Feeney Links Up with Shrewsbury Town (August 6, 2024)</a></li>
        </ul>
        <p>These pages have been selected to analyze their PageRank and link structure.</p>
      </div>
    )
    
  },
  {
    id: 'q5',
    text: 'E. Show two different users the rating from the previous section. Perform relevance feedback.',
    content: (
      <div>
        <p>Provide feedback mechanisms for users to mark relevance and adjust queries accordingly.</p>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Rating</th>
              <th>Feedback</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>User 1</td>
              <td>5</td>
              <td>Very relevant</td>
            </tr>
            <tr>
              <td>User 2</td>
              <td>4</td>
              <td>Relevant but could be improved</td>
            </tr>
          </tbody>
        </table>
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

import React, {Component} from 'react';
import './App.css';
import axios from "axios";

class App extends Component {
  state = {
    apikey: "8437b363971849dea95b19598d4c8fcd",
    articles: [],
    userSearch: ''
  }

  userChange = (e) =>{
    this.setState({userSearch: e.target.value})
    // console.log(this.state.userSearch);
  }

  getArticles = () => {
    axios.get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=8437b363971849dea95b19598d4c8fcd&q=" + this.state.userSearch).then(response => {
      // console.log(response.data.response.docs);
      this.setState({articles: response.data.response.docs})
    })
  }

  onSubmit = (event) => {
   event.preventDefault()
   this.setState({
     userSearch: '',
     articles: [...this.state.articles, this.state.userSearch]
   });
 }

  render() {
    return (<div className="center">
      <h1 className="">NEW YORK TIMES<br /> ARTICLE SEARCH</h1>

      <form onSubmit={this.onSubmit}>
      <input type="text"
            onChange={this.userChange}
            value={this.state.userSearch}
            placeholder=" search for..."
      />
      <br />
      <button onClick={this.getArticles} className="btn btn-dark m-3">Click for Articles</button>

      {
        this.state.articles.map((article, idx) => {
          return (<div key={idx}>
            <div className="col-md-6 offset-3 bg-light mb-2">
              <h4 className="bg-light text-dark pt-3 pb-0 mb-2">{article.snippet}</h4>
                <a href={article.web_url} className="text-secondary p-2" target="_blank">
                  Click this Link to view the full article.
                </a>
            </div>
          </div>);
        })
      }
    </form>
    </div>);
  }
}

export default App;

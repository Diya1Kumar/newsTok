import React, { Component } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'

export class News extends Component {
  static defaultProps = {
    country : "in",
    pageSize: 5,
    category: 'general',
  }

  static propTypes = {
    country : PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
  articles = [];

  constructor() {
    super();
    this.state = {
      articles: this.articles,
      loading: false,
      page: 1,
       totalResults: 0,
    }
  }
  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=7cdc458a09d84b4aba7e5406d03d5014&page=1&pageSize=${this.props.pageSize}`  //after render method
    this.setState({loading:true});
    let data = await fetch(url);
    let parseData = await data.json()
    console.log(parseData);
    this.setState({ articles: parseData.articles ,
       totalResults : parseData.totalResults,
      loading:false})
  }

    handleNextClick= async() =>{
      console.log("next");
      if (!(this.state.page +1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
     
        let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=7cdc458a09d84b4aba7e5406d03d5014&page=${this.state.page + 1}&pagesize=${this.props.pageSize}`;  //after render method
        this.setState({loading:true});
        let data = await fetch(url);
        let parseData = await data.json()
        console.log(parseData);
        this.setState({
          page : this.state.page + 1,
          articles: parseData.articles || [],
          loading:false
  
        })
      }
    
    }
    handlePrevClick = async() =>{
      console.log("Prev");
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=7cdc458a09d84b4aba7e5406d03d5014&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;  //after render method
      this.setState({loading:true});
      let data = await fetch(url);
      let parseData = await data.json()
      console.log(parseData);
      this.setState({
        page : this.state.page - 1,
        articles: parseData.articles || [],
        loading:false

      })
    }
      
    
  render() {

    return (
      <div className='container my-3'>
        <h1 className = "text-center" style= {{margin: '20px 0px'}}>NewsTok - Top headlines</h1>
       { this.state.loading && <Spinner/>}
        <div className='row'>

          {!this.state.loading && this.state.articles.map((element) => {
            return <div className='col-md-4' key={element.url}>
              <NewsItem
                title={(element && element.title) ? element.title.slice(0, 45) : ''}
                description={(element && element.description) ? element.description.slice(0, 88) : ''}
                imageUrl={(element && element.urlToImage) ? element.urlToImage : ''}
                newsUrl={(element && element.url) ? element.url : ''}
                author={(element && element.author) ? element.author : 'unknown'}
                date={(element && element.publishedAt) ? element.publishedAt : ''}

              />
            </div>
          }
      )
  }
</div>

  <div className='container'>
  <button disabled={this.state.page<=1}type="button" class="btn btn-primary mx-3" onClick={this.handlePrevClick}>Previous</button>
  <button disabled={this.state.page + 1 >= Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" class="btn btn-primary margin-right" onClick={this.handleNextClick}>Next</button>
  </div>
        

      </div>
    )
  }
}

export default News

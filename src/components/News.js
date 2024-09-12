import React, {useEffect, useState } from 'react'
import NewsItem from './NewsItem'
import Spinner from './Spinner';
import PropTypes from 'prop-types'
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props)=>{
  const [articles, setArticles]  = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalResults, setTotalResults] = useState(0)

  const capitalizeFirstLetter = (string)=>{
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const updateNews = async ()=>{
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    try{   
      setLoading(true);
      const res = await fetch(url);
      props.setProgress(30);
      const data = await res.json();
      props.setProgress(70);
      setArticles(data.articles);
      setTotalResults(data.totalResults);
      setLoading(false);
      props.setProgress(100);
    }
    catch(e) {
        console.log("something is not working");
    }
  }

  useEffect(()=>{
    document.title = `${capitalizeFirstLetter(props.category)} - NewsRadar`;
    updateNews();
    // eslint-disable-next-line
  }, [])

  // const handlePrevClick = async ()=>{
  //   setPage(page - 1);
  //   updateNews();
  // }

  // const handleNextClick = async ()=>{
  //   setPage(page + 1);
  //   updateNews();
  // }

  // d5c77e6b8ecb4d93ad24d9c273183836

  const fetchMoreData = async () => {
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
    setPage(page + 1);
    try{   
      const res = await fetch(url);
      const data = await res.json();
      setArticles(articles.concat(data.articles));
      setTotalResults(data.totalResults)
    }
    catch(e) {
        console.log("something is not working");
    }
  };

    return (
        <>
          <h1 className="text-center" style={{margin: '35px 0px', marginTop: '90px'}}>NewsRadar - Top {capitalizeFirstLetter(props.category)} Headlines</h1>
          {loading && <Spinner/>}

          <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResults}
            loader={<Spinner/>}
            >
            <div className="container">
              <div className="row">
              {articles && articles.map((element)=>{
                return <div className="col-md-4" key={element.url}>
                  {/* element.title.slice(0,45) */}
                  <NewsItem title = {element.title?element.title:""} description = {element.description?element.description:""} imageUrl = {element.urlToImage} newsUrl = {element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                </div>
              })}
              </div>
            </div>
          </InfiniteScroll>
          {/* <div className="container d-flex justify-content-between">
            <button disabled={this.state.page <= 1} type="button" className="btn btn-dark" onClick={this.handlePrevClick}>&larr; Previous</button>
            <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/props.pageSize)} type="button" className="btn btn-dark" onClick={this.handleNextClick}>Next &rarr;</button>
          </div> */}
        </>        
    )
}

News.defaultProps = {
  country: 'us',
  pageSize: 8,
  category: "general"
}

News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News
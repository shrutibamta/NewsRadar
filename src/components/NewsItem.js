import React from 'react'

const NewsItem = (props)=>{
    let {title, description, imageUrl, newsUrl, author, date, source} = props;
    return (
      <div className='my-3'>
        <div className="card">
          <div style={{
            display: "flex",
            justifyContent: "flex-end",
            position: "absolute",
            right: "0"
          }}>
            <span className="badge bg-info text-dark" >{source}</span>
          </div>
          <img src={!imageUrl ? "https://cst.brightspotcdn.com/dims4/default/9cd735f/2147483647/strip/true/crop/7008x4000+0+336/resize/1461x834!/quality/90/?url=https%3A%2F%2Fchorus-production-cst-web.s3.us-east-1.amazonaws.com%2Fbrightspot%2F00%2F76%2Fa377252b4473956dc1c83afb2b7d%2Ffourkilled-090324-7.jpg" : imageUrl} className="card-img-top" alt="..."/>
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author ? "Unknow" : author} on {new Date(date).toGMTString()}</small></p>
            <a rel='noreferrer' href={newsUrl} target = "_blank" className="btn btn-sm btn-dark">Read More</a>
          </div>
        </div>
      </div>
    )
}

export default NewsItem

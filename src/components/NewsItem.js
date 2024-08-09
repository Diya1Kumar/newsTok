 import React, { Component } from 'react'

export class NewsItem extends Component {
  
 
    render() {
        let {title, description, imageUrl, newsUrl, author, date} = this.props;
        return (
            <div className='my-3'>
                <div className="card">
                    <img src={!imageUrl?"https://i-invdn-com.investing.com/news/LYNXNPEC180BO_L.jpg":imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}</h5> 
                        <p className="card-text">{description}...</p>
                        <p className="card-text"><small class="text-muted">By {author} on {date}</small></p>

                        <a href={newsUrl} target="_blank" className="btn btn-sn btn-primary">Read More</a>
                    </div>
                </div>

            </div>
        )
    }
}

export default NewsItem

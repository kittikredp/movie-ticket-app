import React from 'react'
import './index.scss'	

const formatDate = (date) => {
	if (!date) return null
	const options = {
		year: 'numeric',
		month: 'long',
		day: 'numeric'
	}

	return (new Date(date)).toLocaleString('en-us', options)
}
export const MovieBlock = (props) => {
  
  const {movie, showHalf, onClick} = props
	const isHalf = showHalf ? ' half':''
	
  return (
		<div 
			className={`movie-block${isHalf}`}
			onClick={onClick}
		>
			<div className="movie-img-container">
				<img src={movie.posterPath} />
			</div>
			<div className="detail">
				<div className="detail-header">
					{movie.title}
				</div>
				<div className="detail-body">
					{movie.overview}
				</div>
				<div className="detail-footer">
					<div className="ticket-fee">
						฿{movie.ticketFee}
					</div>
					<div className="release-date">
						{formatDate(movie.releaseDate)}
					</div>
				</div>
			</div>
		</div>
  )
}

export default MovieBlock
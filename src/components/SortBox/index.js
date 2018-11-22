import React from 'react'
import './index.scss'	

export const SortBox = (props) => {
  
  const {onSelectSortBy, onClickOrder} = props
	
	movie = !movie.attacks ? {attacks: [], ...movie}:movie
	movie = !movie.weaknesses ? {weaknesses: [], ...movie}:movie
	
	const isHalf = showHalf ? ' half':''
	
  return (
		<div 
			className={`movie-block${isHalf}`}
			onClick={handleOpenModal}
		>
			<div className="movie-img-container">
				<img src={movie.poster} />
			</div>
			<div className="detail">
				<div className="name">
					{movie.title}
				</div>
				<div className="overview">
					{movie.overview}
				</div>
				<div className="ticket-fee">
					฿{movie.ticketFee}
				</div>
			</div>
		</div>
  )
}

export default MovieBlock
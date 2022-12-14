import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getDescriptionByProductId } from '../../Services/apiMercadoLibre'

interface Props {
	title: string
	image: string
	price: string
	id: string
}

const Cards = ({ title, image, price, id }: Props) => {
	const [description, setDescription] = useState('')

	useEffect(() => {
		getDescriptionByProductId(id).then(description => {
			setDescription(description.plain_text)
		})
	}, [])

	const formatPrice = price => {
		const formatter = new Intl.NumberFormat('es-AR', {
			style: 'currency',
			currency: 'ARS',
			minimumFractionDigits: 0,
		})
		return formatter.format(price)
	}

	return (
		<Link
			className='link'
			to={`/product/${id}`}
		>
			<div
				className='card'
				key={id}
			>
				<div className='card-boxImg'>
					<img
						src={image}
						alt={title}
					/>
				</div>
				<span className='card-precio'>{formatPrice(price)}</span>
				<div className='card-oculto'>
					<h5>{title.slice(0, 18)}</h5>
					{description && (
						<p className='card-description'>
							{description.slice(0, 50)}
							{50 < description.length && '...'}
						</p>
					)}
				</div>
			</div>
		</Link>
	)
}

export default Cards

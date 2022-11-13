// Write your code here
import './index.css'

const SimilarProductItem = props => {
  const {details} = props
  const {imageUrl, title, brand, price, rating} = details
  return (
    <div className="similar-p-container">
      <img
        src={imageUrl}
        alt={`similar product ${title}`}
        className="similar-images"
      />
      <h1 className="similar-p-title">{title}</h1>
      <p className="similar-p-brand">by {brand}</p>
      <div className="price-and-rating-container">
        <p className="product-details-price1">Rs {price}/- </p>
        <p className="product-details-rating-card">
          {rating}
          <img
            src="https://assets.ccbp.in/frontend/react-js/star-img.png"
            alt="star"
            className="star-image"
          />
        </p>
      </div>
    </div>
  )
}

export default SimilarProductItem

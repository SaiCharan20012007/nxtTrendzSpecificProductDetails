// Write your code here
import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import Header from '../Header'

import SimilarProductItem from '../SimilarProductItem'
import './index.css'

class ProductItemDetails extends Component {
  state = {
    imageUrl: '',
    title: '',
    price: '',
    rating: '',
    totalReviews: '',
    description: '',
    availability: '',
    brand: '',
    similarProductsList: [],
    isLoading: true,
    count: 1,
    apiStatus: true,
  }

  componentDidMount() {
    this.getProductDetails()
  }

  increaseCount = () => {
    this.setState(prevState => ({count: prevState.count + 1}))
  }

  decreaseCount = () => {
    const {count} = this.state
    if (count === 1) {
      this.setState(prevState => ({count: prevState.count - 0}))
    } else {
      this.setState(prevState => ({count: prevState.count - 1}))
    }
  }

  getProductDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)
    const url = `https://apis.ccbp.in/products/${id}`
    const response = await fetch(url, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const similarProductsU = data.similar_products.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        title: each.title,
        style: each.style,
        price: each.price,
        description: each.description,
        brand: each.brand,
        totalReviews: each.total_reviews,
        rating: each.rating,
        availability: each.availability,
      }))

      this.setState({
        imageUrl: data.image_url,
        title: data.title,
        price: data.price,
        brand: data.brand,
        totalReviews: data.total_reviews,
        rating: data.rating,
        availability: data.availability,
        similarProductsList: similarProductsU,
        description: data.description,
        isLoading: false,
        apiStatus: true,
      })
    } else {
      this.setState({isLoading: false, apiStatus: false})
    }

    // this.setState({
    //   imgUrl: data.imageUrl,
    //   title: updatedObject.title,
    //   price: updatedObject.price,
    //   rating: updatedObject.rating,
    //   totalReviews: updatedObject.totalReviews,
    //   description: updatedObject.description,
    //   brand: updatedObject.brand,
    //   similarProductsList: updatedObject.similarProductsList,
    // })
  }

  finalResultView = () => {
    const {apiStatus, isLoading} = this.state
    const {
      imageUrl,
      title,
      price,
      rating,
      totalReviews,
      description,
      availability,
      brand,
      count,
      similarProductsList,
    } = this.state

    if (apiStatus) {
      const resultL = isLoading ? (
        <div testid="loader">
          <Loader type="ThreeDots" color="#0b69ff" height={80} width={80} />{' '}
        </div>
      ) : (
        <div className="product-item-details-container">
          <Header />
          <div className="content-section">
            <div className="product-top-section">
              <img
                src={imageUrl}
                alt="product"
                className="product-detailed-image"
              />
              <div>
                <h1 className="product-detail-title">{title}</h1>
                <p className="product-details-price">Rs {price}/- </p>
                <div className="rating-reviews">
                  <p className="product-details-rating-card">
                    {rating}
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/star-img.png"
                      alt="star"
                      className="star-image"
                    />
                  </p>
                  <p>{totalReviews} Reviews</p>
                </div>
                <p className="product-card-details-des">{description}</p>
                <p className="availability-des">
                  <span className="span-style">Available: </span>
                  {availability}
                </p>
                <p className="availability-des">
                  <span className="span-style">Brand: </span>
                  {brand}
                </p>
                <hr />
                <div className="increment-decrement-item-container">
                  <button
                    type="button"
                    className="inde-btn"
                    onClick={this.decreaseCount}
                    testid="minus"
                  >
                    <BsDashSquare />
                  </button>
                  <p>{count}</p>
                  <button
                    type="button"
                    className="inde-btn"
                    onClick={this.increaseCount}
                    testid="plus"
                  >
                    <BsPlusSquare />
                  </button>
                </div>
                <button type="button" className="add-to-cart-btn">
                  ADD TO CART
                </button>
              </div>
            </div>
            <h1 className="similar-products-title">Similar Products</h1>
            <ul className="similar-products-ul">
              {similarProductsList.map(eachProduct => (
                <SimilarProductItem
                  details={eachProduct}
                  key={eachProduct.id}
                />
              ))}
            </ul>
          </div>
        </div>
      )
      return resultL
    }
    return (
      <div className="no-products-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-error-view-img.png"
          alt="failure view"
        />
        <h1>Product Not Found</h1>
        <Link to="/products">
          <button type="button" className="continue-btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    )
  }

  render() {
    return this.finalResultView()
  }
}

export default ProductItemDetails

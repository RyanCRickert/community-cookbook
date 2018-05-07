import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { startRemoveItem, startSetItems } from "../actions/shoppingCart";
import database from "../firebase/firebase";
import configureStore from "../store/configureStore";

export class ShoppingCartPage extends React.Component {
  constructor(props) {
		super(props);

		this.state = {
			shop: this.props.items.map(item => item.node_ ? item.node_.value_ : item.itemData)
    }
  }
  
  handleClick = (index) => {
    let shopItems = this.state.shop;
    const id = this.props.items[index].id;

    this.props.startRemoveItem({id})
    shopItems.splice(index, 1);
    this.setState({ shopItems });
  }

  render() {
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Shopping List</h1>
          </div>
        </div>
          <div className="content-container view-page">
            <span>
              {this.state.shop.map((item, index) => (
                <div key={index}>
                <button className="view-page__check" onClick={(() => this.handleClick(index))}/>
                  <span>{item}</span>
                </div>
              ))}
            </span>
          </div>
          <div className="content-container">
            <Link to="/" className="button">To Dashboard</Link>
          </div>
        </div>
    )}
}

const mapStateToProps = (state, props) => ({
  items: state.shoppingCart
});

const mapDispatchToProps = (dispatch) => ({
  startRemoveItem: (item) => dispatch(startRemoveItem(item)),
  startSetItems: () => dispatch(startSetItems())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartPage);


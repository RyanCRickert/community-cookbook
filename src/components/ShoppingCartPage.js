import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { startRemoveItem, startSetItems, startRemoveItemAll } from "../actions/shoppingCart";
import database from "../firebase/firebase";
import configureStore from "../store/configureStore";
import cart from "../../public/images/plus2.png"

export class ShoppingCartPage extends React.Component {
  constructor(props) {
		super(props);

		this.state = {
			shop: this.props.items.map(item => item.name)
    }

    this.handleRemoveAll = this.handleRemoveAll.bind(this);
  }
  
  handleClick(index) {
    let shopItems = this.state.shop;
    const id = this.props.items[index].id;

    this.props.startRemoveItem({id})
    shopItems.splice(index, 1);
    this.setState({ shopItems });
  };

  handleRemoveAll() {
      this.props.startRemoveItemAll()
      this.setState({ shop: [] });
  };

  render() {
    console.log(this.props.items)
    return (
      <div>
        <div className="page-header">
          <div className="content-container">
            <h1 className="page-header__title">Shopping List</h1>
          </div>
        </div>
          <div className="content-container view-page-even">
            <span>
              {this.state.shop.length !== 0 ?
                this.state.shop.map((item, index) => (
                <div key={index}>
                <button className="view-page__check" onClick={(() => this.handleClick(index))}/>
                  <span>{item}</span>
                </div>
              ))
              :
              <div>Your shopping cart is currently empty.  To add an item, just click <img src={cart}/> when viewing a recipe.</div>}
              {this.state.shop.length > 1 && <div><button className="button-small" onClick={this.handleRemoveAll}>Remove All</button></div>}
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
  startSetItems: () => dispatch(startSetItems()),
  startRemoveItemAll: () => dispatch(startRemoveItemAll())
});

export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartPage);


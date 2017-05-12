import React, { Component } from 'react';
import { Button, Glyphicon } from 'react-bootstrap';

export class StripeField extends Component {

  state = {
    error: null,
    loading: false
  }

  componentDidMount() {
    // Initialize stripe
    this.stripe = window.Stripe('pk_test_UdFie3THdgtzUjPnDMQg8MV1');
    const elements = this.stripe.elements();
    this.card = elements.create('card');
    this.card.mount('#card-element');
  }

  handleClick = () => {
    this.setState({ error: null, loading: true }, () => {
      console.log('stripe field');
      // Create token of card
      this.stripe.createToken(this.card)
        .then(result => {
          console.log('tokenize token result', result);
          if (result.error) {
            this.setState({ error: result.error.message, loading: false });
          } else if (result.token) {
            this.props.addCreditCard(result.token.id)
              .then(() => {
                this.setState({ loading: false, error: null });
              });
          }
        });
    })
  }

  componentWilUnmount() {
    this.stripe = undefined;
    this.card = undefined;
  }

  render() {
    const { error, loading } = this.state;

    return (
      <div className="text-center padding-20">
        {
          error &&
          (
            <h3 className="margin-none padding-bottom-10 text-red-flat">
              {this.state.error}
            </h3>
          )
        }
        <label htmlFor="card-element">
          <div className="stripe-card" id="card-element"></div>
        </label>
        <div className="text-center">
          <Button bsStyle="success" onClick={this.handleClick} disabled={loading}>
            <Glyphicon className="margin-right-5" glyph="plus" />
            { loading ? 'Loading...' : 'Add' }
          </Button>
        </div>
      </div>
    )
  }

}

export default StripeField;
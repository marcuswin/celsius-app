import React, {Component} from 'react';
import SimpleLayout from "../SimpleLayout/SimpleLayout";

class EarnInterestLayout extends Component {
  tabs = [
    { label: 'Calculator', screen: 'InterestCalculator' },
    { label: 'How I earn interest', screen: 'DepositCoins' },
  ];

  heading = {
    text: 'Earn Interest',
  };

  render() {
    const {children} = this.props;

    return (
      <SimpleLayout
        tabs={this.tabs}
        mainHeader={{ backButton: false }}
        animatedHeading={this.heading}
      >
        {children}
      </SimpleLayout>
    );
  }
}

export default EarnInterestLayout;

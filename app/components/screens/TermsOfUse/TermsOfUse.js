import React, {Component} from 'react';
import {Text, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from "redux";
import {Container} from 'native-base';

import * as appActions from "../../../redux/actions";
import CelButton from '../../atoms/CelButton/CelButton';
import TermsOfUseStyle from "./TermsOfUse.styles";
import SimpleLayout from "../../layouts/SimpleLayout/SimpleLayout";
import { STYLES } from "../../../config/constants/style";

@connect(
  (state) => ({
    agreedToTermsOfUse: state.users.agreedToTermsOfUse,
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class TermsOfUse extends Component {
  constructor(props) {
    super(props);

    this.state = {
      terms: [
        {
          // termsOfService: 'Terms of Service',
          text: 'CELSIUS NETWORK LIMITED (“WE”, “OUR”, “US” OR THE “COMPANY”) WELCOMES YOU (“USER”, “YOU” OR “YOUR”) TO OUR WEBSITE AT https://celsius.network (THE “WEBSITE”).  THE FOLLOWING TERMS (THE “TERMS”) STIPULATE THE TERMS AND CONDITIONS OF YOUR USE OF THE WEBSITE. THE WEBSITE IS PROVIDED SOLELY FOR YOUR OWN USE. BY ACCESSING OR USING OUR WEBSITE, YOU AGREE TO THESE TERMS. YOUR USE OF THE WEBSITE IS EXPRESSLY CONDITIONED ON YOUR COMPLIANCE AND CONSENT WITH THESE TERMS. IF YOU DO NOT AGREE TO ANY OF THE PROVISIONS OF THE TERMS YOU SHOULD IMMEDIATELY STOP USING THE WEBSITE.\n' +
          '\n' +
          'In addition to these Terms, please also review our Privacy Policy, available at https://celsius.network/privacy-policy/, which these Terms are incorporated hereto by reference, along with such other policies of which you may be notified of by us from time to time.',
        },
        {
          heading: 'Use Restrictions',
          text: 'The Website and the content available thereon are provided to you for information purposes. You may use the Website for your information purposes and for contacting Us, but you may not (a) make available or use the information on the Website on any other platform or for the benefit of any third party; (b) sell, resell, license, sublicense, distribute, make available, rent or lease the Website or the Content (as defined below) for any commercial purposes; (c) use any Website or Content, to transmit any illegal, immoral, unlawful and/or unauthorized materials, or interfere with or violate users’ rights to privacy and other rights, or harvest or collect personally identifiable information about users without their express consent; (d) use the Website, to transmit or otherwise make available any malicious code, including any virus, worm, trojan horse, time bomb, web bug, spyware, or any other computer code, file, or program; (e) interfere with or disrupt the integrity, performance or operation of the Website, or any part thereof, including any servers or networks provided by third party service providers; (f) attempt to gain unauthorized access or bypass any measures imposed to prevent or restrict access to the Website; (i) copy, modify, distribute, create derivative works, translate, port, reverse engineer, decompile, or disassemble the Website or the Content, or any material that is subject to our proprietary rights, including without limitation for non-internal or commercial purpose, and shall not simulate or derive any source code or algorithms from the Website; and (j) misrepresent or impersonate any person or entity, or falsely state your affiliation, or express, imply that we endorse you in any manner, or represent or distribute inaccurate information about the Website.',
        },
        {
          heading: 'Proprietary Rights',
          text: 'The Company retains sole and exclusive ownership of all rights, title and interests in the Website, the Content and all intellectual property rights relating thereto, including, without limitation, issued patents and pending patent applications with respect to the Website, the Content and the technology related thereto. This provision shall survive termination and expiration of these Terms and shall remain in full force and effect thereafter.',
        },
        {
          heading: 'Content',
          text: '“Content” means any information, data, text, photos, graphics, in static or interactive feature, which is provided or otherwise made available to you through the Website. The Content is owned and/or licensed by the Company. You are prohibited from using, including, without limitation, copying or making any alteration of or derivative works based upon, the Content for any purpose and is at all times subject to these Terms.',
        },
        {
          heading: "Third Party Websites",
          text: 'The Website may contain links to websites or pages which are not maintained by Company. Links to third party websites are provided for your convenience and information only. Third party web sites are not under the Company’s control and the Company is not responsible for the content or accuracy of those sites or the products or services offered on or through those sites. The inclusion of a link through the Website does not imply the Company’s endorsement of the third party website or that the Company is affiliated with the third party website’s owners or sponsors.\n' +
          '\n' +
          'You acknowledge and agree that we are not liable for any loss or damage which may be incurred by you as a result of the availability of those external sites, resources or advertisements, or as a result of any reliance placed by you on the completeness, accuracy or existence of any advertising, products or other materials on, or available from, such websites or resources. We recommend that you to be aware when you leave the Website and to read the terms and conditions and privacy policy of each other website that you visit.',
        },
        {
          heading: 'Company Trademarks',
          text: 'Any and all trademarks, service marks, product names, and trade names of the Company appearing on or through the Website are exclusively owned by the Company or its affiliates. All other trademarks, service marks, product names, and logos appearing on or through the Website are the property of their respective owners. You may not use or display any trademark, service mark, product name, trade name, or logo appearing on the Website without the owner’s prior written consent.',
        },
        {
          heading: 'Disclaimer of Warranties',
          text: 'EXCEPT AS EXPRESSLY SET FORTH UNDER THE TERMS, THE WEBSITE IS PROVIDED ON AN “AS IS”, “AS AVAILBLE” AND “WITH ALL FAULTS” BASIS, AND WITHOUT WARRANTY OR CONDITION OF ANY KIND, EITHER EXPRESS OR IMPLIED. WITHOUT LIMITING THE FOREGOING, THE COMPANY EXPLICITLY DISCLAIMS ANY WARRANTIES, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION, WARRANTIES OF MERCHANTABILITY, AND FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT AND QUALITY OF SERVICE. THE COMPANY MAKES NO WARRANTY THAT THE WEBSITE WILL MEET YOUR EXPECTATIONS, WILL BE FREE FROM VIRUSES OR THAT DATA AND CONTENT OBTAINED THROUGH THE WEBSITE WILL BE ACCURATE, RELIABLE OR CURRENT, OR THAT THE WEBSITE WILL BE AVAILABLE ON AN UNINTERRUPTED, SECURE, OR ERROR-FREE BASIS. YOU ACKNOLWLEDGE AND AGREE THAT USE OF THE WEBSITE IS AT YOUR OWN DISCRETION AND SOLE RISK AND THAT THE ENTIRE RISK AS TO THE RESULTS AND PERFORMANCE OF THE WEBSITE, INCLUDING, WITHOUT LIMITATION, ANY DAMAGES TO YOUR COMPUTER SYSTEM, MOBILE DEVICE OR DATA STORED ON IT, IS SOLELY YOURS.',
        },
        {
          heading: 'Limitation of Liability',
          text: 'YOU ACKNOWLEDGE AND AGREE THAT IN NO EVENT WILL THE COMPANY (INCLUDING, WITHOUT LIMITATION, ITS AFFILIATES AND THEIR RESPECTIVE OFFICERS, DIRECTORS, EMLPOYEES AND AGENTS) BE LIABLE FOR ANY DIRECT, INDIRECT, SPECIAL, PUNITIVE, INCIDENTAL OR CONSEQUENTIAL DAMAGES OR LOSSES (INCLUDING, WITHOUT LIMITATION, DAMAGES FOR LOSS OF BUSINESS PROFITS, BUSINESS INTERRUPTION, LOSS OF PROGRAMS OR INFORMATION, AND THE LIKE) ARISING OUT OF YOUR USE OF OR INABILITY TO USE THE WEBSITE, OR IMPROPER USE OF THE WEBSITE, EVEN IF WE HAVE BEEN ADVISED OF THE POSSIBILITY THEREOF AND REGARDLESS OF THE FORM OF ACTION, WHETHER IN CONTRACT, TORT, OR OTHERWISE. YOU FURTHER ACKNOWLEDGE AND AGREE THAT THE COMPANY MAY CHANGE THE WEBSITE IN WHOLE OR IN PART IN ITS SOLE DISCRETION WITHOUT NOTICE TO YOU AND WITHOUT ANY LIABILITY TO YOU WHATSOEVER IN CONNECTION THEREWITH.',
        },
        {
          heading: 'Indemnity',
          text: 'You agree to indemnify, defend, and hold harmless the Company and its affiliates and their respective  employees, directors, officers, subcontractors and agents, against any and all claims, damages, or costs or expenses (including court costs and attorneys’ fees) that arise directly or indirectly from: (a) breach of these Terms by you; (b) any claim, loss or damage experienced from your use or attempted use of (or inability to use) the  Website; (c) your violation of any law or regulation; (d) your infringement of any right of any third party; and (e) any other matter for which you are responsible hereunder or under law. You agree that your use of the Website shall be in compliance with all applicable laws, regulations and guidelines and shall not be intended to damage, disable, overload or impair the Website or the servers on which it is hosted.',
        },
        {
          heading: 'Changes To The Terms',
          text: 'These Terms may be subject to periodical revisions or amendments, from time to time with or without notice, at our sole discretion; we encourage you to review the Terms regularly. The last revision will be reflected in the “Last Updated” heading. Your continued use of our Website following any such amendments will be considered as your consent to the amended Terms. At all times, the latest version of these Terms shall be binding and prevail over any other version.',
        },
        {
          heading: 'Miscellaneous',
          text: 'These Terms constitute the entire agreement between the parties concerning the subject matter hereof. These Terms shall be governed by the laws of England and Wales without giving effect to any principles of conflicts of laws thereof, and the eligible courts in London, England, shall have exclusive jurisdiction over all disputes between the parties related to these Terms. You may not assign or otherwise transfer by operation of law or otherwise these Terms or any right or obligation herein without the express written consent of the Company. The Company expressly reserves its right to assign or transfer these Terms and to delegate any of its obligations hereunder at its sole discretion. If any part of these Terms is found void and unenforceable, it will not affect the validity of the balance of the Terms, which shall remain valid and enforceable according to its terms. The failure of the Company to act with respect to a breach of these Terms by you or others shall not constitute a waiver and shall not limit the Company’s rights with respect to such breach or any subsequent breaches.',
        },
      ]
    };
  }

  // lifecycle methods
  // event hanlders
  onPress = () => {
    const { actions } = this.props;

    actions.toggleTermsOfUse();
    actions.navigateBack();
  }

  // rendering methods
  renderScreen(section, index) {
    return (
      <View style={TermsOfUseStyle.content} key={index}>
        <Text style={TermsOfUseStyle.title}>{section.heading}</Text>
        <Text style={TermsOfUseStyle.text}>{section.text}</Text>
      </View>
    )
  }

  render() {
    const { terms } = this.state;
    const { actions, agreedToTermsOfUse } = this.props;

    return (
      <Container style={TermsOfUseStyle.buttonContainer}>
        <SimpleLayout
          mainHeader={{ backButton: false, onCancel: actions.navigateBack}}
          animatedHeading={{ text: 'Terms of Use' }}
          bottomNavigation={ false }
          background={STYLES.PRIMARY_BLUE}

        >
            {terms.map(this.renderScreen)}
        </SimpleLayout>

        { !agreedToTermsOfUse ? (
          <View style={TermsOfUseStyle.button}>
            <CelButton white onPress={this.onPress}>I agree</CelButton>
          </View>
        ): null }

      </Container>
    );
  }
}

export default TermsOfUse;

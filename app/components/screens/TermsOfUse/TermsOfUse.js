import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from "redux";

import testUtil from "../../../utils/test-util";
import * as appActions from "../../../redux/actions";
import CelText from '../../atoms/CelText/CelText';
import TermsOfUseStyle from './TermsOfUse.styles';

@connect(
  () => ({
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) }),
)
class TermsOfUse extends Component {
  static propTypes = {};
  static defaultProps = {}

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
        {
          heading: '',
          text: "These Master Digital Currency Deposit Terms of Service (the “Deposit Terms”) govern your use as an individual (“you” or “User”) of services that permit User to deposit the Deposited Amount of Digital Currency in exchange for the right to receive Interest offered by Celsius Network LTD, for itself and its affiliates and with an email of legal@celsius.network (“Celsius”), a private limited company organized and existing under the laws of the United Kingdom. By accessing or using any services provided by Celsius, including the Deposit services (collectively, the “Services”), you agree to be bound by these Deposit Terms and all other terms, policies, and guidelines applicable to the Services. "
        },
        {
          heading: '',
          text: 'By using the Services, you agree as follows:'
        },
        {
          heading: 'I Definitions applicable to the Deposit Terms',
          text: "“Business Day” means a trading day on the New York Stock Exchange.\n" +
            "“Digital Currency” means digital currency that the Celsius and User agree upon in the Deposit Term Sheet (e.g. Bitcoin (BTC), Ether (ETH), or CEL Tokens) or any other digital currency Celsius agrees to accept). \n" +
            "“Digital Currency Address” means an identifier of 26-34 alphanumeric characters that represents a possible destination for a transfer of Digital Currency.\n" +
            "“Hard Fork” means a permanent divergence in the relevant Digital Currency blockchain, commonly occurs when non-upgraded nodes can’t validate blocks created by upgraded nodes that follow newer consensus rules.\n" +
            "“Interest” means the interest calculated by Celsius as described at https://celsius.network/cel-token-interest-explained/ on the Deposited Amount.\n" +
            "“Deposit Effective Date” means the first full calendar day upon which a Deposited Amount is received by Celsius and eligible for Interest.\n"
        },
        {
          heading: 'II Identify Verification',
          text: 'User agrees to provide Celsius with such information as Celsius deems necessary, in its sole discretion, to verify User’s identity in order to comply with any law, rule or regulation of any jurisdiction, including our obligations to refuse Deposited Amounts that stem from money laundering, terrorist financing, fraud, or any other financial crime. As such, Deposit may be required to provide certain personal information, including, but not limited to, name, address, telephone number, e-mail address, date of birth, taxpayer identification number, a government identification, and information regarding your bank account (e.g. bank name, type of account, ACH details, etc.).\n' +
            'In providing Celsius with this or any other information that may be required, User confirms that the information is accurate and authentic and agrees to update  any of the information upon any change. \n' +
            'User authorizes Celsius to make inquiries, whether directly or through third parties, that it considers necessary to verify User’s identity or protect either party against fraud or other financial crimes. User expressly acknowledges and agrees that any  personal information may be disclosed to a third party in order to conduct  (i) credit reference checks, fraud prevention or financial crimes. The intent on the foregoing is to verify User’s identity and is not intended to have an adverse effect on User’s credit rating. Celsius shall take any and all actions it deems reasonably necessary based on the results of all inquiries. \n'
        },
        {
          heading: 'III Deposits of Digital Currency',
          text: '(a) Deposits of Digital Currency\n' +
            'Subject to the Deposit Terms, User may deposit a specified amount of Digital Currency and receive Interest. \n' +
            '(b) Deposit Procedure\n' +
            'From time to time User may Deposit a specific amount of Digital CurrencyUser’s transmission of Digital Currency to the Digital Currency Address provided by Celsius (the “Deposited Amount”) shall reflect User’s confirmation of the terms of the applicable Deposit Term Sheet and User’s reaffirmation of these Deposit Terms.\n' +
            '(c) Redelivery of Digital Currency\n' +
            'Upon your  electronic request, subject to a Hard Fork, Celsius shall redeliver of the Digital Currency on or before 5:00 pm New York time of the second Business Day. \n' +
            '(d)\tIn the event of a Hard Fork, User acknowledges and agrees that Celsius may temporarily suspend the redelivery of Digital Currency (with or without advance notice to you) and that Celsius may, in its sole discretion, decide whether or not to support (or cease supporting) the resulting branch generated in connection with a Hard Fork (“New Token”). User acknowledges and agrees that Celsius assumes absolutely no responsibility whatsoever in respect of an unsupported branch of a forked protocol including, but not limited to the New Token. If the Hard Fork occurs, Celsius will use commercially reasonable efforts after a Hard Fork and creation of the New Token to repay the Digital Currency with any combination of a one-time Digital Currency payment of the relevant Digital Currency reflecting the amount of the New Token due using a methodology Celsius determines, in is reasonable opinion, returns the value of the Digital Currency to User. \n'
        },
        {
          heading: 'IV Interest',
          text: '(a) Interest Calculation\n' +
            'At such time as the Digital Currency is delivered to Digital Currency Address, Celsius will  commence calculating Interest and pay such Interest in CEL Tokens (or BCT/ETH if CEL is restricted by law).   \n' +
            '(b) Taxes and Fees\n' +
            'All transfer or other taxes or third-party fees payable with respect to the transfer and/or return of any Deposited Amount hereunder shall be paid by User. Celsius shall report to the Internal Revenue Service (“IRS”) all interest paid to User under the Deposit Terms and shall, where required by any law, rule or regulation of any jurisdiction, provide User Form 1099-INT documenting the amount reported to the IRS. \n'
        },
        {
          heading: 'V Representations and Warranties',
          text: '(a) User represents and warrants that it has or will have at the time of transfer of any Digital Currency, the right to transfer such Digital Currency, subject to the terms and conditions hereof, and that it owns the Digital Currency, free and clear of all liens.\n' +
            '(b) Compliance with Laws. User is in compliance in all material respects with the requirements of all federal, state and local statutes, rules, regulations, orders, injunctions, decrees and other regulatory requirements applicable to it or its property and operations.\n' +
            '(c) User represents and warrants that is understands that Celsius may, for its own account, pledge and repledge from time to time, without notice to the User, either separately or in common with other such cryptocurrency, any or all of the Digital Currency that comprises the Deposited Amount held by Celsius for the benefit of User and that Celsius may do so without retaining in its possession or control for delivery, a like amount of similar cryptocurrency.  \n' +
            '(d) KYC and AML. Celsius shall have received all documentation and other information requested and as required by regulatory authorities under applicable “know your customer” and anti-money laundering rules and regulations, including without limitation the Act.\n' +
            '(e) USA PATRIOT Act Notice.  In order to the requirements of the USA Patriot Act (Title III of Pub. L. 107-56 (signed into law October 26, 2001)) (the “Act”), to the extent applicable, Celsius shall have received all documentation and other information requested that Celsius may be required to obtain, verify and record information that identifies User, and other information that will allow Celsius to identify User in accordance with the Act. User is in compliance, in all material respects, with the Act. No part of the proceeds of any  Digital Currency or Interest will be used by User, directly or indirectly, for any payments to any governmental official or employee, political party, official of a political party, candidate for political office, or anyone else acting in an official capacity, in order to obtain, retain or direct business or obtain any improper advantage, in violation of the United States Foreign Corrupt Practices Act of 1977, as amended. In addition, if Celsius is required by law or regulation or internal policies to do so, it shall have the right to periodically conduct (i) Patriot Act searches, OFAC/PEP searches, and customary individual background checks for User and (ii) OFAC/PEP searches and customary individual background checks for the User, or the key principals if an entity, and User agrees to cooperate in respect of the conduct of such searches and further agrees that the reasonable costs and charges for such searches shall be deducted from any Interest. \n' +
            '(f) Foreign Assets Control Regulations. Neither of the Deposited Amount nor the use of the Interest will violate (and User nor any of its affiliates is in violation of) the Trading With the Enemy Act (50 U.S.C. § 1 et seq., as amended) (the “Trading With the Enemy Act”) or any of the foreign assets control regulations of the United States Treasury Department (31 CFR, Subtitle B, Chapter V, as amended) (the “Foreign Assets Control Regulations”) or any enabling legislation or executive order relating thereto (which for the avoidance of doubt shall include, but shall not be limited to (i) Executive Order 13224 of September 21, 2001 Blocking Property and Prohibiting Transactions With Persons Who Commit, Threaten to Commit, or Support Terrorism (66 Fed. Reg. 49079 (2001)) (the “Executive Order”) and (ii) the Uniting and Strengthening America by Providing Appropriate Tools Required to Intercept and Obstruct Terrorism Act of 2001 (Public Law 107-56)). Furthermore, none of the Borrowers or their Affiliates (i) is or will become a “blocked person” as described in the Executive Order, the Trading With the Enemy Act or the Foreign Assets Control Regulations,  (ii) has violated any anti-terrorism laws, (iii) engages or will engage in any dealings or transactions, or be otherwise associated, with any such “blocked person” or in any manner violative of any such order (the “OFAC Sanctions Programs”), (iv) conducts any business or engages in making or receiving any contribution of goods, services or money to or for the benefit of any person described in this subsection (e), or (v) engages in or conspires to engage in any transaction that evades or avoids, or has the purpose of evading or avoiding, or attempts to violate, any of the prohibitions set forth in any anti-terrorism law. Each representation and warranty shall be made by Borrower as of the date of the Deposit Terms and as of the date of any renewal, extension or modification of the Loan.\n'
        },
        {
          heading: 'VI Indemnification',
          text: 'User agrees to indemnify and hold Celsius, its affiliates and service providers, and each of its or their respective officers, directors, agents, joint venturers, employees and representatives, harmless from any claim or demand (including attorneys\' fees and any fines, fees or penalties imposed by any regulatory authority) arising out of or related to User’s breach of the Deposit Terms or violation of any law, rule or regulation, or the rights of any third party.'
        },
        {
          heading: 'VII Limitation of Liability, No Warranty',
          text: 'IN NO EVENT SHALL CELSIUS, ITS AFFILIATES AND SERVICE PROVIDERS, OR ANY OF THEIR RESPECTIVE OFFICERS, DIRECTORS, AGENTS, JOINT VENTURERS, EMPLOYEES OR REPRESENTATIVES, BE LIABLE (A) FOR ANY AMOUNT GREATER THAN THE VALUE OF THE SUPPORTED DIGITAL CURRENCY ON DEPOSIT OR (B) FOR ANY LOST PROFITS OR ANY SPECIAL, INCIDENTAL, INDIRECT, INTANGIBLE, OR CONSEQUENTIAL DAMAGES, WHETHER BASED IN CONTRACT, TORT, NEGLIGENCE, STRICT LIABILITY, OR OTHERWISE, ARISING OUT OF OR IN CONNECTION WITH AUTHORIZED OR UNAUTHORIZED USE OF ANY CELSIUS SERVICES, OR THE DEPOSIT TERMS, EVEN IF AN AUTHORIZED REPRESENTATIVE OF CELSIUS HAS BEEN ADVISED OF OR KNEW OR SHOULD HAVE KNOWN OF THE POSSIBILITY OF SUCH DAMAGES. THIS MEANS, BY WAY OF EXAMPLE ONLY (AND WITHOUT LIMITING THE SCOPE OF THE PRECEDING SENTENCE), THAT IF USER CLAIMS THAT CELSIUS FAILED TO RETURN ITS DIGITAL CURRENCY, USER’S DAMAGES ARE LIMITED TO NO MORE THAN THE VALUE OF THE SUPPORTED DIGITAL CURRENCY AT ISSUE IN THE TRANSACTION, AND THAT USER MAY NOT RECOVER FOR LOST PROFITS, LOST BUSINESS OPPORTUNITES, OR OTHER TYPES OF SPECIAL, INCIDENTIAL, INDIRECT, INTANGIBLE, OR CONSEQUENTIAL DAMAGES IN EXCESS OF THE VALUE OF THE DEPOSITED AMOUNT AT ISSUE IN THE TRANSACTION. SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF INCIDENTAL OR CONSEQUENTIAL DAMAGES SO THE ABOVE LIMITATION MAY NOT APPLY TO YOU.\n' +
            '\n' +
            'CELSIUS’ SERVICES ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY REPRESENTATION OR WARRANTY, WHETHER EXPRESS, IMPLIED OR STATUTORY. TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, CELSIUS SPECIFICALLY DISCLAIMS ANY IMPLIED WARRANTIES OF TITLE, MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND/OR NON-INFRINGEMENT. CELSIUS DOES NOT MAKE ANY REPRESENTATIONS OR WARRANTIES THAT ACCESS TO THE SERVICESOR ANY OF THE MATERIALS CONTAINED THEREIN, WILL BE CONTINUOUS, UNINTERRUPTED, TIMELY, OR ERROR-FREE.\n' +
            '\n' +
            'Celsius makes no representations about the accuracy or completeness of historical Digital Currency price data. Celsius will make reasonable efforts to ensure that requests for electronic debits and credits involving bank accounts and check issuances are processed in a timely manner but Celsius makes no representations or warranties regarding the amount of time needed to complete processing which is dependent upon many factors outside of our control.\n'
        },
        {
          heading: 'VIII Governing Law, Dispute Resolution, Waiver of Jury Trial',
          text: '(a) Arbitration Terms. In the event of any dispute arising out of or relating to the Deposit Terms (“Disputes”), the parties shall, except in the case of non-payment by Client, the parties agree to continue to fulfill their obligations to one another hereunder while submitting the Dispute to binding arbitration in the New York, NY, Any such arbitration shall be conducted under the rules established by the American Arbitration Association (“AAA”), or such other rules as the parties may agree, using a single, independent arbitrator with significant industry experience.   If the parties are unable to agree on an arbitrator within thirty (30) days after any party shall have given written notice to the other that it desires to submit any issue to arbitration, then the AAA shall appoint an arbitrator. The award of the arbitrator shall be made in writing, shall be within the scope of the Deposit Terms, shall not change any of its terms or conditions, shall be binding and conclusive on all parties, and may include a finding for the payment of the costs of the arbitration proceeding (including reasonable attorneys’ fees). It is further agreed that judgment of a court having jurisdiction may be entered upon the award of the arbitrator.\n' +
            '(b) SUBMISSION TO ARBITRATION. EACH OF CELSIUS AND USER IRREVOCABLY AND UNCONDITIONALLY (i) SUBMITS ANY DISPUTE OF ANY NATURE BETWEEN THE PARTIES OR CELSIUS INCLUDING ANY CONFIRMATION OR ANY LOAN OR RELATING IN ANY WAY TO THE DEPOSIT TERMS TO ARBITRATION AS PROVIDED FOR ABOVE AND (ii) WAIVES, TO THE FULLEST EXTENT IT MAY EFFECTIVELY DO SO, ANY DEFENSE OF AN INCONVENIENT FORUM TO THE MAINTENANCE OF SUCH ACTION OR PROCEEDING IN ANY COURT AND ANY RIGHT OF JURISDICTION ON ACCOUNT OF ITS PLACE OF RESIDENCE OR DOMICILE.\n' +
            '(c) WAIVER OF COURT AND WAIVER JURY TRIAL. EACH OF CELSIUS AND USER HEREBY IRREVOCABLY WAIVES ANY RIGHT THAT IT MAY HAVE TO FILE ANY CLAIMS IN ANY COURT OF LAW OR SEEK A TRIAL BY JURY IN ANY ACTION, PROCEEDING OR COUNTERCLAIM ARISING OUT OF OR IN ANY WAY RELATING TO THE DEPOSIT TERMS. ANY CONFIRMATION, ANY LOAN OR THE TRANSACTIONS CONTEMPLATED THEREBY.\n'
        },
        {
          heading: 'IX Electronic Communications',
          text: 'User agrees to Celsius’ E-Sign Consent Agreement, which is incorporated by reference into these Deposit Terms as if it were set forth herein in its entirety. The E-Sign Consent Agreement constitutes User’s consent to receive disclosures and other information in electronic form unless prohibited by law in which case such notice(s) will be mailed certified return receipt requested, postage prepaid, or delivered by overnight delivery service. In connection with the Services, Celsius is required by law to provide you with certain disclosures. Without User’s consent, Celsius is not permitted to provide those disclosures to you online.\n'
        },
        {
          heading: 'X Modifications',
          text: 'All modifications or amendments to the Deposit Terms shall be effective upon posting by Celsius.\n'
        },
        {
          heading: 'XI Entire Agreement',
          text: 'The Deposit Terms and each Deposited Amount constitute the entire agreement among the parties with respect to the subject matter hereof and supersedes any prior negotiations, understandings and agreements.\n'
        },
        {
          heading: 'XII Successors and Assigns',
          text: 'The Deposit Terms shall bind and inure to the benefit of the respective successors and assigns of each of the parties; provided, that User may not assign the Deposit Terms or any rights or duties hereunder without the prior written consent of Celsius.\n'
        },
        {
          heading: 'XIII Severability of Provisions',
          text: 'Each provision of the Deposit Terms shall be severable from every other provision of the Deposit Terms for the purpose of determining the legal enforceability of any specific provision.\n'
        },
        {
          heading: 'XIV Counterpart Execution',
          text: 'The Deposit Terms and any signed Deposit Terms or instrument entered into in connection with the Deposit Terms, and any amendments hereto or thereto, may be executed in one or more counterparts, all of which shall constitute one and the same instrument. Any such counterpart, to the extent delivered by means of a.pdf, .tif, .gif, .peg or similar attachment to electronic mail (any such delivery, an “Electronic Delivery”) shall be treated in all manner and respects as an original executed counterpart and shall be considered to have the same binding legal effect as if it were the original signed version thereof delivered in person. No Party shall raise the use of Electronic Delivery to deliver a signature or the fact that any signature or Deposit Terms or instrument was transmitted or communicated through the use of Electronic Delivery as a defense to the formation of a contract, and each such party forever waives any such defense, except to the extent such defense relates to lack of authenticity.\n'
        },
        {
          heading: 'XV Relationship of Parties',
          text: 'Nothing contained in the Deposit Terms shall be deemed or construed by the parties, or by any third party, to create the relationship of partnership or joint venture between the parties hereto, it being understood and agreed that no provision contained herein shall be deemed to create any relationship between the parties hereto other than the relationship of Celsius and User.\n'
        },
        {
          heading: 'XVI Term and Termination',
          text: 'The Deposit Terms shall commence on User’s initial use of the Services provided for herein.  The Deposit Terms continue so long as User maintains any Digital Currency in User’s Digital Wallet Address. \n' +
            'In the event of a termination of the Deposit Terms, any Digital Amounts shall be redelivered and any Interest owed shall be paid on or before 5:00 pm New York time of the second Business Day.\n'
        },
        {
          heading: 'XVII Miscellaneous',
          text: 'Whenever used herein, the singular number shall include the plural and the plural the singular. The Deposit Terms is solely for the benefit of the parties hereto and their respective successors and assigns, and no other person shall have any right, benefit, priority or interest under, or because of the existence of, the Deposit Terms. The section headings are for convenience only and shall not affect the interpretation or construction of the Deposit Terms. The Parties acknowledge that the Deposit Terms and any Order are the result of negotiation between the Parties which are represented by sophisticated counsel and therefore none of the Deposit Terms’ provisions will be construed against the drafter.\n'
        }

      ]

    }
  }


  componentDidMount = () => {

    // require('./Terms.txt').then(r => r.text()).then(text => console.log(text))
  };

  renderScreen(section, index) {
    style = TermsOfUseStyle()
    return (
      <View key={index} style={style.wrapper}>
        <CelText type='H3' weight='bold' style={style.heading}>{section.heading}</CelText>
        <CelText style={style.text}> {section.text}</CelText>
      </View>
    )
  }


  render() {
    const { terms } = this.state;
    // const style = TermsOfUseStyle();

    return (
      <View>
        <ScrollView
          mainHeader={{ backButton: false, onCancel: appActions.navigateBack }}
          animatedHeading={{ text: 'Terms of Use' }}
          background={'white'}
        >
          <CelText type='H2' weight='bold' style={{ paddingLeft: '7%', paddingTop: 40 }}> Terms Of Use </CelText>
          {terms.map(this.renderScreen)}
        </ScrollView>
      </View>
    );
  }
}

export default testUtil.hookComponent(TermsOfUse);

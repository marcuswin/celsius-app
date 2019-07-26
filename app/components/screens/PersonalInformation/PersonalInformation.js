import React, { Component } from "react";
import { Linking, View } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import moment from "moment";
import * as appActions from "../../../redux/actions";
import PersonalInformationStyle from "./PersonalInformation.styles";
import CelText from "../../atoms/CelText/CelText";
import RegularLayout from "../../layouts/RegularLayout/RegularLayout";
import { isUSCitizen } from "../../../utils/user-util";
import STYLES from "../../../constants/STYLES";
import CelButton from "../../atoms/CelButton/CelButton";
import Separator from "../../atoms/Separator/Separator";
import CelInput from "../../atoms/CelInput/CelInput";

let focused = 0;

@connect(
  state => ({
    user: state.user.profile,
    profilePicture: state.user.profile.profile_picture,
    formData: state.forms.formData,
    formErrors: state.forms.formErrors
  }),
  dispatch => ({ actions: bindActionCreators(appActions, dispatch) })
)
class PersonalInformation extends Component {
  static propTypes = {};
  static defaultProps = {};

  static navigationOptions = () => ({
    title: "Personal Information"
  });

  constructor(props) {
    super(props);
    this.state = {
      updatingTaxInfo: false
    };
  }

  componentDidUpdate() {
    const { formData } = this.props;
    if (formData.ssn2 && formData.ssn2.length === 2 && focused < 2) {
      this.ssn3.focus();
      focused = 2;
    }
    if (formData.ssn1 && formData.ssn1.length === 3 && focused < 1) {
      this.ssn2.focus();
      focused = 1;
    }
  };

  updateSSNNumber = async () => {
    const { actions, formData } = this.props;

    const updateTaxInfo = {
      ssn: formData.ssn1 + formData.ssn2 + formData.ssn3
    };

    this.setState({ updatingTaxInfo: true });
    const response = await actions.updateTaxpayerInfo(updateTaxInfo);
    this.setState({ updatingTaxInfo: false });
    if (response.success) {
      actions.showMessage("success", "You have successfully submitted ssn number");
    }
  };

  render() {
    const { user, actions, formErrors, formData } = this.props;
    const style = PersonalInformationStyle();
    const { updatingTaxInfo } = this.state;
    const dateOfBirth = user.date_of_birth ? user.date_of_birth.split("-") : {};
    const ssnArray = user.ssn ? user.ssn.split("-") : {};

    return (
      <RegularLayout>
        <CelText margin={"0 0 20 0"} align={"center"} weight={"300"} type={"H4"}>To make changes on your personal
          information <CelText weight={"300"} type={"H4"} color={STYLES.COLORS.CELSIUS_BLUE}
                               onPress={() => Linking.openURL("mailto:app@celsius.network")}>contact our
            support.</CelText></CelText>
        {isUSCitizen() && (
          <View>
            <Separator margin={"10 0 20 0"} color={STYLES.COLORS.DARK_GRAY} opacity={0.2} textOpacity={0.4}
                       text={"SOCIAL SECURITY NUMBER"}/>

            {!user.ssn &&
            <View>
              <CelText margin={"0 0 20 0"} type={"H4"} align={"left"} weight={"300"}>
                We are required to collect SSN from all American users. Please provide your SSN to start earning
                interest.
                This information is encrypted and highly secured.
              </CelText>
            </View>
            }

            <View>
              <View style={style.ssnInput}>
                <CelInput
                  onFocus={this.ssnField}
                  large={false}
                  style={{ flex: 1, flexGrow: 1, justifyContent: "center" }}
                  maxLenght={3}
                  keyboardType={"phone-pad"}
                  type={"number"}
                  margin="0 10 0 10" field="ssn1"
                  placeholder="XXX"
                  value={user.ssn ? ssnArray[0] : formData.ssn1}
                  error={formErrors.ssn1}
                  disabled={!!ssnArray[0]}
                  refs={(input) => {
                    this.ssn1 = input;
                  }}
                  onSubmitEditing={() => {
                    this.ssn2.focus();
                  }}
                  returnKeyType={"next"}
                />
                <CelText style={{ flex: 0.1 }}>
                  {"-"}
                </CelText>
                <CelInput
                  large={false}
                  maxLenght={2}
                  style={{ flex: 1, flexGrow: 1, justifyContent: "center" }}
                  keyboardType={"phone-pad"}
                  type={"number"}
                  margin="0 10 0 10"
                  field="ssn2"
                  placeholder="XX"
                  value={user.ssn ? ssnArray[1] : formData.ssn2}
                  error={formErrors.ssn2}
                  disabled={!!ssnArray[1]}
                  refs={(input) => {
                    this.ssn2 = input;
                  }}
                  onSubmitEditing={() => {
                    this.ssn3.focus();
                  }}
                  returnKeyType={"next"}
                />
                <CelText style={{ flex: 0.1 }}>
                  {"-"}
                </CelText>
                <CelInput
                  large={false}
                  maxLenght={4}
                  style={{ flex: 1, flexGrow: 1, justifyContent: "center" }}
                  keyboardType={"phone-pad"}
                  type={"number"}
                  margin="0 10 0 10"
                  field="ssn3"
                  placeholder="XXXX"
                  value={user.ssn ? ssnArray[2] : formData.ssn3}
                  disabled={!!ssnArray[2]}
                  error={formErrors.ssn3}
                  refs={(input) => {
                    this.ssn3 = input;
                  }}
                />
              </View>
              <View style={{ height: 40, alignItems: "center", alignContent: "center", justifyContent: "center" }}>
                <CelText color='red'>{formErrors.ssn}</CelText>
              </View>
            </View>

            {!user.ssn &&
            <CelButton
              onPress={() => this.updateSSNNumber()}
              margin={"20 0 20 0"}
              loading={updatingTaxInfo}
              disabled={!formData.ssn1 && !formData.ssn1 && !formData.ssn3}
            >
              Submit SSN
            </CelButton>
            }
          </View>
        )}

        <Separator margin={"10 0 20 0"} color={STYLES.COLORS.DARK_GRAY} opacity={0.2} textOpacity={0.4}
                   text={"PROFILE DETAILS"}/>

        <View>
          <CelText margin={"0 0 10 0"} type={"H4"} weight={"300"}>First name</CelText>
          <CelInput field={"profileFirst"} disabled value={user.first_name}/>
        </View>

        <View>
          <CelText margin={"0 0 10 0"} type={"H4"} weight={"300"}>Last name</CelText>
          <CelInput field={"profileLast"} disabled value={user.last_name}/>
        </View>

        <View>
          <CelText margin={"0 0 10 0"} type={"H4"} weight={"300"}>Email</CelText>
          <CelInput field={"profileEmail"} disabled type="text" value={user.email}/>
        </View>

        {user.date_of_birth &&
        <View>
          <CelText margin={"0 0 10 0"} type={"H4"} weight={"300"}>Date of birth</CelText>
          <View style={style.addressInfo}>
            <CelInput field={"profileMonth"} margin={"0 20 0 0"} large={false} disabled type="text"
                      value={moment([dateOfBirth[0], dateOfBirth[1]].join("-")).format("MMM")}/>
            <CelInput field={"profileDay"} margin={"0 20 0 0"} large={false} disabled type="text"
                      value={dateOfBirth[2]}/>
            <CelInput field={"profileYear"} margin={"0 20 0 0"} large={false} disabled type="text"
                      value={dateOfBirth[0]}/>
          </View>
        </View>
        }

        {user.gender &&
        <View>
          <CelText margin={"10 0 10 0"} type={"H4"} weight={"300"}>Gender</CelText>
          <CelInput field={"profileGender"} disabled type="text" value={user.gender}/>
        </View>
        }

        {user.citizenship && <View>
          <CelText margin={"0 0 10 0"} type={"H4"} weight={"300"}>Citizenship</CelText>
          <CelInput field={"profileCitizenship"} disabled type="text" value={user.citizenship}/>
        </View>}

        {user.cellphone &&
        <CelInput type="text" field='profileCellphone' disabled placeholder='Phone number' error={formErrors.cellphone}
                  value={user.cellphone_verified ? user.cellphone : ""} margin={"0 0 20 0"}/>
        }

        {!user.cellphone_verified &&
        <CelButton
          margin={"20 0 20 0"}
          onPress={() => actions.navigateTo("CellphoneEnter")}
        >
          Enter Phone Number
        </CelButton>
        }

        <Separator margin={"10 0 20 0"} color={STYLES.COLORS.DARK_GRAY} opacity={0.2} textOpacity={0.4}
                   text={"ADDRESS INFO"}/>

        <View>
          <CelText margin={"0 0 10 0"} type={"H4"} weight={"300"}>Address</CelText>
          <CelInput field={"profileStreet"} disabled type="text" value={user.street}/>
        </View>

        <View>
          <CelText margin={"0 0 10 0"} type={"H4"} weight={"300"}>Apartment number</CelText>
          <CelInput field={"profileApartment"} disabled type="text" value={user.flat_number}/>
        </View>

        <View>
          <CelText margin={"0 0 10 0"} type={"H4"} weight={"300"}>City</CelText>
          <CelInput field={"profileCity"} disabled type="text" value={user.city}/>
        </View>

        <View>
          <CelText margin={"0 0 10 0"} type={"H4"} weight={"300"}>ZIP / Postal Code</CelText>
          <CelInput field={"profileZip"} disabled type="text" value={user.zip}/>
        </View>

        <View>
          <CelText margin={"0 0 10 0"} type={"H4"} weight={"300"}>Country</CelText>
          <CelInput field={"profileCountry"} disabled type="text" value={user.country}/>
        </View>

      </RegularLayout>
    );
  }
}

export default PersonalInformation;

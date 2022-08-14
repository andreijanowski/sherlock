import React from "react";
import { FormSpy } from "react-final-form";
import { diff } from "deep-object-diff";
import { bool, shape, string, func } from "prop-types";
import Notifications from "react-notification-system-redux";
import { connect } from "react-redux";
import { getErrorMessageKey, getValidMessageKey } from "utils/getErrorMessage";
import { getArraysDiff } from "./utils";

class AutoSave extends React.Component {
  constructor(props) {
    super(props);
    this.state = { values: props.values };
  }

  componentWillReceiveProps(nextProps) {
    const { active } = this.props;
    if (active && active !== nextProps.active) {
      this.save(active);
    }
  }

  save = async blurredField => {
    const {
      setFieldData,
      arrayName,
      t,
      values,
      save,
      errors,
      showSavedMessage,
      hasHiddenMessages
    } = this.props;
    try {
      if (this.promise) {
        await this.promise;
      }
      if (!values[blurredField]) {
        setFieldData(blurredField, { error: null });
      }
      const { values: prevValues } = this.state;
      const difference = arrayName
        ? getArraysDiff(
            values[arrayName],
            prevValues[arrayName],
            errors[arrayName]
          )
        : diff(prevValues, values);
      if (!arrayName) {
        Object.keys(errors).forEach(e => {
          if (
            e !== "types" &&
            e !== "cuisines" &&
            e !== "foodsAndDrinks" &&
            e !== "quirks"
          )
            delete difference[e];
        });
      }

      const keys = Object.keys(difference);
      if (
        values[blurredField] === undefined &&
        prevValues[blurredField] !== undefined
      ) {
        keys.push(blurredField);
      }
      if (keys.length) {
        setFieldData(blurredField, { saving: true });
        this.setState({ values });
        keys.forEach(k => {
          if (difference[k] === undefined) {
            difference[k] = "";
          }
        });
        this.promise = save(difference, values, prevValues);
        const res = await this.promise;
        delete this.promise;
        if (res && res.status > 299) {
          setFieldData(blurredField, {
            error: res.data.errors[0].detail
          });
        } else {
          setFieldData(blurredField, {
            error: null
          });
        }
        setFieldData(blurredField, { saving: false });
        if (!hasHiddenMessages) {
          showSavedMessage();
        }
      }
    } catch (e) {
      if (e.response) {
        const { errors: responseErrors } = e.response.data;
        switch (blurredField) {
          case "types": {
            const error = getValidMessageKey(
              responseErrors,
              "invalid_range_of_types"
            );
            if (error) {
              setFieldData(blurredField, {
                error: t(error.message, { ...error.meta })
              });
            }
            break;
          }
          case "cuisines": {
            const error = getValidMessageKey(
              responseErrors,
              "invalid_range_of_cuisines"
            );
            if (error) {
              setFieldData(blurredField, {
                error: t(error.message, { ...error.meta })
              });
            }
            break;
          }
          case "foodsAndDrinks": {
            const error = getValidMessageKey(
              responseErrors,
              "invalid_range_of_drinks_foods"
            );
            if (error) {
              setFieldData(blurredField, {
                error: t(error.message, { ...error.meta })
              });
            }
            break;
          }
          case "quirks": {
            const error = getValidMessageKey(
              responseErrors,
              "invalid_range_of_quirks"
            );
            if (error) {
              setFieldData(blurredField, {
                error: t(error.message, { ...error.meta })
              });
            }
            break;
          }
          default: {
            const { message, meta } = getErrorMessageKey(responseErrors);
            setFieldData(blurredField, {
              error: t(message, { ...meta })
            });
          }
        }
      } else {
        console.log(e);
      }
      setFieldData(blurredField, { saving: false });
      if (this.promise) {
        delete this.promise;
      }
    }
  };

  render() {
    return null;
  }
}

AutoSave.propTypes = {
  values: shape().isRequired,
  active: string,
  setFieldData: func.isRequired,
  save: func.isRequired,
  t: func.isRequired,
  errors: shape(),
  arrayName: string,
  showSavedMessage: func.isRequired,
  hasHiddenMessages: bool
};

AutoSave.defaultProps = {
  active: "",
  errors: null,
  arrayName: undefined,
  hasHiddenMessages: false
};

const Spy = props => (
  <FormSpy
    {...props}
    subscription={{ active: true, values: true, errors: true }}
    component={AutoSave}
  />
);

export default connect(null, dispatch => ({
  showSavedMessage: () => {
    dispatch(
      Notifications.success({
        message: "formSavedSuccessfully"
      })
    );
  }
}))(Spy);

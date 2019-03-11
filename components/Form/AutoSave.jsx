import React from "react";
import { FormSpy } from "react-final-form";
import diff from "object-diff";
import { shape, string, func } from "prop-types";
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
    const { setFieldData, arrayName, t } = this.props;
    try {
      setFieldData(blurredField, { saving: true });
      if (this.promise) {
        await this.promise;
      }
      const { values, save, errors } = this.props;
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
          delete difference[e];
        });
      }

      const keys = Object.keys(difference);
      if (keys.length) {
        this.setState({ values });
        keys.forEach(k => {
          if (difference[k] === undefined) {
            difference[k] = "";
          }
        });
        this.promise = save(difference, values);
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
      }
      setFieldData(blurredField, { saving: false });
    } catch (e) {
      if (e.response) {
        setFieldData(blurredField, {
          error: t(
            `forms:validation.error.${e.response.data.errors[0].code}-${
              e.response.data.errors[0].title
            }`
          )
        });
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
  arrayName: string
};

AutoSave.defaultProps = {
  active: "",
  errors: null,
  arrayName: undefined
};

const Spy = props => (
  <FormSpy
    {...props}
    subscription={{ active: true, values: true, errors: true }}
    component={AutoSave}
  />
);

export default Spy;

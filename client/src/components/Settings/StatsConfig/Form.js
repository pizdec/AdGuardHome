import React from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { Trans, withNamespaces } from 'react-i18next';
import flow from 'lodash/flow';

import { renderRadioField, toNumber } from '../../../helpers/form';
import { STATS_INTERVALS_DAYS } from '../../../helpers/constants';

const getIntervalFields = (processing, t, handleChange, toNumber) =>
    STATS_INTERVALS_DAYS.map((interval) => {
        const title = interval === 1
            ? t('interval_24_hour')
            : t('interval_days', { count: interval });

        return (
            <Field
                key={interval}
                name="interval"
                type="radio"
                component={renderRadioField}
                value={interval}
                placeholder={title}
                onChange={handleChange}
                normalize={toNumber}
                disabled={processing}
            />
        );
    });

const Form = (props) => {
    const {
        handleSubmit, handleChange, processing, t,
    } = props;

    return (
        <form onSubmit={handleSubmit}>
            <div className="row">
                <div className="col-12">
                    <label className="form__label form__label--with-desc" htmlFor="server_name">
                        <Trans>statistics_retention</Trans>
                    </label>
                    <div className="form__desc form__desc--top">
                        <Trans>statistics_retention_desc</Trans>
                    </div>
                </div>
                <div className="col-12">
                    <div className="form__group mt-2">
                        <div className="custom-controls-stacked">
                            {getIntervalFields(processing, t, handleChange, toNumber)}
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

Form.propTypes = {
    handleSubmit: PropTypes.func.isRequired,
    handleChange: PropTypes.func,
    change: PropTypes.func.isRequired,
    submitting: PropTypes.bool.isRequired,
    invalid: PropTypes.bool.isRequired,
    processing: PropTypes.bool.isRequired,
    t: PropTypes.func.isRequired,
};

export default flow([
    withNamespaces(),
    reduxForm({
        form: 'logConfigForm',
    }),
])(Form);

import {cn as bem} from "@bem-react/classname"
import { memo } from "react";
import PropTypes from 'prop-types';
import './style.css'

function UserCard (props) {
    const cn = bem('UserCard');
    return (
        <div className={cn()}>
            <div className={cn('title')}>{props.t('profile')}</div>
            <div className={cn('prop')}>
                <div className={cn('label')}>{props.t('name')}:</div>
                <div className={cn('value')}>{props.name}</div>
            </div>
            <div className={cn('prop')}>
                <div className={cn('label')}>{props.t('phone')}:</div>
                <div className={cn('value')}>{props.phone}</div>
            </div>
            <div className={cn('prop')}>
                <div className={cn('label')}>{props.t('email')}:</div>
                <div className={cn('value')}>{props.email}</div>
            </div>
        </div>
    )
}

UserCard.propTypes = {
    name: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string
}

UserCard.defaultProps = {
    name: '',
    phone: '',
    email: ''
}

export default memo(UserCard)

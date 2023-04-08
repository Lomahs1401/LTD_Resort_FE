import React from 'react'
import styles from './Button.module.scss'
import clsx from 'clsx'

const Button = ({ primary  }) => {

    const classes = clsx(styles.btn, {
        [styles.primary]: true,
    })

    return (
        <button className={classes}>
            Click me!
        </button>
    )
}

export default Button
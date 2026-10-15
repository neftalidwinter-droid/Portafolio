const Button = ({ children, onClick, type='button', variant='primary', fullWidth=false }) => {
    const classes = `btn btn-${variant} ${fullWidth ? 'btn-full' : ''}`;
    return (
        <button type={type} className={classes} onClick={onClick}>
            {children}
        </button>
    );
};

export default Button;

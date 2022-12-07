import Tooltip from '@material-ui/core/Tooltip';

const Tooltips = props => {
  const { children, disableTheme, ...otherProps } = props;
  const finalProps = otherProps;
  if (!finalProps.title) finalProps.title = '';
  return <Tooltip {...finalProps}>{children}</Tooltip>;
};

export default Tooltips;

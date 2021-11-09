import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const theme = createTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#FF473E',
        fontSize: '11px',
      },
      arrow: {
        color: '#FF473E',
      },
    },
  },
});

const Tooltips = props => {
  const { children, disableTheme, ...otherProps } = props;
  const finalProps = otherProps;
  if (!finalProps.title) finalProps.title = '';

  if (!disableTheme) {
    return (
      <MuiThemeProvider theme={theme}>
        <Tooltip {...finalProps}>{children}</Tooltip>
      </MuiThemeProvider>
    );
  }

  return <Tooltip {...finalProps}>{children}</Tooltip>;
};

export default Tooltips;

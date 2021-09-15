import { createTheme, MuiThemeProvider } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';

const theme = createTheme({
  overrides: {
    MuiTooltip: {
      tooltip: {
        backgroundColor: '#FF473E',
      },
      arrow: {
        color: '#FF473E',
      },
    },
  },
});

const Tooltips = props => {
  const { children, ...otherProps } = props;
  return (
    <MuiThemeProvider theme={theme}>
      <Tooltip {...otherProps}>{children}</Tooltip>
    </MuiThemeProvider>
  );
};

export default Tooltips;

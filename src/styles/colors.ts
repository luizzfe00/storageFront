export const colors = {
  // General
  black: '#000',
  offBlack: '#000e22',
  white: '#FFF',
  offWhite: '#f7f7f7',

  // Fill colors
  success: '#7FE157',
  background: '#F2F3F7',
  confirmButton: '#2AC940',
  lightButton: '#E5E9F7',
  primary: '#615DF9',
  secondary: '#0E164B', // used on background, Sidebar, buttons
  darkerSecondary: '#070C2D', // used on background, Sidebar, buttons
  purpleGradient: 'radial-gradient(#9E65D9, #54249A)',
  radioChecked: '#02E8DB', // used on SVGs too
  calendarButton: '#3B7CFF', // used on calendar selection start too
  calendarHeader: '#F8F9FB',
  calendarSelection: 'rgba(126,211,33,0.2)',
  calendarSelectionEnd: '#7ED321',
  Off: '#66697C',
  completeRegisterButton: '#F36',
  goDownFill: '#FFEDEF',
  goUpFill: '#E2F4EC',
  actualPagePagination: 'rgba(97,93,249,0.44)',
  otherPagePagination: '#0D1546',
  grayCardBackground: '#F8F8FB',
  offerInfoBackground: '#E9ECF4',
  dropdownBackground: '#ebebeb',
  darkTableRow: 'rgba(0, 0, 0, 0.05)',
  backgroundRow: 'rgba(0, 0, 0, 0.08)',
  headerTableBackground: '#ddd',
  lightSwitchOff: '#7279AF',
  filterBarBackground: '#000E22',
  modalBackground: '#6c757d',
  secondaryModalButton: '#d6d6d6',
  fillDailyChartDot: '#0060B4',
  fillDailyChartLine: '#E2ECF5',
  fillDailyChartLineBackground: '#F2F7FB',

  // Shadows and Border
  primaryShadow: '#DEE2F2',
  secondaryShadow: '#D4D4DB',
  inputBorder: '#D1D2DA',
  invalidBorder: '#dc3545',
  calendarButtonShadow: 'rgba(59,124,255,0.2)',
  simpleBorder: '#808080',
  transparencyShadow: '#ffffff1c',
  navbarItemBorder: '#403DAA',
  periodBackground: '#bfbfbf1c',
  lightGrayBorder: '#C4C4C4',
  grayBorder: '#D1D4DD',

  caretBlue: '#555BB3',
  offSwitch: '#FF612A',

  // Bar chart
  chartLineGray: '#060b1b1a',
  defaultBar: '#D2D2D2',
  darkDefaultBar: '#b8b8b8',

  // SVGs
  svgPrimary: '#344494', // used on SVGs on login page
  svgSecondary: '#027FA8',
  svgLight: '#686868',
  backgroundToPurpleSVG: 'rgba(97,93,249,0.1)',
  backgroundToBlackSVG: '#EEEFF7',
  nonSelectedNavbarSVG: '#4a5077',

  // TEXT
  lightTextButton: '#EEE', // used on button with dark background
  darkTextButton: '#B0B3C5', // used on button with light background
  pathText: '#9497AB', // used on SVGs too
  input: '#5C6279',
  login: '#2C97CB', // used on login page and on login border
  lightText: '#848484', // used on small texts like "FORGOT MY PASSWORD"
  lightTextDashboard: '#535272',
  dashboardCardText: '#363565',
  calendarTitle: '#3B4859',
  calendarWeekDay: '#39475B',
  calendarDay: '#8998AC',
  calendarPastDay: '#E9ECF0',
  goUp: '#4A9D77',
  goDown: '#E95060',
  link: '#39F',
  backButtonText: '#6C6C6C',
  lightGray: '#828799',
  blurredText: '#8a8a8a',
  mutedText: '#6B7480',
  ultraLightText: '#707780',
  offerInfoText: '#2A2C36',
  offerInfoLabelText: '#939AAC',

  // TODO: Organizar as cores da table
  // Table
  tableHeader: '#8392A6',
  tableRow: '#F7F7F7',

  // Status
  emitted: '#000000',
  pending: '#5351FB',
  paid: '#00CD98',
  refunded: '#F6B900',
  canceled: '#F64000',

  // Row
  rowHover: 'rgba(0, 0, 0, 0.075)',

  // Order
  orderRowHover: '#007bff',
  orderThead: '#58595b',
  orderTheadTh: '#8392a6',

  // Path
  pathColor: '#a7a9ac',

  // Scroll
  scrollbar: '#e8e8e8',
  scrollbarThumb: '#a8a8a8',
};

interface PaymentColor {
  color: string;
  hover: string;
}

export const paymentStatus = {
  default: {
    color: '#FD893D',
    hover: '#FDA73D',
  },
  waiting: {
    color: '#F0BD0F',
    hover: '#F2C52C',
  },
  authorized: {
    color: '#7FE157',
    hover: '#8ee26c',
  },
  cancelled: {
    color: '#FF5344',
    hover: '#ff6a5d',
  },
  refunded: {
    color: '#B55EF5',
    hover: '#C87AFF',
  },
  reversed: {
    color: '#B55EF5',
    hover: '#C87AFF',
  },
  finished: {
    color: '#7FE157',
    hover: '#8ee26c',
  },
};

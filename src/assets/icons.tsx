import React from 'react';
import * as AI from 'react-icons/ai';
import * as BI from 'react-icons/bi';
import * as BS from 'react-icons/bs';
import * as FA from 'react-icons/fa';
import * as FI from 'react-icons/fi';
import * as GI from 'react-icons/gi';
import * as HI from 'react-icons/hi';
import * as IM from 'react-icons/im';
import * as IO from 'react-icons/io';
import * as MD from 'react-icons/md';
import * as RI from 'react-icons/ri';
import * as VSC from 'react-icons/vsc';
import { ReactComponent as BilletSVG } from '../assets/svg/billet.svg';
import { ReactComponent as Boxes } from '../assets/svg/boxes.svg';
import { ReactComponent as ListIconSVG } from '../assets/svg/list.svg';
import { ReactComponent as Partners } from '../assets/svg/partners.svg';
import { ReactComponent as SquaredIconSVG } from '../assets/svg/squared.svg';
import { colors } from '../styles/colors';

export const icons = {
  bell: <MD.MdNotifications />,
  home: <MD.MdHome />,
  book: <MD.MdBook />,
  eye: <AI.AiOutlineEye />,
  business: <BI.BiStoreAlt />,
  eyeInvisible: <AI.AiOutlineEyeInvisible />,
  add: <MD.MdQueue />,
  chat: <MD.MdChatBubble />,
  settings: <MD.MdSettings />,
  whatsapp: <FA.FaWhatsapp />,
  templates: <FI.FiMessageCircle />,
  box: <FI.FiBox />,
  coin: <BI.BiCoinStack />,
  exit: <MD.MdExitToApp />,
  calendar: <FI.FiCalendar />,
  caretRight: <AI.AiOutlineRight className="caret" />,
  caretUp: <AI.AiFillCaretUp />,
  caretDown: <AI.AiFillCaretDown />,
  lightCaretDown: <IO.IoIosArrowDown />,
  dollarCircle: <AI.AiOutlineDollarCircle />,
  shoppingCart: <AI.AiOutlineShoppingCart />,
  atSign: <FI.FiAtSign />,
  user: <FI.FiUser />,
  arrowLeft: <FI.FiArrowLeft />,
  arrowDown: <MD.MdKeyboardArrowDown />,
  key: <VSC.VscKey />,
  menu: <BI.BiMenu />,
  close: <MD.MdClose />,
  number: <AI.AiOutlineFieldNumber />,
  building: <BI.BiBuilding />,
  phone: <FI.FiPhone />,
  globe: <FI.FiGlobe />,
  shield: <FI.FiShield />,
  link: <HI.HiOutlineLink />,
  plus: <FI.FiPlus />,
  dashboard: <RI.RiDashboardLine />,
  share: <FI.FiShare2 />,
  percent: <AI.AiOutlinePercentage />,
  partners: <Partners style={{ height: '25px', width: '25px' }} />,
  boxes: <Boxes style={{ height: '25px', width: '25px' }} />,
  list: <ListIconSVG />,
  squares: <SquaredIconSVG />,
  pencil: <HI.HiOutlinePencil />,
  closeCircled: <IO.IoIosCloseCircle />,
  power: <FI.FiPower />,
  tag: <FI.FiTag />,
  images: <BS.BsImages />,
  upload: <FI.FiUpload />,
  font: <AI.AiOutlineFontSize />,
  star: <AI.AiOutlineStar />,
  clipboard: <HI.HiOutlineClipboardCheck />,
  clipboardFilled: <HI.HiClipboardCheck />,
  timer: <MD.MdTimer />,
  timerOff: <MD.MdTimerOff />,
  checkCircle: <MD.MdCheckCircle size={24} color="#7FE157" />,
  checkCircleOff: <MD.MdCheckCircle size={24} color="#ddd" />,
  errorCircle: <MD.MdError size={24} color="#e57878" />,
  group: (
    <HI.HiOutlineUserGroup
      style={{
        borderRadius: '50%',
        backgroundColor: `${colors.backgroundToBlackSVG}`,
        height: '40px',
        width: '40px',
        padding: '8px',
      }}
    />
  ),
  desktop: <MD.MdDesktopWindows />,
  mobile: <AI.AiOutlineMobile />,
  creditCard: <BS.BsCreditCard />,
  personalDoc: <AI.AiOutlineIdcard />,
  government: <RI.RiGovernmentLine />,
  billet: <BilletSVG />,
  barCode: <AI.AiOutlineBarcode />,
  crown: <GI.GiLaurelCrown />,
  safety: <AI.AiOutlineSafety />,
  mailSend: <RI.RiMailSendLine />,
  mailOutline: <HI.HiOutlineMail />,
  password: <HI.HiOutlineLockClosed />,
  check: <FA.FaCheck />,
  check2: <BI.BiCheck />,
  times: <BS.BsX />,
  starFilledNoColor: <AI.AiFillStar />,
  starFilled: <AI.AiFillStar color={colors.confirmButton} />,
  filter: <MD.MdFilterList />,
  verticalDots: <BI.BiDotsVerticalRounded />,
  horizontalDots: <BI.BiDotsHorizontalRounded />,
  coproducer: <FA.FaUserFriends />,
  download: <AI.AiOutlineDownload />,
  refund: <RI.RiRefund2Line />,
  cancel: <IM.ImCancelCircle />,
  subdirectoryArrowRight: <MD.MdSubdirectoryArrowRight />,
  listMenu: <MD.MdList />,
  atLine: <RI.RiAtLine />,
  search: <FA.FaSearch color="#39F" />,
  fire: <AI.AiTwotoneFire color={colors.canceled} />,
  refresh: <BI.BiRefresh />,
  support: <BI.BiSupport />,
  chevron: <BI.BiChevronsRight />,
  copy: <MD.MdContentCopy />,
  trash: <HI.HiOutlineTrash />,
};

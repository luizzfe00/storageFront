import React from 'react';
import { colors } from '../../../styles/colors';
import Links from '../Links';

import {
  Container,
  HeaderContainer,
  AllRowsContainer,
  RowContainer,
  TableContainer,
  ActionButton,
} from './styles';

interface HeaderInterface {
  data: {
    name: string;
    alignCenter?: boolean;
    nonVisible?: boolean;
    isLink?: boolean;
    isIcon?: boolean;
    fitContent?: boolean;
  }[];

  actionless: boolean;
}

export interface ActionInterface {
  title?: string;
  color?: string;
  icon?: JSX.Element;
  disabled?: boolean;

  href?: string;
  onClick?: (event?: React.MouseEvent<HTMLButtonElement>) => void;
}

const Header: React.FC<HeaderInterface> = ({
  data,
  actionless,
}: HeaderInterface) => {
  return (
    <HeaderContainer>
      <tr>
        {data.map((item) =>
          !item.nonVisible ? (
            <th
              key={String(item.name)}
              className={`${item.alignCenter ? 'align-center' : ''} ${
                item.fitContent ? 'fit-content' : ''
              }`}
            >
              {item.name}
            </th>
          ) : null,
        )}
        {!actionless && <th className="align-center">Ações</th>}
      </tr>
    </HeaderContainer>
  );
};

interface RowInterface {
  alignCenter: boolean[];
  isLink: boolean[];
  isIcon: boolean[];
  isInput: boolean[];
  fitContent: boolean[];
  [key: string]: any;
  actions: ActionInterface[];
  nonVisibleArray: boolean[];
  actionless: boolean;
}

const Row: React.FC<RowInterface> = ({
  data,
  alignCenter,
  isLink,
  isIcon,
  isInput,
  fitContent,
  actions,
  nonVisibleArray,
  actionless,
}: RowInterface) => {
  return (
    <RowContainer>
      {Object.entries(data).map(
        ([key, value], id) =>
          !nonVisibleArray[id] && (
            <td
              key={`tableRow-${key}#${id + 1}`}
              className={`${alignCenter[id] ? 'align-center' : ''} ${
                fitContent[id] ? 'fit-content' : ''
              }`}
            >
              {isLink[id] ? (
                <Links.Link
                  path={`${
                    window.location.pathname.split('/').slice(-1)[0]
                  }/${String(data.id)}`}
                  text={String(value)}
                  color={colors.primary}
                />
              ) : typeof value === 'boolean' ? (
                String(value) === 'true' ? (
                  'Sim'
                ) : (
                  'Não'
                )
              ) : isIcon[id] ? (
                <>{value}</>
              ) : isInput[id] ? (
                <>{value}</>
              ) : (
                String(value)
              )}
            </td>
          ),
      )}
      {!actionless && (
        <td className="align-center">
          {actions.map((action, index) => (
            <ActionButton
              key={`action-${action.title}#${index + 1}`}
              disabled={action.disabled}
              value={data.id}
              title={action.title}
              color={action.color}
              onClick={action.onClick}
            >
              {action.icon}
            </ActionButton>
          ))}
        </td>
      )}
    </RowContainer>
  );
};

interface AllRowsInterface {
  data: {
    [key: string]: any;
  }[];
  alignCenter: boolean[];
  isLink: boolean[];
  isIcon: boolean[];
  isInput: boolean[];
  fitContent: boolean[];
  actions?: ActionInterface[];
  nonVisibleArray: boolean[];
  actionless: boolean;
}

const AllRows: React.FC<AllRowsInterface> = ({
  data,
  alignCenter,
  isLink,
  isIcon,
  isInput,
  fitContent,
  actions = [],
  nonVisibleArray,
  actionless,
}: AllRowsInterface) => {
  return (
    <AllRowsContainer>
      {data.map((item, id) => (
        <Row
          key={`tableRow#${id + 1}`}
          data={item}
          alignCenter={alignCenter}
          isLink={isLink}
          isIcon={isIcon}
          isInput={isInput}
          fitContent={fitContent}
          actions={actions}
          nonVisibleArray={nonVisibleArray}
          actionless={actionless}
        />
      ))}
    </AllRowsContainer>
  );
};

interface TableInterface {
  actionless?: boolean;
  header: {
    name: string;
    alignCenter?: boolean;
    nonVisible?: boolean;
    isLink?: boolean;
    isIcon?: boolean;
    isInput?: boolean;
    fitContent?: boolean;
  }[];
  data: {
    [key: string]: any;
  }[];
  actions?: ActionInterface[];
}

const Table: React.FC<TableInterface> = ({
  header,
  data,
  actions,
  actionless = false,
}: TableInterface) => {
  const alignCenterArray = header.map((item) => Boolean(item.alignCenter));
  const isLinkArray = header.map((item) => Boolean(item.isLink));
  const isIconArray = header.map((item) => Boolean(item.isIcon));
  const isInputArray = header.map((item) => Boolean(item.isInput));
  const fitContentArray = header.map((item) => Boolean(item.fitContent));
  const nonVisibleArray = header.map((item) => Boolean(item.nonVisible));

  return (
    <TableContainer>
      {!data || data.length === 0 ? (
        <span>Nenhum dado foi encontrado para essa página.</span>
      ) : (
        <Container>
          <Header data={header} actionless={actionless} />
          <AllRows
            actionless={actionless}
            data={data}
            alignCenter={alignCenterArray}
            isLink={isLinkArray}
            isIcon={isIconArray}
            isInput={isInputArray}
            fitContent={fitContentArray}
            actions={actions}
            nonVisibleArray={nonVisibleArray}
          />
        </Container>
      )}
    </TableContainer>
  );
};

export default Table;

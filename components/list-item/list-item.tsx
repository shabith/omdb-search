import Image from 'next/image';
import styled from '@emotion/styled';

import { ListItem as ListItemType } from '@app/types';
import { mq } from '@app/utils/media-query';

const ListItemStyled = styled.article<{ active: boolean }>`
  display: flex;
  width: 100%;
  max-width: 440px;
  padding: ${({ theme }) => theme.spacing.s + 4}px ${({ theme }) => theme.spacing.s}px;
  background: ${({ theme, active }) => (active ? theme.colors.gray[100] : theme.colors.white)};
  border-bottom: 1px solid ${({ theme }) => theme.colors.gray[500]};
  box-shadow: ${({ active }) => (active ? `inset 0px 5px 5px -3px rgba(0,0,0,0.1)` : `none`)};
  transition: all 200ms ease-out;
  cursor: pointer;

  ${mq.md} {
    padding: ${({ theme }) => theme.spacing.xxl + 4}px ${({ theme }) => theme.spacing.xxl}px;
  }

  .image-wrapper {
    width: 50px;
    height: 40px;
    border-radius: ${({ theme }) => theme.borderRadius.s}px;
    overflow: hidden;
    position: relative;

    ${mq.md} {
      width: 60px;
      height: 50px;
    }
  }

  .content-wrapper {
    padding-left: ${({ theme }) => theme.spacing.lg}px;
    h3 {
      margin-top: 0;
      font-weight: 300;
      margin-bottom: ${({ theme }) => theme.spacing.xs}px;
      font-size: ${({ theme }) => theme.fonts.size.m}px;
      color: ${({ theme }) => theme.colors.gray[600]};

      ${mq.md} {
        margin-bottom: ${({ theme }) => theme.spacing.s}px;
        font-size: 18px;
      }
    }
    time {
      color: ${({ theme }) => theme.colors.gray[400]};
      font-size: ${({ theme }) => theme.fonts.size.s}px;

      ${mq.md} {
        font-size: ${({ theme }) => theme.fonts.size.m}px;
      }
    }
  }
`;

type ListItemProps = { data: ListItemType; active?: boolean };

export default function ListItem({
  data: { title, year, posterImage },
  active = false,
}: ListItemProps): JSX.Element {
  return (
    <ListItemStyled active={active} data-testid="list-item-comp">
      <div className="image-wrapper">
        <Image alt={title} src={posterImage} layout="fill" objectFit="cover" />
      </div>
      <div className="content-wrapper">
        <h3>{title}</h3>
        <time dateTime={year}>{year}</time>
      </div>
    </ListItemStyled>
  );
}

import Image from 'next/image';
import styled from '@emotion/styled';
import { toast } from 'react-toastify';

import { ListItem } from '@app/types';
import { mq } from '@app/utils/media-query';
import CloseBtn from '@app/components/icon/close';
import useWatchList from '@app/context/use-watchlist';

const imagePlaceholder = '/placeholder.jpg';

type WatchListItemProps = {
  data: ListItem;
  onClick?: (imdbId: string) => void;
};

const WatchListItemStyled = styled.article`
  display: flex;
  flex-direction: column;

  .image-wrapper {
    width: 100px;
    height: 150px;
    margin: 0 auto;
    position: relative;
    overflow: hidden;
    border-radius: ${({ theme }) => theme.borderRadius.s}px;

    ${mq.md} {
      width: 150px;
      height: 225px;
    }

    .close-btn {
      position: absolute;
      z-index: 1;
      transform: scale(0.3);
      top: -10px;
      right: -10px;
      cursor: pointer;

      ${mq.md} {
        right: 0;
        top: 0;
        transform: scale(0.5);
      }
    }
  }

  .content-wrapper {
    margin-top: ${({ theme }) => theme.spacing.lg}px;
    text-align: center;
    cursor: pointer;

    &:hover,
    &:active,
    &:focus {
      h3 {
        color: ${({ theme }) => theme.colors.gray[1200]};
      }

      time {
        color: ${({ theme }) => theme.colors.gray[1000]};
      }
    }

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

export default function WatchListItem({
  data: { title, posterImage, year, imdbId },
  onClick = () => {},
}: WatchListItemProps): JSX.Element {
  const { removeWatchListItem } = useWatchList();
  const closeBtnClickHandler = (itemImdbId: string, itemTitle: string) => {
    if (window) {
      // eslint-disable-next-line no-alert
      const response = window.confirm(
        `Are you sure you want to remove "${itemTitle}" from the watch list?`,
      );
      if (response) {
        removeWatchListItem(itemImdbId);
        toast(`"${itemTitle}" removed from the watch list.`, {
          type: 'success',
        });
      }
    }
  };
  return (
    <WatchListItemStyled data-testid="watch-list-item-comp">
      <div className="image-wrapper">
        <Image alt={title} src={posterImage || imagePlaceholder} layout="fill" objectFit="cover" />
        <CloseBtn className="close-btn" onClick={() => closeBtnClickHandler(imdbId, title)} />
      </div>
      <div className="content-wrapper" role="presentation" onClick={() => onClick(imdbId)}>
        <h3>{title}</h3>
        <time dateTime={year}>{year}</time>
      </div>
    </WatchListItemStyled>
  );
}

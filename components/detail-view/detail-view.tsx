import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import Button from '@app/components/button';
import BookmarkIcon from '@app/components/icon/bookmark';
import BookmarkAddedIcon from '@app/components/icon/bookmark-added';
import useMediaQuery from '@app/lib/use-media-query';
import useWatchList from '@app/context/use-watchlist';
import { useStore } from '@app/context/use-store';
import { mq } from '@app/utils/media-query';
import { TitleTypes } from '@app/types';

const imagePlaceholder = '/placeholder.jpg';

const DetailViewStyled = styled.article`
  display: flex;
  width: 100%;
  max-width: 750px;
  background: ${({ theme }) => theme.colors.white};
  padding: ${({ theme }) => theme.spacing.lg}px;
  flex-direction: column;
  overflow: auto;

  .back-btn-wrapper {
    display: flex;
    justify-content: flex-end;
    margin: ${({ theme }) => theme.spacing.lg}px 0;
    ${mq.md} {
      display: none;
    }
  }

  .top-wrapper {
    display: flex;
    flex-direction: column;
    padding-bottom: ${({ theme }) => theme.spacing.lg}px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[400]};

    ${mq.md} {
      flex-direction: row;
    }

    .image-wrapper {
      width: 100%;
      max-width: 300px;
      height: 465px;
      position: relative;
      margin-bottom: ${({ theme }) => theme.spacing.lg}px;
      align-self: center;
      flex-shrink: 0;

      ${mq.md} {
        width: 200px;
        height: 310px;
        margin-bottom: 0;
        align-self: self-start;
      }
    }
    .top-content {
      display: flex;
      flex-direction: column;
      width: 100%;

      ${mq.md} {
        padding-left: ${({ theme }) => theme.spacing.lg}px;
      }

      .button-wrapper {
        display: flex;
        justify-content: flex-end;
      }
      .content-wrapper {
        display: flex;
        flex-direction: column;
        flex: 1;
        justify-content: flex-end;
        margin-top: ${({ theme }) => theme.spacing.lg}px;

        ${mq.md} {
          margin-top: 0;
        }

        h1 {
          margin-top: 0;
          margin-bottom: ${({ theme }) => theme.spacing.lg}px;
          font-size: ${({ theme }) => theme.fonts.size.xl}px;
          color: ${({ theme }) => theme.colors.gray[1200]};
          font-weight: 700;
          text-align: center;

          ${mq.md} {
            font-size: ${({ theme }) => theme.fonts.size.xxl}px;
            text-align: left;
          }
        }
        .sub-heading {
          font-weight: 300;
          display: flex;
          flex-direction: column;
          text-align: center;
          align-content: center;
          color: ${({ theme }) => theme.colors.gray[900]};
          margin-bottom: ${({ theme }) => theme.spacing.lg}px;

          ${mq.md} {
            flex-direction: row;
            text-align: left;
          }

          &.--loading {
            ${mq.md} {
              flex-direction: column;
            }
          }

          > div {
            font-size: ${({ theme }) => theme.fonts.size.m}px;
            color: ${({ theme }) => theme.colors.gray[900]};
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: ${({ theme }) => theme.spacing.s}px;

            ${mq.md} {
              margin-bottom: 0;
              justify-content: flex-start;
              margin-right: ${({ theme }) => theme.spacing.s}px;
            }
          }

          .rated {
            span {
              padding: ${({ theme }) => theme.spacing.xs}px;
              border-radius: ${({ theme }) => theme.borderRadius.s}px;
              border: 1px solid ${({ theme }) => theme.colors.gray[1000]};
              font-size: ${({ theme }) => theme.fonts.size.s}px;
            }
          }
        }
        .actors {
          color: ${({ theme }) => theme.colors.gray[900]};
          font-size: ${({ theme }) => theme.fonts.size.m}px;
          font-weight: 300;
          text-align: center;

          ${mq.md} {
            text-align: left;
          }
        }
      }
    }
  }

  .mid-wrapper {
    font-weight: 300;
    font-size: ${({ theme }) => theme.fonts.size.m}px;
    line-height: ${({ theme }) => theme.fonts.lineHeight.medium};
    padding: ${({ theme }) => theme.spacing.lg}px 0;
    border-bottom: 1px solid ${({ theme }) => theme.colors.gray[400]};
    color: ${({ theme }) => theme.colors.gray[900]};
  }

  .bottom-wrapper {
    padding: ${({ theme }) => theme.spacing.xl}px 0;

    .rating-wrapper {
      display: flex;
      flex-direction: column;

      ${mq.md} {
        flex-direction: row;
      }

      &.--loading {
        > span {
          ${mq.md} {
            display: flex;
            width: 100%;
            margin-top: ${({ theme }) => theme.spacing.xl}px;
            justify-content: space-around;
          }
        }
      }

      .rating-element {
        display: flex;
        align-items: center;
        flex-direction: column;
        color: ${({ theme }) => theme.colors.gray[900]};
        font-weight: 300;
        font-size: ${({ theme }) => theme.fonts.size.m}px;
        text-align: center;
        width: 100%;
        padding: ${({ theme }) => theme.spacing.xl}px 0;
        border-bottom: 1px solid ${({ theme }) => theme.colors.gray[400]};

        ${mq.md} {
          width: 33%;
          padding: 0;
          border-bottom: 0;
          border-right: 1px solid ${({ theme }) => theme.colors.gray[400]};
        }

        &:last-child {
          border-bottom: none;

          ${mq.md} {
            border-right: none;
          }
        }

        .rating-value {
          font-size: ${({ theme }) => theme.fonts.size.lg}px;
          margin-bottom: ${({ theme }) => theme.spacing.lg}px;
        }
      }
    }
  }
`;

const RatingSkeletonStyled = styled.div`
  display: flex;
  justify-content: center;
  margin: ${({ theme }) => theme.spacing.xxl}px 0;

  ${mq.md} {
    margin-top: 0;
  }
`;

function RatingSkeletonInlineWrapper({ children }: PropsWithChildren<unknown>) {
  return <RatingSkeletonStyled>{children}</RatingSkeletonStyled>;
}

type DetailViewProps = {
  onClose?: () => void;
  className?: string;
};

export default function DetailView({
  onClose = () => {},
  className = '',
}: DetailViewProps): JSX.Element {
  const { selectedTitle } = useStore();
  const { getWatchListItem, addWatchListItem, removeWatchListItem } = useWatchList();

  let isInWatchList;
  if (selectedTitle) {
    isInWatchList = getWatchListItem(selectedTitle?.imdbID);
  }

  const toggleWatchList = (add?: boolean, imdbId?: string) => {
    if (add && selectedTitle) {
      addWatchListItem({
        id: selectedTitle.id,
        imdbId: selectedTitle.imdbID,
        posterImage: selectedTitle.poster || imagePlaceholder,
        title: selectedTitle.title,
        type: selectedTitle.type as TitleTypes,
        year: selectedTitle.year || '',
      });
    } else if (imdbId !== undefined) {
      removeWatchListItem(imdbId);
    }
  };

  const mediumScreenSizeUp = useMediaQuery(mq.md.split('@media ')[1]);

  return (
    <DetailViewStyled data-testid="detail-view-comp" className={className}>
      <div className="back-btn-wrapper">
        <Button label="Close" onClick={onClose} />
      </div>
      <div className="top-wrapper">
        <div className="image-wrapper">
          <Image
            alt={selectedTitle?.title}
            src={selectedTitle?.poster || imagePlaceholder}
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="top-content">
          <div className="button-wrapper">
            <Button
              label="Watchlist"
              toggleMode
              isActive={!!isInWatchList}
              loading={selectedTitle?.loading}
              icons={[<BookmarkIcon />, <BookmarkAddedIcon />]}
              onClick={(active) => toggleWatchList(active, selectedTitle?.imdbID)}
            />
          </div>
          <div className="content-wrapper">
            <h1>{selectedTitle?.title}</h1>
            <div className={['sub-heading', selectedTitle?.loading ? '--loading' : ''].join(' ')}>
              {selectedTitle?.loading ? (
                <Skeleton count={mediumScreenSizeUp ? 1 : 4} />
              ) : (
                <>
                  {selectedTitle?.rated !== undefined && (
                    <div className="rated">
                      <span>{selectedTitle?.rated}</span>
                    </div>
                  )}
                  {selectedTitle?.year !== undefined && (
                    <div className="year">{selectedTitle?.year}</div>
                  )}
                  {selectedTitle?.genre !== undefined && (
                    <div className="genre">{selectedTitle?.genre}</div>
                  )}
                  {selectedTitle?.runtime !== undefined && (
                    <div className="runtime">{selectedTitle?.runtime}</div>
                  )}
                </>
              )}
            </div>
            <div className="actors">
              {selectedTitle?.loading ? <Skeleton /> : selectedTitle?.actors}
            </div>
          </div>
        </div>
      </div>
      <div className="mid-wrapper">
        {selectedTitle?.loading ? <Skeleton count={3} /> : selectedTitle?.plot}
      </div>
      <div className="bottom-wrapper">
        <div className={['rating-wrapper', selectedTitle?.loading ? '--loading' : ''].join(' ')}>
          {selectedTitle?.loading ? (
            <Skeleton
              count={3}
              inline={mediumScreenSizeUp}
              width={mediumScreenSizeUp ? 90 : '50%'}
              wrapper={RatingSkeletonInlineWrapper}
            />
          ) : (
            selectedTitle?.ratings?.map((rate) => (
              <div className="rating-element" key={rate.source}>
                <div className="rating-value">{rate.value}</div>
                <div className="rating-source">{rate.source}</div>
              </div>
            ))
          )}
        </div>
      </div>
    </DetailViewStyled>
  );
}

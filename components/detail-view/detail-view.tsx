import { useState } from 'react';
import styled from '@emotion/styled';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import Button from '@app/components/button';
import BookmarkIcon from '@app/components/icon/bookmark';
import BookmarkAddedIcon from '@app/components/icon/bookmark-added';
import { mq } from '@app/utils/media-query';

const DetailViewStyled = styled.article`
  display: flex;
  padding: ${({ theme }) => theme.spacing.lg}px;
  flex-direction: column;

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
    color: ${({ theme }) => theme.colors.gray[600]};
  }

  .bottom-wrapper {
    padding: ${({ theme }) => theme.spacing.xl}px 0;

    .rating-wrapper {
      display: flex;
      flex-direction: column;

      ${mq.md} {
        flex-direction: row;
      }

      .rating-element {
        display: flex;
        align-items: center;
        flex-direction: column;
        color: ${({ theme }) => theme.colors.gray[600]};
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

export default function DetailView(): JSX.Element {
  const [loading] = useState(false);
  const title = 'Star Wars: Episode IV - A New Hope';
  const year = '1977';
  const posterImage =
    'https://m.media-amazon.com/images/M/MV5BNzVlY2MwMjktM2E4OS00Y2Y3LWE3ZjctYzhkZGM3YzA1ZWM2XkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_SX300.jpg';
  const rated = 'PG';
  const genre = 'Action, Adventure, Fantasy';
  const runtime = '121 min';
  const actors = 'Mark Hamill, Harrison Ford, Carrie Fisher';
  const plot =
    'The Imperial Forces, under orders from cruel Darth Vader, hold Princess Leia hostage in their efforts to quell the rebellion against the Galactic Empire. Luke Skywalker and Han Solo, captain of the Millennium Falcon, work together with the companionable droid duo R2-D2 and C-3PO to rescue the beautiful princess, help the Rebel Alliance and restore freedom and justice to the Galaxy.';
  const rating = [
    {
      source: 'Internet Movie Database',
      value: '8.6/10',
    },
    {
      source: 'Rotten Tomatoes',
      value: '92%',
    },
    {
      source: 'Metacritic',
      value: '90/100',
    },
  ];
  return (
    <DetailViewStyled data-testid="detail-view-comp">
      <div className="top-wrapper">
        <div className="image-wrapper">
          <Image alt={title} src={posterImage} layout="fill" objectFit="cover" />
        </div>
        <div className="top-content">
          <div className="button-wrapper">
            <Button
              label="Watchlist"
              toggleMode
              isActive={false}
              icons={[<BookmarkIcon />, <BookmarkAddedIcon />]}
            />
          </div>
          <div className="content-wrapper">
            <h1>{title}</h1>
            <div className="sub-heading">
              {loading ? (
                <Skeleton />
              ) : (
                <>
                  <div className="rated">
                    <span>{rated}</span>
                  </div>
                  <div className="year">{year}</div>
                  <div className="genre">{genre}</div>
                  <div className="runtime">{runtime}</div>
                </>
              )}
            </div>
            <div className="actors">{loading ? <Skeleton /> : actors}</div>
          </div>
        </div>
      </div>
      <div className="mid-wrapper">{loading ? <Skeleton count={3} /> : plot}</div>
      <div className="bottom-wrapper">
        <div className="rating-wrapper">
          {loading ? (
            <Skeleton count={3} inline width={90} />
          ) : (
            <>
              {rating.map((rate) => (
                <div className="rating-element" key={rate.source}>
                  <div className="rating-value">{rate.value}</div>
                  <div className="rating-source">{rate.source}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </DetailViewStyled>
  );
}

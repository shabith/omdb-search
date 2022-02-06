import { useState } from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import styled from '@emotion/styled';

import Header from '@app/components/header';
import ItemList from '@app/components/item-list';
import DetailView from '@app/components/detail-view';
import WatchList from '@app/components/watch-list';
import ArrowLeftIcon from '@app/components/icon/arrow-left';
import { useStore } from '@app/context/use-store';
import { ListItem } from '@app/types';
import { mq } from '@app/utils/media-query';

const AppStyled = styled.div`
  display: grid;
  height: 100vh;
  justify-items: center;
  grid-template-columns: 1fr;
  grid-template-rows: 174px auto;
  align-items: flex-start;

  ${mq.md} {
    grid-template-rows: 85px auto;
  }
`;

const MainStyled = styled.main`
  display: grid;
  width: 100%;
  max-width: 1200px;
  height: 100%;
  overflow: hidden;
  grid-template-columns: 100%;

  ${mq.md} {
    grid-template-columns: 35% 65%;
  }

  .item-list-component {
    &.--hide {
      display: none;
    }
    ${mq.md} {
      &.--hide {
        display: flex;
      }
    }
  }

  .detail-view-component {
    &.--hide {
      display: none;
    }
    ${mq.md} {
      &.--hide {
        display: flex;
      }
    }
  }
`;

const IntroStyled = styled.h2`
  font-weight: 300;
  color: ${({ theme }) => theme.colors.gray[500]};
  padding: ${({ theme }) => theme.spacing.lg}px;
  text-align: center;
  justify-content: center;
  font-size: ${({ theme }) => theme.fonts.size.lg}px;
  line-height: ${({ theme }) => theme.fonts.lineHeight.medium};

  ${mq.md} {
    font-size: ${({ theme }) => theme.fonts.size.xl}px;
  }

  &.select-from-list-intro {
    display: none;

    ${mq.md} {
      display: flex;
    }
  }

  .outer-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;

    .icon {
      margin-top: ${({ theme }) => theme.spacing.xl}px;
    }
  }
`;

const App: NextPage = () => {
  const { isDirty, selectedTitle, setSelectedTitle } = useStore();
  const [showList, setShowList] = useState(true);
  const [showWatchList, setShowWatchList] = useState(false);

  return (
    <AppStyled>
      <Head>
        <title>OMDB Search</title>
        <meta
          name="description"
          content="OMDB Search - Find more about your favourite Movie, Series or Episode"
        />
      </Head>
      <Header className="search-component" />
      {!isDirty ? (
        <IntroStyled>
          Please use the above search to search for a movie, series or episode.
        </IntroStyled>
      ) : (
        <MainStyled>
          <ItemList
            className={['item-list-component', !showList ? '--hide' : null].join(' ')}
            onItemClick={() => {
              setShowWatchList(false);
              setShowList(false);
            }}
            onClickWatchList={() => {
              setShowWatchList(true);
              setShowList(false);
            }}
          />
          {(() => {
            let returnElement;
            if (showWatchList) {
              returnElement = (
                <WatchList
                  onItemClick={(item: ListItem) => {
                    setShowWatchList(false);
                    setSelectedTitle(item);
                  }}
                  onGoBack={() => {
                    setShowWatchList(false);
                    setShowList(true);
                  }}
                />
              );
            } else if (selectedTitle) {
              returnElement = (
                <DetailView
                  className={['detail-view-component', showList ? '--hide' : null].join(' ')}
                  onClose={() => {
                    setShowList(true);
                  }}
                />
              );
            } else {
              returnElement = (
                <IntroStyled className="select-from-list-intro">
                  <div className="outer-container">
                    <div>Please select a title from search results to see more details.</div>
                    <ArrowLeftIcon className="icon" width={100} height={100} />
                  </div>
                </IntroStyled>
              );
            }
            return returnElement;
          })()}
        </MainStyled>
      )}
    </AppStyled>
  );
};

export default App;

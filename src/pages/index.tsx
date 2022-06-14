import { Box } from '@chakra-ui/react';
import { useMemo } from 'react';
import { useInfiniteQuery } from 'react-query';

import { Card, CardList } from '../components/CardList';
import { Header } from '../components/Header';
import { api } from '../services/api';

export default function Home(): JSX.Element {
  const fetchImages = async ({ pageParam = null }) => {
    try {
      const { data } = await api.get(`/api/images?after=${pageParam}`);

      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const {
    data,
    isLoading,
    isError,
    isFetchingNextPage,
    fetchNextPage,
    hasNextPage,
  } = useInfiniteQuery('images', fetchImages, {
    getNextPageParam: lastPage => lastPage.after ?? null,
  });

  console.log(data);

  const formattedData = useMemo(() => {
    const flattedData = data.pages.flat().map((data: Card) => data);

    return flattedData;
  }, [data]);

  // TODO RENDER LOADING SCREEN

  // TODO RENDER ERROR SCREEN

  return (
    <>
      <Header />

      <Box maxW={1120} px={20} mx="auto" my={20}>
        <CardList cards={formattedData} />
        {/* TODO RENDER LOAD MORE BUTTON IF DATA HAS NEXT PAGE */}
      </Box>
    </>
  );
}

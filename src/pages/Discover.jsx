import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {Error, Loader, SongCard} from '../components';
import {genres} from '../assets/constants';
import { useGetSongsByGenreQuery } from '../redux/services/shazamCore';
import { selectGenreListId } from '../redux/features/playerSlice';
import {TopPlay} from '../components';
import Div100vh from 'react-div-100vh';



const Discover = () => {
    const dispatch = useDispatch();
    const { activeSong, isPlaying, genreListId } = useSelector((state) => state.player);
    const { data, isFetching, error } = useGetSongsByGenreQuery(genreListId || 'POP');
  
    useEffect(() => {
        window.addEventListener('scroll', () => {
            if(window.scrollY != 0){
                window.scrollTo({
                    top:0,
                    behavior: 'smooth',
                })
            }
        })
      }, []);
  
    if (isFetching) return <Loader title="Loading songs..." />;
    if (error) return <Error />;
  
    const genreTitle = genres.find(({ value }) => value === genreListId)?.title;
    return (
      <div className='flex flex-col'>
        <div className='sm:visible md:hidden lg:hidden pt-10'>
          
        </div>
        <div className='w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10'>
          <h2 className='font-bold text-3xl text-white mt-4 mb-10'>Discover {genreTitle}</h2>
          <select
            onChange={(e) => dispatch(selectGenreListId(e.target.value))}
            value={genreListId || 'pop'}
            className='bg-black text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5'
          >
            {genres.map((genre) => (
              <option key={genre.value} value={genre.value}>
                {genre.title}
              </option>
            ))}
          </select>
        </div>
        <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
      {data?.map((song, i) => (
        <SongCard
          key={song.key}
          song={song}
          isPlaying={isPlaying}
          activeSong={activeSong}
          data={data}
          i={i}
        />
      ))}
    </div>
        <TopPlay />
      </div>
    );
  };


export default Discover;

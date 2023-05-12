import React from 'react';
import axios from 'axios';
import {TopPlay} from '../components'
import { ArtistCard, Error, Loader } from '../components'
import { useGetTopChartsQuery } from '../redux/services/shazamCore';



const TopArtists = (artistId) => {
    
    const { data, isFetching, error } = useGetTopChartsQuery();
  

    if(isFetching) return <Loader title="Loading songs..."/>;

    if(error) return <Error/>
    

    return (
        
        <div className='flex flex-col'>
            <div className='sm:visible md:hidden lg:hidden pt-10'>
                <TopPlay/>
            </div>
            <h2 className='font-bold text-3xl text-white mt-4 mb-10'>
                Top Artists </h2>
            <div className='flex flex-wrap sm:justify-start justify-center gap-8'>
                {data?.map((track) => (
                    <ArtistCard
                    artistId={artistId}
                    key={track.key}
                    track={track}
                    />
                ))}

            </div>
            
        </div>
    )
    
}

export default TopArtists;

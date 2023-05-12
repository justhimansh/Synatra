import React from 'react';
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { DetailsHeader, Error, Loader, RelatedSongs } from "../components";
import { setActiveSong, playPause } from "../redux/features/playerSlice";
import { useGetSongDetailsQuery, useGetSongRelatedQuery, useGetSongMusicVideoQuery } from "../redux/services/shazamCore";


const SongDetails = () => {
    const dispatch = useDispatch();
    const { songid, id: artistId, name } = useParams();
    const { activeSong, isPlaying} = useSelector((state) => state.player);
    

    

    const { data, isFetching: isFetchingRelatedSongs, error} = useGetSongRelatedQuery({ songid });

    const { data: songData, isFetching: isFetchingSongDetails } = useGetSongDetailsQuery({ songid });

    const { data: newData, video, isFetching: isFetchingSongMusicVideo } = useGetSongMusicVideoQuery({ songid, name });

    // const names = newData;

    const handlePauseClick = () => {
        dispatch(playPause(false));
      };
    
      const handlePlayClick = (song, i) => {
        dispatch(setActiveSong({ song, data, i }));
        dispatch(playPause(true));
      };

    if(isFetchingSongDetails || isFetchingRelatedSongs || isFetchingSongMusicVideo ) return 
    <Loader title="Searching song details"/>

    //   console.log(newData.actions[0].uri);


    //  console.log("here is video "+names);

    // for(let prop in newData){
    //     console.log(`${prop}: ${songData[prop]}`);
    // }


    if(error) return <Error/>

    return (
        <div className="flex flex-col">
            <DetailsHeader
            artistId={artistId}
            songData={songData}
            />

            <div className='mb-10'>
                <h2 className='text-white text-3xl font-bold'>Music Video</h2>
            </div>
            
            <div className="mb-10">
                <h2 className="text-white text-3xl font-bold">Lyrics:</h2>
                
                <div className='bg-red-700 '>
                    
                </div>

                <div className="mt-10">
                    {songData?.sections[1].type === 'LYRICS' ? songData?.sections[1].text.map((line, i) => (
                        <p key={`lyrics-${line}-${1}`} className="text-gray-400 text-2xl my-1 flex justify-center">{line}</p>
                    )) : <p className="text-gray-400 text-2xl my-1 flex justify-center">No lyrics for this one sorry :(</p>}
                </div>
            </div>

            <RelatedSongs
            data={data}
            artistId={artistId}
            isPlaying={isPlaying}
            activeSong={activeSong}
            handlePauseClick={handlePauseClick}
            handlePlayClick={handlePlayClick}
            />
            
        </div>
    )
}

export default SongDetails;

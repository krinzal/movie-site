'use client';
import Image from 'next/image'
import React, { useState } from "react";

const Home = () => {
  const [name, setName] = useState("");
  const [dataList, setDataList] = useState([]);
  const [error, setError] = useState('');

  async function getData() {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?t=${name}&apikey=2f8ee33a&plot=full`, {
          next: { revalidate: 15 }
        }
      );
      const jsonData = await response.json();

      if (response.ok) {
        setDataList(jsonData);
        setError('');
      } else {
        setDataList([]);
        setError('Movie Not in database');
      }
    } catch (error) {
      setError("An error occurred while fetching data from the API.");
    }
  }

  return (
    <>
      <div className="text-white">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            getData();
          }}
          className="flex flex-col justify-center items-center gap-4"
        >
          <div>
            <input
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Search movie"
              className="px-2 py-1 bg-transparent border-2 border-white rounded-lg"
            />
          </div>
          <button type="submit">Search</button>
      <p className='z-9999 text-red-700'>{error}</p>
        </form>
      </div>

{/* @ts-ignore */}
      {dataList.Poster && (
        <div className='glass p-5 text-zinc-400 mt-4'>
          <div className="flex gap-4">
            <div className="w-[150px] h-[200px] relative">
              <Image
                // @ts-ignore
                src={dataList.Poster}
                alt='poster'
                fill={true}
              />
            </div>

            <div className="flex flex-col">
              {/* @ts-ignore  */}
              <p key='2'>Name: <b>{dataList.Title}</b></p> 
              {/* @ts-ignore  */}
              <p key='3'>Year: <b>{dataList.Year}</b></p>
              {/* @ts-ignore  */}
              <p key='4'>Actors: <b>{dataList.Actors}</b></p>
              {/* @ts-ignore  */}
              <p key='5'>Genre: <b>{dataList.Genre}</b></p>
              {/* @ts-ignore  */}
              <p key='6'>Box Office: <b>{dataList.BoxOffice}</b></p>
              {/* @ts-ignore  */}
              <p key='7'>PG Rating: <b>{dataList.Rated}</b></p>
              {/* @ts-ignore  */}
              <p key='8'>Imdb rating: <b>{dataList.imdbRating}</b></p>
              <br />
            </div>
          </div>
          {/* @ts-ignore  */}
          <p key='9' className='mt-4'>Plot: <b>{dataList.Plot}</b></p>
        </div>
      )}
    </>
  );
};

export default Home;

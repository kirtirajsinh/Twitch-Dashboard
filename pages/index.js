// Main entry point of your app
import React, {useState} from "react";
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import StreamerGrid from "../components/StreamerGrid"

const Home = () => {
  const [favoriteStreamer, setFavoriteStreamers] = useState([]);
 
  const addStreamChannel = async event =>{
    event.preventDefault();
    const {value} = event.target.elements.name;
    if(value){
      console.log('Input: ',value)
     const path =  `https://${window.location.hostname}` 
     const response = await fetch(`${path}/api/twitch`,{
       method:'POST',
       headers:{
         'Content-Type':'application/json'
       },
       body: JSON.stringify({data:value})
     })
     const json = await response.json();
     setFavoriteStreamers(prevStreamer => [...prevStreamer, json.data])
    event.target.elements.name.value=""
    }
    
    
  }

  const renderForm = () =>(
    <div className={styles.formContainer}>
    <form onSubmit={addStreamChannel}>
    <input type="text" id="name" required placeholder="Enter Your Favourite Streamer" />
    <button type="submit">Submit</button>
    </form>
    </div>
  )
  return (
    <div className={styles.container}>
      <Head>
        <title>🎥 Personal Twitch Dashboard</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div className={styles.inputContainer}>
       {renderForm()}
       <StreamerGrid channels={favoriteStreamer} setChannels={setFavoriteStreamers} />
      </div>
    </div>
  )
}

export default Home
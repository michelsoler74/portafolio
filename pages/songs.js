import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Songs.module.css';
import AudioPlayer from '../components/AudioPlayer';
import { musicData } from '../lib/music-data';
import { FaMusic } from 'react-icons/fa';

export default function Songs() {
  const [currentSong, setCurrentSong] = useState(null);

  return (
    <div className={styles.container}>
      <Head>
        <title>Música | Michel Soler</title>
        <meta name="description" content="Mis composiciones musicales y canciones" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>Mis Canciones</h1>
        <p className={styles.description}>
          Explora mis composiciones musicales originales.
        </p>

        <div className={styles.grid}>
          {musicData.map((song) => (
            <div key={song.id} className={`${styles.card} ${currentSong?.id === song.id ? styles.activeCard : ''}`}>
              <div className={styles.cardHeader}>
                <div className={styles.coverWrapper}>
                  {song.cover ? (
                    <img 
                      src={song.cover} 
                      alt={song.title} 
                      className={styles.coverImage}
                    />
                  ) : (
                    <div className={styles.iconWrapper}>
                      <FaMusic />
                    </div>
                  )}
                </div>
                <div className={styles.cardInfo}>
                  <h3>{song.title}</h3>
                  <p>{song.artist}</p>
                </div>
              </div>
              
              <div className={styles.playerWrapper}>
                <AudioPlayer 
                  src={song.url} 
                  title={song.title} 
                  artist={song.artist} 
                />
              </div>

              {song.description && (
                <p className={styles.songDescription}>{song.description}</p>
              )}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

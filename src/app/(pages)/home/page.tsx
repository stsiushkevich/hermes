import { FC } from 'react'

import { ClientSearch } from '@features/Client/Search/ui'

import backImg from '@/assets/images/home-background.png'

import styles from './page.module.scss'

type Props = {
    searchParams?: {
        error?: string
    }
}

const Home: FC<Props> = ({ searchParams }) => {
    const error = searchParams?.error

    return (
        <div className={styles.home}>
            <div className={styles.home__body}>
                <div className={styles.home__backImgContainer}>
                    <img src={backImg.src} className={styles.home__backImg}/>
                </div>
                <div className={styles.home__welcomeText}>
                    Welcome to the Hermess application
                </div>
                <div className={styles.home__search}>
                    <ClientSearch error={error}/>
                </div>
            </div>
        </div>
    )
}

export default Home;
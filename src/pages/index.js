import Head from 'next/head';
import { Conferences, News } from '../lib/data';
import { NewsFeed, ConferenceFeed, Link, Pill, Countdown, HybridFeed } from '../components';
import { isDateUpcoming } from '../lib/date';

export default function HomePage({ posts, conferences, upcoming }) {
    return <>
        <Head>
            <title>StuyMUN</title>
        </Head>

        {upcoming && isDateUpcoming(upcoming[1].details.date) && <header>
            <div className="text-center">
                <Pill>
                    <h1 className="countdown-title">{upcoming[0]}</h1>
                    <Countdown date={upcoming[1].details.date} />
                    <Link href={`/conference/${upcoming[0]}`}><button>Learn More</button></Link>
                </Pill>
            </div>
        </header>}

        <section className="content-container">
            <div className="content-split">
                <NewsFeed posts={posts}>
                    <Link href={'/news'}>View all posts</Link>
                </NewsFeed>
                <ConferenceFeed
                    conferences={conferences}
                    feed={HybridFeed}
                >
                    <Link href={'/conferences'}>View all conferences</Link>
                </ConferenceFeed>
            </div>
        </section>
    </>;
}

export async function getStaticProps() {

    const newsPosts = 5;
    const conferencePosts = 3;

    return {
        props: {
            posts: (await News.getPosts()).slice(0, newsPosts),
            conferences: (await Conferences.getConferences()).slice(0, conferencePosts),
            upcoming: (await Conferences.getStuyConferences())[0]
        }
    };
}

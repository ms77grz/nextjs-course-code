import Head from 'next/head';
import { Fragment } from 'react';
import { useRouter } from 'next/router';
import EventList from '../../components/events/event-list';
import { getAllEvents } from '../../helpers/api-util';
import EventsSearch from '../../components/events/events-search';

export default function AllEventsPage({ events }) {
  const router = useRouter();

  function findEventsHandler(year, month) {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <Fragment>
      <Head>
        <title>All Events</title>
        <meta
          name='description'
          content='Find a lot of great events that allow you to evolve...'
        />
      </Head>
      <EventsSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: { events },
    revalidate: 60,
  };
}

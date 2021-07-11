import Image from 'next/image';
import classes from './hero.module.css';

export default function Hero() {
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src='/images/site/alex.jpg'
          alt='An image showing Alex'
          width={300}
          height={300}
        />
      </div>
      <h1>Hi, I'm Alex</h1>
      <p>
        I blog about web development – especially frontend frameworks like
        Next.js
      </p>
    </section>
  );
}

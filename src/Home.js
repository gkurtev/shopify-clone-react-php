import FeaturedCollection from './FeaturedCollection';
import Hero from './Hero';

export default function Home() {
  return (
    <>
      <Hero
        title='Set your title'
        buttonText='Login'
        buttonUrl='/login'
        content='Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aut quia asperiores alias vero magnam recusandae adipisci ad vitae laudantium quod rem voluptatem eos accusantium cumque.'
      />

      <FeaturedCollection title='New Arrivals' collectionHandle='new-arrivals' />
    </>
  );
}

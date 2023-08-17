import'./MainContent.scss';
import React, { useState, ReactNode, CSSProperties } from 'react';
import ReactDOM from 'react-dom';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';
import Typewriter from 'typewriter-effect';
import 'bootstrap/dist/css/bootstrap.min.css';




const TypeWriting: React.FC<CardProps> = () => (

  <div className="typingStyle">
  <Typewriter
  options={{
    autoStart: true,
    loop: true,
  }}
  onInit={(typewriter) => { 
    typewriter
    .typeString('Making your learning experience better')
    .pauseFor(2000)
    .deleteChars(6)
    .typeString('easier ...')
    .start();
    

  }}
/>
</div>
);

const CARDS = 10;
const MAX_VISIBILITY = 3;

// The CardProps interface is for type checking the Card component's props
interface CardProps {
  title: string;
  content: string;
}

const Card: React.FC<CardProps> = ({title, content}) => (
  <div className='card'>
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
);

// The CarouselProps interface is for type checking the Carousel component's props
interface CarouselProps {
  children: ReactNode;
}

const Carousel: React.FC<CarouselProps> = ({children}) => {
  const [active, setActive] = useState<number>(2);
  const count = React.Children.count(children);

 
  
  return (
    <div className='carousel'>
      {active > 0 && <button className='nav left' onClick={() => setActive(i => i - 1)}><TiChevronLeftOutline/></button>}
      {React.Children.map(children, (child, i) => {
        const style: any = {
          '--active': i === active ? 1 : 0,
          '--offset': (active - i) / 3,
          '--direction': Math.sign(active - i),
          '--abs-offset': Math.abs(active - i) / 3,
          'pointer-events': active === i ? 'auto' : 'none',
          'opacity': Math.abs(active - i) >= MAX_VISIBILITY ? '0' : '1',
          'display': Math.abs(active - i) > MAX_VISIBILITY ? 'none' : 'block',
        };
        return (
          <div className='card-container' style={style}>
            {child}
          </div>
        )
      })}
      {active < count - 1 && <button className='nav right' onClick={() => setActive(i => i + 1)}><TiChevronRightOutline/></button>}
    </div>
  );
};

// MainContent component that uses the Card and Carousel components
const MainContent: React.FC = () => {
  
  return(
  <div className='mainContent'>
    <br/>
    <TypeWriting  title={''} content={''}/>
    <br/>
    <Carousel>
      {[...new Array(CARDS)].map((_, i) => (
        <Card 
          title={'hello'} 
          content='"In the end, the secret to learning is so simple: forget about it. Think only about whatever you love. Follow it, do it, dream about it... and you will hit upon the extraordinary." - Ray Bradbury'
        />
      ))}
    </Carousel>

<br/>
<br/>
<br/>
<br/>
<br/>
<br/>


    <section id="About">
  <h1>About</h1>
  <hr/> 
  <p>At NextGen, we firmly grasp the truth that coding is more than just a necessary skill in today's swiftly evolving digital environment; it's the foundation for the innovation that propels us forward. With the rapid rate at which technology is advancing, the knowledge and proficiency in programming have become the bedrock for pioneering digital solutions, fostering creativity, and driving societal growth.
<br/>
<br/>
However, we recognize that the traditional ways of learning coding often fall short in terms of their effectiveness. Traditional pedagogical methods are frequently a one-size-fits-all, ignoring the individual strengths and weaknesses of the learner. This issue is magnified in the field of programming, where hands-on practice is paramount, and the speed of comprehension can significantly vary among learners. The current methods often fail to offer an environment where learners can practice, experiment, and learn from their mistakes in real-time.
<br/>
<br/>
Additionally, the conventional methods tend to be low on interaction, missing out on the power of collaborative learning and community support. Many learners find themselves isolated, with little to no opportunities for collaboration, peer-to-peer learning, or networking. They are often devoid of the chance to work on shared projects, participate in code reviews, or engage in constructive discussions, thereby missing out on vital aspects of a comprehensive coding education.
<br/>
</p>
</section>
<section id="Clients">
   <h1>Clients</h1>
   <p>
   At NextGen, we are privileged to serve a diverse portfolio of clients that extends across the spectrum. From ambitious individuals eager to dip their toes in the coding world, to seasoned professionals seeking to refine their skills and stay abreast with the latest in technology. From small businesses looking to upskill their teams, to multinational corporations that aim to lead in the digital age through continuous learning and development.
<br/>
<br/>
Our clients are individuals, diverse in age, profession, and coding proficiency. Some are school students who view coding as a fascinating new language to learn, while others are college students aiming to enhance their employability in a competitive job market. We serve professionals from non-technical backgrounds who view coding as a vital tool for career advancement, and tech professionals who aim to stay at the top of their game. Our services also reach out to those who are embarking on a career shift and see coding as a path to new opportunities.
<br/>
<br/>
Organizations form a vital part of our client base. We offer services to businesses of varying sizes and sectors. Start-ups looking to build a solid technological foundation, small to medium enterprises seeking to digitize their operations, and large corporations aiming to foster a culture of continuous learning - all turn to us for their coding education needs. Educational institutions seeking to complement their curricula with practical, hands-on coding skills also form part of our diverse clientele.

   </p>
  <hr/> 
</section>
<section id="Services">
    <h1>Services</h1>
   <p>
   At NextGen, we have meticulously developed a comprehensive online learning platform that revolutionizes the way you approach coding. This platform is the result of countless hours of research, innovation, and refinement, all geared towards one goal: to make your coding journey smoother, more enjoyable, and above all, more efficient.
<br/>
<br/>
Our platform is a unique blend of technological sophistication and intuitive design, ensuring that learning coding becomes an immersive and interactive experience rather than a monotonous task. The content is structured in a step-by-step manner, allowing learners to build upon their skills progressively. From the basics of coding to complex concepts, each topic is broken down into digestible modules that allow for flexibility and personalized learning.
<br/>
<br/>
A key feature of our platform is its adaptability. We understand that each learner has a different pace and style of learning, and our platform reflects this understanding. The adaptive nature of the platform allows you to learn at your own pace, thereby reducing the pressure often associated with traditional learning methods.
<br/>
<br/>
Additionally, our platform is packed with a multitude of hands-on exercises, real-world projects, and interactive quizzes to provide practical experience and reinforce the concepts learned. We firmly believe in the power of 'learning by doing', and our platform is designed to encourage active learning.


</p>
    <hr/> 
</section>

  </div>
)};

// Render the MainContent component
ReactDOM.render(
  <MainContent />,
  document.getElementById('root')
);

export default MainContent;
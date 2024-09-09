import React from 'react'
import Container from '../components/container'

export default function About() {
  interface InputProps {
    title: string,
    input: React.ReactNode
  }
  const Input: React.FC<InputProps> = props => {
    return <div className="flex-row justify-center">
      <h3 className="px-5 md:px-0 py-10 text-2xl">
        {props.title}
      </h3>
      <div className="md:px-0 px-4">
        <span className="text-lg md:text-base opacity-60">
          {props.input}
        </span>
      </div>
    </div>
  }

  return <Container>
    <div className="flex w-full h-full flex-col pb-10">
      <div className="flex justify-center">
        <h1 className="md:ml-0 ml-5 text-3xl mt-16">
          about
        </h1>
      </div>
      <div className="flex justify-center">
        <div className="w-full md:w-2/3">
          <Input
            title="lately"
            input={
              <>
                Lately, like I'm sure most software enthusiasts, I've been exploring AI and continuing to refine my
                craft. Most side projects are in scala, either using play or http4s with other popular(and some not
                so popular) packages/frameworks.
                <br /> <br />
                Outside of work; I've been taking lots of pictures, continuing to build things, exploring Texas/Austin
                and making more connections here in Austin.
              </>}
          />
          <Input
            title="the before times"
            input={
              <>
                I've built/maintained/worked on websites, backend APIs and mobile apps.
                The main languages and frameworks being react(javascript/typescript)/react native for the frontend
                and scala/nodejs/python/go for the backend.
                <br /> <br />
                I have experience setting up and maintaining environments using CI/CD and kubernetes.
                I love to automate things and DevOps has always interested me.
                <br /> <br />
                In the past I was working on an e-commerce, order fulfillment, rewards and
                customer support platform. They had a pure functional backend in Scala, used ScalaJS
                for our customers frontend and TypeScript/React for our customers customers frontend.
              </>}
          />
          <Input
            title="so ya like to build things?"
            input={
              <>
                My love for building started off with legos as a child, evolved into building with
                code around 12 and has progressed to building with hardware and wood as well now.
                <br /> <br />
                As a teenager, I was running an online text based multiplayer game with an average
                of 15-30 daily users. It was coded in Visual Basics 6 and that is when I fell in love
                with the endless possibilities coding offers.
                <br /> <br />
                Lately, I've dabbled in building a dash cam using a raspberry pi, a telephoto lens and
                a TPU to run a MLM; but my pride and joy is my butcher block kitchen 'island'. It holds my coffee station
                and also serves as a big(and tall) cutting board.
              </>}
          />
          <Input
            title="where ya been living?"
            input={
              <>
                I'm from a small island in Turks & Caicos Islands.
                I moved to Quebec, Canada around the age of 9, learned French, fell in love with poutine
                and at 17 I was living on my own in Montreal working and continuing my education. I lived
                there until my mid 20s before moving back to the islands where I had been living up until 2020 when
                I moved to Texas.
              </>}
          />
        </div>
      </div>
    </div>
  </Container>

}

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
            title="The Craft"
            input={
              <>
                I've always been driven by the process of building. In the digital space, that means architecting
                scalable, complex systems. Currently, my focus is on the intersection of AI, context management
                and distributed computing, primarily utilizing Scala, TypeScript and the modern cloud stack (k8s/AWS).
              </>}
          />
          <Input
            title="The Workshop"
            input={
              <>
                My interest in building isn't limited to code. It started with Legos as a child and evolved into
                running a multiplayer game in Visual Basic 6 as a teenager. Today, that same curiosity drives me
                to work with hardware and wood. Whether it's experimenting with a Raspberry Pi-based dash cam or
                crafting a custom butcher block kitchen island, I'm at my best when I'm creating something
                functional from scratch.
              </>}
          />
          <Input
            title="The Journey"
            input={
              <>
                My path has been anything but linear. I grew up in Turks & Caicos islands, moved to Quebec at age nine,
                and learned to navigate the world in both English and French. After years of living in Montreal and
                then more years back on island, I eventually found my way to the heat and energy of Austin, Texas.
                Every move has been a new opportunity to expand my perspective and refine my craft.
              </>}
          />
        </div>
      </div>
    </div>
  </Container>

}

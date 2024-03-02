import { cn } from "@/utils/cn";
import React from "react";
import { BentoGrid, BentoGridItem } from "@/Components/ui/bento-grid";
import {
  IconArrowWaveRightUp,
  IconBoxAlignRightFilled,
  IconBoxAlignTopLeft,
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import HoverCard from "@/Components/HoverCard";
import { Lora } from 'next/font/google'

const lora = Lora({
    subsets:['cyrillic'],
    weight:'400'
})


export default function Menu() {
  return (
    <section className='h-screen w-screen p-6 bg-[#F5F2EE] overflow-y-scroll overflow-x-hidden '>
      <h1 className={`${lora.className} mb-6 flex justify-center text-2xl lg:text-4xl text-[#4d2d18]`}>Library Management System</h1>
      <BentoGrid className="max-w-4xl z-50 mx-auto ">
        {items.map((item, i) => (
          <BentoGridItem
            key={i}
            title={item.title}
            description={item.description}
            header={item.header}
            icon={item.icon}
            className={i === 3 || i === 6 ? "md:col-span-2" : ""}
          />
        ))}
      </BentoGrid>
    </section>
    
  );
}
const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
);
const items = [
  {
    title: "Enter Publisher",
    // description: "Explore the birth of groundbreaking ideas and inventions.",
    header: <HoverCard link={'/publisher'} src={'/2.jpg'} />,
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Enter Book",
    description: "Dive into the transformative power of technology.",
    header: <HoverCard link={'/enterBook'} src={'/1.jpg'} />,
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Enter Student",
    description: "Discover the beauty of thoughtful and functional design.",
    header: <HoverCard link={'/enterStudent'} src={'/3.jpg'} />,
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Allocate Book",
    description:
      "Understand the impact of effective communication in our lives.",
    header: <HoverCard link={'/allocateBook'} src={'/4.jpg'} />,
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
  {
    
    title: "Student Details",
    description: "Join the quest for understanding and enlightenment.",
    header: <HoverCard link={'/studentData'} src={'/5.jpg'} />,
    icon: <IconArrowWaveRightUp className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Books Borrowed",
    description: "Experience the thrill of bringing ideas to life.",
    header: <HoverCard link={'/booksBorrowed'} src={'/6.jpg'} />,
    icon: <IconBoxAlignTopLeft className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Book Details",
    description: "Embark on exciting journeys and thrilling discoveries.",
    header: <HoverCard link={'/bookDetails'} src={'/7.jpg'} />,
    icon: <IconBoxAlignRightFilled className="h-4 w-4 text-neutral-500" />,
  },
];

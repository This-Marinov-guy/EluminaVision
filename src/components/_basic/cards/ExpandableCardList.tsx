"use client";
import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Badge, Button } from "@chakra-ui/react";
import { useOutsideClick } from "@/hooks/use-outside-click";

export function ExpandableCardList(props) {
  const [active, setActive] = useState<any>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0  grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${active.id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              <motion.div layoutId={`image-${active.title}-${active.id}`}>
                <Image
                  priority
                  width={1000}
                  height={1000}
                  src={active.imageUrl}
                  alt={active.title}
                  className="w-full h-80 lg:h-80 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-4 pt-4">
                <motion.h3
                  layoutId={`title-${active.title}-${active.id}`}
                  className="mb-3 flex w-full justify-between font-medium text-neutral-700 dark:text-neutral-200 text-base"
                >
                  {active.title}
                  <Badge colorScheme="blue" className="mb-2">
                    {active.price} {active.currency}
                  </Badge>
                </motion.h3>

                <motion.p
                  layoutId={`description-${active.description}-${active.id}`}
                  className="text-neutral-600 dark:text-neutral-400 text-base"
                  dangerouslySetInnerHTML={{ __html: active.description }}
                ></motion.p>

                <motion.div
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="mt-4 text-neutral-600 text-sm lg:text-base dark:text-neutral-400 flex flex-col gap-4"
                >
                  {typeof active.content === "function" ? active.content() : active.content}
                </motion.div>
              </div>

              {/* Fixed Bottom Buttons */}
              <div className="sticky bottom-0 w-full bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 p-4 flex justify-center gap-2">
                <Button size="sm" className="btn-light" onClick={() => props.addItemsToCart(active)}>
                  Add to cart
                </Button>
                <Button colorScheme="red" size="sm" variant="ghost" onClick={() => setActive(null)}>
                  Close
                </Button>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>

      <ul className="max-w-2xl mx-auto my-5 w-full flex flex-col sm:flex-row justify-center items-center gap-4">
        {props.items.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${card.id}`}
            key={index}
            onClick={() => setActive(card)}
            className="p-4 flex flex-col hover-dark-to-light rounded-xl cursor-pointer"
          >
            <div className="flex gap-4 flex-col  w-full">
              <Badge colorScheme="blue" className="text-center">
                {card.price} {card.currency}
              </Badge>
              <motion.div layoutId={`image-${card.title}-${card.id}`}>
                <Image
                  width={1000}
                  height={1000}
                  src={card.imageUrl}
                  alt={card.title}
                  style={{minWidth: '18em'}}
                  className="h-60 w-full rounded-lg object-cover object-top"
                />
              </motion.div>
              <div className="flex justify-center items-center flex-col">
                <motion.h3
                  layoutId={`title-${card.title}-${card.id}`}
                  className="flex justify-center items-center flex-col gap-2 font-medium text-white md:text-left text-base"
                >
                  {card.title} {card.variant && `(${card.variant})`}
                  <Button size="sm" className={"btn-light-ghost"} variant="ghost">
                    Details
                  </Button>{" "}
                </motion.h3>
              </div>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-6 w-6 flex items-center justify-center rounded-full text-red"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

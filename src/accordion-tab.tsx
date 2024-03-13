import { Disclosure } from '@headlessui/react'
import { MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline'
import { Group } from "./types.d";

interface Props {
    group: Group;
    onClick: () => void;
}

export const AccordionTab = ({group, onClick}: Props) => {
    return (
        <Disclosure as="div" key={group.title} className="pt-6">
          {({ open }) => (
            <>
              <dt>
                <Disclosure.Button className="flex w-full items-start justify-between text-left text-gray-900">
                  <span className="text-base font-semibold leading-7">{group.title}</span>
                  <span className="ml-6 flex h-7 items-center">
                    {open ? (
                      <MinusSmallIcon className="h-6 w-6" aria-hidden="true" />
                    ) : (
                      <PlusSmallIcon className="h-6 w-6" aria-hidden="true" />
                    )}
                  </span>
                </Disclosure.Button>
              </dt>
              <Disclosure.Panel as="dd" className="mt-2 pr-12">
                    {group.blocks.map((block) => (
                            <button
                                key={block.title}
                                onClick={onClick}
                            >
                                <h3>{block.title}</h3>
                                {block.imageURL && <img src={block.imageURL} alt=""></img>}
                            </button>
                        ))}
                
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
    );
}

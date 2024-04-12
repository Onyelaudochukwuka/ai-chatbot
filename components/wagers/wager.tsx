'use client'

import { useActions, useUIState } from 'ai/rsc'

import type { AI } from '@/lib/chat/actions'

interface Wager {
  title: string,
  first_possible_outcome: string,
  second_possible_outcome: string,
  third_possible_outcome: string
}

export function Wagers({ props: wagers }: { props: Wager[] }) {
  const [, setMessages] = useUIState<typeof AI>()
  const { submitUserMessage } = useActions()
  console.log(wagers)
  return (
    <div>
      <div className="mb-4 flex flex-col gap-2 overflow-y-scroll pb-4 text-sm">
        {wagers.map(wager => (
          <button
            key={wager.title}
            className="flex cursor-pointer flex-col w-full gap-2 rounded-lg bg-zinc-800 p-2 text-left hover:bg-zinc-700"
            onClick={async () => {
              const response = await submitUserMessage(`Create ${wager.title}`)
              setMessages(currentMessages => [...currentMessages, response])
            }}
          >
            <div className="flex flex-col">
              <div className="bold uppercase text-zinc-300">Title:</div>
              <div className="text-lg font-bold text-zinc-500">
                {wager.title}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="bold uppercase text-zinc-300">Outcome 1:</div>
              <div className="text-base text-zinc-500">
                {wager.first_possible_outcome}
              </div>
            </div>
            <div className="flex flex-col">
              <div className="bold uppercase text-zinc-300">Outcome 2:</div>
              <div className="text-base text-zinc-500">
                {wager.second_possible_outcome}
              </div>
            </div>
            {wager.third_possible_outcome && <div className="flex flex-col">
              <div className="bold uppercase text-zinc-300">Outcome 3:</div>
              <div className="text-base text-zinc-500">
                {wager.third_possible_outcome}
              </div>
            </div>}
          </button>
        ))}
      </div>
    </div>
  )
}
